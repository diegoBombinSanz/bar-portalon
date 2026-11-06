# SEO technical audit

Fecha: 6 de noviembre de 2026. Evidencia separa inspección del repositorio de pruebas HTTP en producción.

## Renderizado y URLs

| URL | Modo | HTML inicial | Contenido indexable en HTML inicial | HTTP producción | Evidencia/estado |
|---|---|---|---|---|---|
| `/` | CSR | shell común | head genérico y root vacío; no H1 ni texto de página | 200 | `index.html:70-71`; comprobación Vercel 6-11-2026 |
| `/barra` | CSR | shell común | no contenido de la página ni metadata específica | 200 | Vercel entregó mismo ETag/tamaño que `/`; `src/App.tsx:396-402` |
| `/galeria` | CSR | shell común | no contenido ni metadata específica | 200 | Vercel; `src/App.tsx:404-410` |
| `/entrevinos` | CSR | shell común | no contenido ni metadata específica | 200 | Vercel; `src/App.tsx:412-418` |
| `/antiguos-eventos` | CSR | shell común | no contenido ni metadata específica | 200 | el router la resuelve en `src/App.tsx:420-426`; HTTP se probó indirectamente por la regla común, requiere volver a comprobar tras corregir rewrites |
| `/aviso`, `/politica` | CSR | shell común | no texto/meta específica | 200 esperado por rewrite; no medido en esta petición | `src/App.tsx:380-394`, `vercel.json:2-5` |
| `/no-existe-seo-audit-2026` | CSR + fallback visual | shell común | nada del mensaje visual 404 antes de JS | **200** | petición HTTP directa; ETag/tamaño igual a home |
| `/api/site-config` | destino no implementado como función Vercel visible | shell común por rewrite | no JSON | **200 HTML**, no JSON | petición HTTP directa; igual ETag/tamaño; solo se ve función de config bajo `src/app`, no función raíz `api/site-config` |

No es SSR, SSG por ruta ni prerender. `vite build` genera assets y un `index.html`, no HTML de rutas. Google puede ejecutar JS en una fase posterior, pero el contenido inicial vacío, la dependencia de JS y los metadatos tardíos son riesgo confirmado; la indexación final de Google para cada URL necesita inspección URL en Search Console.

## Hallazgos priorizados

### SEO-01 — Respuesta 200 para rutas inexistentes (CRÍTICO)

- **Evidencia:** `vercel.json:2-5` reescribe cualquier ruta no API a `/`. La comprobación a `/no-existe-seo-audit-2026` dio 200 y la misma shell que home. `src/App.tsx:470-476` solo muestra fallback visual.
- **Impacto:** soft 404, rastreo desperdiciado y señal HTTP falsa para URLs eliminadas o mal escritas.
- **Recomendación:** definir manejo explícito de rutas válidas e inexistentes que produzca 404 real en servidor/edge; validar excepciones de rutas estáticas y funciones.
- **Dificultad:** media. **Riesgo/dependencia:** requiere decidir si mantener SPA o introducir routing/renderizado en servidor; probar navegación directa y rutas con slash.

### SEO-02 — Contenido de todas las páginas ausente del HTML de respuesta (CRÍTICO)

- **Evidencia:** `index.html:70-71` root vacío y script cliente. Respuestas de `/`, `/barra`, `/galeria`, `/entrevinos` comparten ETag y 4.805 bytes. Vite sin renderer en `vite.config.ts`; páginas se montan en App.
- **Impacto:** crawlers que no ejecutan JS, vista previa social y extracción rápida reciben una plantilla sin contenido principal; Google requiere renderizado posterior para entender página.
- **Recomendación:** prerender/SSG de páginas de contenido como mínimo o SSR; emitir HTML por URL con contenido, title, description y canonical correctos. Mantener CSR para admin si conviene.
- **Dificultad:** media-alta. **Riesgo/dependencia:** datos remotos Supabase y componentes browser-only deben resolverse para render de build/servidor.

### SEO-03 — URLs del dominio en conflicto entre fuentes y producción (CRÍTICO)

- **Evidencia:** canonical fijo en checkout `index.html:14` y sitemap/robots usan `elportalonderoa.com`; `src/lib/seo.ts:1` usa `https://bar-portalon-roa.com`; `src/data/siteConfig.ts` configura `homeUrl` en el dominio elportalonderoa. Sin embargo, el HTML inicial consultado en producción el 6-11-2026 incluye canonical `https://bar-portalon-roa.com/`. Desde este entorno ese host no resuelve. `www.elportalonderoa.com` devuelve 307 a elportalonderoa.com. Existe discrepancia entre fuente local, head de producción, sitemap/robots y resolución DNS observada.
- **Impacto:** señales canónicas y sitemap pueden discrepar; canonical puede apuntar a host que no resuelve si el hook modular se llegase a usar. Riesgo de indexación fragmentada.
- **Recomendación:** confirmar dominio contractual en Search Console/Vercel/DNS y usar una única constante de origen para sitemap, canonical, OG, JSON-LD y redirects. No se recomienda cambiar el dominio sin confirmar propiedad.
- **Dificultad:** baja una vez confirmado. **Dependencia:** acceso al proyecto Vercel, DNS y propiedad Search Console.

### SEO-04 — Metadatos de ruta tardíos y parcialmente duplicados (ALTO)

- **Evidencia:** `src/App.tsx:189-215` cambia title/canonical/description/robots en `useEffect`. Todas las rutas reciben head inicial de `index.html`. Hay otro `useSeo` en `src/useSeo.ts`, basado en `src/lib/seo.ts`; esas dos tablas difieren en rutas y hostname. En App las rutas desconocidas heredan SEO de `/` (`routeSeo[pathname] ?? routeSeo["/"]`).
- **Impacto:** metadata genérica para HTML inicial/social share, potencial de title/canonical incorrecto en rutas 404 y drift entre implementaciones.
- **Recomendación:** fuente única de metadatos por ruta, renderizada en HTML servidor/prerender; no usar canonical indexable para 404/login/admin; noindex en rutas privadas.
- **Dificultad:** baja en enfoque prerender, alta con CSR puro. **Riesgo:** decidir qué páginas son indexables.

### SEO-05 — Canonical variable puede heredar dominio/URL no normalizados (ALTO)

- **Evidencia:** canonical en cliente concatena `siteUrl + pathname` (`src/App.tsx:194-207`); no elimina query ni normaliza slash final. `index.html` canonical home solamente. Producción probada `/barra/` devuelve shell 200; no se midió redirect a `/barra`.
- **Impacto:** duplicados `/ruta` y `/ruta/`, parámetros, discrepancia de canonical y redirects.
- **Recomendación:** escoger política slash, redirigir variantes en edge y canonizar únicamente a URL absoluta principal sin parámetros rastreables.
- **Dificultad:** baja-media. **Dependencia:** política de URLs y reglas actuales de dominio.

### SEO-06 — Sitemap no está sincronizado con rutas/indexabilidad (MEDIO)

- **Evidencia:** `public/sitemap.xml` lista siete URLs, incluye aviso/política, omite página administrativa por suerte, no incluye `lastmod`, y declara dominio elportalonderoa. Producción `/sitemap.xml` respondió 200 XML. Robots permite todo y apunta a ese sitemap.
- **Impacto:** páginas legales compiten por crawl aunque suelen ser secundarias; no existe exclusión de `/admin`, `/login` ni rutas técnicas; el sitemap declara URLs que sirven shell común y no tiene 404 real actual.
- **Recomendación:** generar sitemap en build desde el inventario explícito de páginas públicas y canonicals finales; excluir 404/admin/login; `lastmod` solo si refleja cambios reales.
- **Dificultad:** baja-media.

### SEO-07 — Noindex para mantenimiento y páginas privadas solo cliente (ALTO)

- **Evidencia:** `robots` se establece en `useEffect` y mantenimiento usa configuración cliente (`src/App.tsx:189-215`, `src/features/system/components/SystemStatusGate.tsx:10-30`). `/admin`, `/admin/config`, `/login` están en SEO map y reciben fallback home para desconocidos/tabla particular; no se configura meta robots inicial.
- **Impacto:** bots pueden indexar shell de rutas privadas y no reciben noindex de manera fiable. Mantenimiento no devuelve status 503/Retry-After según fuente revisada.
- **Recomendación:** noindex + autenticación real y exclusión de sitemap para admin/login; mantenimiento debe responder con estado HTTP apropiado en servidor.
- **Dificultad:** media.

### SEO-08 — SEO on-page no puede verificarse desde la respuesta inicial (ALTO)

- **Evidencia:** páginas sí definen H1 en componentes (`Hero.tsx:58`, páginas bajo `src/pages`), pero no aparecen en HTML de red. El home H1 es solo uno detectado en `Hero`; H2/H3 presentes por componente. `index.html` trae JSON-LD de restaurante y lang español. App cambia algunos OG/Twitter, pero no actualiza og:image/twitter:image; no hay hreflang.
- **Impacto:** contenido on-page solo disponible tras JS; cada página comparte schema de negocio en head, mientras social image puede ser genérica.
- **Recomendación:** producir HTML por URL; metadatos sociales por ruta; validar JSON-LD (campos factuales, horario, dirección, precio) y H1 tras render.
- **Dificultad:** baja-media. Hreflang no aplica mientras solo haya versión española.

### SEO-09 — Secciones de home diferidas y con placeholders vacíos (MEDIO)

- **Evidencia:** `src/App.tsx:90-132`, `src/App.tsx:264-337`: `IntersectionObserver` retrasa el montaje de secciones; fallback es `<section>` vacío.
- **Impacto:** el contenido no existe antes de montar React y puede depender de scroll/intersection. Google suele renderizar JS, pero no debe suponerse que observará todas las secciones de forma uniforme.
- **Recomendación:** prerender contenido textual semántico; usar lazy-load principalmente para recursos pesados, evitando retrasar contenido SEO.
- **Dificultad:** media.

### SEO-10 — Ruta API de configuración devuelve HTML en producción (ALTO funcional / MEDIO SEO)

- **Evidencia:** `/api/site-config` HTTP 200 HTML de la shell; el frontend espera `response.json()` en `src/App.tsx:350-373`. Existe función `fetchSiteConfig` en `src/app/api/site-config/siteConfigService.ts`, pero no una función API con esa ruta en `/api`.
- **Impacto:** llamada falla al parsear JSON y se usa fallback; por tanto la configuración remota no se demuestra operativa. Esto puede dejar contenido/metadata diferente del panel esperado. El `200` hace el fallo menos visible.
- **Recomendación:** inspeccionar despliegue y logs; exponer endpoint de manera compatible con Vercel o retirar petición y usar build-time data. Confirmar qué campos deben ser públicos.
- **Dificultad:** media. **Pendiente producción:** logs de funciones y estado Supabase.

### SEO-11 — Navegación cliente custom y enlaces potencialmente inconsistentes (MEDIO)

- **Evidencia:** `src/App.tsx:136-171` intercepta anchors same-origin, pero `Navbar.tsx:99-110` tiene navegación propia con `pushState`; sistema duplicado. Error404 ofrece `/contacto`, que no está entre rutas (`src/features/system/pages/Error404Page.tsx:24-29`).
- **Impacto:** historial/scroll pueden divergir; enlaces a ruta sin handler disparan fallback y actualmente 200.
- **Recomendación:** un único router con enlaces accesibles, mapa de rutas tipado y enlaces internos validados; mantener `<a href>` crawlable.
- **Dificultad:** media.

### SEO-12 — Riesgo de LCP y peso de recursos (MEDIO; no medido en producción)

- **Evidencia de código:** preload `/hero-lcp.jpg` en `index.html:8`, pero `Hero.tsx:25` usa `/portada_opcion2.jpg`; preload podría ser inútil y además descarga otro recurso. Hero usa eager/high priority. `OptimizedImage` convierte Unsplash a `srcset`, pero imágenes locales no generan variantes. Varios componentes lazy y `DeferredSection` reducen JS/CPU inicial.
- **Impacto:** doble descarga potencial en LCP; imágenes no responsive y fuentes/animaciones pueden afectar LCP/INP/CLS. No hay datos de campo en esta auditoría.
- **Recomendación:** medir con Lighthouse/CrUX y corregir preload para coincidir exactamente con LCP real; publicar `srcset` local AVIF/WebP, dimensiones, reservar espacio y auditar JS.
- **Dificultad:** baja-media.

## Otros controles

- **H1/jerarquía:** componentes tienen H1; analizar DOM renderizado por URL tras SSR/prerender. Evitar considerar rutas de error como páginas de contenido.
- **ALT:** hay textos útiles y decorativos con `alt=""`; varios datos de galería son genéricos (“Para llevar”) o repetidos. Revisar el inventario en `src/data/gallery.ts`.
- **Breadcrumbs:** no se encontró componente/schema breadcrumb; páginas tienen navegación de regreso/layout.
- **JSON-LD:** presente inline en `index.html` para BarOrPub/Restaurant. Datos como horario, rango de precio y amenidades deben validarse contra negocio real antes de confiar en ellos.
- **Redirecciones medidas:** `http://elportalonderoa.com/` -> 308 a HTTPS; `www` -> 307 a apex. Validar 301/308 final, consistencia www, slash final y cadena completa tras definir dominio.
- **Rastreo de errores:** no se comprobaron URLs históricas ni 5xx; requiere Search Console y logs.

## Core Web Vitals

No se midieron LCP, INP, CLS ni TTFB de producción. El repositorio contiene tres exportaciones Lighthouse/locales de mayo 2026 y exportaciones Search Console de noviembre 2026; no se pudieron analizar aquí. Código positivo: lazy imports, `loading="lazy"` para imágenes no críticas, dimensiones en Hero. Riesgos potenciales: preload que no corresponde al hero, animaciones Framer Motion, carga de imágenes remotas, font loading y montaje tardío de contenido. Confirmar con PageSpeed Insights/CrUX, Lighthouse móvil y RUM.

## Fuentes de evidencia

- HTML: [index.html](./index.html#L2), [index.html](./index.html#L70)
- Vercel: [vercel.json](./vercel.json#L2)
- Rutas/metadatos: [src/App.tsx](./src/App.tsx#L36), [src/App.tsx](./src/App.tsx#L136), [src/App.tsx](./src/App.tsx#L189), [src/App.tsx](./src/App.tsx#L346)
- SEO alternativa duplicada: [src/lib/seo.ts](./src/lib/seo.ts#L1), [src/useSeo.ts](./src/useSeo.ts#L4)
- Sitemap: [public/robots.txt](./public/robots.txt), [public/sitemap.xml](./public/sitemap.xml)
- Hero/LCP: [src/components/Hero.tsx](./src/components/Hero.tsx#L24)
- Datos y API: [src/data/siteConfig.ts](./src/data/siteConfig.ts#L1), [src/app/api/site-config/route.ts](./src/app/api/site-config/route.ts#L1)
