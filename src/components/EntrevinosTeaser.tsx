"use client";

import { motion } from "framer-motion";
import { Wine, ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

export default function EntrevinosTeaser() {
  return (
    <section className="relative overflow-hidden bg-[#EFE9DF] py-0">
      <div className="flex flex-col md:flex-row min-h-[70vh]">
        {/* Imagen izquierda — viñedo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full md:w-1/2 overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop"
            alt="Viñedos Entrevinos de Roa"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 50vw, 100vw"
            widths={[480, 640, 800, 1000, 1200]}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#EFE9DF] hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EFE9DF] via-transparent to-transparent md:hidden" />

          {/* Etiqueta sobre imagen */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#800020]/90 backdrop-blur-sm px-4 py-2">
            <Wine size={14} color="white" />
            <span className="text-white text-[9px] uppercase tracking-widest font-bold">
              D.O. Ribera del Duero
            </span>
          </div>
        </motion.div>

        {/* Contenido derecha */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16 md:py-0 relative z-10"
        >
          {/* Marca Entrevinos */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c5a059]">
              Nuestra bodega
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif text-[#2A241D] leading-none mb-3">
            Entre<span className="text-[#c5a059]">vinos</span>
          </h2>
          <p className="text-[#2A241D]/50 text-sm uppercase tracking-widest mb-8 font-light">
            de Roa
          </p>

          <p className="text-[#2A241D]/65 font-light text-lg leading-relaxed mb-6">
            Un proyecto bodeguero nacido en Roa con la vocación de hacer vinos
            que hablen de su lugar de origen. Tempranillo de Ribera del Duero
            elaborado con respeto al terroir y pasión artesanal.
          </p>
          <p className="text-[#2A241D]/45 font-light text-base leading-relaxed mb-12">
            Disponible en nuestra carta de vinos. Descubre la historia, los
            viñedos y cada una de las etiquetas de la colección.
          </p>

          {/* Stats rápidos */}
          <div className="flex gap-8 mb-12 pb-12 border-b border-white/5">
            {[
              { valor: "D.O.", etiqueta: "Ribera del Duero" },
              { valor: "100%", etiqueta: "Tempranillo" },
              { valor: "Roa", etiqueta: "Burgos · España" },
            ].map(({ valor, etiqueta }) => (
              <div key={etiqueta} className="flex flex-col">
                <span className="text-xl font-serif text-[#c5a059]">
                  {valor}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#2A241D]/30 mt-0.5">
                  {etiqueta}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/entrevinos"
            className="inline-flex items-center gap-3 text-[#2A241D] text-xs uppercase tracking-widest font-bold hover:text-[#c5a059] transition-colors group"
          >
            Conocer Entrevinos de Roa
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}



