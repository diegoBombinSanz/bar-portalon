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
  throw new Error("/404 debe permanecer sin rewrite y devolver HTTP 404");
}

const rewrites = Object.values(manifest)
  .filter(({ path: routePath, httpStatus }) => routePath !== "/" && httpStatus === 200)
  .map(({ path: routePath }) => ({ source: routePath, destination: "/" }));

const generatedConfig = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  trailingSlash: false,
  rewrites,
  crons: existingConfig.crons ?? [],
};
const generatedText = `${JSON.stringify(generatedConfig, null, 2)}\n`;

if (mode === "--write") {
  await writeFile(vercelConfigPath, generatedText, "utf8");
  process.stdout.write("vercel.json actualizado desde routeManifest.json\n");
} else {
  const existingText = await readFile(vercelConfigPath, "utf8");
  if (existingText !== generatedText) {
    throw new Error("vercel.json no está sincronizado. Ejecuta npm run routes:sync y confirma el archivo generado.");
  }
  process.stdout.write("Rutas Vercel sincronizadas con routeManifest.json\n");
}
