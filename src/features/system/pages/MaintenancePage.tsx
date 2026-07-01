import { CalendarDays, MapPin, Phone, Sparkles } from "lucide-react";
import { getMaintenanceConfig } from "../services/systemStatus";

export default function MaintenancePage() {
  const maintenance = getMaintenanceConfig();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.24),_transparent_35%),linear-gradient(135deg,_#080706_0%,_#15110d_45%,_#0b0b0b_100%)] px-4 py-8 text-[#f5f5f1] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-[#C5A059]/20 bg-black/40 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="grid flex-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-sm font-medium text-[#f2d7a1]">
              <Sparkles size={16} />
              Modo mantenimiento
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {maintenance.title || "Estamos preparando algo especial"}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#ddd4c4]">
              {maintenance.subtitle || "Pronto volveremos con una experiencia renovada."}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#c8c0b2]">
              {maintenance.message || "Estamos mejorando el sitio para ofrecerte una experiencia más fluida y cuidada."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {maintenance.showPhone ? (
                <a
                  href="tel:+34947123456"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
                >
                  <Phone size={16} />
                  Llamar
                </a>
              ) : null}
              {maintenance.showContactButton ? (
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d4b06a]"
                >
                  <CalendarDays size={16} />
                  Volver al inicio
                </a>
              ) : null}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-medium text-[#f2d7a1]">
                <CalendarDays size={18} />
                <span>Fecha estimada</span>
              </div>
              <p className="mt-2 text-lg text-[#f5f5f1]">
                {maintenance.estimatedReturn || "Próximamente"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] border border-[#C5A059]/20 bg-[#0f0b08]/80 p-6 shadow-2xl shadow-black/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[#C5A059]">
                    Bar El Portalón
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#f5f5f1]">
                    Estamos mejorando la experiencia
                  </p>
                </div>
                <div className="rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 p-3 text-[#C5A059]">
                  <Sparkles size={20} />
                </div>
              </div>

              <div className="space-y-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm text-[#ddd4c4]">
                  <MapPin size={16} className="text-[#C5A059]" />
                  <span>Roa, Burgos</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#C5A059] to-[#f1c777]" />
                </div>
                <p className="text-sm leading-7 text-[#c8c0b2]">
                  Gracias por tu paciencia. Estamos afinando cada detalle para que tu próxima visita sea aún mejor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
