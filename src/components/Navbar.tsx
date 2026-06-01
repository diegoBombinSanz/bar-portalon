import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronRight, MapPin, Menu, Phone, X } from "lucide-react";

const navLinks = [
  { name: "El Portalón", href: "#hero" },
  { name: "La Barra", href: "/barra" },
  { name: "El Restaurante", href: "#restaurante" },
  { name: "Especialidades", href: "#especialidades" },
  { name: "Bacalao", href: "#bacalao" },
  { name: "Galería", href: "/galeria" },
  { name: "Eventos", href: "/antiguos-eventos" },
  { name: "Entrevinos", href: "/entrevinos" },
];

const mapsUrl =
  "https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollYRef = useRef(0);
  const bodyLockedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        setScrolled(window.scrollY > 50);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      bodyLockedRef.current = true;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return;
    }

    if (bodyLockedRef.current) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
      bodyLockedRef.current = false;
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      setIsOpen(false);
      return;
    }

    event.preventDefault();
    const id = href.slice(1);
    setIsOpen(false);
    window.dispatchEvent(new Event("load-deferred-sections"));

    if (window.location.pathname !== "/") {
      window.history.pushState(null, "", `/${href}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`fixed w-full transition-[background-color,padding,backdrop-filter] duration-300 ${
          isOpen ? "z-[90]" : "z-50"
        } ${
          scrolled && !isOpen
            ? "bg-black/90 py-3 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            href="#hero"
            onClick={(event) => handleNavClick(event, "#hero")}
            className="select-none whitespace-nowrap font-serif text-xl tracking-widest text-[#f5f5f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] sm:text-2xl"
          >
            EL PORTALÓN
          </a>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="whitespace-nowrap text-[11px] uppercase tracking-widest text-[#f5f5f1]/80 transition-colors hover:text-[#c5a059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] xl:text-xs"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+34947000000"
              className="inline-flex min-h-11 items-center border border-[#c5a059] px-5 py-2 text-[11px] uppercase tracking-widest text-[#c5a059] transition-colors hover:bg-[#c5a059] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] xl:px-6 xl:text-xs"
            >
              Reservar
            </a>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 text-[#f5f5f1] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059] lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={28} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu-panel fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0a]"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <span className="font-serif text-xl tracking-[0.2em] text-[#f5f5f1]">
              EL PORTALÓN
            </span>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c5a059]/40 text-[#c5a059] transition-colors hover:bg-[#c5a059] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
            >
              <X size={22} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="mobile-menu-link flex items-center justify-between border-b border-white/10 py-5 font-serif text-[clamp(1.5rem,7vw,1.75rem)] text-[#f5f5f1] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a059]"
                style={{ animationDelay: `${60 + index * 45}ms` }}
              >
                {link.name}
                <ChevronRight size={18} color="#c5a059" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-6 pb-11 pt-5">
            <a
              href="tel:+34947000000"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#c5a059] p-4 text-xs font-bold uppercase tracking-[0.12em] text-black"
            >
              <Phone size={16} aria-hidden="true" />
              Reservar Mesa
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 p-4 text-xs uppercase tracking-[0.1em] text-[#f5f5f1]/70"
            >
              <MapPin size={14} aria-hidden="true" />
              Cómo llegar - Plaza Mayor, Roa
            </a>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cómo llegar"
          className="floating-action group flex items-center overflow-hidden rounded-full bg-white text-black shadow-xl"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#EA4335"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
          </span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap pr-0 text-xs font-bold uppercase tracking-wider text-gray-800 transition-all duration-300 group-hover:max-w-[130px] group-hover:pr-4 md:block">
            Cómo llegar
          </span>
        </a>

        <a
          href="tel:+34947000000"
          aria-label="Llamar para reservar"
          className="floating-action group flex items-center overflow-hidden rounded-full bg-[#c5a059] text-black shadow-2xl"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center">
            <Phone size={22} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-bold uppercase tracking-wider transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-5 md:block">
            Reservar Mesa
          </span>
        </a>
      </div>
    </>
  );
}
