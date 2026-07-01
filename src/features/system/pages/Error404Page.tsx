import { Home, MapPinned, Menu } from "lucide-react";
import ErrorLayout from "../components/ErrorLayout";

export default function Error404Page() {
  return (
    <ErrorLayout
      code="404"
      title="La página no existe"
      subtitle="No encontramos la dirección que buscas. Puedes volver a la home, ver la carta o contactar con nosotros."
      actions={
        <>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d4b06a]"
          >
            <Home size={16} />
            Inicio
          </a>
          <a
            href="/barra"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
          >
            <Menu size={16} />
            Carta
          </a>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
          >
            <MapPinned size={16} />
            Contacto
          </a>
        </>
      }
      illustration={
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.25rem] border border-[#C5A059]/30 bg-[#17130c] p-6 text-center">
          <div className="mb-4 rounded-full bg-[#C5A059]/20 p-4 text-[#C5A059]">
            <Menu size={28} />
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#C5A059]">
            Ruta no encontrada
          </p>
          <p className="mt-3 text-sm leading-7 text-[#ddd4c4]">
            La página solicitada no está disponible en este momento.
          </p>
        </div>
      }
    />
  );
}
