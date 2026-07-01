import { Home, Mail, RefreshCw } from "lucide-react";
import ErrorLayout from "../components/ErrorLayout";
import { getErrorConfig } from "../services/systemStatus";

export default function Error500Page({ errorId }: { errorId?: string }) {
  const errorConfig = getErrorConfig();

  return (
    <ErrorLayout
      code="500"
      title="Ha ocurrido un problema interno"
      subtitle="El sistema ha encontrado un error inesperado. Puedes reintentar o volver al inicio."
      actions={
        <>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d4b06a]"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
          >
            <Home size={16} />
            Inicio
          </a>
          {errorConfig.supportEmail ? (
            <a
              href={`mailto:${errorConfig.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f5f5f1] transition hover:bg-white/15"
            >
              <Mail size={16} />
              Contactar
            </a>
          ) : null}
        </>
      }
      illustration={
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.25rem] border border-[#C5A059]/30 bg-[#17130c] p-6 text-center">
          <div className="mb-4 rounded-full bg-[#C5A059]/20 p-4 text-[#C5A059]">
            <RefreshCw size={28} />
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#C5A059]">
            Error inesperado
          </p>
          <p className="mt-3 text-sm leading-7 text-[#ddd4c4]">
            Nuestro equipo ya ha sido notificado y estamos trabajando para resolverlo.
          </p>
          {errorConfig.showErrorId && errorId ? (
            <p className="mt-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#f2d7a1]">
              ID: {errorId}
            </p>
          ) : null}
        </div>
      }
    />
  );
}
