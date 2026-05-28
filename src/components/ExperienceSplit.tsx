import { motion } from "framer-motion";
import { Beer, Utensils, ArrowRight } from "lucide-react";

export default function ExperienceSplit() {
  return (
    <section
      id="experiencia"
      className="flex flex-col md:flex-row min-h-[80vh] w-full bg-black"
    >
      {/* Zona Bar / Pinchos */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="bar"
        className="relative w-full md:w-1/2 group overflow-hidden flex flex-col justify-end p-8 md:p-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full overflow-hidden group">
            <img
              src="https://img05.restaurantguru.com/re29-meals-Bar-El-Portalon-2025-03.jpg?q=80&w=1000&auto=format&fit=crop"
              alt="La Barra"
              className="w-full h-full object-cover object-[60%_center] grayscale-[0.2] brightness-60 transition-transform duration-[2000ms] group-hover:scale-110"
            />

            {/* Overlay oscuro para contraste */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Degradado opcional */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-black/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-[#c5a059] flex items-center justify-center mb-6">
            <Beer size={24} className="text-black" />
          </div>
          <h3 className="text-[#c5a059] uppercase tracking-widest text-xs font-bold mb-2">
            Pinchos & Raciones
          </h3>
          <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f1] mb-6 leading-tight">
            La Barra como punto de encuentro
          </h2>
          <p className="text-[#f5f5f1]/80 font-light text-lg mb-8 max-w-md">
            Un ambiente informal y social donde el producto local se transforma
            en pequeños bocados de felicidad. Tapeo tradicional elevado a la
            excelencia.
          </p>
          <div className="flex items-center gap-4 text-[#c5a059] uppercase tracking-widest text-[10px] font-bold">
            <span>Social</span>
            <span className="w-1 h-1 bg-[#c5a059] rounded-full" />
            <span>Dinámico</span>
            <span className="w-1 h-1 bg-[#c5a059] rounded-full" />
            <span>Tradición</span>
          </div>
        </div>
      </motion.div>

      {/* Zona Restaurante / Especialidades */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="restaurante"
        className="relative w-full md:w-1/2 group overflow-hidden flex flex-col justify-end p-8 md:p-20 border-t md:border-t-0 md:border-l border-white/10"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full overflow-hidden group">
            {/* Imagen */}
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/7a/92/9b/caption.jpg?q=80&w=1000&auto=format&fit=crop"
              alt="El Restaurante"
              className="w-full h-full object-cover brightness-60 scale-105 transition-transform duration-[2000ms] group-hover:scale-110"
            />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Degradado extra (mejora contraste en texto superior/inferior) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-[#800020] flex items-center justify-center mb-6">
            <Utensils size={24} className="text-white" />
          </div>
          <h3 className="text-[#c5a059] uppercase tracking-widest text-xs font-bold mb-2">
            Cocina Elaborada
          </h3>
          <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f1] mb-6 leading-tight">
            Platos reconocidos por quienes vuelven
          </h2>
          <p className="text-[#f5f5f1]/80 font-light text-lg mb-8 max-w-md">
            Experiencia gastronómica tranquila. Especialidades en bacalao,
            kokotxas y producto de temporada reinterpretado con respeto y
            técnica.
          </p>
          <a
            href="#especialidades"
            className="inline-flex items-center gap-2 text-[#c5a059] uppercase tracking-widest text-xs font-bold hover:gap-4 transition-all"
          >
            Descubrir especialidades <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
