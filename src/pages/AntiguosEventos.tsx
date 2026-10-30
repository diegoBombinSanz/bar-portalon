"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Award } from "lucide-react";
import InnerPageLayout from "../components/InnerPageLayout";
import OptimizedImage from "../components/OptimizedImage";
import type { SiteConfig } from "../data/siteConfig";

type AntiguosEventosPageProps = {
  config?: SiteConfig;
};

// Datos de ediciones pasadas — añadir nuevas cada año
const ediciones = [
  {
    id: 1,
    year: "2025",
    title: "IX Jornadas del Bacalao",
    subtitle: "El sabor del Atlántico en la Ribera del Duero",
    dates: "16 Mayo — 1 Junio 2025",
    description:
      "Una edición marcada por la recuperación de las recetas más clásicas. El bacalao al pil-pil y las cocochas fueron los protagonistas indiscutibles de esta novena edición.",
    platos: [
      "Bacalao al Pil-Pil",
      "Cocochas en salsa verde",
      "Bacalao a la vizcaína",
    ],
    poster:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop",
    color: "#800020",
  },
  {
    id: 2,
    year: "2024",
    title: "VIII Jornadas del Bacalao",
    subtitle: "Raíces y vanguardia",
    dates: "10 Mayo — 26 Mayo 2024",
    description:
      "Tradición y técnica se dieron la mano en la octava edición. Un menú que exploró los contrastes entre la cocina de siempre y nuevas elaboraciones.",
    platos: [
      "Carpaccio de bacalao ahumado",
      "Bacalao al Club Ranero",
      "Timbal de bacalao con pimientos",
    ],
    poster:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    color: "#3a3a5c",
  },
  {
    id: 3,
    year: "2023",
    title: "VII Jornadas del Bacalao",
    subtitle: "Temporada de reencuentros",
    dates: "19 Mayo — 4 Junio 2023",
    description:
      "Tras los años difíciles, la séptima edición supuso el gran reencuentro. Lleno completo cada fin de semana y una respuesta del público que nos emocionó.",
    platos: [
      "Bacalao confitado con all i oli",
      "Kokotxas al pil-pil",
      "Ensalada tibia de bacalao",
    ],
    poster:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    color: "#2d4a3e",
  },
  {
    id: 4,
    year: "2022",
    title: "VI Jornadas del Bacalao",
    subtitle: "El producto por encima de todo",
    dates: "13 Mayo — 29 Mayo 2022",
    description:
      "La edición del producto. Se apostó por preparaciones más sencillas para que el bacalao de primera calidad hablara por sí solo.",
    platos: [
      "Bacalao a la plancha con pisto",
      "Croquetas de bacalao",
      "Bacalao al horno con costra de hierbas",
    ],
    poster:
      "https://images.unsplash.com/photo-1559740064-06724f8e5921?q=80&w=800&auto=format&fit=crop",
    color: "#4a3728",
  },
  {
    id: 5,
    year: "2021",
    title: "V Jornadas del Bacalao",
    subtitle: "Volvemos con más fuerza",
    dates: "21 Mayo — 6 Junio 2021",
    description:
      "Una edición especial, de vuelta. El Portalón agradeció con el corazón a todos sus clientes su fidelidad en un año que nunca olvidaremos.",
    platos: [
      "Bacalao al vapor con juliana de verduras",
      "Kokotxas gratinadas",
      "Buñuelos de bacalao",
    ],
    poster:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop",
    color: "#1a3a4a",
  },
  {
    id: 6,
    year: "2019",
    title: "IV Jornadas del Bacalao",
    subtitle: "Cuatro ediciones de historia",
    dates: "17 Mayo — 2 Junio 2019",
    description:
      "La edición que consolidó las Jornadas como un referente gastronómico en la provincia de Burgos. Medios de comunicación regionales se hicieron eco del evento.",
    platos: [
      "Bacalao con garbanzos y espinacas",
      "Brandada de bacalao",
      "Lomo de bacalao al ajillo",
    ],
    poster:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=800&auto=format&fit=crop",
    color: "#3d1f1f",
  },
];

type Edicion = (typeof ediciones)[number];

export default function AntiguosEventosPage({ config }: AntiguosEventosPageProps) {
  const [selected, setSelected] = useState<Edicion | null>(null);

  return (
    <InnerPageLayout config={config} backLabel="Volver al inicio">
      {/* Header */}
      <section className="pt-12 pb-16 max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
        >
          Historia y tradición
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-5xl md:text-7xl font-serif text-[#f5f5f1] leading-tight mb-6"
        >
          Jornadas del Bacalao
          <br />
          <span className="text-[#c5a059]">Ediciones anteriores</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="text-[#f5f5f1]/50 max-w-2xl font-light text-lg leading-relaxed"
        >
          Un recorrido por la historia de nuestro evento gastronómico más
          esperado. Cada edición, una nueva forma de rendir homenaje al mejor
          bacalao del Atlántico.
        </motion.p>
        {/* Timeline line */}
        <div className="mt-10 w-24 h-[1px] bg-[#c5a059]" />
      </section>

      {/* Grid de ediciones */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ediciones.map((ed, i) => (
            <motion.article
              key={ed.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(ed)}
              className="group cursor-pointer bg-[#111111] border border-white/5 hover:border-[#c5a059]/30 transition-all duration-300 overflow-hidden rounded-sm"
            >
              {/* Poster image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <OptimizedImage
                  src={ed.poster}
                  alt={ed.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  widths={[320, 480, 640, 800, 1000]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
                />
                {/* Color overlay */}
                <div
                  className="absolute inset-0 opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${ed.color}, transparent)`,
                  }}
                />
                {/* Year badge */}
                <div className="absolute top-4 left-4 bg-[#0a0a0a]/80 backdrop-blur-sm px-4 py-1.5 border border-[#c5a059]/30">
                  <span className="text-[#c5a059] font-serif text-xl">
                    {ed.year}
                  </span>
                </div>
                {/* Edition badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#800020] px-3 py-1">
                  <Award size={11} color="white" />
                  <span className="text-white text-[9px] uppercase tracking-widest font-bold">
                    Edición pasada
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={12} color="#c5a059" />
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                    {ed.dates}
                  </span>
                </div>
                <h2 className="font-serif text-xl text-[#f5f5f1] mb-1 group-hover:text-[#c5a059] transition-colors">
                  {ed.title}
                </h2>
                <p className="text-[#f5f5f1]/40 text-sm italic mb-4">
                  {ed.subtitle}
                </p>
                <div className="space-y-1.5">
                  {ed.platos.slice(0, 2).map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 text-[#f5f5f1]/55 text-xs"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c5a059]/60 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-[#c5a059]/60 group-hover:text-[#c5a059] transition-colors">
                  Ver detalles →
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA próxima edición */}
      <section className="py-20 bg-[#0f0f0f] border-t border-[#c5a059]/20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4">
            ¿No quieres perderte la próxima?
          </p>
          <h2 className="text-3xl font-serif text-[#f5f5f1] mb-6">
            Sé el primero en saberlo
          </h2>
          <p className="text-[#f5f5f1]/50 font-light mb-10">
            Llámanos o síguenos en redes sociales para estar al tanto de la
            próxima edición de las Jornadas del Bacalao.
          </p>
          <a
            href="tel:+34633954144"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#d4b06a] transition-colors"
          >
            Llamar al restaurante
          </a>
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6"
          >
            <button
              className="absolute top-6 right-6 text-[#f5f5f1]/60 hover:text-[#c5a059] transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#111111] border border-white/10 overflow-hidden rounded-sm flex flex-col md:flex-row"
            >
              <OptimizedImage
                src={selected.poster}
                alt={selected.title}
                loading="eager"
                sizes="(min-width: 768px) 40vw, 100vw"
                widths={[480, 640, 800, 1000, 1200]}
                className="w-full md:w-2/5 object-cover h-64 md:h-auto"
              />
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[#c5a059] font-serif text-4xl mb-2">
                  {selected.year}
                </span>
                <h2 className="font-serif text-2xl text-[#f5f5f1] mb-1">
                  {selected.title}
                </h2>
                <p className="text-[#f5f5f1]/40 italic text-sm mb-4">
                  {selected.subtitle}
                </p>
                <div className="flex items-center gap-2 mb-5">
                  <Calendar size={13} color="#c5a059" />
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                    {selected.dates}
                  </span>
                </div>
                <p className="text-[#f5f5f1]/65 font-light leading-relaxed mb-6">
                  {selected.description}
                </p>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] mb-2">
                    Platos de la edición
                  </p>
                  {selected.platos.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-3 text-[#f5f5f1]/70 text-sm"
                    >
                      <Award size={12} color="#c5a059" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InnerPageLayout>
  );
}
