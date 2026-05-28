import { ArrowLeft, MapPin } from "lucide-react";

import { restaurantData } from "../data/restaurant";

export default function LegalPage() {
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
          <h1 className="mb-4 font-serif text-4xl md:text-5xl">Aviso Legal</h1>
          <p className="text-white/70">Información legal del sitio web.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Titular del sitio web
          </h2>

          <p className="leading-relaxed text-white/85">
            Este sitio web es titularidad de{" "}
            <strong>{restaurantData.name}</strong>, con CIF/NIF{" "}
            <strong>{restaurantData.cif}</strong> y domicilio en:
          </p>

          <a
            href={restaurantData.location.googleMapsUrl}
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
            Teléfono de contacto: <strong>{restaurantData.contact.phone}</strong>
            <br />
            Email: <strong>{restaurantData.contact.email}</strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Objeto del sitio web
          </h2>

          <p className="leading-relaxed text-white/85">
            Este sitio web tiene carácter informativo y promocional sobre los
            servicios de restauración ofrecidos por el establecimiento,
            incluyendo carta, especialidades y datos de contacto.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Condiciones de uso
          </h2>

          <p className="leading-relaxed text-white/85">
            El acceso y uso de este sitio web atribuye la condición de usuario,
            implicando la aceptación de las condiciones aquí recogidas. El
            usuario se compromete a hacer un uso adecuado del sitio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c5a059]">
            Responsabilidad
          </h2>

          <p className="leading-relaxed text-white/85">
            El titular no se hace responsable del mal uso de los contenidos del
            sitio web ni de los daños derivados de su uso, interrupciones o
            errores técnicos.
          </p>
        </section>
      </div>
    </main>
  );
}
