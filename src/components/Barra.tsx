"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Beer, Users, Clock } from "lucide-react";
import InnerPageLayout from "./InnerPageLayout";
import OptimizedImage from "./OptimizedImage";

const barItems = [
  {
    id: 1,
    title: "La Barra, el alma del Portalón",
    description:
      "Un punto de encuentro donde el tiempo se detiene. La barra de El Portalón es el corazón del bar: bulliciosa a la hora del aperitivo, tranquila entre semana, siempre acogedora. Aquí se forjan conversaciones, se celebran pequeñas victorias y se comparten los mejores pinchos de Roa.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    wide: true,
  },
  {
    id: 2,
    title: "Pinchos de temporada",
    description:
      "Pequeños bocados elaborados con producto del día. Cambian según el mercado, siempre sorprenden.",
    image:
      "https://images.unsplash.com/photo-1541510912111-99bc45946974?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: 3,
    title: "El aperitivo en la terraza",
    description:
      "Con vistas a la Plaza Mayor de Roa. El lugar ideal para empezar bien cualquier día.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: 4,
    title: "Raciones para compartir",
    description:
      "Chistorra, jamón ibérico, queso castellano... producto de calidad servido sin complicaciones, para disfrutar en buena compañía.",
    image:
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: 5,
    title: "Ambiente de barra auténtico",
    description:
      "Sin pretensiones pero con clase. El ambiente de barra del Portalón es el que fue siempre: cercano, cálido y honesto.",
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: 6,
    title: "El café de después",
    description:
      "El mejor momento para que te cuenten la historia del bar. Siempre hay alguien con ganas de charlar en El Portalón.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
];

type BarItem = (typeof barItems)[number];

const pillars = [
  { icon: Beer, label: "Pinchos & Raciones", desc: "Producto fresco del día" },
  {
    icon: Users,
    label: "Ambiente social",
    desc: "El punto de encuentro de Roa",
  },
  {
    icon: Clock,
    label: "Abierto cada día",
    desc: "Desde el desayuno hasta el cierre",
  },
];

export default function BarraPage() {
  const [lightbox, setLightbox] = useState<BarItem | null>(null);

  return (
    <InnerPageLayout backLabel="Volver al inicio">
      {/* Hero Header */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1600&auto=format&fit=crop"
          alt=""
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          widths={[640, 960, 1200, 1600, 2000]}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-3"
          >
            Bar El Portalón · Roa
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-[#f5f5f1] leading-tight"
          >
            La Barra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[#f5f5f1]/60 mt-4 text-lg max-w-xl font-light"
          >
            El tapeo tradicional elevado a la excelencia. Pinchos, raciones y
            buen ambiente en el corazón de la Plaza Mayor.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#EFE9DF] border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full border border-[#c5a059]/40 flex items-center justify-center shrink-0">
                <Icon size={18} color="#c5a059" />
              </div>
              <div>
                <p className="text-[#2A241D / #5F564C] font-semibold text-sm">{label}</p>
                <p className="text-[#2A241D / #5F564C]/45 text-xs mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Masonry-style gallery */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {barItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              <div className="relative overflow-hidden rounded-sm bg-[#1a1a1a]">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  widths={[320, 480, 640, 800, 1000, 1200]}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: item.wide ? "16/9" : "4/3" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <h3 className="text-[#f5f5f1] font-serif text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
              {/* Caption below image */}
              <div className="pt-3 pb-6 px-1">
                <h3 className="text-[#2A241D / #5F564C] font-serif text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-[#2A241D / #5F564C]/45 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Reserva */}
      <section className="py-20 bg-[#EFE9DF] border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
          >
            ¿Te apetece pasarte?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-serif text-[#2A241D] mb-6 leading-tight"
          >
            La barra siempre tiene un hueco para ti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-[#2A241D / #5F564C]/50 font-light mb-10 leading-relaxed"
          >
            Sin reserva para la barra. Para el restaurante, te recomendamos
            llamar con antelación.
          </motion.p>
          <a
            href="tel:+34947000000"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#d4b06a] transition-colors"
          >
            Reservar Mesa
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6"
          >
            <button
              className="absolute top-6 right-6 text-[#2A241D / #5F564C]/60 hover:text-[#c5a059] transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <OptimizedImage
                src={lightbox.image}
                alt={lightbox.title}
                loading="eager"
                sizes="100vw"
                widths={[800, 1000, 1200, 1600]}
                className="w-full rounded-sm object-cover max-h-[70vh]"
              />
              <div className="mt-5">
                <h3 className="font-serif text-xl text-[#2A241D / #5F564C] mb-2">
                  {lightbox.title}
                </h3>
                <p className="text-[#2A241D / #5F564C]/55 font-light">
                  {lightbox.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InnerPageLayout>
  );
}



