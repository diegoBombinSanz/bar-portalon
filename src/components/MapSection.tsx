import { useEffect, useRef, useState } from "react";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";

const mapUrl =
  "https://maps.google.com/maps?q=Plaza+Mayor+14+Roa+Burgos+Spain&output=embed&z=16&hl=es";

const mapsLink =
  "https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos";

const infoItems = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Plaza Mayor, 14",
    sub: "09300 Roa, Burgos",
    href: mapsLink,
    linkText: "Cómo llegar",
  },
  {
    icon: Phone,
    label: "Reservas",
    value: "+34 947 000 000",
    sub: "Lunes a Domingo",
    href: "tel:+34947000000",
    linkText: "Llamar ahora",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "9:00 - 23:30",
    sub: "Abierto todos los días",
    href: null,
    linkText: null,
  },
];

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    const element = mapRef.current;

    if (!element || shouldLoadMap) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  return (
    <section
      id="contacto"
      className="bg-[#0d0d0d] pb-0 pt-24"
      aria-label="Ubicación y contacto"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c5a059]">
          Encuéntranos
        </p>
        <h2 className="mb-6 font-serif text-4xl leading-tight text-[#f5f5f1] md:text-5xl">
          En el corazón de Roa
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-[#f5f5f1]/55">
          Junto a la histórica Plaza Mayor de Roa, a pasos del Ayuntamiento y
          con vistas al corazón de la Ribera del Duero burgalesa.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="flex flex-col gap-3 rounded-sm border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-[#c5a059]/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/30">
                  <Icon size={18} color="#c5a059" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#f5f5f1]/70">
                    {item.label}
                  </p>
                  <p className="font-serif text-lg text-[#f5f5f1]">
                    {item.value}
                  </p>
                  <p className="text-sm text-[#f5f5f1]/50">{item.sub}</p>
                </div>
                {item.href && item.linkText && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center gap-1 text-xs uppercase tracking-wider text-[#c5a059] transition-colors hover:text-[#d4b06a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
                  >
                    {item.linkText}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div ref={mapRef} className="relative h-[420px] w-full bg-[#151515]">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-[#0d0d0d] to-transparent" />

        {shouldLoadMap ? (
          <iframe
            title="Ubicación Bar El Portalón en Roa"
            src={mapUrl}
            width="100%"
            height="100%"
            className="block border-0 grayscale-[0.3] contrast-105"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button
            type="button"
            onClick={() => setShouldLoadMap(true)}
            className="flex h-full w-full items-center justify-center bg-[#151515] text-xs font-bold uppercase tracking-widest text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#c5a059]"
          >
            Cargar mapa
          </button>
        )}

        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 left-1/2 z-20 flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-xl transition-colors hover:bg-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
        >
          <ExternalLink size={14} aria-hidden="true" />
          Abrir en Google Maps
        </a>
      </div>
    </section>
  );
}
