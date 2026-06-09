"use client";

import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  LayoutDashboard,
  Globe,
  Navigation,
  Phone,
  Calendar,
  Megaphone,
  RefreshCw,
  AlertTriangle,
  FileText,
  Link2,
} from "lucide-react";
import type { SiteConfig } from "./data/siteConfig";

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${color}`}>
      {label}
    </span>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: ComponentType<{ size?: number; className?: string }> ; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#EFE9DF] bg-white shadow-sm shadow-black/5 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-[#F7F4EF] border-b border-[#EFE9DF]">
        <Icon size={18} className="text-[#C5A059]" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function ConfigRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#F2EDE5] py-3 last:border-none">
      <span className="text-sm font-medium text-[#5F564C]">{label}</span>
      <span className="max-w-[55%] text-sm text-[#2A241D] break-words">{value}</span>
    </div>
  );
}

function SectionFlag({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EFE9DF] bg-[#F7F4EF] px-4 py-3">
      <div>
        <p className="text-sm font-medium text-[#2A241D]">{label}</p>
      </div>
      <Badge
        label={visible ? "Visible" : "Oculta"}
        color={visible ? "bg-green-100 text-green-800" : "bg-[#EFE9DF] text-[#5F564C]"}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    COMING_SOON: { label: "Próximamente", color: "bg-amber-100 text-amber-800" },
    ACTIVE: { label: "Evento en curso", color: "bg-green-100 text-green-800" },
    PAST: { label: "Edición pasada", color: "bg-[#EFE9DF] text-[#5F564C]" },
  };
  const selected = map[status] ?? map.PAST;

  return <Badge label={selected.label} color={selected.color} />;
}

function formatBannerType(type: string | undefined) {
  if (type === "promo") return "Promoción";
  if (type === "warning") return "Aviso";
  return "Información";
}

type VisualJornadas = {
  status: string;
  title: string;
  dates: string;
  featuredPlates: string[];
};

function safeJornadas(config: SiteConfig): VisualJornadas {
  return {
    status: (config.jornadas as any).status ?? config.jornadas.codDaysStatus ?? "PAST",
    title: (config.jornadas as any).title ?? config.jornadas.codDaysConfig?.title ?? "No definido",
    dates: (config.jornadas as any).dates ?? config.jornadas.codDaysConfig?.dates ?? "No definido",
    featuredPlates:
      ((config.jornadas as any).featuredPlates ?? config.jornadas.codDaysConfig?.featuredPlates ?? []) as string[],
  };
}

export default function ConfigStatusPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadConfig = () => {
    setLoading(true);
    setError(null);

    fetch("/api/site-config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la configuración");
        }
        return response.json();
      })
      .then((data) => {
        setConfig(data.config ?? null);
        setUpdatedAt(new Date().toLocaleString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : "Error inesperado");
        setConfig(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white border border-[#EFE9DF] px-8 py-10 text-center shadow-sm">
          <RefreshCw size={24} className="animate-spin text-[#C5A059]" />
          <p className="text-sm uppercase tracking-[0.2em] text-[#5F564C]">Cargando estado de siteConfig…</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#F0D6D6] bg-white px-8 py-10 text-center shadow-sm">
          <AlertTriangle size={26} className="text-[#800020]" />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#800020]">No se pudo cargar la configuración</p>
          <p className="max-w-sm text-sm text-[#5F564C]">{error ?? "El servidor no respondió correctamente."}</p>
          <button
            type="button"
            onClick={loadConfig}
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#d4b06a]"
          >
            <RefreshCw size={14} />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const jornada = safeJornadas(config);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2A241D]">
      <header className="sticky top-0 z-40 border-b border-[#E7E1D8] bg-[#1B1815]/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} className="text-[#C5A059]" />
            <div>
              <p className="font-serif text-lg tracking-[0.18em] text-white">siteConfig Visual</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#F7F4EF]/70">Estado visual del archivo de configuración</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#F7F4EF]/70">Última actualización</span>
            <span className="rounded-full bg-[#EFE9DF] px-3 py-1 text-[11px] font-semibold text-[#2A241D]">{updatedAt}</span>
            <button
              type="button"
              onClick={loadConfig}
              className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#d4b06a]"
            >
              <RefreshCw size={14} />
              Refrescar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <div className="rounded-3xl border border-[#C5A059]/15 bg-[#FFF9E7] p-6 text-sm text-[#5F564C] shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#C5A059]">Resumen</p>
              <h1 className="mt-2 text-2xl font-semibold text-[#2A241D]">Configuración actual del sitio</h1>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed">
              Esta página presenta de forma visual el estado actual de <code className="rounded bg-[#EFE9DF] px-2 py-1 text-xs text-[#2A241D]">siteConfig</code>, con todas sus secciones, menús y avisos.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <SectionCard icon={Globe} title="Secciones de la Home">
              <div className="grid gap-3">
                {config.sections.map((section) => (
                  <SectionFlag key={section.id} label={section.label} visible={section.visible} />
                ))}
              </div>
            </SectionCard>

            <SectionCard icon={Navigation} title="Menú de navegación">
              <div className="grid gap-3">
                {config.nav.links.map((link) => (
                  <div key={link.href} className="rounded-3xl border border-[#EFE9DF] bg-[#F7F4EF] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#2A241D]">{link.label}</p>
                        <p className="mt-1 text-[11px] text-[#5F564C] font-mono">{link.href}</p>
                      </div>
                      <Badge
                        label={link.visible ? "Visible" : "Oculto"}
                        color={link.visible ? "bg-green-100 text-green-800" : "bg-[#EFE9DF] text-[#5F564C]"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div className="grid gap-6 md:grid-cols-2">
              <SectionCard icon={Phone} title="Datos de contacto">
                <div className="space-y-3">
                  {Object.entries(config.contact).map(([field, value]) => (
                    <ConfigRow
                      key={field}
                      label={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                      value={value ? String(value) : "No definido"}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={Megaphone} title="Banner global">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-[#2A241D]">Estado del banner</p>
                    <Badge
                      label={config.banner.visible ? "Activo" : "Desactivado"}
                      color={config.banner.visible ? "bg-green-100 text-green-800" : "bg-[#EFE9DF] text-[#5F564C]"}
                    />
                  </div>
                  <ConfigRow
                    label="Tipo"
                    value={formatBannerType((config.banner as any).type)}
                  />
                  <ConfigRow label="Mensaje" value={config.banner.message || "No definido"} />
                </div>
              </SectionCard>
            </div>

            <SectionCard icon={Calendar} title="Jornadas del Bacalao">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={jornada.status} />
                  <span className="text-sm text-[#5F564C]">Estado visual del evento</span>
                </div>
                <ConfigRow label="Título" value={jornada.title} />
                <ConfigRow label="Fechas" value={jornada.dates} />
                <div>
                  <p className="mb-2 text-sm font-medium text-[#5F564C]">Platos destacados</p>
                  <ul className="space-y-2">
                    {jornada.featuredPlates.length > 0 ? (
                      jornada.featuredPlates.map((plate, index) => (
                        <li key={index} className="rounded-2xl border border-[#EFE9DF] bg-[#F7F4EF] px-4 py-3 text-sm text-[#2A241D]">
                          {plate}
                        </li>
                      ))
                    ) : (
                      <li className="rounded-2xl border border-[#EFE9DF] bg-[#F7F4EF] px-4 py-3 text-sm text-[#5F564C]">No hay platos definidos</li>
                    )}
                  </ul>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard icon={FileText} title="Información adicional">
              <div className="space-y-3">
                <ConfigRow label="Ediciones anteriores" value={config.eventosAnteriores.eventosAnterioresVisible ? "Visible" : "Oculto"} />
                <ConfigRow label="Título de inicio" value={config.meta.homeTitle} />
                <ConfigRow label="Descripción breve" value={config.meta.homeDescription} />
              </div>
            </SectionCard>

            <SectionCard icon={Link2} title="Estado técnico">
              <div className="space-y-3">
                <ConfigRow label="Secciones cargadas" value={config.sections.filter((section) => section.visible).length} />
                <ConfigRow label="Enlaces activos" value={config.nav.links.filter((link) => link.visible).length} />
                <ConfigRow label="Banner activo" value={config.banner.visible ? "Sí" : "No"} />
              </div>
            </SectionCard>

            <SectionCard icon={FileText} title="JSON actual" >
              <pre className="max-h-[420px] overflow-auto rounded-3xl border border-[#EFE9DF] bg-[#F7F4EF] p-4 text-[12px] leading-6 text-[#4B4B47]">
                {JSON.stringify(config, null, 2)}
              </pre>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
