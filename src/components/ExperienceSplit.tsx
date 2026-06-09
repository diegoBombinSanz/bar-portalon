import { ArrowRight, Beer, Utensils } from "lucide-react";

import restauranteImage from "../assets/restaurante-perf.jpg";
import barra from "../assets/re29-meals-Bar-El-Portalon-2025-03.jpg";
import type { SiteConfig } from "../data/siteConfig";

type CodDaysProps = {
  config?: SiteConfig;
};

export default function ExperienceSplit({ config }: CodDaysProps) {
  const barraVisible =
    config?.nav.links.find((section) => section.label === "La Barra")
      ?.visible ?? true;
  return (
    <section
      id="experiencia"
      className="flex min-h-[80vh] w-full flex-col bg-black md:flex-row"
    >
      <div
        id="bar"
        className="group relative flex w-full flex-col justify-end overflow-hidden p-8 md:w-1/2 md:p-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={barra}
              alt="Barra de Bar El Portalón"
              width={900}
              height={491}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[60%_center] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Oscurece únicamente la zona inferior */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#c5a059]">
            <Beer size={24} className="text-black" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            Pinchos & Raciones
          </p>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-[#f5f5f1] md:text-5xl">
            La Barra como punto de encuentro
          </h2>
          <p className="mb-8 max-w-md text-lg font-light text-[#f5f5f1]/80">
            Un ambiente informal y social donde el producto local se transforma
            en pequeños bocados de felicidad. Tapeo tradicional elevado a la
            excelencia.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
            <span>Social</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Dinámico</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Tradición</span>
          </div>
          {barraVisible && (
            <a
              href="/barra"
              className="relative z-20 mt-8 inline-flex min-h-11 items-center gap-2 border border-[#c5a059] bg-[#c5a059] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-[#d4b06a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              Ver La Barra <ArrowRight size={14} />
            </a>
          )}
        </div>
      </div>

      <div
        id="restaurante"
        className="group relative flex w-full flex-col justify-end overflow-hidden border-t border-white/10 p-8 md:w-1/2 md:border-l md:border-t-0 md:p-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={restauranteImage}
              alt="Comedor de Bar El Portalón"
              width={640}
              height={662}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradiente solo para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#800020]">
            <Utensils size={24} className="text-white" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            Cocina Elaborada
          </p>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-[#f5f5f1] md:text-5xl">
            Platos reconocidos por quienes vuelven
          </h2>
          <p className="mb-8 max-w-md text-lg font-light text-[#f5f5f1]/80">
            Experiencia gastronómica tranquila. Especialidades en bacalao,
            kokotxas y producto de temporada reinterpretado con respeto y
            técnica.
          </p>
          <a
            href="#especialidades"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a059] transition-[gap] hover:gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
          >
            Descubrir especialidades <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
