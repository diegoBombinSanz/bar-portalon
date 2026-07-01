import { ArrowLeft, Home } from "lucide-react";
import ErrorLayout from "../components/ErrorLayout";

export default function Error400Page() {
  return (
    <ErrorLayout
      code="400"
      title="Solicitud incorrecta"
      subtitle="La petición no pudo procesarse. Revisa la dirección o vuelve al inicio para continuar navegando."
      actions={
        <>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d4b06a]"
          >
            <Home size={16} />
            Inicio
          </a>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Volver atrás
          </button>
        </>
      }
      illustration={
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.25rem] border border-[#C5A059]/30 bg-[#17130c] p-6 text-center">
          <div className="mb-4 rounded-full bg-[#C5A059]/20 p-4 text-[#C5A059]">
            <ArrowLeft size={28} />
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#C5A059]">
            Error de solicitud
          </p>
          <p className="mt-3 text-sm leading-7 text-[#ddd4c4]">
            El contenido solicitado no pudo completarse correctamente.
          </p>
        </div>
      }
    />
  );
}
