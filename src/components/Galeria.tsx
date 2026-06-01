"use client";

import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import InnerPageLayout from "./InnerPageLayout";
import OptimizedImage from "./OptimizedImage";

const PAGE_SIZE = 8;

const categorias = [
  "Todo",
  "El Local",
  "La Barra",
  "Especialidades",
  "Ambiente",
];

type Categoria = (typeof categorias)[number];

const fotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    alt: "El Portalón de noche",
    cat: "El Local",
    cols: 2,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    alt: "Terraza Plaza Mayor",
    cat: "El Local",
    cols: 1,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?q=80&w=800&auto=format&fit=crop",
    alt: "Bacalao tradicional",
    cat: "Especialidades",
    cols: 1,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541510912111-99bc45946974?q=80&w=1200&auto=format&fit=crop",
    alt: "La barra",
    cat: "La Barra",
    cols: 2,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop",
    alt: "Kokotxas al pil-pil",
    cat: "Especialidades",
    cols: 1,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    alt: "Ambiente de restaurante",
    cat: "Ambiente",
    cols: 1,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1559740064-06724f8e5921?q=80&w=800&auto=format&fit=crop",
    alt: "Gambas frescas",
    cat: "Especialidades",
    cols: 1,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Sala del restaurante",
    cat: "El Local",
    cols: 2,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1550966842-2849a2220822?q=80&w=800&auto=format&fit=crop",
    alt: "Mesa preparada",
    cat: "Ambiente",
    cols: 1,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    alt: "Café y sobremesa",
    cat: "La Barra",
    cols: 1,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop",
    alt: "Detalle de plato",
    cat: "Especialidades",
    cols: 1,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    alt: "Plato principal",
    cat: "Especialidades",
    cols: 1,
  },
];

type Foto = (typeof fotos)[number];

export default function GaleriaPage() {
  const [catActiva, setCatActiva] = useState<Categoria>("Todo");
  const [lightbox, setLightbox] = useState<Foto | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fotosFiltradas =
    catActiva === "Todo" ? fotos : fotos.filter((f) => f.cat === catActiva);
  const fotosVisibles = fotosFiltradas.slice(0, visibleCount);
  const hasMore = visibleCount < fotosFiltradas.length;

  const lightboxIdx = lightbox
    ? fotosFiltradas.findIndex((f) => f.id === lightbox.id)
    : -1;

  const irAnterior = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const prev =
      (lightboxIdx - 1 + fotosFiltradas.length) % fotosFiltradas.length;
    setLightbox(fotosFiltradas[prev]);
  };

  const irSiguiente = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const next = (lightboxIdx + 1) % fotosFiltradas.length;
    setLightbox(fotosFiltradas[next]);
  };

  return (
    <InnerPageLayout backLabel="Volver al inicio">
      {/* Header */}
      <section className="pt-12 pb-14 max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
        >
          Bar El Portalón
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-5xl md:text-7xl font-serif text-[#f5f5f1] leading-tight mb-6"
        >
          Galería
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="text-[#f5f5f1]/50 max-w-xl font-light text-lg"
        >
          Un vistazo a los rincones, los platos y el ambiente que hacen único al
          Portalón.
        </motion.p>

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2 mt-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCatActiva(cat);
                setVisibleCount(PAGE_SIZE);
                setLightbox(null);
              }}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all duration-200 rounded-full ${
                catActiva === cat
                  ? "bg-[#c5a059] text-black border-[#c5a059]"
                  : "border-white/15 text-[#f5f5f1]/50 hover:border-[#c5a059]/50 hover:text-[#f5f5f1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de fotos */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {fotosVisibles.map((foto, i) => (
              <motion.div
                key={foto.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => setLightbox(foto)}
                className={`group cursor-pointer overflow-hidden rounded-sm bg-[#1a1a1a] ${
                  foto.cols === 2 ? "col-span-2" : "col-span-1"
                }`}
              >
                <div className="relative overflow-hidden aspect-square">
                  <OptimizedImage
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={
                      foto.cols === 2
                        ? "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    }
                    widths={[320, 480, 640, 800, 1000, 1200]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      {foto.alt}
                    </span>
                  </div>
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 bg-[#0a0a0a]/70 backdrop-blur-sm px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] uppercase tracking-widest text-[#c5a059]">
                      {foto.cat}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {fotosFiltradas.length === 0 && (
          <div className="text-center py-24 text-[#f5f5f1]/30 font-light">
            No hay imágenes en esta categoría todavía.
          </div>
        )}

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="inline-flex min-h-11 items-center border border-[#c5a059]/50 px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#c5a059] transition-colors hover:bg-[#c5a059] hover:text-black"
            >
              Cargar más imágenes
            </button>
          </div>
        )}
      </section>

      {/* Lightbox con navegación */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9999] bg-black/97 flex items-center justify-center p-4"
          >
            {/* Cerrar */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#f5f5f1]/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>

            {/* Anterior */}
            <button
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#f5f5f1]/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-all"
              onClick={irAnterior}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Imagen */}
            <motion.div
              key={lightbox.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full mx-12 md:mx-20"
            >
              <OptimizedImage
                src={lightbox.src}
                alt={lightbox.alt}
                loading="eager"
                sizes="100vw"
                widths={[800, 1000, 1200, 1600, 2000]}
                className="w-full object-contain max-h-[80vh] rounded-sm"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-[#f5f5f1]/70 font-light">{lightbox.alt}</p>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                  {lightbox.cat}
                </span>
              </div>
              <p className="text-[#f5f5f1]/30 text-xs mt-1">
                {lightboxIdx + 1} / {fotosFiltradas.length}
              </p>
            </motion.div>

            {/* Siguiente */}
            <button
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#f5f5f1]/60 hover:text-[#c5a059] hover:border-[#c5a059] transition-all"
              onClick={irSiguiente}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </InnerPageLayout>
  );
}



