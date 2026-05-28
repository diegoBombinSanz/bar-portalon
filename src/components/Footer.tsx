import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { restaurantData } from "../data/restaurant";

export default function Footer() {
  const { location, contact } = restaurantData;

  return (
    <footer className="bg-[#0f0f0f] text-[#f5f5f1] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-serif tracking-widest mb-6">
            EL PORTALÓN
          </h2>
          <p className="text-[#f5f5f1]/60 font-light leading-relaxed mb-8">
            Cocina tradicional reinterpretada con el mejor producto de Roa y de
            nuestra tierra.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-[#c5a059] uppercase tracking-widest text-[10px] font-bold mb-8">
            Dónde estamos
          </h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-[#c5a059] shrink-0" />
              <p className="font-light text-[#f5f5f1]/80">
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
              className="inline-block text-[10px] uppercase tracking-widest text-[#c5a059] hover:opacity-70"
            >
              Cómo llegar →
            </a>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h4 className="text-[#c5a059] uppercase tracking-widest text-[10px] font-bold mb-8">
            Horario
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-[#c5a059] shrink-0" />
              <p className="font-light text-[#f5f5f1]/80">
                Martes a Domingo
                <br />
                11:00 — 16:30
                <br />
                20:00 — 00:00
              </p>
            </div>
            <p className="text-[#f5f5f1]/40 text-[10px] uppercase tracking-widest">
              Cerrado Lunes por descanso
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#c5a059] uppercase tracking-widest text-[10px] font-bold mb-8">
            Reservas
          </h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-[#c5a059] shrink-0" />
              <p className="text-xl font-serif">{contact.phone}</p>
            </div>
            <p className="font-light text-[#f5f5f1]/60 text-sm">
              Para garantizar tu mesa, recomendamos llamar con antelación,
              especialmente fines de semana.
            </p>
            <a
              href="tel:+34947000000"
              className="block text-center px-6 py-4 bg-[#c5a059] text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#b08d4a] transition-all"
            >
              Llamar ahora
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
          © 2026 Bar El Portalón — Todos los derechos reservados
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-[#f5f5f1]/40">
          <a href="/aviso" className="hover:text-[#f5f5f1] transition-colors">
            Aviso Legal
          </a>
          <a href="/politica" className="hover:text-[#f5f5f1] transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}



