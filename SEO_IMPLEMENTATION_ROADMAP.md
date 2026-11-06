# SEO implementation roadmap

Este plan no implementa cambios. Orden propuesto después de la autorización del propietario.

| Fase | Trabajo | Prioridad | Dificultad | Dependencias / riesgos |
|---|---|---|---|---|
| 0. Confirmar hechos externos | Confirmar dominio canónico, DNS/Vercel redirects, exportaciones GSC, endpoint y estado de Supabase, lista de páginas indexables | Crítica | Baja | Acceso propietario/Vercel/Search Console; no consolidar dominio antes de confirmación |
| 1. Contrato de URLs y respuestas | Definir rutas válidas, política slash/query, 301/308, 404 HTTP real, noindex para admin/login y mantenimiento con estado apropiado | Crítica | Media | Puede requerir función/edge; comprobar reglas actuales de deploy para evitar rewrite catch-all |
| 2. HTML inicial por página | Generar prerender/SSG para home y páginas públicas; emitir title, description, canonical, OG/Twitter, JSON-LD y contenido | Crítica | Media-alta | Compatibilidad de Supabase, `window`, `IntersectionObserver`, animaciones y `import.meta.env`; conservar UI |
| 3. Normalizar metadata | Una única tabla de metadata, hostname confirmado, canonical sin query, metadata social y noindex por ruta | Alta | Baja-media | Depende de Fase 0/2; noindex debe estar desde respuesta inicial |
| 4. Sitemap y robots | Generar sitemap desde rutas canónicas públicas; robots referenciando dominio; excluir privadas/errores | Alta | Baja | Depende del contrato de URLs y dominio |
| 5. Datos estructurados y on-page | Validar Restaurant/LocalBusiness, horario, teléfono, imágenes; revisar H1/H2, breadcrumbs si útiles, ALT y enlaces internos | Media | Baja-media | Validación factual del negocio; schema no garantiza rich result |
| 6. Rendimiento | Medir baseline móvil/CrUX/Lighthouse; alinear preload con LCP, imágenes responsive modernas, fuentes, JS y layout stability | Media | Media | Requiere mediciones reales; no optimizar por conjeturas |
| 7. Observabilidad y validación | Inspección URL Google, logs HTTP, sitemap/GSC, Lighthouse y rastreo automatizado de links/status/canonicals | Alta | Media | Acceso Search Console/Vercel; comparar antes/después |

## Criterios de salida

- Cada URL pública devuelve HTML útil sin JavaScript, metadata única y canonical dentro del dominio elegido.
- Una URL inexistente responde HTTP 404 (no solo una vista de error con 200).
- URLs privadas/administrativas no están en sitemap y llevan `noindex` en HTML inicial; su control de acceso se verifica independientemente.
- HTTP, www/apex y variantes slash llevan a una URL final mediante redirección permanente coherente.
- Sitemap contiene solo páginas canónicas que devuelven 200 e indexables; robots publica la misma URL de sitemap.
- JSON-LD corresponde a información comprobada y pasa prueba de resultados enriquecidos/schema.
- Core Web Vitals se mide en producción o CrUX; se registran resultados antes y después.
