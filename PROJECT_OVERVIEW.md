# Project overview

Fecha de inspección: 6 de noviembre de 2026. Auditoría de lectura; no se modificó el código de la aplicación.

## Resumen

El repositorio contiene una aplicación cliente React 19 + TypeScript + Vite 8. Es una SPA estática servida desde Vercel. No se encontraron plugins ni configuración de SSR, SSG o prerenderizado en [vite.config.ts](./vite.config.ts), [package.json](./package.json) o [vercel.json](./vercel.json). Vercel reescribe rutas no API a `/`, por lo que todas reciben la misma shell HTML.

Hay siete rutas de contenido declaradas en el sitemap, además de administración, login y pantallas de error. El enrutador se implementa a mano en [src/App.tsx](./src/App.tsx#L136) y [src/App.tsx](./src/App.tsx#L346), con `window.location.pathname`, delegación de clics y `history.pushState`. Las páginas y buena parte de la home se importan de forma diferida. La configuración de contenido parte de [src/data/siteConfig.ts](./src/data/siteConfig.ts) y [src/data/restaurant.ts](./src/data/restaurant.ts), con una tentativa de cargar datos de Supabase.

## Mapa de arquitectura

```text
Navegador / crawler
  -> Vercel: estáticos de public/ o rewrite de rutas a /
  -> index.html (head compartido + root vacío + módulo de entrada)
  -> src/main.tsx: React, boundary global y gate de mantenimiento
  -> src/App.tsx: pathname manual, consulta configuración y decide vista
  -> páginas/componentes lazy; los bloques de home usan IntersectionObserver
  -> useEffect ajusta title, canonical y algunas meta después de montar
```

| Área | Implementación encontrada |
|---|---|
| Entrada y estilos | `index.html`, `src/main.tsx`, `src/index.css`, `src/App.css`; Tailwind/PostCSS configurados. |
| Rutas | Condicionales de `pathname` en App; páginas de `/barra`, `/galeria`, `/entrevinos`, `/antiguos-eventos`, `/politica`, `/aviso`; home `/`; login/admin y errores. |
| Datos | Ficheros TypeScript en `src/data`; Supabase JS y configuración remota en `src/app/api/site-config`. La aplicación hace una petición a `/api/site-config` y también importa una función de configuración que intenta consultar Supabase. |
| Presentación | `src/components` y `src/pages`; `React.lazy`/`Suspense` para páginas y secciones. Home incluye `DeferredSection`, cuyo contenido real se monta tras intersección o evento. |
| Archivos públicos | `public/robots.txt`, `public/sitemap.xml`, imágenes y logos. |
| Funciones Vercel | `api/system/keep-alive.ts`; `src/app/api/...` no tiene el formato estándar de Function raíz de Vercel ni el framework Next configurado en este proyecto. |
| Build | `npm run build` ejecuta `tsc -b && vite build`; salida estándar `dist`. `npm run deploy` usa `gh-pages`, una ruta de publicación distinta de Vercel. |

Dependencias principales: React/React DOM 19, Vite 8, TypeScript 5.9, Supabase JS, Framer Motion, react-markdown, lucide-react, Tailwind 4 y Sharp. No hay React Router, Helmet, framework SSR ni plugin prerender en dependencias.

## Solicitud de URL: qué ocurre

1. El navegador pide una URL. En producción probada el 6-11-2026, Vercel devuelve `200 OK` para `/`, `/barra`, `/galeria`, `/entrevinos`, una ruta aleatoria inexistente y `/api/site-config`, con idéntico `Content-Length: 4805` y ETag. La regla `/(.*) -> /` explica la shell común. El HTML servido lleva canonical `https://bar-portalon-roa.com/`, que difiere del canonical del archivo local (`https://elportalonderoa.com/`). Esto indica diferencia entre el checkout inspeccionado y el deployment o un cambio de canonical durante el build/runtime; necesita reconciliación.
2. Esa shell define `lang="es"`, título, descripción, canonical, OG, Twitter, JSON-LD de restaurante, `<div id="root"></div>` y `src/main.tsx`. El root no contiene contenido de la página antes de JavaScript.
3. `main.tsx` monta React. Los componentes determinan la página leyendo el pathname del navegador. En navegación cliente, un listener cambia la URL con `pushState`; los enlaces nativos completos también vuelven a pedir la ruta.
4. Los metadatos se actualizan por `useEffect`, por tanto después de la hidratación/montaje en cliente. Los crawlers que ejecutan JS podrían ver cambios; crawlers sociales y clientes sin JS reciben solo metadata genérica de home.
5. Una ruta desconocida muestra componente visual 404, pero el transporte mantiene `200`, constituyendo soft 404. Las rutas `/404`, `/400`, `/500` son rutas de aplicación, tampoco códigos HTTP demostrados.

## Hallazgos de alcance y limitaciones

- Se revisaron los ficheros de configuración y las fuentes bajo `src`, `api` y `public`; no se instalaron paquetes ni se ejecutó build o tests.
- Se consultó producción con `curl.exe` desde este entorno. No se consultó Search Console, logs de Vercel, GA4, PageSpeed Insights ni datos de campo de Core Web Vitals.
- En `analiticas/` existen tres JSON de análisis locales de mayo de 2026 y dos exportaciones XLSX de Search Console fechadas 5-11-2026; no se interpretaron por falta de lector XLSX disponible.
- El proyecto no contiene `AGENTS.md` detectado en el inventario mostrado. La documentación heredada (`README.md`, `PROJECT_ARCHITECTURE.md`) contradice partes del código actual y no se tomó como prueba de funcionamiento.
