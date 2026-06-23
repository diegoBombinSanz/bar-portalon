"use client";

import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

import { fotos } from "../data/gallery";

export default function GaleriaTeaser() {
  return (
    <section id="galeria" className="py-24 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-3"
            >
              El Portalón en imágenes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-serif text-[#2A241D] leading-tight"
            >
              Galería
            </motion.h2>
          </div>
          <motion.a
            href="/galeria"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-widest font-bold hover:gap-4 transition-all shrink-0"
          >
            Ver toda la galería <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Strip de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {fotos.map((foto, i) => (
            foto.preview != null && foto.preview === true && (
            <motion.a
              key={foto.alt}
              href="/galeria"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-sm bg-[#1a1a1a] block ${
                i === 0 ? "col-span-2 md:col-span-2 row-span-2" : "col-span-1"
              }`}
            >
              <OptimizedImage
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                decoding="async"
                sizes={i === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 20vw, 50vw"}
                widths={[240, 320, 480, 600, 800]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: i === 0 ? "1/1" : "1/1" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.a>
          )))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="/galeria"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#c5a059]/40 text-[#c5a059] text-xs uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all"
          >
            <Images size={14} />
            Ver toda la galería
          </a>
        </div>
      </div>
    </section>
  );
}



