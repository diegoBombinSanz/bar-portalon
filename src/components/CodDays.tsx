import { motion } from "framer-motion";
import { Calendar, Award, ArrowRight } from "lucide-react";
import { restaurantData } from "../data/restaurant";

export default function CodDays() {
  const { codDaysStatus, codDaysConfig } = restaurantData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="bacalao"
      className="py-24 bg-[#0f0f0f] border-y border-[#c5a059]/20 relative overflow-hidden"
    >
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-10 text-[10rem] font-serif text-white/[0.02] pointer-events-none select-none hidden lg:block">
        BACALAO
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-[#1a1a1a] border border-[#c5a059]/30 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden group">
              <img
                src="https://www.enaranda.es/wp-content/uploads/2023/03/IMG_9479-1000x480.jpg?q=80&w=1000&auto=format&fit=crop"
                alt="Bacalao El Portalón"
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Status Badge */}
            <div className="absolute -top-4 -left-4 bg-[#800020] text-white px-6 py-2 text-[10px] uppercase tracking-widest font-bold shadow-xl">
              {codDaysStatus === "COMING_SOON"
                ? "Próximamente"
                : codDaysStatus === "ACTIVE"
                  ? "Evento en curso"
                  : "Última Edición"}
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <span className="text-[#c5a059] uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
              <Calendar size={14} /> {codDaysConfig.dates}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f1] mb-6 leading-tight">
              {codDaysConfig.title}
            </h2>

            <p className="text-[#f5f5f1]/70 text-lg font-light mb-8 leading-relaxed italic">
              {codDaysStatus === "COMING_SOON"
                ? codDaysConfig.teaser
                : codDaysStatus === "ACTIVE"
                  ? codDaysConfig.activeMessage
                  : codDaysConfig.pastMessage}
            </p>

            {/* Dynamic Plated List */}
            <div className="space-y-4 mb-10">
              {codDaysConfig.featuredPlates.map((plate, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[#f5f5f1]/90 text-sm font-light border-b border-white/5 pb-2"
                >
                  <Award size={14} className="text-[#c5a059]" />
                  {plate}
                </div>
              ))}
            </div>

            {/* Dynamic CTA */}
            <a
              href="tel:+34947000000"
              className="flex items-center justify-between w-full md:w-auto px-8 py-4 bg-transparent border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-widest font-bold hover:bg-[#c5a059] hover:text-black transition-all group"
            >
              {codDaysStatus === "ACTIVE"
                ? "Reservar mi mesa ahora"
                : "Quiero que me avisen"}
              <ArrowRight
                size={16}
                className="ml-4 transition-transform group-hover:translate-x-2"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



