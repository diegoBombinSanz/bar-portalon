"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollYRef = useRef(0);

  // Scroll detection — ignores changes while menu is open
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Lock body scroll when menu opens, restore exact position when closes
  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e : any, href : any) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setIsOpen(false);
    // Wait for body scroll-lock to release before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const navLinks = [
    { name: "El Portalón", href: "#hero" },
    { name: "La Barra", href: "#bar" },
    { name: "El Restaurante", href: "#restaurante" },
    { name: "Especialidades", href: "#especialidades" },
    { name: "Bacalao", href: "#bacalao" },
  ];

  return (
    <>
      {/* ─── Main Nav Bar ───────────────────────────────────────────── */}
      <nav
        style={{ zIndex: isOpen ? 90 : 50 }}
        className={`fixed w-full transition-all duration-500 ${
          scrolled && !isOpen
            ? "bg-black/90 backdrop-blur-md py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-serif tracking-widest text-[#f5f5f1] select-none"
          >
            EL PORTALÓN
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-[#f5f5f1]/80 hover:text-[#c5a059] transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+34947000000"
              className="px-6 py-2 border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all"
            >
              Reservar
            </a>
          </div>

          {/* Mobile hamburger — always shows Menu icon; X lives inside the overlay */}
          <button
            className="md:hidden text-[#f5f5f1] p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Overlay ─────────────────────────────── */}
      {/*
          Rendered completely OUTSIDE the <nav> so z-index stacking contexts
          never interfere. z-[9999] ensures it covers absolutely everything.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 1 }}
            transition={{
              type: "tween",
              duration: 0.38,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ── Overlay Header with X button ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "20px",
                  letterSpacing: "0.2em",
                  color: "#f5f5f1",
                }}
              >
                EL PORTALÓN
              </span>

              {/* ── Close button — positioned absolutely to guarantee visibility ── */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(197,160,89,0.4)",
                  background: "transparent",
                  color: "#c5a059",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={22} strokeWidth={2.2} />
              </button>
            </div>

            {/* ── Nav Links ── */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.28 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "28px",
                      color: "#f5f5f1",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {link.name}
                  </span>
                  <ChevronRight size={18} color="#c5a059" />
                </motion.a>
              ))}
            </div>

            {/* ── Bottom CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.3 }}
              style={{
                padding: "20px 24px 44px",
                gap: "12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <a
                href="tel:+34947000000"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px",
                  backgroundColor: "#c5a059",
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "2px",
                }}
              >
                <Phone size={16} />
                Reservar Mesa
              </a>

              <a
                href="https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(245,245,241,0.7)",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "2px",
                }}
              >
                <MapPin size={14} />
                Cómo llegar — Plaza Mayor, Roa
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Action Buttons (bottom-right) ─────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Google Maps button */}
        <motion.a
          href="https://maps.google.com/?q=Bar+El+Portalon+Plaza+Mayor+Roa+Burgos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cómo llegar"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white text-black rounded-full shadow-xl overflow-hidden group"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
        >
          <span className="flex items-center justify-center w-12 h-12 shrink-0">
            {/* Google Maps pin icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#EA4335"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
          </span>
          <span className="hidden md:block max-w-0 overflow-hidden group-hover:max-w-[130px] transition-all duration-300 ease-in-out whitespace-nowrap pr-0 group-hover:pr-4 text-xs font-bold uppercase tracking-wider text-gray-800">
            Cómo llegar
          </span>
        </motion.a>

        {/* Phone / Reserve button */}
        <motion.a
          href="tel:+34947000000"
          aria-label="Llamar para reservar"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#c5a059] text-black rounded-full shadow-2xl overflow-hidden group"
          style={{ boxShadow: "0 8px 32px rgba(197,160,89,0.45)" }}
        >
          <span className="flex items-center justify-center w-14 h-14 shrink-0">
            <Phone size={22} strokeWidth={2.2} />
          </span>
          <span className="hidden md:block max-w-0 overflow-hidden group-hover:max-w-[160px] transition-all duration-300 ease-in-out whitespace-nowrap pr-0 group-hover:pr-5 text-sm font-bold uppercase tracking-wider">
            Reservar Mesa
          </span>
        </motion.a>
      </div>
    </>
  );
}



