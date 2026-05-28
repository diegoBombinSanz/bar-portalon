"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const infoItems = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Plaza Mayor, 14",
    sub: "09300 Roa, Burgos",
    href: "https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos",
    linkText: "Cómo llegar →",
  },
  {
    icon: Phone,
    label: "Reservas",
    value: "+34 947 000 000",
    sub: "Lunes a Domingo",
    href: "tel:+34947000000",
    linkText: "Llamar ahora →",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "9:00 – 23:30",
    sub: "Abierto todos los días",
    href: null,
    linkText: null,
  },
];

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contacto"
      className="bg-[#0d0d0d] pt-24 pb-0"
      aria-label="Ubicación y contacto"
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
        >
          Encuéntranos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl md:text-5xl font-serif text-[#f5f5f1] mb-6 leading-tight"
        >
          En el corazón de Roa
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-[#f5f5f1]/55 max-w-xl mx-auto text-base leading-relaxed"
        >
          Junto a la histórica Plaza Mayor de Roa, a pasos del Ayuntamiento y
          con vistas al corazón de la Ribera del Duero burgalesa.
        </motion.p>
      </div>

      {/* ── Info Cards ── */}
      <div className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col gap-3 p-6 border border-white/8 rounded-sm bg-white/[0.025] hover:border-[#c5a059]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center">
                  <Icon size={18} color="#c5a059" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#f5f5f1]/40 mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg font-serif text-[#f5f5f1]">
                    {item.value}
                  </p>
                  <p className="text-sm text-[#f5f5f1]/50">{item.sub}</p>
                </div>
                {item.href && item.linkText && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="mt-auto text-xs text-[#c5a059] hover:text-[#d4b06a] transition-colors tracking-wider uppercase inline-flex items-center gap-1"
                  >
                    {item.linkText}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Google Maps iframe ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.35 }}
        className="relative w-full"
        style={{ height: "420px" }}
      >
        {/* Decorative top gradient to blend with section above */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "64px",
            background: "linear-gradient(to bottom, #0d0d0d, transparent)",
          }}
        />

        <iframe
          title="Ubicación Bar El Portalón en Roa"
          src="https://maps.google.com/maps?q=Plaza+Mayor+14+Roa+Burgos+Spain&output=embed&z=16&hl=es"
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: "block",
            filter: "grayscale(0.3) contrast(1.05)",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Open in Google Maps overlay button */}
        <a
          href="https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-[#c5a059] transition-colors rounded-full"
        >
          <ExternalLink size={14} />
          Abrir en Google Maps
        </a>
      </motion.div>
    </section>
  );
}



