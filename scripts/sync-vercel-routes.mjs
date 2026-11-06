import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(projectRoot, "src/data/routeManifest.json");
const vercelConfigPath = path.join(projectRoot, "vercel.json");
const mode = process.argv[2] ?? "--check";

if (mode !== "--check" && mode !== "--write") {
  throw new Error("Uso: node scripts/sync-vercel-routes.mjs [--check|--write]");
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const existingConfig = JSON.parse(await readFile(vercelConfigPath, "utf8"));
const knownPaths = new Set();

for (const [key, route] of Object.entries(manifest)) {
  if (!route || typeof route.path !== "string" || !route.path.startsWith("/")) {
    throw new Error(`Ruta inválida en routeManifest.json: ${key}`);
  }
  if (knownPaths.has(route.path)) {
    throw new Error(`Ruta duplicada en routeManifest.json: ${route.path}`);
  }
  knownPaths.add(route.path);
  if (![200, 404].includes(route.httpStatus)) {
    throw new Error(`HTTP status no soportado para ${key}: ${route.httpStatus}`);
  }
}

if (manifest.home?.path !== "/" || manifest.home.httpStatus !== 200) {
  throw new Error("La ruta home debe existir en / y responder 200");
}
if (manifest.notFound?.path !== "/404" || manifest.notFound.httpStatus !== 404) {
  throw new Error("/404 debe tener HTTP 404 y coincidir con la ruta especial de error");
}

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const appRoutes = Object.values(manifest).filter(
  ({ path: routePath, httpStatus }) => routePath !== "/" && httpStatus === 200,
);
const notFoundRoute = manifest.notFound;

const routes = [
  {
    src: `^${escapeRegex(notFoundRoute.path)}$`,
    status: 404,
    dest: "/404.html",
  },
  {
    src: `^${escapeRegex(notFoundRoute.path)}/$`,
    status: 308,
    headers: { Location: notFoundRoute.path },
  },
  { handle: "filesystem" },
  {
    src: "^/(?!api(?:/|$))(.+)/$",
    status: 308,
    headers: { Location: "/$1" },
  },
  ...appRoutes.map(({ path: routePath }) => ({
    src: `^${escapeRegex(routePath)}$`,
    dest: "/index.html",
  })),
  { src: "^/.*$", status: 404, dest: "/404.html" },
];

const generatedConfig = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  routes,
  crons: existingConfig.crons ?? [],
};
const generatedText = `${JSON.stringify(generatedConfig, null, 2)}\n`;

const normalizeJson = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeJson);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, normalizeJson(value[key])]),
    );
  }
  return value;
};

if (mode === "--write") {
  await writeFile(vercelConfigPath, generatedText, "utf8");
  process.stdout.write("vercel.json actualizado desde routeManifest.json\n");
} else {
  if (
    JSON.stringify(normalizeJson(existingConfig)) !==
    JSON.stringify(normalizeJson(generatedConfig))
  ) {
    throw new Error("El contenido de vercel.json no coincide con las rutas esperadas. Ejecuta npm run routes:sync y confirma el archivo generado.");
  }
  process.stdout.write("Rutas Vercel sincronizadas con routeManifest.json\n");
}
