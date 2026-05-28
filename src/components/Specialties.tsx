import { motion } from "framer-motion";
import { restaurantData } from "../data/restaurant";

export default function Specialties() {
  return (
    <section id="especialidades" className="py-24 bg-[#f5f5f1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#800020] uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Nuestros Imprescindibles
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-[#0f0f0f]"
          >
            Sabor y Producto
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {restaurantData.specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-8 shadow-2xl relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-serif text-[#0f0f0f] mb-4 group-hover:text-[#800020] transition-colors">
                {item.name}
              </h3>
              <p className="text-[#0f0f0f]/70 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[#0f0f0f]/60 italic font-light max-w-2xl mx-auto text-lg">
            "No tenemos una carta cerrada, preferimos recomendarte lo mejor de
            nuestra cocina según el producto fresco del día."
          </p>
        </div>
      </div>
    </section>
  );
}



