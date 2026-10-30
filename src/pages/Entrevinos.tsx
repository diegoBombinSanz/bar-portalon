"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wine, MapPin, Grape, Star, ArrowRight } from "lucide-react";
import InnerPageLayout from "../components/InnerPageLayout";
import OptimizedImage from "../components/OptimizedImage";
import type { SiteConfig } from "../data/siteConfig";

type EntrevinosPageProps = {
  config?: SiteConfig;
};

const vinos = [
  {
    id: 1,
    nombre: "Entrevinos Roble",
    tipo: "Tempranillo · Crianza en roble",
    descripcion:
      "Vino tinto con 6 meses de crianza en barrica de roble francés y americano. Notas de fruta roja madura, vainilla y un punto ahumado que recuerda a la tierra de Roa. Equilibrado, largo en boca, ideal con carnes a la brasa.",
    maridaje: "Lechazo, chuletillas, carnes rojas",
    imagen:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
    añada: "2022",
    medallas: ["Mejor Roble Ribera 2023", "89 puntos Parker"],
  },
  {
    id: 2,
    nombre: "Entrevinos Reserva",
    tipo: "Tempranillo · Reserva 14 meses",
    descripcion:
      "La joya de la colección. 14 meses de crianza en barrica nueva de roble francés. Estructura poderosa, taninos sedosos y una complejidad aromática que evoluciona en copa. Un vino de guardia con personalidad propia.",
    maridaje: "Caza mayor, quesos curados, bacalao elaborado",
    imagen:
      "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=800&auto=format&fit=crop",
    añada: "2020",
    medallas: ["Oro Berliner Wine Trophy", "92 puntos Wine Spectator"],
  },
  {
    id: 3,
    nombre: "Entrevinos Blanco",
    tipo: "Verdejo · Sin crianza",
    descripcion:
      "Blanco fresco y aromático elaborado con uva verdejo de la zona. Notas de hierbas frescas, lima y manzana verde. Un vino ágil y directo, perfecto para comenzar la comida o acompañar el pescado.",
    maridaje: "Mariscos, pimientos asados, queso fresco",
    imagen:
      "https://images.unsplash.com/photo-1548460076-9a03b8d5ccd3?q=80&w=800&auto=format&fit=crop",
    añada: "2024",
    medallas: ["Mejor Blanco Castilla 2024"],
  },
];

const valores = [
  {
    icon: Grape,
    titulo: "Terroir de Roa",
    texto:
      "Viñedos situados en los pagos más representativos de la Denominación de Origen Ribera del Duero, en el entorno de Roa de Duero.",
  },
  {
    icon: Wine,
    titulo: "Elaboración artesanal",
    texto:
      "Vinificación tradicional con control de temperatura, fermentación en depósitos de acero inoxidable y crianza selectiva en barricas de roble.",
  },
  {
    icon: Star,
    titulo: "Reconocimiento",
    texto:
      "Vinos premiados en concursos nacionales e internacionales. Una bodega pequeña con una proyección que crece año a año.",
  },
  {
    icon: MapPin,
    titulo: "Raíces en Roa",
    texto:
      "Nacida en Roa, la capital de la Ribera del Duero burgalesa. Un proyecto que pone en valor el territorio y la gente de esta tierra.",
  },
];

export default function EntrevinosPage({ config }: EntrevinosPageProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <InnerPageLayout config={config} backLabel="Volver al inicio">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[90vh] overflow-hidden flex items-center"
      >
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 scale-110"
        >
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1600&auto=format&fit=crop"
            alt=""
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            widths={[640, 960, 1200, 1600, 2000]}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#c5a059]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059]">
                Denominación de Origen Ribera del Duero
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-[#f5f5f1] leading-none mb-4">
              Entre
              <span className="text-[#c5a059]">vinos</span>
            </h1>
            <p className="text-lg md:text-xl text-[#f5f5f1]/60 font-light leading-relaxed mb-2">
              de Roa
            </p>
            <div className="w-16 h-[1px] bg-[#c5a059]/40 my-8" />
            <p className="text-[#f5f5f1]/70 font-light text-lg leading-relaxed mb-10 max-w-lg">
              Una bodega nacida en el corazón de Roa con el objetivo de expresar
              lo mejor de nuestra tierra en cada botella. Tempranillo de Ribera
              del Duero elaborado con respeto al terroir y pasión artesanal.
            </p>
            <a
              href="#vinos"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-widest font-bold hover:bg-[#c5a059] hover:text-black transition-all group"
            >
              Descubrir los vinos
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#c5a059] to-transparent" />
        </motion.div>
      </section>

      {/* ── INTRO BODEGA ──────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-5">
                Nuestra historia
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f5f5f1] mb-8 leading-tight">
                El vino que nació de la tierra de Roa
              </h2>
              <p className="text-[#f5f5f1]/60 font-light leading-relaxed mb-6 text-lg">
                Entrevinos de Roa es un proyecto bodeguero nacido con la
                vocación de hacer vinos que hablen de su lugar de origen.
                Viñedos viejos, suelos arcillo-calcáreos y un clima continental
                extremo son los ingredientes naturales que moldean cada cosecha.
              </p>
              <p className="text-[#f5f5f1]/60 font-light leading-relaxed text-lg">
                La bodega apuesta por elaboraciones que respetan el carácter de
                la uva tempranillo, sin maquillajes ni correcciones. El
                resultado son vinos honestos, con carácter y vocación de
                permanencia.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-[#c5a059]">
                    D.O.
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
                    Ribera del Duero
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-[#c5a059]">
                    Roa
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
                    Burgos · España
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-[#c5a059]">
                    100%
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
                    Tempranillo
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1000&auto=format&fit=crop"
                alt="Viñedo Entrevinos de Roa"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 50vw, 100vw"
                widths={[480, 640, 800, 1000, 1200]}
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#800020]/20 border border-[#800020]/30 hidden md:flex items-center justify-center">
                <Wine size={48} color="#c5a059" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALORES ───────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map(({ icon: Icon, titulo, texto }, i) => (
              <motion.div
                key={titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 border border-[#c5a059]/30 flex items-center justify-center">
                  <Icon size={20} color="#c5a059" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f5f1]">{titulo}</h3>
                <p className="text-[#f5f5f1]/45 font-light text-sm leading-relaxed">
                  {texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VINOS ─────────────────────────────────────────── */}
      <section id="vinos" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
            >
              La colección
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-6xl font-serif text-[#f5f5f1]"
            >
              Nuestros Vinos
            </motion.h2>
            <div className="w-20 h-[1px] bg-[#c5a059] mx-auto mt-8" />
          </div>

          <div className="space-y-6">
            {vinos.map((vino, i) => (
              <motion.div
                key={vino.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-[#111111] border border-white/5 hover:border-[#c5a059]/25 transition-all duration-400 overflow-hidden rounded-sm"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagen */}
                  <div className="w-full md:w-1/3 overflow-hidden shrink-0">
                    <OptimizedImage
                      src={vino.imagen}
                      alt={vino.nombre}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      widths={[360, 480, 640, 800, 1000]}
                      className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ minHeight: "280px" }}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#c5a059] mb-1">
                          {vino.tipo}
                        </p>
                        <h3 className="text-3xl font-serif text-[#f5f5f1]">
                          {vino.nombre}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/30 mb-1">
                          Añada
                        </p>
                        <p className="text-2xl font-serif text-[#c5a059]">
                          {vino.añada}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#f5f5f1]/60 font-light leading-relaxed mb-6">
                      {vino.descripcion}
                    </p>

                    <div className="flex items-center gap-2 mb-6">
                      <Grape size={13} color="#c5a059" />
                      <span className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
                        Maridaje:
                      </span>
                      <span className="text-[10px] text-[#f5f5f1]/60">
                        {vino.maridaje}
                      </span>
                    </div>

                    {/* Medallas */}
                    <div className="flex flex-wrap gap-2">
                      {vino.medallas.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#c5a059]/25 text-[9px] uppercase tracking-widest text-[#c5a059]"
                        >
                          <Star size={9} fill="#c5a059" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAPA / DÓNDE ENCONTRARNOS ─────────────────────── */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#c5a059] mb-4"
          >
            Dónde encontrarnos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-5xl font-serif text-[#f5f5f1] mb-6 leading-tight"
          >
            Prueba Entrevinos en el Portalón
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-[#f5f5f1]/50 font-light text-lg leading-relaxed mb-12 max-w-xl mx-auto"
          >
            Puedes disfrutar de los vinos Entrevinos de Roa en nuestra carta de
            vinos de Bar El Portalón, en Plaza Mayor de Roa. También puedes
            contactarnos directamente para adquirir botellas.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#d4b06a] transition-colors"
            >
              Visitar El Portalón
            </a>
            <a
              href="tel:+34633954144"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-[#f5f5f1]/60 text-xs uppercase tracking-widest hover:border-[#c5a059]/40 hover:text-[#f5f5f1] transition-all"
            >
              Contactar la bodega
            </a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}



