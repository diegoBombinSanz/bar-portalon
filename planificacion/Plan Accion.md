# Pendiente de hacer --> con dominio 
🗺️ PASO 4 — GOOGLE SEARCH CONSOLE (OBLIGATORIO)

Este es el paso que muchos se saltan y es clave.

👉 Qué haces aquí:
Vas a:
https://search.google.com/search-console
Añades tu dominio
Verificas propiedad (DNS o meta tag)
Subes sitemap:
https://tu-dominio.com/sitemap.xml




---


Perfecto, esto que has listado es básicamente el checklist de pre-lanzamiento de tu web. Te lo ordeno en un plan paso a paso realista, priorizado como lo haría un equipo antes de ponerlo en producción (pensando en impacto + dependencia).

🧭 PLAN DE LANZAMIENTO (orden correcto de ejecución)
🔴 FASE 1 — Base obligatoria (NO puedes lanzar sin esto)
1. ⚖️ Legal mínimo (bloqueante) --> OK

Antes de enseñar la web públicamente:

Qué crear:

Aviso Legal
Política de Privacidad
Política de Cookies (si usas Analytics o tracking)

Orden recomendado:

Crear textos (puedes usar plantilla legal básica para restaurantes en España)
Añadir páginas en Next.js:
/legal
/privacy
/cookies
Linkearlo en el footer

👉 Sin esto no deberías publicar en dominio real (riesgo legal en UE).

2. 📸 Sustituir TODAS las imágenes placeholder --> OK 

Esto afecta directamente a percepción de calidad.

Acciones:

Sustituir Unsplash por fotos reales del local
Optimizar formato:
WebP o AVIF
Tamaños correctos (hero / cards / eventos)
Comprimir (sin perder calidad)

Herramientas recomendadas:

Squoosh (rápido)
Cloudinary (si quieres escalar bien)

👉 Este punto es el mayor salto de “web bonita → web real”.

3. 📍 Google Maps + contacto real  --> OK

En tu README ya aparece como pendiente crítico.

Revisar:

Teléfono real en:
restaurant.js
Navbar.jsx
Footer.jsx
Link correcto de Google Maps
WhatsApp si existe

👉 Esto afecta directamente a conversiones (reservas).

🟠 FASE 2 — SEO + profesionalización (muy importante para crecer)
4. 🔍 SEO local completo

Implementa en este orden:

4.1 Open Graph (CRÍTICO para WhatsApp/Instagram)
Imagen OG (og:image)
Title + description optimizados

👉 Sin esto, al compartir la web se ve “feo” o genérico.

4.2 Schema.org Restaurant (MUY importante)

Añadir JSON-LD:

Nombre
Dirección
Teléfono
Horarios
Coordenadas

👉 Esto mejora posicionamiento en Google Maps y búsquedas locales.

4.3 sitemap.xml + robots.txt
/sitemap.xml
/robots.txt

👉 Permite indexación correcta.

5. 📊 Google Business Profile (externo a la web)

Esto no es código, pero es CLAVE.

Acciones:

Fotos reales subidas
Categoría correcta:
Restaurante
Enlace a la web
Horarios exactos
Reseñas activas

👉 Esto suele generar más reservas que la web.

🟡 FASE 3 — Optimización técnica (rendimiento + UX)
6. ⚡ Optimización de imágenes (ya en fase producción)
Lazy loading (ya lo tienes en parte)
next/image si no lo estás usando aún
WebP/AVIF obligatorio
Preload del hero image

👉 Mejora Core Web Vitals (SEO directo).

7. 📱 Test real móvil (CRÍTICO)

Antes de publicar:

Revisar en:

iPhone Safari
Android Chrome
Pantallas pequeñas reales

Checklist:

Navbar móvil (overlay correcto)
Botones flotantes
Scroll lock
Tap targets 44px

👉 Aquí suelen aparecer bugs reales.

🟢 FASE 4 — Profesionalización (no bloquea lanzamiento)
8. ✉️ Dominio + correo profesional

Ejemplo:

dominio: elportalonroa.com
correo:
reservas@elportalonroa.com

👉 Esto aumenta confianza + conversión.

9. 📈 Analítica (mínimo viable)

Instalar:

Google Analytics 4 o Plausible

Trackear:

clic en teléfono
clic en Maps
reservas

👉 Esto es clave para optimizar negocio real.

🟢 FASE 5 — Mejora continua (post-lanzamiento)
10. Sistema de reservas (si quieres escalar)

Opciones:

TheFork
CoverManager
Formulario simple propio
11. CMS futuro (ya lo tienes preparado)

Tu arquitectura ya es CMS-ready → esto es muy buena base.

Opcional:

Sanity / Strapi
o seguir con JSON centralizado
🧠 ORDEN FINAL RESUMIDO (lo importante de verdad)

Si quieres simplificar al máximo:

🚨 ANTES DE LANZAR:
Legal (obligatorio)
Fotos reales
Teléfono + Maps reales
Open Graph
Schema.org básico
🚀 JUSTO DESPUÉS:
SEO local completo
Google Business Profile
Optimización imágenes
Dominio + email
⚠️ LO MÁS IMPORTANTE (te lo digo claro)

Si solo haces 3 cosas antes de publicar:

📸 Fotos reales
⚖️ Legal básico
📍 Google Business + Maps bien configurado

→ ya tienes una web lista para generar negocio real

Si quieres, en el siguiente paso puedo:

👉 
darte los textos legales listos para copiar/pegar
👉 o 
generarte el Schema.org completo para tu restaurante
👉 o 
revisar tu web como si fuera auditoría de lanzamiento real (tipo agencia)

Solo dime.