import { ArrowRight, Award, Calendar } from "lucide-react";

import bacalado from "../assets/feria-bacalado-perf.jpg";
import { restaurantData } from "../data/restaurant";

export default function CodDays() {
  const { codDaysStatus, codDaysConfig } = restaurantData;

  return (
    <section
      id="bacalao"
      className="relative overflow-hidden border-y border-[#c5a059]/20 bg-[#0f0f0f] py-24"
    >
      <div className="pointer-events-none absolute left-10 top-10 hidden select-none font-serif text-[10rem] text-white/[0.02] lg:block">
        BACALAO
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 border border-[#c5a059]/30 bg-[#1a1a1a] p-8 md:flex-row md:p-16">
          <div className="relative w-full md:w-1/2">
            <div className="group relative aspect-[4/5] overflow-hidden">
              <img
                src={bacalado}
                alt="Bacalao de Bar El Portalón"
                width={700}
                height={336}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -left-4 -top-4 bg-[#800020] px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl">
              {codDaysStatus === "COMING_SOON"
                ? "Próximamente"
                : codDaysStatus === "ACTIVE"
                  ? "Evento en curso"
                  : "Última edición"}
            </div>
          </div>

          <div className="flex w-full flex-col justify-center md:w-1/2">
            <span className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a059]">
              <Calendar size={14} aria-hidden="true" /> {codDaysConfig.dates}
            </span>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-[#f5f5f1] md:text-5xl">
              {codDaysConfig.title}
            </h2>

            <p className="mb-8 text-lg font-light italic leading-relaxed text-[#f5f5f1]/70">
              {codDaysStatus === "COMING_SOON"
                ? codDaysConfig.teaser
                : codDaysStatus === "ACTIVE"
                  ? codDaysConfig.activeMessage
                  : codDaysConfig.pastMessage}
            </p>

            <div className="mb-10 space-y-4">
              {codDaysConfig.featuredPlates.map((plate) => (
                <div
                  key={plate}
                  className="flex items-center gap-3 border-b border-white/5 pb-2 text-sm font-light text-[#f5f5f1]/90"
                >
                  <Award
                    size={14}
                    className="text-[#c5a059]"
                    aria-hidden="true"
                  />
                  {plate}
                </div>
              ))}
            </div>

            <a
              href="tel:+34947000000"
              className="flex min-h-11 w-full items-center justify-between border border-[#c5a059] bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#c5a059] transition-colors hover:bg-[#c5a059] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] md:w-auto"
            >
              {codDaysStatus === "ACTIVE"
                ? "Reservar mi mesa ahora"
                : "Quiero que me avisen"}
              <ArrowRight size={16} className="ml-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
