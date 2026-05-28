import { Quote, Star } from "lucide-react";

import { restaurantData } from "../data/restaurant";

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#800020]/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a059]/10 text-[#c5a059]">
          <Quote size={32} aria-hidden="true" />
        </div>

        <h2 className="mb-20 font-serif text-3xl text-[#f5f5f1] md:text-5xl">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-2">
          {restaurantData.reviews.map((review) => (
            <article
              key={review.user}
              className="group relative border border-white/10 bg-white/[0.03] p-10"
            >
              <div
                className="mb-6 flex gap-1"
                role="img"
                aria-label={`${review.rating} de 5 estrellas`}
              >
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    fill="#c5a059"
                    className="text-[#c5a059]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mb-8 text-xl font-light italic leading-relaxed text-[#f5f5f1]/80">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                  {review.user}
                </span>
                <span className="h-px w-12 bg-white/10 transition-colors group-hover:bg-[#c5a059]" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center">
          <p className="mb-6 text-xs uppercase tracking-widest text-[#f5f5f1]/70">
            Basado en opiniones reales en Google y TripAdvisor
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <span className="font-serif text-xl">TripAdvisor</span>
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="font-serif text-xl">Google Maps</span>
          </div>
        </div>
      </div>
    </section>
  );
}
