import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { restaurantData } from "../data/restaurant";

export default function Footer() {
  const { location, contact } = restaurantData;

  return (
    <footer className="border-t border-white/5 bg-[#0f0f0f] pb-12 pt-24 text-[#f5f5f1]">
      <div className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-4">
        <div>
          <p className="mb-6 font-serif text-3xl tracking-widest">
            EL PORTALÓN
          </p>
          <p className="mb-8 font-light leading-relaxed text-[#f5f5f1]/75">
            Cocina tradicional reinterpretada con el mejor producto de Roa y de
            nuestra tierra.
          </p>
          <div className="flex gap-4">
            <a
              href={`mailto:${contact.email}`}
              aria-label="Enviar email"
              className="flex h-11 w-11 items-center justify-center border border-white/20 transition-colors hover:border-[#c5a059] hover:text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
            <a
              href={contact.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver opiniones en TripAdvisor"
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-xs font-bold transition-colors hover:border-[#c5a059] hover:text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              TA
            </a>
          </div>
        </div>

        <section aria-labelledby="footer-location">
          <h2
            id="footer-location"
            className="mb-8 text-[10px] font-bold uppercase tracking-widest text-[#c5a059]"
          >
            Dónde estamos
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin
                size={20}
                className="shrink-0 text-[#c5a059]"
                aria-hidden="true"
              />
              <p className="font-light text-[#f5f5f1]/85">
                {location.address}
                <br />
                {location.city}, {location.province}
                <br />
                España
              </p>
            </div>
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[10px] uppercase tracking-widest text-[#c5a059] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              Cómo llegar
            </a>
          </div>
        </section>

        <section aria-labelledby="footer-hours">
          <h2
            id="footer-hours"
            className="mb-8 text-[10px] font-bold uppercase tracking-widest text-[#c5a059]"
          >
            Horario
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Clock
                size={20}
                className="shrink-0 text-[#c5a059]"
                aria-hidden="true"
              />
              <p className="font-light text-[#f5f5f1]/85">
                Martes a Domingo
                <br />
                11:00 - 16:30
                <br />
                20:00 - 00:00
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/65">
              Cerrado lunes por descanso
            </p>
          </div>
        </section>

        <section aria-labelledby="footer-booking">
          <h2
            id="footer-booking"
            className="mb-8 text-[10px] font-bold uppercase tracking-widest text-[#c5a059]"
          >
            Reservas
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone
                size={20}
                className="shrink-0 text-[#c5a059]"
                aria-hidden="true"
              />
              <p className="font-serif text-xl">{contact.phone}</p>
            </div>
            <p className="text-sm font-light text-[#f5f5f1]/75">
              Para garantizar tu mesa, recomendamos llamar con antelación,
              especialmente fines de semana.
            </p>
            <a
              href="tel:+34947000000"
              className="block min-h-11 bg-[#c5a059] px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#b08d4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              Llamar ahora
            </a>
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/5 px-6 pt-12 md:flex-row">
        <p className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/65">
          © 2026 Bar El Portalón - Todos los derechos reservados
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-[#f5f5f1]/65">
          <a href="/aviso" className="transition-colors hover:text-[#f5f5f1]">
            Aviso Legal
          </a>
          <a
            href="/politica"
            className="transition-colors hover:text-[#f5f5f1]"
          >
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
