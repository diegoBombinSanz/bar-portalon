# SEO validation checklist

## HTTP y dominio

- [ ] Confirmar dominio principal en Vercel, DNS y Search Console.
- [ ] `curl -I` a HTTP, HTTPS, www y apex: una sola redirección permanente al host canónico.
- [ ] Probar cada página pública con slash final y sin él; una única URL final.
- [ ] Probar parámetros de tracking: el contenido sirve y canonical apunta a URL limpia.
- [ ] URL inexistente devuelve `404`, no `200`.
- [ ] `/api/site-config` devuelve JSON válido con status correcto o se elimina la dependencia.
- [ ] Probar 404/5xx/mantenimiento para status correcto; comprobar logs Vercel.

## Renderizado y contenido

- [ ] `curl` de cada ruta contiene contenido principal, H1 y enlaces sin ejecutar JS.
- [ ] `curl` de cada ruta contiene title, description, canonical, OG y Twitter únicos.
- [ ] HTML inicial y DOM tras React conservan mismo contenido esencial y no muestran hydration errors.
- [ ] Verificar rutas directas, navegación interna, atrás/adelante y enlaces externos.
- [ ] Secciones deferred no ocultan texto esencial a crawlers ni usuarios sin IntersectionObserver.
- [ ] Las páginas legales y admin se clasifican explícitamente como indexables/noindex.

## Indexación

- [ ] `robots.txt` permite lo necesario y declara sitemap del host canónico.
- [ ] Sitemap XML parsea correctamente y solo contiene canonicals públicos que devuelven 200.
- [ ] Sitemap excluye login, admin, errores y cualquier `noindex`.
- [ ] Canonical coincide con URL final y no apunta a otra propiedad de dominio.
- [ ] Buscar enlaces internos rotos y destinos no registrados; revisar anchor text.
- [ ] En Google Search Console inspeccionar URL y HTML renderizado de cada plantilla y comprobar cobertura.
- [ ] Revisar soft 404, duplicadas, alternativa con canonical y 5xx en GSC después del despliegue.

## On-page y datos estructurados

- [ ] Un H1 descriptivo por página y jerarquía H2/H3 lógica.
- [ ] Titles/descriptions útiles, únicos y en español.
- [ ] Imágenes relevantes con ALT preciso; decorativas con ALT vacío; sin ALT repetido/genérico.
- [ ] Open Graph/Twitter incluye imagen absoluta adecuada por página.
- [ ] JSON-LD coincide con dirección, teléfono, horario, precio, URL e imágenes reales.
- [ ] Validar JSON-LD con Rich Results Test y Schema Markup Validator.
- [ ] Hreflang solo si se publican versiones lingüísticas equivalentes.

## Rendimiento

- [ ] Medir Lighthouse móvil y escritorio en URLs representativas, guardar baseline y comparación.
- [ ] Comprobar LCP real e imagen/elemento LCP; preload corresponde al recurso exacto.
- [ ] Revisar CLS en hero, fuentes, imágenes, deferred placeholders y banner.
- [ ] Medir INP/TTFB con CrUX o RUM y verificar distribución real, no solo laboratorio.
- [ ] Auditar transferencia JS/CSS, lazy loading, formatos/dimensiones de imagen, caché y compresión.

## Registro del despliegue

- [ ] Registrar fecha/build SHA, dominio, status HTTP, HTML inicial y resultados GSC.
- [ ] Mantener informe previo para poder atribuir cambios de indexación y CWV.
