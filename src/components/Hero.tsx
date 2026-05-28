export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Bar El Portalón en Roa, Ribera del Duero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      <img
        src="/hero-lcp.jpg"
        alt=""
        width={900}
        height={491}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059] md:text-sm">
          Roa, Ribera del Duero
        </span>

        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#f5f5f1] md:text-7xl">
          Tradición, producto y cocina elaborada
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-[#f5f5f1]/80 md:text-xl">
          Un espacio acogedor donde disfrutar desde el mejor tapeo hasta
          especialidades reconocidas por nuestros clientes.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <a
            href="#restaurante"
            className="inline-flex min-h-11 w-full items-center justify-center bg-[#c5a059] px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#b08d4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] md:w-auto"
          >
            Reservar Mesa
          </a>
          <a
            href="#especialidades"
            className="inline-flex min-h-11 w-full items-center justify-center border border-white/30 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:w-auto"
          >
            Ver Especialidades
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-scroll-indicator absolute bottom-10 left-1/2 text-[#c5a059]"
      >
        <div className="h-12 w-px bg-gradient-to-b from-[#c5a059] to-transparent" />
      </div>
    </section>
  );
}
