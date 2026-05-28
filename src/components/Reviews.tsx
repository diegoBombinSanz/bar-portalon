import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { restaurantData } from "../data/restaurant";

export default function Reviews() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#800020]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[#c5a059]/10 rounded-full mb-8 text-[#c5a059]"
        >
          <Quote size={32} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-serif text-[#f5f5f1] mb-20"
        >
          Lo que dicen nuestros clientes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {restaurantData.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/[0.03] border border-white/10 p-10 relative group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#c5a059"
                    className="text-[#c5a059]"
                  />
                ))}
              </div>
              <p className="text-[#f5f5f1]/80 italic text-xl font-light leading-relaxed mb-8">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#c5a059] uppercase tracking-widest text-[10px] font-bold">
                  {review.user}
                </span>
                <span className="w-12 h-[1px] bg-white/10 group-hover:bg-[#c5a059] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center"
        >
          <p className="text-[#f5f5f1]/40 text-xs uppercase tracking-widest mb-6">
            Basado en opiniones reales en Google y TripAdvisor
          </p>
          <div className="flex items-center gap-4 text-white/20">
            <span className="text-xl font-serif">TripAdvisor</span>
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="text-xl font-serif">Google Maps</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



