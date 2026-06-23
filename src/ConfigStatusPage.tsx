"use client";

import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { supabase } from "./lib/supabaseClient";
import {
  Globe,
  Navigation,
  AlertTriangle,
  FileText,
  RefreshCw,
  Phone,
} from "lucide-react";
import { type SiteConfig } from "./data/siteConfig";
import { getSiteConfig } from "./app/api/site-config/route";

/* =========================
   🔧 NORMALIZACIÓN SEGURA
========================= */

function isObject(value: any) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeConfig(raw: any): SiteConfig {
  const base = getSiteConfig();
  console.log("normalizeConfig called with raw:", raw, "and base:", base);

  return {
    ...base,
    ...raw,

    sections: Array.isArray(raw?.sections)
      ? raw.sections
      : Array.isArray(raw?.home?.sections)
      ? raw.home.sections
      : [],

    nav: {
      ...base.nav,
      ...raw?.nav,
      links: Array.isArray(raw?.nav?.links) ? raw.nav.links : [],
    },

    contact: isObject(raw?.contact) ? raw.contact : {},

    banner: isObject(raw?.banner) ? raw.banner : {},

    jornadas: isObject(raw?.jornadas) ? raw.jornadas : {},

    eventosAnteriores: isObject(raw?.eventos_anteriores)
      ? raw.eventos_anteriores
      : {},

    meta: isObject(raw?.meta) ? raw.meta : {},
  };
}

/* =========================
   UI COMPONENTS (igual)
========================= */

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${color}`}>
      {label}
    </span>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#EFE9DF] bg-white shadow-sm shadow-black/5 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-[#F7F4EF] border-b border-[#EFE9DF]">
        <Icon size={18} className="text-[#C5A059]" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D]">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function ConfigRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#F2EDE5] py-3 last:border-none">
      <span className="text-sm font-medium text-[#5F564C]">{label}</span>
      <span className="max-w-[55%] text-sm text-[#2A241D] break-words">
        {value}
      </span>
    </div>
  );
}

function SectionFlag({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFE9DF] bg-[#F7F4EF] px-4 py-3">
      <p className="text-sm font-medium text-[#2A241D]">{label}</p>
      <Badge
        label={visible ? "Visible" : "Oculta"}
        color={visible ? "bg-green-100 text-green-800" : "bg-[#EFE9DF] text-[#5F564C]"}
      />
    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function ConfigStatusPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("site_config")
        .select("*")
        .single();

      if (error) throw error;

      const normalized = normalizeConfig(data);

      setConfig(normalized);

      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setConfig(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin" />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <AlertTriangle />
          <p>{error}</p>
          <button onClick={loadConfig}>Reintentar</button>
        </div>
      </div>
    );
  }

  /* =========================
     SAFE ACCESS
  ========================= */

  const sections = Array.isArray(config.sections) ? config.sections : [];

  const navLinks = Array.isArray(config.nav?.links)
    ? config.nav.links
    : [];

  const contactEntries = config.contact ? Object.entries(config.contact) : [];

  // const jornada = {
  //   status: (config.jornadas as any)?.status ?? "PAST",
  //   title: (config.jornadas as any)?.title ?? "No definido",
  //   dates: (config.jornadas as any)?.dates ?? "No definido",
  //   featuredPlates: (config.jornadas as any)?.featuredPlates ?? [],
  // };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2A241D]">

      <header className="p-4 border-b">
        <h1 className="text-lg font-bold">siteConfig Visual</h1>
        <button onClick={loadConfig}>Refrescar</button>
      </header>

      <main className="p-6 space-y-6">

        {/* SECCIONES */}
        <SectionCard icon={Globe} title="Secciones">
          {sections.length > 0 ? (
            sections.map((s: any) => (
              <SectionFlag
                key={s.id ?? s.label}
                label={s.label ?? "Sin nombre"}
                visible={!!s.visible}
              />
            ))
          ) : (
            <p>No hay secciones</p>
          )}
        </SectionCard>

        {/* NAV */}
        <SectionCard icon={Navigation} title="Menú">
          {navLinks.map((l: any) => (
            <ConfigRow key={l.href} label={l.label} value={l.href} />
          ))}
        </SectionCard>

        {/* CONTACTO */}
        <SectionCard icon={Phone} title="Contacto">
          {contactEntries.map(([k, v]) => (
            <ConfigRow key={k} label={k} value={String(v)} />
          ))}
        </SectionCard>

        {/* JSON DEBUG */}
        <SectionCard icon={FileText} title="Raw">
          <pre className="text-xs overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </SectionCard>

      </main>
    </div>
  );
}