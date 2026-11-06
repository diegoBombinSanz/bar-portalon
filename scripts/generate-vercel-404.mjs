import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const indexPath = path.join(outputDirectory, "index.html");
const notFoundPath = path.join(outputDirectory, "404.html");

const builtIndex = await readFile(indexPath, "utf8");
const rootPlaceholder = '<div id="root"></div>';
const cssAssetPath = builtIndex.match(/href="(\/assets\/[^\"]+\.css)"/)?.[1];

// These utility classes are also used directly by ErrorLayout and Error404Page
// under src/, which is included by the Tailwind source/content configuration.
const staticNotFoundMarkup = `
  <main class="min-h-screen bg-[#0a0a0a] px-4 py-12 text-[#f5f5f1] sm:px-6 lg:px-8">
    <section class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(197,160,89,0.2),_transparent_45%),linear-gradient(135deg,_#120f0a_0%,_#1b1712_100%)] shadow-2xl shadow-black/40 lg:flex-row">
      <div class="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
        <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#C5A059]">404</p>
        <h1 class="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">La página no existe</h1>
        <p class="mt-5 max-w-xl text-lg leading-8 text-[#d9d2c4]">No encontramos la dirección que buscas. Puedes volver al inicio o visitar nuestra barra.</p>
        <nav class="mt-8 flex flex-wrap gap-3">
          <a href="/" class="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d4b06a]">Inicio</a>
          <a href="/barra" class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15">La Barra</a>
        </nav>
      </div>
      <div class="flex flex-1 items-center justify-center bg-black/20 p-6 sm:p-10 lg:p-12">
        <div class="flex min-h-[280px] w-full max-w-md flex-col items-center justify-center rounded-[1.25rem] border border-[#C5A059]/30 bg-[#17130c] p-6 text-center">
          <p class="text-sm uppercase tracking-[0.25em] text-[#C5A059]">Ruta no encontrada</p>
          <p class="mt-3 text-sm leading-7 text-[#ddd4c4]">La página solicitada no está disponible.</p>
        </div>
      </div>
    </section>
  </main>`;

if (!builtIndex.includes(rootPlaceholder)) {
  throw new Error("No se encontró #root vacío en dist/index.html; no se generó 404.html");
}

if (!/<link[^>]+href="\/assets\//.test(builtIndex) || !/<script[^>]+src="\/assets\//.test(builtIndex)) {
  throw new Error("Se esperaban referencias absolutas /assets/ en dist/index.html; verifica la opción base de Vite");
}
if (!cssAssetPath) {
  throw new Error("No se encontró la hoja CSS compilada en dist/index.html");
}

const compiledCss = await readFile(path.join(outputDirectory, cssAssetPath.slice(1)), "utf8");
for (const selector of [
  ".min-h-screen",
  ".bg-\\[\\#0a0a0a\\]",
  ".text-\\[\\#f5f5f1\\]",
  ".rounded-\\[2rem\\]",
]) {
  if (!compiledCss.includes(selector)) {
    throw new Error(`El fallback 404 necesita un selector ausente del CSS compilado: ${selector}`);
  }
}

const notFoundHtml = builtIndex.replace(rootPlaceholder, `<div id="root">${staticNotFoundMarkup}</div>`);
await writeFile(notFoundPath, notFoundHtml, "utf8");
process.stdout.write("dist/404.html generado con assets compilados y fallback estático\n");
