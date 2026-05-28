# Bar El Portalón — Documentación del Proyecto Web

> Sitio web oficial de **Bar El Portalón**, ubicado en la Plaza Mayor de Roa (Burgos).  
> Diseñado y desarrollado como una experiencia digital premium que refleja la identidad  
> del negocio: cocina castellana elaborada, producto de calidad y trato cercano.

---

## Índice

1. [Visión del Proyecto](#1-visión-del-proyecto)
2. [Identidad de Marca](#2-identidad-de-marca)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Stack Tecnológico](#4-stack-tecnológico)
5. [Sistema de Diseño](#5-sistema-de-diseño)
6. [Componentes](#6-componentes)
7. [Sistema de Configuración (CMS-Ready)](#7-sistema-de-configuración-cms-ready)
8. [Jornadas del Bacalao — Sistema Dinámico](#8-jornadas-del-bacalao--sistema-dinámico)
9. [Navegación y UX Móvil](#9-navegación-y-ux-móvil)
10. [SEO y Metadatos](#10-seo-y-metadatos)
11. [Guía de Mantenimiento para el Propietario](#11-guía-de-mantenimiento-para-el-propietario)
12. [Decisiones de Diseño Clave](#12-decisiones-de-diseño-clave)
13. [Roadmap / Próximos Pasos](#13-roadmap--próximos-pasos)

---

## 1. Visión del Proyecto

### Objetivo principal
Crear una presencia digital que no parezca una plantilla genérica de restaurante, sino una
experiencia diseñada por un estudio profesional de branding gastronómico. La web transmite:

- **Autenticidad** — no pretencioso, sino cercano y real
- **Calidad gastronómica** — producto de primera, cocina elaborada
- **Confianza** — referente local consolidado en Roa
- **Dinamismo controlado** — microinteracciones elegantes, no invasivas

### Filosofía UX
> "La experiencia de usuario es MÁS IMPORTANTE que meter muchas secciones."

La web evita la estructura típica de restaurante (carta completa, fotos genéricas, formulario standard).
En su lugar apuesta por:

- **Recomendación sobre carta** — no existe menú cerrado, se destacan especialidades y producto del día
- **Dos experiencias diferenciadas** — Bar/Pinchos vs. Restaurante/Especialidades
- **Contenido estacional** — las Jornadas del Bacalao como evento protagonista recurrente
- **Mobile-first absoluto** — diseñada para ser consultada con una mano en la Plaza Mayor

---

## 2. Identidad de Marca

### El negocio
| Campo            | Valor                                         |
|------------------|-----------------------------------------------|
| Nombre           | Bar El Portalón                               |
| Tipo             | Bar / Restaurante tradicional                 |
| Ubicación        | Plaza Mayor, 14 — Roa, Burgos (09300)         |
| Especialidad     | Bacalao, Kokotxas, Gambas, Pulpo              |
| Ambiente         | Acogedor, tranquilo, trato cercano            |
| Zona             | Ribera del Duero burgalesa                    |

### Tono de comunicación
- **Cercano** pero **elegante**
- **Honesto** sobre lo que ofrece (sin promesas vacías)
- **Emocional** en los titulares (evocar experiencia, no solo informar)
- **Concreto** en los CTAs (siempre acción clara: reservar, llamar, llegar)

### Dualidad Bar vs. Restaurante
El negocio tiene dos personalidades que la web trata de forma diferenciada:

|                  | La Barra                              | El Restaurante                          |
|------------------|---------------------------------------|-----------------------------------------|
| Ambiente         | Informal, social, dinámico            | Tranquilo, gastronómico, elaborado      |
| Producto         | Pinchos, raciones, tapeo              | Bacalao, kokotxas, gambas, pulpo        |
| Visual           | Imágenes cálidas, bloques compactos   | Espacios amplios, fotografía editorial  |
| Tono copy        | "El sabor del tapeo tradicional"      | "Especialidades de producto de calidad" |
| Color acento     | Dorado `#c5a059`                      | Granate `#800020`                       |

---

## 3. Arquitectura del Proyecto

```
/apps/web/src/
│
├── app/
│   ├── layout.jsx              # Root layout (fuentes, metadatos globales)
│   └── page.jsx                # Página principal — orquesta todos los componentes
│
├── components/
│   ├── Navbar.jsx              # Navegación fija + menú móvil + botones flotantes
│   ├── Hero.jsx                # Sección de portada (pantalla completa)
│   ├── ExperienceSplit.jsx     # División Bar vs. Restaurante (dos paneles)
│   ├── CodDays.jsx             # Jornadas del Bacalao (componente dinámico)
│   ├── Specialties.jsx         # Especialidades destacadas (grid editorial)
│   ├── Reviews.jsx             # Reseñas de clientes
│   ├── MapSection.jsx          # Ubicación + iframe Google Maps + info de contacto
│   └── Footer.jsx              # Pie de página con columnas de información
│
└── data/
    └── restaurant.js           # ⭐ FUENTE ÚNICA DE VERDAD — toda la configuración
```

### Flujo de datos
```
restaurant.js  (datos del negocio)
      │
      ▼
page.jsx       (orquestador — monta los componentes en orden)
      │
      ▼
Componentes    (solo presentación — no tienen lógica de negocio propia)
```

Todos los componentes que necesitan datos los importan directamente desde `restaurant.js`.
No hay estado global ni llamadas a API — arquitectura estática, rápida y ultra-mantenible.

---

## 4. Stack Tecnológico

| Tecnología       | Uso                                           |
|------------------|-----------------------------------------------|
| **Next.js 14+**  | Framework React con App Router, SSR, SEO      |
| **React 18+**    | Librería de UI, hooks, componentes            |
| **Tailwind CSS** | Estilos utilitarios, sistema responsive       |
| **Framer Motion**| Animaciones declarativas, aparición on-scroll |
| **Lucide React** | Iconografía limpia y consistente              |

### Por qué este stack
- **Next.js**: SSR por defecto (crítico para SEO local), rutas automáticas, rendimiento óptimo
- **Tailwind**: Mobile-first sin CSS manual, coherencia visual garantizada por el sistema de tokens
- **Framer Motion**: Animaciones con `whileInView` (on-scroll) sin escribir Intersection Observer manual
- **Sin base de datos**: Arquitectura 100% estática. Preparada para conectar CMS en el futuro sin reescribir componentes

---

## 5. Sistema de Diseño

### Paleta de colores
| Nombre           | Hex                        | Uso                                    |
|------------------|----------------------------|----------------------------------------|
| Dorado Ribera    | `#c5a059`                  | Acento principal, CTAs, iconos         |
| Dorado hover     | `#d4b06a`                  | Estado hover del dorado                |
| Granate Portalón | `#800020`                  | Acento restaurante, badges de evento   |
| Negro profundo   | `#0a0a0a`                  | Fondo principal oscuro                 |
| Negro suave      | `#0d0d0d`                  | Variante de fondo (MapSection)         |
| Negro tarjeta    | `#1a1a1a`                  | Fondo de cards elevadas                |
| Crema principal  | `#f5f5f1`                  | Texto sobre fondos oscuros             |
| Blanco overlay   | `rgba(255,255,255,0.05-0.1)` | Bordes y superficies sutiles          |

### Tipografía
| Elemento            | Fuente               | Peso     | Aplicación                        |
|---------------------|----------------------|----------|-----------------------------------|
| H1, H2 titulares    | Georgia / serif      | 400–700  | Elegancia editorial, impacto      |
| Etiquetas           | Sans-serif sistema   | 700 Bold | Uppercase + letter-spacing amplio |
| Cuerpo de texto     | Sans-serif sistema   | 300 Light| Legibilidad en párrafos largos    |
| CTAs y botones      | Sans-serif sistema   | 700 Bold | Uppercase + tracking ancho        |

> La fuente serif usa `font-serif` de Tailwind (resuelve a Georgia). Carga instantánea sin
> dependencias externas para los elementos más críticos visualmente.

### Espaciado y ritmo vertical
- **Secciones**: `py-24` (96px arriba y abajo)
- **Máximo ancho**: `max-w-7xl` (1280px centrado)
- **Padding horizontal**: `px-6` en móvil — el `max-width` gestiona el desktop
- **Separadores**: líneas `1px` con `border-white/10` o `border-[#c5a059]/20`

### Principios de animación
| Principio              | Implementación                              |
|------------------------|---------------------------------------------|
| Aparición on-scroll    | `whileInView` + `viewport={{ once: true }}` |
| Duración estándar      | `0.5s – 0.8s`                               |
| Easing                 | `ease-in-out` por defecto                   |
| Stagger en listas      | `staggerChildren: 0.2`                      |
| Hover imágenes         | `scale(1.05–1.1)`, transición `1000-2000ms` |
| Sin exageración        | Nunca rotate, bounce excesivo ni partículas |

---

## 6. Componentes

### `Navbar.jsx`
Navegación fija + menú móvil full-screen + botones flotantes de acción rápida.

**Lógica de estados**:
```
isOpen: false  →  Navbar transparente/blur + icono hamburger
isOpen: true   →  Overlay z:9999 + scroll bloqueado + botón X visible
scrolled: true →  bg-black/90 + backdrop-blur (activado a 50px de scroll)
```

**Características clave**:
- Overlay móvil con `zIndex: 9999` en estilos inline (nunca se puede tapar)
- La `<nav>` baja su z-index a `90` cuando el menú está abierto
- Bloqueo de scroll: técnica `position: fixed + top: -scrollY` (funciona en iOS Safari)
- Restauración exacta de posición de scroll al cerrar
- El scroll listener respeta el estado `isOpen` para no actualizar `scrolled` en falso
- Scroll suave a secciones con `setTimeout(150ms)` tras liberar el lock
- **Botón X**: borde dorado, mínimo 44×44px táctil, siempre visible

**Botones flotantes (esquina inferior derecha)**:
- 📍 Google Maps — blanco con pin rojo de Google
- 📞 Reservar Mesa — dorado con icono de teléfono
- Aparecen con animación spring (delay 1.2–1.4s)
- En desktop se expanden con etiqueta al hover

---

### `Hero.jsx`
Primera impresión. Pantalla completa con fotografía de fondo, overlay y copy emocional.

- Altura `100vh` garantizada
- Imagen con zoom suave al hover (transición 10s)
- Gradiente oscuro en capas
- Copy: *"Tradición, producto y cocina elaborada"*
- CTAs: Reservar Mesa (dorado sólido) + Ver Especialidades (outline blanco)
- Indicador de scroll animado en la parte inferior
- Animaciones de entrada en cascada (delay 0 → 0.6s)
- **Imagen actual**: placeholder Unsplash — reemplazar por foto real del local

---

### `ExperienceSplit.jsx`
Separación visual de las dos experiencias (Bar vs. Restaurante). Layout de dos paneles a pantalla casi completa.

- En móvil: apilados verticalmente. En desktop: lado a lado (`md:flex-row`)
- Cada panel con imagen de fondo propia y efecto zoom al hover (2000ms)
- Panel izquierdo: La Barra — icono cerveza, tono dinámico, IDs `#bar`
- Panel derecho: El Restaurante — icono cubiertos, granate, ID `#restaurante`
- Animaciones de entrada opuestas: izquierda desde la izquierda, derecha desde la derecha

---

### `CodDays.jsx`
Componente dinámico de las Jornadas del Bacalao. Cambia automáticamente según `codDaysStatus`.

| Estado        | Badge           | Mensaje usado        | CTA                       |
|---------------|-----------------|----------------------|---------------------------|
| `COMING_SOON` | "Próximamente"  | `teaser`             | "Quiero que me avisen"    |
| `ACTIVE`      | "Evento en curso"| `activeMessage`     | "Reservar mi mesa ahora"  |
| `PAST`        | "Última Edición"| `pastMessage`        | "Quiero que me avisen"    |

- Layout 50/50: imagen vertical (aspect 4/5) + contenido
- Badge de estado sobre la imagen (granate `#800020`)
- Lista de platos destacados con icono `Award`
- Texto decorativo "BACALAO" en gigante de fondo (casi invisible, solo textural)
- Todo el contenido se lee de `codDaysConfig` en `restaurant.js` — sin tocar este archivo

---

### `Specialties.jsx`
Showcase de las especialidades permanentes del restaurante.

- Fondo crema `#f5f5f1` — único bloque claro, crea contraste y ritmo visual
- Grid 3 columnas en desktop (`grid-cols-3`), una columna en móvil
- Imágenes en proporción `3/4` (vertical, editorial)
- Hover: zoom imagen + cambio de color del título a granate
- Frase final: *"No tenemos una carta cerrada, preferimos recomendarte lo mejor..."*
- Datos de `restaurantData.specialties` en `restaurant.js`

---

### `Reviews.jsx`
Testimonios para generar confianza social.

- Fondo `#0a0a0a` con gradiente radial sutil en granate
- Grid 2 columnas en desktop
- Estrellas dinámicas según `review.rating`
- Texto en cursiva grande + nombre del cliente en dorado
- Referencia a Google y TripAdvisor (credibilidad de la fuente)
- Datos de `restaurantData.reviews` en `restaurant.js`

---

### `MapSection.jsx`
Sección de ubicación y contacto con mapa integrado.

- Tres cards: Dirección (enlace a Maps), Teléfono (enlace tel:), Horario
- iframe de Google Maps a ancho completo (420px de alto)
  - Filtro: `grayscale(0.3) contrast(1.05)` para integrarse en la paleta oscura
  - Gradiente superior para fundirse con la sección anterior
  - Botón "Abrir en Google Maps" flotante sobre el mapa
- ID de ancla: `#contacto`

---

### `Footer.jsx`
Cierre del sitio. Cuatro columnas en desktop, apiladas en móvil.

1. **Marca** — Logo tipográfico + descripción + redes sociales
2. **Dirección** — Dirección completa + enlace a Maps
3. **Horario** — Martes a domingo, dos turnos, cerrado lunes
4. **Reservas** — Teléfono grande + CTA de llamada

- Datos de `restaurantData` (location + contact)
- Copyright con año + enlaces a Aviso Legal y Privacidad

---

## 7. Sistema de Configuración (CMS-Ready)

El archivo `/apps/web/src/data/restaurant.js` es la **fuente única de verdad**.
Cualquier cambio de contenido se hace aquí, sin necesidad de tocar los componentes.

```js
export const restaurantData = {
  name: "Bar El Portalón",

  location: {
    city: "Roa",
    province: "Burgos",
    address: "Plaza Mayor, 14",
    googleMapsUrl: "https://maps.google.com/?q=..."   // ← actualizar con URL real
  },

  contact: {
    phone: "+34 947 000 000",      // ← actualizar con número real
    whatsapp: "+34 600 000 000",   // ← actualizar con número real
    instagram: "@elportalonroa"    // ← actualizar si existe cuenta
  },

  // ⭐ CAMBIAR AQUÍ EL ESTADO DE LAS JORNADAS
  codDaysStatus: 'ACTIVE',         // 'COMING_SOON' | 'ACTIVE' | 'PAST'

  codDaysConfig: {
    dates: "Del 15 de Mayo al 2 de Junio",
    title: "Jornadas del Bacalao 2026",
    teaser: "...",           // texto para estado COMING_SOON
    activeMessage: "...",    // texto para estado ACTIVE
    pastMessage: "...",      // texto para estado PAST
    featuredPlates: [
      "Bacalao al Club Ranero",
      "Kokotxas de Bacalao al Pil-Pil",
      "Carpaccio de Bacalao Ahumado"
    ]
  },

  specialties: [
    { id: 1, name: "Bacalao Tradicional", description: "...", image: "URL" },
    { id: 2, name: "Kokotxas de Calidad", description: "...", image: "URL" },
    { id: 3, name: "Gambas de Lonja",     description: "...", image: "URL" }
  ],

  reviews: [
    { user: "Carmen M.", text: "...", rating: 5 },
    { user: "Javier R.", text: "...", rating: 5 }
  ]
};
```

### Campos que DEBEN actualizarse con datos reales antes del lanzamiento
- [ ] `contact.phone` — teléfono real del bar
- [ ] `contact.whatsapp` — WhatsApp si se usa
- [ ] `contact.instagram` — handle real si existe
- [ ] `location.googleMapsUrl` — URL de Google Maps verificada
- [ ] `specialties[].image` — fotografías reales de los platos
- [ ] `reviews[]` — reseñas reales de Google o TripAdvisor

> **Nota**: el número de teléfono también aparece hardcodeado en los `href="tel:..."` dentro de
> `Navbar.jsx` y `Footer.jsx`. Actualizarlos en esos archivos también.

---

## 8. Jornadas del Bacalao — Sistema Dinámico

Las Jornadas del Bacalao son un evento **estacional y recurrente**. El sistema permite cambiar
el estado de la web con una sola línea de código.

### Cómo cambiar el estado

En `/apps/web/src/data/restaurant.js`:

```js
// Anunciar que se acercan:
codDaysStatus: 'COMING_SOON'

// Cuando están en marcha:
codDaysStatus: 'ACTIVE'

// Cuando terminaron (mostrar resumen/galería):
codDaysStatus: 'PAST'
```

### Actualizar para una nueva edición

```js
codDaysConfig: {
  dates: "Del 20 de Abril al 5 de Mayo 2027",   // ← nueva fecha
  title: "Jornadas del Bacalao 2027",            // ← nuevo año
  featuredPlates: [
    "Nuevo plato estrella",
    "Bacalao de temporada",
    "Propuesta especial del chef"
  ]
}
```

### Calendario recomendado por año
```
Noviembre       →  'PAST'          Mostrar resumen de la edición pasada
Enero/Febrero   →  'COMING_SOON'   Generar expectativa con teaser
Al comenzar     →  'ACTIVE'        Urgencia y CTAs de reserva activos
Al terminar     →  'PAST'          Galería, testimonios, nostalgia
```

---

## 9. Navegación y UX Móvil

### Problemas resueltos en el menú móvil

**Problema 1 — Links no respondían al tap**
- *Causa*: El overlay tenía `z-40` (clase Tailwind) pero Framer Motion crea un stacking context
  propio que ignoraba la clase CSS aplicada desde fuera
- *Solución*: Usar `style={{ zIndex: 9999 }}` directamente como prop de estilo inline en el
  elemento `motion.div` del overlay. Los estilos inline siempre tienen mayor especificidad

**Problema 2 — Botón X no aparecía**
- *Causa*: La `<nav>` fija tenía `z-50` y tapaba el overlay aunque éste tuviera z mayor
- *Solución*: La `<nav>` reduce su z-index dinámicamente cuando el menú está abierto:
  ```jsx
  style={{ zIndex: isOpen ? 90 : 50 }}
  ```
  El overlay siempre es `9999`, así el orden es correcto en ambos estados

**Problema 3 — Scroll del body causaba bugs visuales**
- *Causa*: `overflow: hidden` en el body no detiene el scroll en iOS Safari.
  Además el listener de scroll seguía actualizando el estado `scrolled` de la navbar
  aunque la página no se moviera realmente
- *Solución triple*:
  1. Técnica `position: fixed + top: -${scrollY}px` (estándar para iOS)
  2. El listener de scroll ignora eventos cuando `isOpen === true`
  3. Al cerrar, `window.scrollTo(0, scrollYRef.current)` restaura la posición exacta sin salto

### Botones flotantes (FABs)
- Siempre visibles en esquina inferior derecha (`position: fixed, z-50`)
- Aparecen con animación spring tras la carga de la página
- **En móvil**: solo icono (tamaño mínimo táctil 44px Apple HIG)
- **En desktop**: se expanden con etiqueta de texto al hover
- Quedan tapados por el menú móvil (z-9999) de forma correcta

---

## 10. SEO y Metadatos

### Implementado en `page.jsx`
```html
<title>Bar El Portalón | Restaurante en Roa (Burgos) - Especialidad en Bacalao</title>
<meta name="description"
  content="Descubre Bar El Portalón en Roa, Burgos. Cocina tradicional castellana,
  especialidades en bacalao, kokotxas y los mejores pinchos en la Plaza Mayor." />
```

### Palabras clave objetivo (SEO Local)
```
restaurante en Roa                  dónde comer en Roa Burgos
pinchos en Roa                      bacalao en Roa
restaurante Plaza Mayor Roa         restaurante en Burgos con bacalao
tapeo Roa                           cocina castellana Roa
Ribera del Duero restaurante        jornadas del bacalao Roa
```

### Mejoras SEO pendientes
- [ ] Schema.org `Restaurant` structured data (JSON-LD)
- [ ] Open Graph image para compartir en redes sociales
- [ ] `sitemap.xml` y `robots.txt`
- [ ] Google Business Profile verificado y enlazado
- [ ] URL de Google Maps real del negocio en todos los enlaces

---

## 11. Guía de Mantenimiento para el Propietario

> Escrita para quien mantiene el sitio sin conocimientos técnicos avanzados.

### ✅ Cambios seguros — solo editar `restaurant.js`

| Qué cambiar                         | Campo en `restaurant.js`              |
|-------------------------------------|---------------------------------------|
| Teléfono de reservas                | `contact.phone`                       |
| Estado de las Jornadas del Bacalao  | `codDaysStatus`                       |
| Fechas de las Jornadas              | `codDaysConfig.dates`                 |
| Platos destacados en las Jornadas   | `codDaysConfig.featuredPlates`        |
| Título del año de las Jornadas      | `codDaysConfig.title`                 |
| Especialidades permanentes          | `specialties[]`                       |
| Reseñas de clientes                 | `reviews[]`                           |

### 📸 Cómo actualizar las imágenes

1. Subir la foto a un hosting de imágenes (Cloudinary, Google Drive público, Uploadcare)
2. Copiar la URL pública de la imagen
3. Pegar esa URL en el campo `image` del objeto correspondiente en `restaurant.js`

**Tamaños recomendados**:
- Hero principal: `2000 × 1200 px` mínimo (landscape)
- Especialidades: `800 × 1067 px` (portrait 3:4)
- Jornadas del Bacalao: `800 × 1000 px` (portrait 4:5)

### ⚠️ Cosas que NO tocar sin ayuda técnica
- Los archivos `.jsx` de los componentes
- El archivo `layout.jsx`
- Archivos de configuración (`.json`, `.config.js`, `package.json`)

---

## 12. Decisiones de Diseño Clave

### Por qué no hay carta de menú
El negocio funciona por recomendación y producto del día. Una carta cerrada en la web:
- Queda desactualizada rápidamente y genera trabajo de mantenimiento continuo
- No refleja la filosofía real del negocio
- Puede defraudar expectativas si un plato no está disponible
  
En su lugar se destacan **especialidades permanentes** y se comunica explícitamente
que la recomendación según el producto fresco es parte de la experiencia.

### Por qué el overlay usa estilos inline en lugar de clases Tailwind
Framer Motion genera su propio stacking context al animar elementos con `transform`.
Las clases de Tailwind con `z-index` a veces quedan subordinadas a ese contexto.
Los estilos inline con `style={{ zIndex: 9999 }}` siempre tienen prioridad absoluta
y son predecibles en todos los navegadores y versiones.

### Por qué `position: fixed` para bloquear scroll (no solo `overflow: hidden`)
`overflow: hidden` en el body funciona en Chrome/desktop pero en iOS Safari el usuario
puede seguir haciendo scroll por el momentum táctil. La técnica industry-standard es:
```js
document.body.style.position = "fixed";
document.body.style.top = `-${window.scrollY}px`;
```
Esto congela la página sin perder la posición, que se restaura al cerrar el menú.

### Por qué la sección de Especialidades tiene fondo crema
Toda la web es oscura (negros y grafitos). La sección de Especialidades rompe
intencionalmente con `#f5f5f1`. Esto:
- Crea ritmo visual y evita la fatiga de pantallas oscuras largas
- Hace que las fotografías de comida luzcan mejor sobre fondo claro
- Señaliza visualmente el cambio de "ambiente" a "gastronomía"

### Por qué los botones flotantes tienen `z-50` y no `z-9999`
Los FABs de teléfono y Maps deben quedar **por debajo** del menú móvil (`z-9999`)
cuando éste está abierto, para no bloquear la navegación con botones encima.
Con `z-50` quedan tapados por el overlay correctamente y de forma automática.

---

## 13. Roadmap / Próximos Pasos

### 🔴 Prioridad alta — antes del lanzamiento público
- [ ] Fotografías reales del local y los platos (reemplazar todos los Unsplash)
- [ ] Número de teléfono real en `restaurant.js`, `Navbar.jsx` y `Footer.jsx`
- [ ] URL exacta de Google Maps verificada
- [ ] Handle real de Instagram (o eliminar el enlace si no existe)
- [ ] Horarios revisados y confirmados por el propietario
- [ ] Páginas de Aviso Legal y Política de Privacidad

### 🟡 Prioridad media — mejoras de negocio (1-3 meses)
- [ ] Sistema de reservas integrado (Covermanager, TheFork o formulario simple)
- [ ] Galería de fotos del local y eventos
- [ ] Sección "Plato del día" actualizable fácilmente
- [ ] Integración real con la API de Google Reviews
- [ ] Enlace a WhatsApp Business para reservas rápidas
- [ ] Schema.org `Restaurant` JSON-LD para SEO avanzado

### 🟢 Prioridad baja — evolución del proyecto (6-12 meses)
- [ ] Panel de administración visual (Sanity CMS o Contentful)
- [ ] Versión bilingüe español/inglés para turismo
- [ ] Newsletter para las Jornadas del Bacalao
- [ ] Galería fotográfica con lightbox para las Jornadas
- [ ] PWA (Progressive Web App) instalable en móvil
- [ ] Analytics de comportamiento (Plausible o GA4)

---

## Información adicional

### Estructura de archivos completa
```
/apps/web/
├── src/
│   ├── app/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ExperienceSplit.jsx
│   │   ├── CodDays.jsx
│   │   ├── Specialties.jsx
│   │   ├── Reviews.jsx
│   │   ├── MapSection.jsx
│   │   └── Footer.jsx
│   └── data/
│       └── restaurant.js       ← editar aquí para cambiar contenido
├── public/
│   └── (imágenes estáticas si se usan)
├── package.json
└── README.md                   ← este archivo
```

### Comandos útiles
```bash
npm run dev       # servidor de desarrollo en localhost:3000
npm run build     # compilar para producción
npm run start     # previsualizar el build de producción
```

### Navegadores soportados
- Chrome 90+ (desktop y Android)
- Safari 14+ (iOS y macOS) — especialmente optimizado
- Firefox 88+
- Edge 90+

---

*Documento generado el 28 de mayo de 2026*  
*Proyecto: Bar El Portalón — Sitio Web v1.0*  
