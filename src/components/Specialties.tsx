import bacalado from "../assets/bacalado-taberna-perf.jpg";
import cocochas from "../assets/cocochas-perf.jpg";
import gambas from "../assets/gambas-perf.jpg";

const specialties = [
  {
    id: 1,
    name: "Bacalao Tradicional",
    description:
      "Nuestra seña de identidad. Elaborado con paciencia y el mejor producto.",
    image: bacalado,
    width: 640,
    height: 650,
  },
  {
    id: 2,
    name: "Kokotxas de Calidad",
    description: "Textura sedosa y sabor intenso. Un clásico que nunca falta.",
    image: cocochas,
    width: 640,
    height: 666,
  },
  {
    id: 3,
    name: "Gambas de Lonja",
    description:
      "Producto fresco seleccionado diariamente para garantizar la excelencia.",
    image: gambas,
    width: 640,
    height: 640,
  },
];

export default function Specialties() {
  return (
    <section id="especialidades" className="overflow-hidden bg-[#F7F4EF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#800020]">
            Nuestros Imprescindibles
          </span>
          <h2 className="font-serif text-4xl text-[#2A241D] md:text-6xl">
            Sabor y Producto
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[#c5a059]" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {specialties.map((item) => (
            <article key={item.id} className="group">
              <div className="relative mb-8 aspect-[3/4] overflow-hidden shadow-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
              </div>
              <h3 className="mb-4 font-serif text-2xl text-[#2A241D] transition-colors group-hover:text-[#800020]">
                {item.name}
              </h3>
              <p className="font-light leading-relaxed text-[#2A241D]/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="mx-auto max-w-2xl text-lg font-light italic text-[#2A241D]/60">
            "No tenemos una carta cerrada, preferimos recomendarte lo mejor de
            nuestra cocina según el producto fresco del día."
          </p>
        </div>
      </div>
    </section>
  );
}
