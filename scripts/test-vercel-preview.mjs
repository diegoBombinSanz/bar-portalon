const baseUrl = process.env.PREVIEW_URL?.replace(/\/$/, "");

if (!baseUrl) {
  throw new Error("Define PREVIEW_URL con la URL del deployment Preview de Vercel");
}

async function request(path, redirect = "manual") {
  return fetch(new URL(path, `${baseUrl}/`), { redirect });
}

async function expectStatus(path, status) {
  const response = await request(path);
  if (response.status !== status) {
    throw new Error(`${path}: esperado HTTP ${status}, recibido ${response.status}`);
  }
  console.log(`OK ${path} -> ${status}`);
  return response;
}

const publicPaths = [
  "/",
  "/barra",
  "/galeria",
  "/entrevinos",
  "/antiguos-eventos",
  "/aviso",
  "/politica",
];
const utilityPaths = ["/login", "/admin", "/admin/config", "/400", "/500"];

for (const path of [...publicPaths, ...utilityPaths]) {
  await expectStatus(path, 200);
}

for (const path of publicPaths.slice(1)) {
  const response = await expectStatus(`${path}/`, 308);
  const target = response.headers.get("location");
  if (!target) throw new Error(`${path}/ devolvió 308 sin Location`);
  const finalResponse = await fetch(new URL(target, `${baseUrl}/`));
  if (finalResponse.status !== 200) {
    throw new Error(`${path}/ termina en HTTP ${finalResponse.status}, esperado 200`);
  }
  console.log(`OK ${path}/ -> 308 -> 200`);
}

for (const path of ["/404", "/una-ruta-inventada", "/otra/ruta/inexistente"]) {
  const response = await expectStatus(path, 404);
  const html = await response.text();
  if (!html.includes("La página no existe") || !html.includes("Ruta no encontrada")) {
    throw new Error(`${path}: no se encontró el contenido estático de 404`);
  }
}

for (const path of ["/404/", "/una-ruta-inventada/"]) {
  const redirect = await expectStatus(path, 308);
  const target = redirect.headers.get("location");
  if (!target) throw new Error(`${path} devolvió 308 sin Location`);
  const finalResponse = await fetch(new URL(target, `${baseUrl}/`));
  if (finalResponse.status !== 404) {
    throw new Error(`${path} termina en HTTP ${finalResponse.status}, esperado 404`);
  }
  console.log(`OK ${path} -> 308 -> 404`);
}

const homeResponse = await expectStatus("/", 200);
const homeHtml = await homeResponse.text();
const assets = [...homeHtml.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)]
  .map((match) => match[1]);
if (!assets.length) throw new Error("No se encontraron assets compilados en el HTML de home");
for (const asset of assets) await expectStatus(asset, 200);
await expectStatus("/favicon.png", 200);

const apiResponse = await request("/api/system/keep-alive");
if (![401, 500, 503].includes(apiResponse.status)) {
  throw new Error(`API keep-alive: status inesperado ${apiResponse.status} sin credenciales`);
}
if (!apiResponse.headers.get("content-type")?.includes("application/json")) {
  throw new Error("API keep-alive no devolvió JSON; podría estar recibiendo el HTML de la SPA");
}
console.log(`OK /api/system/keep-alive -> ${apiResponse.status} JSON`);

console.log("HTTP checks passed. SPA pushState navigation must also be checked in a browser.");
