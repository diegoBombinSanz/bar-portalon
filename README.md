# 🍷 Bar El Portalón — Sitio Web Oficial

**[bar-portalon-roa.com](https://bar-portalon-roa.com)** | Roa, Burgos 🇪🇸

Sitio web premium de Bar El Portalón. React 19 + TypeScript + Vite — SPA estática optimizada para experiencia móvil, con arquitectura preparada para CMS.

**Características**:
- ⚡ Vite HMR instantáneo + bundling optimizado
- 📱 Mobile-first Tailwind CSS con animaciones Framer Motion
- 🏗️ Datos centralizados (sin necesidad de base de datos)
- 🎯 SEO local listo para restaurantes
- 🚀 Deploying en Vercel (Rewrite SPA)
- 📦 TypeScript 5.9 + ESLint plano

---

## 📋 Tabla de Contenidos

### 🚀 Comienza Aquí
1. [Quick Start](#-quick-start) — Setup en <5 minutos
2. [Variables de Entorno](#-variables-de-entorno)
3. [Estructura de Proyecto](#-estructura-de-proyecto)

### 👨‍💻 Para Desarrolladores
4. [Scripts Disponibles](#-scripts-disponibles)
5. [Conceptos Clave](#-conceptos-clave-arquitectura)
6. [Componentes](#-componentes)
7. [Troubleshooting](#-troubleshooting)

### 🏗️ Para Arquitecto / Avanzado
8. [Sistema de Configuración (CMS-Ready)](#-sistema-de-configuración-cms-ready)
9. [Jornadas del Bacalao — Sistema Dinámico](#-jornadas-del-bacalao--sistema-dinámico)
10. [Decisiones de Diseño Clave](#-decisiones-de-diseño-clave)
11. [SEO y Metadatos](#-seo-y-metadatos)

### 🍽️ Para Propietario / Mantenimiento
12. [Identidad de Marca](#-identidad-de-marca)
13. [Guía de Mantenimiento](#-guía-de-mantenimiento-para-el-propietario)

### 📚 Referencia
14. [Deploy en Vercel](#-deploy-en-vercel)
15. [Rutas Disponibles](#-rutas-disponibles)
16. [Roadmap](#-roadmap--próximos-pasos)

---

## 🚀 Quick Start

Nuevo en el proyecto? Sigue estos 5 pasos para tener todo corriendo localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/diegoBombinSanz/bar-portalon.git
cd bar-portalon
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase
nano .env.local  # o usa tu editor favorito
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 5. Abrir en navegador
Visita **[http://localhost:5173](http://localhost:5173)**

✅ **Listo**. Ya tienes la web corriendo localmente.

---

## 🌍 Variables de Entorno

El proyecto requiere variables de Supabase (autenticación y datos). Copia `.env.example` a `.env.local` y rellena los valores:

### Configuración Obligatoria

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `VITE_SUPABASE_URL` | URL pública del proyecto Supabase | Dashboard Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima (pública, safe) | Dashboard Supabase → Settings → API |

### Ejemplo de .env.local
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Importante**: 
- Nunca commites `.env.local` a Git (está en `.gitignore`)
- Nunca expongas variables privadas sin prefijo `VITE_` en el código frontend
- Para Vercel, configura estas variables en Dashboard → Settings → Environment Variables

---

## 📁 Estructura de Proyecto

```
bar-portalon/
├── src/
│   ├── App.tsx                      # Router SPA principal
│   ├── main.tsx                     # Punto de entrada React
│   ├── index.css                    # Estilos globales
│   │
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.tsx              # Navegación + menú móvil + FABs
│   │   ├── Hero.tsx                # Sección portada (100vh)
│   │   ├── ExperienceSplit.tsx     # Split Bar vs. Restaurante
│   │   ├── CodDays.tsx             # Jornadas del Bacalao (dinámico)
│   │   ├── Specialties.tsx         # Grid de especialidades
│   │   ├── Reviews.tsx             # Testimonios clientes
│   │   ├── MapSection.tsx          # Ubicación + Google Maps
│   │   ├── Footer.tsx              # Pie de página
│   │   ├── OptimizedImage.tsx      # Imagen con lazy loading
│   │   ├── InnerPageLayout.tsx     # Layout páginas internas
│   │   ├── GaleriaTeaser.tsx       # Preview galería (home)
│   │   ├── Galeria.tsx             # Página galería completa
│   │   ├── EntrevinosTeaser.tsx    # Preview vinos (home)
│   │   ├── Entrevinos.tsx          # Página vinos dedicada
│   │   ├── Barra.tsx               # Página barra/pinchos
│   │   ├── AntiguosEventos.tsx     # Eventos históricos
│   │   ├── PoliticaPrivacidad.tsx  # Política de Privacidad
│   │   └── AvisoLegal.tsx          # Aviso Legal
│   │
│   ├── data/                        # ⭐ FUENTE ÚNICA DE VERDAD
│   │   ├── restaurant.ts           # Config negocio, especialidades, reviews
│   │   ├── specialties.ts          # Especialidades permanentes
│   │   ├── gallery.ts              # Galería de imágenes
│   │   ├── allergens.ts            # Información de alérgenos
│   │   ├── barra.ts                # Datos de la barra
│   │   └── siteConfig.ts           # Configuración global
│   │
│   ├── lib/                         # Utilidades y helpers
│   │   ├── seo.ts                  # Helpers metadatos dinámicos
│   │   ├── supabaseClient.ts       # Cliente Supabase
│   │   ├── useAuth.ts              # Hook autenticación
│   │   └── usePathname.ts          # Hook pathname personalizado
│   │
│   ├── assets/                      # Imágenes estáticas (optimizadas)
│   ├── app/
│   │   └── api/
│   │       └── site-config/        # Rutas API (Vercel)
│   │
│   ├── custom.d.ts                 # Tipos TypeScript personalizados
│   └── vite-env.d.ts               # Tipos Vite
│
├── public/                          # Archivos estáticos servidos directamente
│   ├── robots.txt
│   └── sitemap.xml
│
├── scripts/
│   └── optimize-images.mjs          # Script optimización imágenes (sharp)
│
├── .env.example                     # ← Template de variables (copiar a .env.local)
├── .gitignore
├── eslint.config.js
├── package.json
├── postcss.config.cjs
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                   # Alias @, plugins, base /
├── vercel.json                      # Rewrite SPA para Vercel
└── README.md                        # ← Este archivo
```

### Patrón de Datos
```
restaurant.ts (datos)
     ↓
components (importan datos directamente)
     ↓
Renderizado (sin estado global)
```

---

## 📦 Scripts Disponibles

| Comando | Descripción | Audiencia |
|---------|-------------|-----------|
| `npm run dev` | Inicia servidor dev en http://localhost:5173 (HMR instantáneo) | 👨‍💻 Dev |
| `npm run build` | Compila TypeScript + Vite → `/dist` (producción) | 👨‍💻 Dev |
| `npm run lint` | Ejecuta ESLint, reporta errores de código | 👨‍💻 Dev |
| `npm run preview` | Previsualiza build de producción local (antes de subir) | 👨‍💻 Dev |
| `npm run optimize-images` | Comprime imágenes con sharp (src/assets) | 👨‍💻 Dev |
| `npm run deploy` | Build + deploy a GitHub Pages (si está configurado) | 👨‍💻 Dev |

### Flujo típico de desarrollo
```bash
npm run dev              # 1. Edita y ve cambios en tiempo real
npm run lint             # 2. Verifica código antes de commit
npm run build            # 3. Compila para producción
npm run preview          # 4. Prueba el build compilado
# Push a GitHub → Vercel auto-deploya
```

---

## 🏗️ Conceptos Clave — Arquitectura

### 👨‍💻 Datos Centralizados (No Hay Base de Datos)

Todo el contenido está en **`src/data/restaurant.ts`** — archivo JavaScript puro.

```typescript
export const restaurantData = {
  name: "Bar El Portalón",
  location: { ... },
  contact: { phone: "+34 947 000 000", ... },
  codDaysStatus: 'ACTIVE',  // Jornadas estado
  specialties: [ ... ],      // Platos destacados
  reviews: [ ... ]           // Testimonios
};
```

**Ventajas**:
- ✅ Cero latencia (datos locales)
- ✅ Fácil de actualizar (editar JSON)
- ✅ Preparado para migrar a CMS (Sanity, Contentful) sin reescribir componentes
- ✅ Version control de cambios (Git history)

### 👨‍💻 Enrutamiento SPA (Sin React Router)

La aplicación gestiona rutas manualmente en **`App.tsx`** usando `usePathname`:

```typescript
if (pathname === '/barra') return <Barra />;
if (pathname === '/galeria') return <Galeria />;
// ...
```

**Ventajas**:
- ✅ Lightweight (sin dependencias)
- ✅ Control total del flujo
- ✅ SEO optimizado (metadatos dinámicos por ruta)

### 👨‍💻 Componentes Presentacionales

Los componentes NO tienen lógica de negocio — solo reciben datos y renderean:

```typescript
export function Specialties() {
  const specialties = restaurantData.specialties;
  return (
    <section>
      {specialties.map(s => (
        <div key={s.id}>{s.name}</div>
      ))}
    </section>
  );
}
```

**Ventajas**:
- ✅ Fácil de testear
- ✅ Reutilizables
- ✅ Documentación clara (input = props, output = JSX)

---

## 🎨 Componentes

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
/src/
│
├── App.tsx                      # Router principal — gestiona rutas y renderizado
├── main.tsx                     # Punto de entrada
├── index.css                    # Estilos globales
│
├── components/
│   ├── Navbar.tsx              # Navegación fija + menú móvil + botones flotantes
│   ├── Hero.tsx                # Sección de portada (pantalla completa)
│   ├── ExperienceSplit.tsx     # División Bar vs. Restaurante (dos paneles)
│   ├── CodDays.tsx             # Jornadas del Bacalao (componente dinámico)
│   ├── Specialties.tsx         # Especialidades destacadas (grid editorial)
│   ├── Reviews.tsx             # Reseñas de clientes
│   ├── MapSection.tsx          # Ubicación + iframe Google Maps + info de contacto
│   ├── Footer.tsx              # Pie de página con columnas de información
│   ├── InnerPageLayout.tsx     # Layout compartido para páginas internas
│   ├── OptimizedImage.tsx      # Componente de imagen optimizada con lazy loading
│   ├── GaleriaTeaser.tsx       # Vista previa de galería en inicio
│   ├── Galeria.tsx             # Página completa de galería de fotos
│   ├── EntrevinosTeaser.tsx    # Vista previa de Entrevinos en inicio
│   ├── Entrevinos.tsx          # Página de vinos (Entrevinos de Roa)
│   ├── Barra.tsx               # Página dedicada a la Barra
│   ├── AntiguosEventos.tsx     # Página de eventos pasados (Jornadas anteriores)
│   ├── PoliticaPrivacidad.tsx  # Página de Política de Privacidad
│   ├── AvisoLegal.tsx          # Página de Aviso Legal
│   └── custom.d.ts             # Definiciones TypeScript personalizadas
│
├── data/
│   └── restaurant.ts           # ⭐ FUENTE ÚNICA DE VERDAD — toda la configuración
│
├── lib/
│   └── (utilidades y helpers)  # Funciones reutilizables
│
├── assets/
│   └── (imágenes estáticas)    # Activos del proyecto
│
├── tailwind.config.js          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
└── vite.config.ts              # Configuración de Vite
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

| Tecnología           | Versión | Uso                                           |
|----------------------|---------|-----------------------------------------------|
| **React**            | ^19.2.4 | Librería de UI, hooks, componentes            |
| **Vite**             | ^8.0.0  | Bundler y servidor de desarrollo              |
| **TypeScript**       | ~5.9.3  | Tipado estático para mayor seguridad          |
| **Tailwind CSS**     | ^4.2.1  | Estilos utilitarios, sistema responsive       |
| **Framer Motion**    | ^12.40.0| Animaciones declarativas, aparición on-scroll |
| **Lucide React**     | ^0.577.0| Iconografía limpia y consistente              |
| **ESLint**           | ^9.39.4 | Linting de código                             |
| **PostCSS**          | ^8.5.8  | Procesamiento de CSS                         |
| **Sharp**            | ^0.34.5 | Optimización de imágenes                      |

### Por qué este stack
- **Vite**: Desarrollo ultrarrápido con HMR instantáneo, bundling optimizado para producción
- **React 19**: Hooks modernos, Server Components (si se requiere), mejor rendimiento
- **TypeScript**: Seguridad de tipos, autocompletado IDE, menos bugs en producción
- **Tailwind CSS**: Mobile-first sin CSS manual, coherencia visual garantizada por el sistema de tokens
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

---

## 🛠️ Troubleshooting

### ❌ "Error: `VITE_SUPABASE_URL` not found"
**Solución**: Copia `.env.example` a `.env.local` y rellena los valores de Supabase.
```bash
cp .env.example .env.local
# Edita con tus credenciales
```

### ❌ "Port 5173 already in use"
**Solución**: El puerto ya está en uso. Opciones:
```bash
# Opción 1: Cambiar puerto
npm run dev -- --port 3000

# Opción 2: Matar el proceso en el puerto
# Windows (PowerShell):
Get-Process | Where-Object {$_.Id -eq (Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object OwningProcess).OwningProcess} | Stop-Process

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### ❌ "Tailwind styles no aplica / CSS roto después de build"
**Solución**: Bug ocasional de Tailwind. Limpia y reconstruye:
```bash
rm -rf node_modules
npm install
npm run dev
```

### ❌ "Imágenes no cargan en build"
**Solución**: Ejecuta el script de optimización:
```bash
npm run optimize-images
npm run build
```

### ❌ "Cambios en `data/restaurant.ts` no aparecen"
**Solución**: Hard refresh del navegador (Ctrl+Shift+R en Windows/Linux, Cmd+Shift+R en Mac)
o limpia cache del navegador.

### ❌ "Componentes no renderean en la página"
**Solución**: Verifica que la ruta en `App.tsx` y el pathname coincidan:
```bash
# En browser, abre DevTools (F12)
# Console tab → escribe: window.location.pathname
# Debe coincidir con una ruta en App.tsx
```

### ❌ "TypeError: restaurantData is undefined"
**Solución**: El import de `restaurant.ts` falta. Verifica en el componente:
```typescript
import { restaurantData } from '@/data/restaurant';
```

---

## 🍽️ Identidad de Marca

### El Negocio

| Campo | Valor |
|-------|-------|
| **Nombre** | Bar El Portalón |
| **Tipo** | Bar / Restaurante tradicional |
| **Ubicación** | Plaza Mayor, 14 — Roa, Burgos 09300 |
| **Especialidad** | Bacalao, Kokotxas, Gambas, Pulpo |
| **Ambiente** | Acogedor, tranquilo, trato cercano |
| **Zona** | Ribera del Duero burgalesa |

### Tono de Comunicación
- **Cercano** pero **elegante**
- **Honesto** (sin promesas vacías)
- **Emocional** en titulares (evocar experiencia)
- **Concreto** en CTAs (reservar, llamar, llegar)

### Dualidad: Bar vs. Restaurante

|  | La Barra | El Restaurante |
|---|----------|-----------------|
| **Ambiente** | Informal, social, dinámico | Tranquilo, gastronómico, elaborado |
| **Producto** | Pinchos, raciones, tapeo | Bacalao, kokotxas, gambas, pulpo |
| **Visual** | Imágenes cálidas, bloques compactos | Espacios amplios, fotografía editorial |
| **Tono** | "El sabor del tapeo tradicional" | "Especialidades de producto de calidad" |
| **Color Acento** | Dorado `#c5a059` | Granate `#800020` |

### Paleta de Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Dorado Ribera | `#c5a059` | Acento principal, CTAs, iconos |
| Dorado hover | `#d4b06a` | Hover del dorado |
| Granate Portalón | `#800020` | Acento restaurante, badges evento |
| Negro profundo | `#0a0a0a` | Fondo principal oscuro |
| Crema principal | `#f5f5f1` | Texto sobre fondos oscuros |

### Tipografía

| Elemento | Fuente | Peso | Aplicación |
|----------|--------|------|------------|
| H1, H2 titulares | Georgia / serif | 400–700 | Elegancia editorial |
| Etiquetas | Sans-serif sistema | 700 Bold | Uppercase + tracking ancho |
| Cuerpo texto | Sans-serif sistema | 300 Light | Legibilidad párrafos |
| CTAs/botones | Sans-serif sistema | 700 Bold | Uppercase + tracking |

---

## 🖥️ Deploy en Vercel

### Configuración Actual
- **Host**: Vercel ([vercel.com](https://vercel.com))
- **Domain**: `bar-portalon-roa.com`
- **SSL**: Automático (Vercel)
- **CDN**: Vercel Edge Network global

### Archivo de Configuración: `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Rewrite SPA
El rewrite universal `/(.*) → /` es esencial para que todas las rutas SPA funcionen. Sin esto, las subrutas (ej: `/galeria`) devuelven 404.

### Cómo deployar
**Opción 1: Automático (Recomendado)**
- Push a GitHub → Vercel detecta y auto-deploya
- Ver progreso en Vercel Dashboard

**Opción 2: Manual**
```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel
# Sigue el wizard interactivo
```

### Variables de Entorno en Vercel
1. Ve a Vercel Dashboard → Tu Proyecto
2. Settings → Environment Variables
3. Agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
4. Haz re-deploy

---

## 📍 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | App.tsx (home) | Página principal |
| `/barra` | Barra.tsx | Experiencia barra/pinchos |
| `/galeria` | Galeria.tsx | Galería de fotos |
| `/entrevinos` | Entrevinos.tsx | Vinos Ribiera Duero |
| `/antiguos-eventos` | AntiguosEventos.tsx | Ediciones pasadas Jornadas |
| `/politica-privacidad` | PoliticaPrivacidad.tsx | Política Privacidad (RGPD) |
| `/aviso-legal` | AvisoLegal.tsx | Aviso Legal |

### Cómo agregar nuevas rutas
En `App.tsx`, añade entrada en `routeSeo` y la lógica condicional:
```typescript
const routeSeo = {
  "/": { title: "...", description: "..." },
  "/nueva-ruta": { title: "Nueva", description: "..." }
};

// En el render:
if (pathname === '/nueva-ruta') return <NuevoComponente />;
```

---

## 🏗️ Sistema de Configuración (CMS-Ready)

El archivo **`src/data/restaurant.ts`** es la **fuente única de verdad**.
Cualquier cambio de contenido se hace aquí, sin tocar los componentes.

```typescript
export const restaurantData = {
  name: "Bar El Portalón",
  
  location: {
    city: "Roa",
    province: "Burgos",
    address: "Plaza Mayor, 14",
    googleMapsUrl: "https://maps.google.com/?q=..."  // ← actualizar
  },
  
  contact: {
    phone: "+34 947 000 000",        // ← actualizar con número real
    whatsapp: "+34 600 000 000",
    instagram: "@elportalonroa"
  },
  
  // ⭐ Cambiar AQUÍ el estado de las Jornadas
  codDaysStatus: 'ACTIVE',           // 'COMING_SOON' | 'ACTIVE' | 'PAST'
  
  codDaysConfig: {
    dates: "Del 15 de Mayo al 2 de Junio",
    title: "Jornadas del Bacalao 2026",
    teaser: "...",
    activeMessage: "...",
    pastMessage: "...",
    featuredPlates: [
      "Bacalao al Club Ranero",
      "Kokotxas de Bacalao al Pil-Pil",
      "Carpaccio de Bacalao Ahumado"
    ]
  },
  
  specialties: [
    { id: 1, name: "Bacalao Tradicional", description: "...", image: "URL" },
    { id: 2, name: "Kokotxas de Calidad", description: "...", image: "URL" },
    { id: 3, name: "Gambas de Lonja", description: "...", image: "URL" }
  ],
  
  reviews: [
    { user: "Carmen M.", text: "...", rating: 5 },
    { user: "Javier R.", text: "...", rating: 5 }
  ]
};
```

### ✅ Antes de Lanzar — Campos a Actualizar

- [ ] `contact.phone` — teléfono real
- [ ] `contact.whatsapp` — WhatsApp si se usa
- [ ] `contact.instagram` — handle real
- [ ] `location.googleMapsUrl` — URL verificada
- [ ] `specialties[].image` — fotos reales de platos
- [ ] `reviews[]` — reseñas reales de Google/TripAdvisor

> **Nota**: El número de teléfono también está en `href="tel:..."` dentro de `Navbar.tsx` y `Footer.tsx`. Actualizar en esos archivos también.

---

## ⏰ Jornadas del Bacalao — Sistema Dinámico

Las Jornadas del Bacalao son un **evento estacional y recurrente**. Sistema de un click para cambiar estado:

### Cambiar Estado

En `src/data/restaurant.ts`:

```typescript
// Anunciar que se acercan:
codDaysStatus: 'COMING_SOON'

// Cuando están en marcha:
codDaysStatus: 'ACTIVE'

// Cuando terminaron:
codDaysStatus: 'PAST'
```

### Actualizar para Nueva Edición

```typescript
codDaysConfig: {
  dates: "Del 20 de Abril al 5 de Mayo 2027",  // ← nueva fecha
  title: "Jornadas del Bacalao 2027",           // ← nuevo año
  featuredPlates: [
    "Nuevo plato estrella",
    "Bacalao de temporada",
    "Propuesta especial del chef"
  ]
}
```

### Calendario Recomendado por Año

```
Noviembre       →  'PAST'          Mostrar resumen edición pasada
Enero/Febrero   →  'COMING_SOON'   Generar expectativa
Al comenzar     →  'ACTIVE'        Urgencia + CTAs reserva
Al terminar     →  'PAST'          Galería + testimonios + nostalgia
```

---

## 🎨 Decisiones de Diseño Clave

### ❓ Por qué no hay carta de menú
El negocio funciona por **recomendación y producto del día**. Una carta cerrada en web:
- Queda desactualizada rápidamente
- No refleja filosofía real del negocio
- Puede defraudar expectativas si plato no está disponible

**Solución**: Destacar especialidades permanentes + comunicar que recomendación es parte de la experiencia.

### ❓ Por qué overlay usa estilos inline (no clases Tailwind)
Framer Motion crea su propio stacking context. Las clases Tailwind con `z-index` quedan subordinadas.
Los estilos inline con `style={{ zIndex: 9999 }}` siempre tienen prioridad absoluta.

```typescript
<motion.div style={{ zIndex: 9999 }}>
  {/* Overlay con z-index garantizado */}
</motion.div>
```

### ❓ Por qué `position: fixed` para bloquear scroll (no solo `overflow: hidden`)
`overflow: hidden` falla en iOS Safari por momentum táctil. Solución industry-standard:

```javascript
// Bloquear scroll
document.body.style.position = "fixed";
document.body.style.top = `-${window.scrollY}px`;

// Restaurar scroll
document.body.style.position = "static";
document.body.style.top = "0";
window.scrollTo(0, scrollYRef.current);
```

### ❓ Por qué sección de Especialidades tiene fondo crema
- Rompe la monotonía oscura (evita fatiga visual)
- Fotografías de comida lucen mejor sobre claro
- Señaliza cambio visual: "ambiente" → "gastronomía"

### ❓ Por qué FABs (botones flotantes) tienen `z-50` y no `z-9999`
Los FABs deben quedar **por debajo** del menú móvil (`z-9999`) para no bloquear navegación.
Con `z-50` quedan tapados automáticamente cuando menú está abierto.

---

## 🔍 SEO y Metadatos

### Implementado en App.tsx

```html
<title>Bar El Portalón | Restaurante en Roa (Burgos) - Especialidad en Bacalao</title>
<meta name="description" 
  content="Descubre Bar El Portalón. Cocina tradicional castellana, 
  especialidades en bacalao, kokotxas, pinchos en Plaza Mayor Roa Burgos." />
```

### Palabras Clave Objetivo (SEO Local)

```
restaurante en Roa, Burgos
pinchos en Roa
bacalao en Roa
dónde comer en Roa Burgos
tapeo Roa
restaurante Plaza Mayor Roa
cocina castellana Roa
Ribera del Duero restaurante
jornadas del bacalao Roa
```

### Pendiente de Implementar

- [ ] Schema.org `Restaurant` JSON-LD
- [ ] Open Graph image para compartir en redes
- [ ] `sitemap.xml` y `robots.txt` (ya existen en `/public`)
- [ ] Google Business Profile verificado
- [ ] URL Google Maps real en todos los enlaces

---

## 🍽️ Guía de Mantenimiento para el Propietario

> Esta sección es para quien mantiene el sitio **sin conocimientos técnicos avanzados**.

### ✅ Cambios Seguros — Editar Solo `restaurant.ts`

| Qué Cambiar | Campo | Ubicación |
|-------------|-------|-----------|
| Teléfono de reservas | `contact.phone` | `src/data/restaurant.ts` |
| Estado Jornadas Bacalao | `codDaysStatus` | `src/data/restaurant.ts` |
| Fechas Jornadas | `codDaysConfig.dates` | `src/data/restaurant.ts` |
| Platos en Jornadas | `codDaysConfig.featuredPlates` | `src/data/restaurant.ts` |
| Especialidades | `specialties[]` | `src/data/restaurant.ts` |
| Reseñas clientes | `reviews[]` | `src/data/restaurant.ts` |

### 📸 Actualizar Imágenes

1. Subir foto a hosting (Cloudinary, Google Drive público, Uploadcare)
2. Copiar URL pública de la imagen
3. Pegar URL en campo `image` en `restaurant.ts`

**Tamaños recomendados**:
- Hero principal: `2000 × 1200 px` (landscape)
- Especialidades: `800 × 1067 px` (portrait 3:4)
- Jornadas Bacalao: `800 × 1000 px` (portrait 4:5)

### ⚠️ NO TOCAR sin ayuda técnica

- ❌ Archivos `.tsx` de componentes
- ❌ Archivos de configuración (`.json`, `.config.js`, `package.json`)
- ❌ Carpetas `lib/`, `app/`, `assets/`
- ❌ Solo trabajar en `src/data/restaurant.ts`

---

## 🚀 Roadmap / Próximos Pasos

### 🔴 Prioridad Alta — Antes del Lanzamiento

- [ ] Fotos reales del local y platos (reemplazar Unsplash)
- [ ] Número teléfono real en `restaurant.ts`, `Navbar.tsx`, `Footer.tsx`
- [ ] URL Google Maps verificada
- [ ] Instagram handle real (o eliminar link)
- [ ] Horarios revisados y confirmados
- [ ] Aviso Legal y Política de Privacidad completadas

### 🟡 Prioridad Media — Mejoras (1-3 meses)

- [ ] Sistema de reservas integrado (Covermanager, TheFork, formulario)
- [ ] Galería fotos del local y eventos
- [ ] Sección "Plato del día" actualizable fácilmente
- [ ] Google Reviews API integrada
- [ ] WhatsApp Business para reservas
- [ ] Schema.org `Restaurant` JSON-LD (SEO)

### 🟢 Prioridad Baja — Evolución (6-12 meses)

- [ ] Panel administración visual (Sanity CMS, Contentful)
- [ ] Versión bilingüe español/inglés
- [ ] Newsletter para Jornadas Bacalao
- [ ] PWA (Progressive Web App) instalable móvil
- [ ] Analytics (Plausible, GA4)
- [ ] Integraciones con redes sociales (Instagram feed)

---

## Stack Tecnológico — Resumen

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | ^19.2.4 | Framework UI + Hooks |
| Vite | ^8.0.0 | Bundler + Dev Server (HMR instantáneo) |
| TypeScript | ~5.9.3 | Tipado estático para seguridad |
| Tailwind CSS | ^4.2.1 | Estilos utilitarios responsive |
| Framer Motion | ^12.40.0 | Animaciones declarativas (whileInView) |
| Lucide React | ^0.577.0 | Iconografía limpia SVG |
| Supabase JS | ^2.108.1 | Backend/autenticación (opcional) |
| ESLint | ^9.39.4 | Linting de código |
| PostCSS | ^8.5.8 | Procesamiento CSS |
| Sharp | ^0.34.5 | Optimización de imágenes |

### ¿Por qué este stack?
- ⚡ **Vite**: Desarrollo ultrarrápido con HMR, bundling optimizado
- ⚛️ **React 19**: Hooks modernos, mejor rendimiento, Server Components ready
- 🔷 **TypeScript**: Seguridad de tipos, IDE autocompletado, menos bugs
- 🎨 **Tailwind CSS**: Mobile-first, consistencia visual, sin CSS manual
- 🎬 **Framer Motion**: Animaciones fluidas con `whileInView` (on-scroll)
- 📦 **100% Estático**: Cero base de datos, preparado para CMS futuro

---

## 📝 Componentes — Descripción Rápida

| Componente | Propósito |
|-----------|----------|
| `Navbar.tsx` | Navegación fija + menú móvil full-screen + FABs |
| `Hero.tsx` | Sección portada 100vh con copy emocional |
| `ExperienceSplit.tsx` | Split visual: Bar vs. Restaurante (2 paneles) |
| `CodDays.tsx` | Jornadas Bacalao (dinámico: COMING_SOON/ACTIVE/PAST) |
| `Specialties.tsx` | Grid especialidades permanentes, fondo crema |
| `Reviews.tsx` | Testimonios clientes en grid |
| `MapSection.tsx` | Ubicación + iframe Google Maps + contacto |
| `Footer.tsx` | Pie con columnas: marca, dirección, horario, reservas |
| `OptimizedImage.tsx` | Imagen con lazy loading + fallback |
| `InnerPageLayout.tsx` | Layout compartido páginas internas (Navbar + Footer) |
| `Galeria.tsx` / `GaleriaTeaser.tsx` | Galería fotos completa + preview home |
| `Entrevinos.tsx` / `EntrevinosTeaser.tsx` | Vinos Ribiera Duero + preview |
| `Barra.tsx` | Página dedicada a pinchos/tapeo barra |
| `AntiguosEventos.tsx` | Ediciones pasadas Jornadas Bacalao |
| `PoliticaPrivacidad.tsx` | Política de Privacidad (RGPD) |
| `AvisoLegal.tsx` | Aviso Legal |

---

## 📚 Recursos Útiles

- [Vite Docs](https://vitejs.dev)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vercel Deploy Docs](https://vercel.com/docs)

---

## 📧 Contacto y Soporte

- **Propietario**: Para cambios de contenido, edita `src/data/restaurant.ts`
- **Desarrollador**: Diego Bombín Sanz (para cambios en código o arquitectura)
- **Issues/Bugs**: Abre un issue en GitHub o contacta al desarrollador

---

*Documento actualizado: Junio 2026*  
*Proyecto: Bar El Portalón — Sitio Web Premium v2.0*  
*Stack: React 19 + TypeScript + Vite + Tailwind CSS*
