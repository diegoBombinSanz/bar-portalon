import { ArrowLeft, MapPin } from "lucide-react";

import { restaurantData } from "../data/restaurant";
import type { SiteConfig } from "../data/siteConfig";

type PrivacyPageProps = {
  config?: SiteConfig;
};

export default function PrivacyPage({ config }: PrivacyPageProps) {
  const mapsUrl = config?.contact?.googleMapsUrl ?? restaurantData.location.googleMapsUrl;

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-[#f5f5f1]">
      <div className="mx-auto max-w-4xl space-y-10">
        <a
          href="/"
          className="fixed left-6 top-6 flex min-h-11 items-center gap-2 text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Volver
        </a>

        <header>
          <h1 className="mb-4 font-serif text-4xl md:text-5xl">
            Política de Privacidad
          </h1>
          <p className="text-white/70">
            Información sobre el tratamiento de datos personales.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Responsable del tratamiento
          </h2>

          <p className="leading-relaxed text-white/85">
            <strong>{restaurantData.name}</strong>, con CIF/NIF{" "}
            <strong>{restaurantData.cif}</strong>, domicilio en:
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-md gap-2 text-white/85 transition-colors hover:text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
          >
            <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
            <span>
              <strong className="block">{restaurantData.location.address}</strong>
              <span className="text-sm text-white/70">
                {restaurantData.location.city},{" "}
                {restaurantData.location.province}
              </span>
            </span>
          </a>

          <p className="text-white/85">
            Email de contacto: <strong>{restaurantData.contact.email}</strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Qué datos recogemos
          </h2>

          <p className="leading-relaxed text-white/85">
            Este sitio web no dispone de formularios ni sistemas de registro.
            Únicamente se utilizan los datos que el usuario facilita
            voluntariamente a través de llamada telefónica o contacto directo.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Finalidad del tratamiento
          </h2>

          <p className="leading-relaxed text-white/85">
            Los datos se utilizan exclusivamente para atender consultas y
            gestionar reservas realizadas por vía telefónica.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Base legal
          </h2>

          <p className="leading-relaxed text-white/85">
            El tratamiento se basa en el consentimiento del interesado al
            contactar voluntariamente con el establecimiento.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Conservación de datos
          </h2>

          <p className="leading-relaxed text-white/85">
            Los datos no se almacenan en bases de datos ni sistemas
            automatizados. Se utilizan únicamente durante la gestión de la
            consulta o reserva.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Derechos del usuario
          </h2>

          <p className="leading-relaxed text-white/85">
            El usuario puede ejercer sus derechos de acceso, rectificación y
            supresión contactando directamente al email indicado anteriormente.
          </p>
        </section>
      </div>
    </main>
  );
}
