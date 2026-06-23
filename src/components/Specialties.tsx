import { useState } from "react";
import { specialties } from "../data/specialties";
import AllergenBadges, { type AllergenKey } from "./AllergenBadges";

const INITIAL_ITEMS = 6;

export default function Specialties() {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? specialties
    : specialties.slice(0, INITIAL_ITEMS);

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

        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#800020]/80">
            📦 Algunas especialidades pueden encargarse para llevar
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article key={item.id} className="group">
              <div className="relative mb-8 aspect-[3/4] overflow-hidden shadow-2xl">
                {item.takeaway && (
                  <div className="absolute right-4 top-4 z-20">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-[#c5a059] bg-[#F7F4EF]/95 shadow-xl backdrop-blur-sm">
                      <span className="text-lg">📦</span>
                      <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-[#800020]">
                        Llevar
                      </span>
                    </div>
                  </div>
                )}

                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center border border-[#c5a059]/30 bg-gradient-to-br from-[#F7F4EF] to-[#EFE8DC] p-8 text-center">
                    <div>
                      <div className="mb-4 text-5xl">🍽️</div>
                      <p className="font-serif text-2xl text-[#800020]">
                        {item.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="mb-4 font-serif text-2xl text-[#2A241D] transition-colors group-hover:text-[#800020]">
                {item.name}
              </h3>

              <p className="mb-4 font-light leading-relaxed text-[#2A241D]/70">
                {item.description}
              </p>

              <AllergenBadges
                allergens={item.allergens as AllergenKey[]}
                theme="light"
              />
            </article>
          ))}
        </div>

        {specialties.length > INITIAL_ITEMS && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-[#800020] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#800020] transition-all duration-300 hover:bg-[#800020] hover:text-white"
            >
              {showAll
                ? "Ver menos especialidades"
                : "Ver todas las especialidades"}
            </button>
          </div>
        )}

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
