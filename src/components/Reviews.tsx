
import { useEffect, useState } from "react";
import { Quote, Star, X, ArrowUpRight, MessageCircle } from "lucide-react";

import { restaurantData } from "../data/restaurant";

const GOOGLE_REVIEW_URL = "https://g.page/r/CY_QAqEt8s5tEAE/review";

export default function Reviews() {
  const [qrOpen, setQrOpen] = useState(false);

  // Cerrar modal con Escape
  useEffect(() => {
    if (!qrOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [qrOpen]);

  return (
    <>
      <section
        id="opiniones"
        className="relative overflow-hidden bg-[#EFE9DF] py-20 sm:py-24"
      >
        {/* Decoración de fondo */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#800020]/10 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a059]/10 text-[#c5a059]">
            <Quote size={32} aria-hidden="true" />
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a059]">
            La experiencia de nuestros clientes
          </p>

          <h2 className="mb-5 font-serif text-3xl text-[#2A241D] md:text-5xl">
            Lo que dicen nuestros clientes
          </h2>

          <p className="mx-auto mb-16 max-w-xl text-sm font-light leading-relaxed text-[#2A241D]/70">
            Cada visita cuenta una historia. Estas son algunas de las
            experiencias que nuestros clientes han querido compartir.
          </p>

          {/* Reseñas dinámicas */}
          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {restaurantData.reviews.map((review, index) => (
              <article
                key={`${review.user}-${index}`}
                className="group flex h-full flex-col justify-between border border-[#2A241D]/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-10"
              >
                <div>
                  <div
                    className="mb-6 flex gap-1"
                    role="img"
                    aria-label={`${review.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        fill="#c5a059"
                        className="text-[#c5a059]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="mb-8 font-serif text-lg italic leading-relaxed text-[#2A241D]/85 sm:text-xl">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#2A241D]/10 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                    {review.user}
                  </span>

                  <span className="h-px w-12 bg-[#c5a059]/40 transition-all group-hover:w-20" />
                </div>
              </article>
            ))}
          </div>

          {/* Invitación a dejar una reseña */}
          <div className="mt-20 border-t border-[#2A241D]/10 pt-12">
            <p className="mb-3 font-serif text-2xl text-[#2A241D] sm:text-3xl">
              ¿Has disfrutado de El Portalón?
            </p>

            <p className="mx-auto mb-7 max-w-lg text-sm font-light leading-relaxed text-[#2A241D]/70">
              Nos encanta saber cómo ha sido tu experiencia.
              No te vayas sin dejarnos tu reseña. ¡Tu opinión
              nos ayuda a seguir mejorando!
            </p>

            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="inline-flex min-h-12 items-center gap-3 bg-[#800020] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#600018] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Dejar mi reseña
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>

            <div className="mt-8 flex items-center justify-center gap-4 text-[#2A241D]/60">
              <span className="font-serif text-lg">Google</span>
              <span className="h-1 w-1 rounded-full bg-[#c5a059]" />
              <span className="font-serif text-lg">TripAdvisor</span>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP QR GOOGLE */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setQrOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            className="relative my-auto w-full max-w-md border border-[#c5a059]/30 bg-[#EFE9DF] px-7 py-10 text-center shadow-2xl sm:px-12"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Cerrar ventana"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#2A241D]/60 transition-colors hover:text-[#800020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]"
            >
              <X size={22} />
            </button>

            <div className="mb-5 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
                <Quote size={25} />
              </div>
            </div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a059]">
              Tu opinión nos importa
            </p>

            <h3
              id="review-modal-title"
              className="mb-4 font-serif text-3xl text-[#2A241D]"
            >
              ¡Gracias por visitarnos!
            </h3>

            <p className="mb-7 text-sm font-light leading-relaxed text-[#2A241D]/75">
              Si has disfrutado de nuestra cocina y nuestro servicio,
              nos encantaría que compartieras tu experiencia.
              Escanea el código QR y déjanos tu reseña en Google.
            </p>

            {/* QR */}
            <div className="mx-auto mb-7 flex h-52 w-52 items-center justify-center border border-[#c5a059]/30 bg-white p-3">
              <img
                src="/qr_review.png"
                alt="Código QR para dejar una reseña en Google de El Portalón"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>

            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#2A241D]/50">
              Escanea el código con tu móvil
            </p>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#800020] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#600018] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]"
            >
              Escribir reseña en Google
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <p className="mt-5 font-serif text-sm italic text-[#2A241D]/60">
              El Portalón · Roa
            </p>
          </div>
        </div>
      )}
    </>
  );
}
