import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-110"
        style={{
          backgroundImage:
            'url("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/7a/92/99/caption.jpg?w=1100&h=600&s=1")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 brightness-60" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#c5a059] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 block"
        >
          Roa, Ribera del Duero
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-serif text-[#f5f5f1] leading-tight mb-6"
        >
          Tradición, producto y cocina elaborada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#f5f5f1]/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Un espacio acogedor donde disfrutar desde el mejor tapeo hasta
          especialidades reconocidas por nuestros clientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#restaurante"
            className="w-full md:w-auto px-10 py-4 bg-[#c5a059] text-black text-xs uppercase tracking-widest font-bold hover:bg-[#b08d4a] transition-all"
          >
            Reservar Mesa
          </a>
          <a
            href="#especialidades"
            className="w-full md:w-auto px-10 py-4 border border-white/30 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
          >
            Ver Especialidades
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#c5a059]"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c5a059] to-transparent" />
      </motion.div>
    </section>
  );
}



