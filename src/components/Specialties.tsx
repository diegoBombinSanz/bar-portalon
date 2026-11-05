
import { useMemo, useState } from "react";
import { specialties } from "../data/specialties";
import SpecialtyCard from "./SpecialtyCard";

type SpecialtyFilter = "all" | "takeaway";

export default function Specialties() {
  const [activeFilter, setActiveFilter] =
    useState<SpecialtyFilter>("all");

  const takeawayCount = useMemo(
    () =>
      specialties.filter(
        (item) => "takeaway" in item && item.takeaway === true
      ).length,
    []
  );

  const visibleItems = useMemo(
    () =>
      activeFilter === "takeaway"
        ? specialties.filter(
            (item) => "takeaway" in item && item.takeaway === true
          )
        : specialties,
    [activeFilter]
  );

  const filters: {
    id: SpecialtyFilter;
    label: string;
    count: number;
  }[] = [
    {
      id: "all",
      label: "Todas",
      count: specialties.length,
    },
    {
      id: "takeaway",
      label: "Para llevar",
      count: takeawayCount,
    },
  ];

  return (
    <section
      id="especialidades"
      className="bg-[#F7F4EF] py-16 md:py-20"
      aria-labelledby="specialties-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Cabecera */}
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A783D] sm:text-xs">
            El sabor de El Portalón
          </span>

          <h2
            id="specialties-title"
            className="font-serif text-4xl text-[#2A241D] sm:text-5xl md:text-6xl"
          >
            Nuestra cocina
          </h2>

          <div className="mx-auto my-5 h-px w-16 bg-[#c5a059]" />

          <p className="text-sm leading-relaxed text-[#5F564C] sm:text-base">
            Descubre algunas de nuestras especialidades y propuestas
            de cocina, elaboradas con el cuidado por el producto
            y la tradición que nos caracteriza.
          </p>
        </header>

        {/* Filtros */}
        <div className="mb-6 border-b border-[#c5a059]/25 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="font-serif text-xl text-[#2A241D]">
                Nuestras especialidades
              </h3>

              <p className="mt-1 text-xs text-[#5F564C]/80">
                {activeFilter === "all"
                  ? `${specialties.length} propuestas`
                  : `${visibleItems.length} especialidades para llevar`}
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filtrar especialidades"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={isActive}
                    className={`
                      inline-flex min-h-10 items-center gap-2
                      rounded-full border px-4 py-2
                      text-xs font-semibold tracking-wide
                      transition-colors duration-200
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#c5a059]
                      focus-visible:ring-offset-2
                      ${
                        isActive
                          ? "border-[#c5a059] bg-[#c5a059] text-white"
                          : "border-[#c5a059]/40 bg-transparent text-[#5F564C] hover:border-[#c5a059] hover:text-[#9A783D]"
                      }
                    `}
                  >
                    <span>{filter.label}</span>

                    <span
                      className={`
                        flex h-5 min-w-5 items-center justify-center
                        rounded-full px-1 text-[10px]
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#c5a059]/15 text-[#9A783D]"
                        }
                      `}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeFilter === "all" && takeawayCount > 0 && (
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#9A783D]/70">
              <span
                className="mt-0.5 shrink-0 font-bold"
                aria-hidden="true"
              >
                ↗
              </span>
              <span>
                Algunas de nuestras especialidades también
                están disponibles para llevar. Identifícalas
                con su distintivo.
              </span>
            </p>
          )}
        </div>

        {/* Especialidades */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 md:gap-4"
          aria-live="polite"
        >
          {visibleItems.map((item) => (
            <SpecialtyCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mensaje final */}
        <footer className="mt-12 border-t border-[#c5a059]/25 pt-8 text-center md:mt-16">
          <p className="mx-auto max-w-2xl font-serif text-lg italic leading-relaxed text-[#2A241D]/75 sm:text-xl">
            No tenemos una carta cerrada. Nos gusta recomendarte
            lo mejor de nuestra cocina según el producto fresco
            y las propuestas de cada día.
          </p>

          <p className="mt-3 text-xs text-[#5F564C]/75">
            Consulta con nuestro equipo la disponibilidad de las
            especialidades y las opciones para llevar.
          </p>
        </footer>
      </div>
    </section>
  );
}
