import { ArrowLeft, MapPin } from "lucide-react";
import { restaurantData } from "../data/restaurant";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f1] px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="fixed top-6 left-6 flex items-center gap-2 text-white/70 hover:text-[#c5a059] transition-all duration-300 ease-in-out group">
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <a
            href="/"
            className="text-sm uppercase tracking-widest transition-all duration-300"
          >
            Volver
          </a>
        </div>

        <header>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Aviso Legal</h1>
          <p className="text-white/60">Información legal del sitio web.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Titular del sitio web
          </h2>

          <p className="text-white/80 leading-relaxed">
            Este sitio web es titularidad de{" "}
            <strong>{restaurantData.name}</strong>, con CIF/NIF
            <strong> {restaurantData.cif}</strong> y domicilio en{" "}
            <a
              href={restaurantData.location.googleMapsUrl}
              target="_blank"
              className="flex gap-2 hover:text-[#c5a059] transition-colors"
            >
              <MapPin size={16} className="mt-1" />

              <div>
                <p className="font-semibold">
                  {restaurantData.location.address}
                </p>
                <p className="text-sm text-white/60">
                  {restaurantData.location.city},{" "}
                  {restaurantData.location.province}
                </p>
              </div>
            </a>
          </p>

          <p className="text-white/80">
            Teléfono de contacto: <strong>{restaurantData.contact.phone}</strong>
            <br />
            Email: <strong>{restaurantData.contact.email}</strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Objeto del sitio web
          </h2>

          <p className="text-white/80 leading-relaxed">
            Este sitio web tiene carácter informativo y promocional sobre los
            servicios de restauración ofrecidos por el establecimiento,
            incluyendo carta, especialidades y datos de contacto.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Condiciones de uso
          </h2>

          <p className="text-white/80 leading-relaxed">
            El acceso y uso de este sitio web atribuye la condición de usuario,
            implicando la aceptación de las condiciones aquí recogidas. El
            usuario se compromete a hacer un uso adecuado del sitio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Responsabilidad
          </h2>

          <p className="text-white/80 leading-relaxed">
            El titular no se hace responsable del mal uso de los contenidos del
            sitio web ni de los daños derivados de su uso, interrupciones o
            errores técnicos.
          </p>
        </section>
      </div>
    </main>
  );
}
