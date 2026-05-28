import { ArrowLeft, MapPin } from "lucide-react";
import { restaurantData } from "../data/restaurant";

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Política de Privacidad
          </h1>
          <p className="text-white/60">
            Información sobre el tratamiento de datos personales.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Responsable del tratamiento
          </h2>

          <p className="text-white/80 leading-relaxed">
            <strong>{restaurantData.name}</strong>, con CIF/NIF{" "}
            <strong>{restaurantData.cif}</strong>, domicilio en{" "}
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
            Email de contacto: <strong>{restaurantData.contact.email}</strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Qué datos recogemos
          </h2>

          <p className="text-white/80 leading-relaxed">
            Este sitio web no dispone de formularios ni sistemas de registro.
            Únicamente se utilizan los datos que el usuario facilita
            voluntariamente a través de llamada telefónica o contacto directo.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Finalidad del tratamiento
          </h2>

          <p className="text-white/80 leading-relaxed">
            Los datos se utilizan exclusivamente para atender consultas y
            gestionar reservas realizadas por vía telefónica.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Base legal
          </h2>

          <p className="text-white/80 leading-relaxed">
            El tratamiento se basa en el consentimiento del interesado al
            contactar voluntariamente con el establecimiento.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Conservación de datos
          </h2>

          <p className="text-white/80 leading-relaxed">
            Los datos no se almacenan en bases de datos ni sistemas
            automatizados. Se utilizan únicamente durante la gestión de la
            consulta o reserva.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#c5a059] uppercase tracking-widest">
            Derechos del usuario
          </h2>

          <p className="text-white/80 leading-relaxed">
            El usuario puede ejercer sus derechos de acceso, rectificación y
            supresión contactando directamente al email indicado anteriormente.
          </p>
        </section>
      </div>
    </main>
  );
}
