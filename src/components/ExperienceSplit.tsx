
import { ArrowRight, Beer, Utensils } from "lucide-react";

import restauranteImage from "../assets/restaurante-perf.jpg";
import barra from "../assets/barra_opcion2.jpg";
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
      className="grid w-full grid-cols-1 bg-[#0f0f0f] md:grid-cols-2"
    >
      {/* LA BARRA */}
      <article
        id="bar"
        className="group relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden sm:min-h-[620px] lg:min-h-[680px]"
      >
        {/* Fotografía */}
        <img
          src={barra}
          alt="Selección de pinchos y raciones de la barra de El Portalón"
          width={900}
          height={491}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center] transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />

        {/* Degradado uniforme para legibilidad */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

        {/* Contenido */}
        <div className="w-full max-w-2xl px-7 pb-12 pt-20 sm:px-10 sm:pb-14 lg:px-12 lg:pb-16 xl:px-16">
          <div className="mb-7 flex h-11 w-11 items-center justify-center bg-[#c5a059]">
            <Beer
              size={22}
              strokeWidth={1.8}
              className="text-black"
              aria-hidden="true"
            />
          </div>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c5a059]">
            Pinchos & Raciones
          </p>

          <h2 className="mb-5 max-w-lg font-serif text-4xl leading-[1.08] text-[#f5f5f1] sm:text-5xl lg:text-[3.4rem]">
            La barra, el sabor de cada encuentro
          </h2>

          <p className="mb-7 max-w-md text-base font-light leading-relaxed text-white/85 sm:text-lg">
            Pinchos fríos y calientes, raciones y una amplia variedad de
            propuestas para disfrutar del tapeo en un ambiente cercano y
            acogedor.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b16d]">
            <span>Tradición</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Variedad</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Encuentro</span>
          </div>

          {barraVisible && (
            <a
              href="/barra"
              className="inline-flex min-h-12 items-center gap-3 border border-[#c5a059] bg-[#c5a059] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition-colors duration-300 hover:border-[#f5f5f1] hover:bg-[#f5f5f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              Descubrir la barra
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </article>

      {/* RESTAURANTE */}
      <article
        id="restaurante"
        className="group relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden border-t border-white/10 md:border-l md:border-t-0 sm:min-h-[620px] lg:min-h-[680px]"
      >
        {/* Fotografía */}
        <img
          src={restauranteImage}
          alt="Platos elaborados de la cocina de El Portalón"
          width={640}
          height={662}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />

        {/* Degradado uniforme */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

        {/* Contenido */}
        <div className="w-full max-w-2xl px-7 pb-12 pt-20 sm:px-10 sm:pb-14 lg:px-12 lg:pb-16 xl:px-16">
          <div className="mb-7 flex h-11 w-11 items-center justify-center bg-[#800020]">
            <Utensils
              size={22}
              strokeWidth={1.8}
              className="text-white"
              aria-hidden="true"
            />
          </div>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c5a059]">
            Cocina Elaborada
          </p>

          <h2 className="mb-5 max-w-lg font-serif text-4xl leading-[1.08] text-[#f5f5f1] sm:text-5xl lg:text-[3.4rem]">
            Cocina que invita a volver
          </h2>

          <p className="mb-7 max-w-md text-base font-light leading-relaxed text-white/85 sm:text-lg">
            Especialidades en bacalao, kokotxas y producto de temporada.
            Una cocina tradicional elaborada con cuidado, respeto y personalidad.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b16d]">
            <span>Producto</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Tradición</span>
            <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
            <span>Elaboración</span>
          </div>

          <a
            href="#especialidades"
            className="inline-flex min-h-12 items-center gap-3 border-b border-[#c5a059]/60 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#c5a059] transition-all duration-300 hover:gap-5 hover:border-[#f5f5f1] hover:text-[#f5f5f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
          >
            Descubrir especialidades
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </article>
    </section>
  );
}
