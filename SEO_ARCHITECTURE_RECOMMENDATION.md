# SEO architecture recommendation

## Criterio

El problema principal no es una falta aislada de etiquetas: producción sirve una shell CSR vacía para cada URL y también devuelve 200 para rutas desconocidas. La mejor decisión debe mejorar HTML inicial y status HTTP sin reescribir todo el sitio antes de comprobar compatibilidad.

## Comparativa

| Alternativa | SEO/indexabilidad | Rendimiento | Complejidad | Coste y compatibilidad | Vercel/mantenimiento |
|---|---|---|---|---|---|
| Mantener Vite CSR | Baja-media: depende de render JS; metadata no sirve en HTML inicial; difícil status por URL | JS/hidratación para mostrar contenido; code splitting ayuda | Baja | Coste inmediato bajo; compatible con código actual | Fácil de mantener pero conserva principales problemas |
| Vite + prerender (SSG) | Alta para conjunto finito de páginas; HTML y metadata iniciales; 404 debe configurarse aparte | Excelente TTFB/HTML estático; hydration opcional | Media | Coste menor que migración; requiere adaptar Supabase y componentes browser-only al build | Muy compatible con Vercel estático; se debe automatizar regeneración de contenido |
| Vite + SSR | Alta si cada ruta responde HTML y status correcto; útil con datos dinámicos | Buen HTML inicial; TTFB depende de función y backend | Alta | Adaptación significativa; cuidado con SSR/hidratación y Supabase | Vercel soporta funciones, pero hay que operar runtime/cache/invalidation |
| Migrar a Astro | Alta y natural para sitio principalmente de contenido; islands para interacción | Muy buena con poco JS por defecto | Media-alta | Componentes React pueden integrarse, aunque rutas/layouts y configuración cambian | Buena integración Vercel; buen mantenimiento de sitios editoriales/locales |
| Migrar a Next.js | Alta con SSG/SSR/ISR; routing/status integrados | Buena si se controla client JS | Alta | Migración grande, App Router y patrones distintos; mayor coste y superficie | Excelente integración Vercel; requiere conocer convenciones Next |

## Recomendación para este código

Primera opción: **prerender/SSG de las siete páginas públicas con Vite**, conservando React y el hosting estático, más un manejo servidor/edge para 404, redirects y API. La cantidad de rutas es pequeña y conocida; los datos son mayoritariamente locales; las páginas no necesitan personalización server-side por request. Es el mayor incremento SEO con menor migración.

Antes de elegir herramienta concreta, verificar que el endpoint Supabase/configuración remota sea necesario en el contenido público. Si sí, convertir esos datos en entrada reproducible para el prerender y establecer invalidación/rebuild; no depender de una petición browser que actualmente recibe HTML. Admin puede quedarse como CSR aparte y llevar noindex/autenticación.

Astro sería la segunda alternativa si el sitio va a crecer como contenido editorial/eventos con poco comportamiento interactivo. React se puede mantener en componentes interactivos, pero habría que integrar layouts y rutas nuevas. Next.js no se justifica todavía por siete URLs mayormente estáticas; tendría sentido si surgen contenido personalizado, CMS dinámico, muchas rutas, preview/ISR o necesidad real de SSR por request.

## Qué no elegir por defecto

- **CSR sin cambios:** no corrige HTML inicial, metadata ni soft 404.
- **SSR completo:** puede resolverlo, pero añade runtime, latencia/caché y cambios innecesarios para contenido estático.
- **Migración inmediata a Next/Astro:** mejora potencial existe, pero el retorno adicional frente a prerender Vite no está probado y eleva riesgo/coste.

## Decisiones que necesitan información externa

1. Dominio principal y propiedad confirmada en Vercel/Search Console.
2. Qué configuración de Supabase es realmente dinámica, frecuencia de cambios y acceso seguro.
3. Volumen de tráfico y URLs con impresiones/clics/cobertura en exportaciones GSC.
4. Si proyecto Vercel tiene redirects o funciones configuradas fuera del repositorio.
5. Si analítica Lighthouse local refleja una build y dispositivo comparables al sitio actual.
