# Arquitectura del Proyecto: Bar El Portalón

## 1. Tipo de proyecto

- Aplicación web estática basada en **React** + **TypeScript**.
- Construida con **Vite** como bundler y servidor de desarrollo.
- Diseño mobile-first con **Tailwind CSS v4**.
- Enrutado cliente propio (History API + enlace interceptado), sin React Router.
- Proyecto preparado para **despliegue estático** (build de `vite build`).

## 2. Stack tecnológico

### Dependencias principales
- `react` / `react-dom` — UI y renderizado.
- `framer-motion` — animaciones declarativas y transiciones.
- `lucide-react` — iconos vectoriales.

### Dependencias de desarrollo
- `vite` — empaquetado rápido y servidor dev.
- `typescript` — tipado estático.
- `@vitejs/plugin-react` — soporte React en Vite.
- `tailwindcss` + `@tailwindcss/postcss` — sistema de utilidades CSS.
- `postcss` + `autoprefixer` — procesamiento CSS.
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — linting.
- `gh-pages` — despliegue en GitHub Pages.
- `sharp` — optimización de imágenes por script.
- `@types/...` — tipos para Node, React y React DOM.

## 3. Organización del proyecto

### Estructura clave

- `index.html` — plantilla HTML principal, metadatos, `link rel=preload`, JSON-LD.
- `vite.config.ts` — configuración Vite, alias `@ -> ./src`, base `/`.
- `package.json` — scripts y dependencias.
- `postcss.config.cjs` — plugins de PostCSS.
- `tailwind.config.js` — paths para escaneo Tailwind.
- `tsconfig.json` — configuración de TypeScript.
- `src/main.tsx` — arranque de React.
- `src/App.tsx` — aplicación principal y enrutado.
- `src/data/restaurant.ts` — fuente de verdad de datos del sitio.
- `src/lib/seo.ts` — helpers SEO y metas dinámicas.
- `src/components/` — componentes UI.
- `src/assets/` — imágenes y activos estáticos.
- `public/` — archivos estáticos finales: `robots.txt`, `sitemap.xml`, `favicon.svg`, `hero-lcp.jpg`, etc.
- `scripts/optimize-images.mjs` — pipeline de optimización de imágenes.

## 4. Arquitectura y flujo de datos

### Patrón principal

- **Datos centralizados** en `src/data/restaurant.ts`.
- Componentes toman contenido desde ese archivo y presentan UI.
- Toda la lógica de negocio está en un único punto de configuración.
- Esto facilita clonar la app para otro negocio: basta con actualizar datos y contenidos.

### Enrutado

- `src/App.tsx` usa `usePathname()` para leer `window.location.pathname`.
- Detecta enlaces internos y hace `pushState` para enrutado SPA.
- Las páginas internas se cargan con `React.lazy` + `Suspense`.
- El contenido principal de la home se renderiza como una sola página con secciones `DeferredSection`.

### SEO

- `src/lib/seo.ts` gestiona título, descripción, `og:*`, `twitter:*`, canonical.
- `index.html` ya define metadatos OG y JSON-LD de tipo `Restaurant`.
- `App.tsx` actualiza dinámicamente las metas cuando cambia la ruta.

## 5. Componentes y páginas

### Componentes principales

- `Navbar.tsx` — navegación y menú móvil.
- `Hero.tsx` — portada principal con CTA y LCP.
- `ExperienceSplit.tsx` — sección dual Bar vs Restaurante.
- `CodDays.tsx` — sección de Jornadas del Bacalao.
- `Specialties.tsx` — especialidades destacadas.
- `Reviews.tsx` — reseñas.
- `MapSection.tsx` — mapa y contacto.
- `Footer.tsx` — pie de página.
- `OptimizedImage.tsx` — <img> con `loading=