"use client";

import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  Globe,
  LogOut,
  Megaphone,
  Navigation,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Trash2,
} from "lucide-react";
import { defaultSiteConfig } from "./data/siteConfig";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./lib/useAuth";

type SectionConfig = {
  id: string;
  label: string;
  visible: boolean;
};

type NavLinkConfig = {
  label: string;
  href: string;
  visible: boolean;
  isPage?: boolean;
};

type JornadasConfig = {
  codDaysStatus: string;
  codDaysConfig: {
    title: string;
    dates: string;
    teaser?: string;
    activeMessage?: string;
    pastMessage?: string;
    featuredPlates?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type EditableSiteConfig = {
  id?: string | number;
  sections: SectionConfig[];
  nav: {
    links: NavLinkConfig[];
  };
  contact: {
    phone: string;
    googleMapsUrl: string;
    [key: string]: unknown;
  };
  banner: {
    visible: boolean;
    message: string;
    [key: string]: unknown;
  };
  jornadas: JornadasConfig;
  eventosAnteriores: {
    eventosAnterioresVisible: boolean;
    [key: string]: unknown;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    homeUrl: string;
    [key: string]: unknown;
  };
  system: {
    maintenanceMode: boolean;
    maintenance: {
      title: string;
      subtitle: string;
      message: string;
      estimatedReturn: string;
      showContactButton: boolean;
      showPhone: boolean;
      showMap: boolean;
      [key: string]: unknown;
    };
    errors: {
      enableFriendlyErrors: boolean;
      supportEmail: string;
      supportPhone: string;
      showErrorId: boolean;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeConfig(raw: unknown): EditableSiteConfig {
  const base = structuredClone(defaultSiteConfig) as unknown as EditableSiteConfig;
  const source = isObject(raw) ? raw : {};
  const nav = isObject(source.nav) ? source.nav : {};
  const contact = isObject(source.contact) ? source.contact : {};
  const banner = isObject(source.banner) ? source.banner : {};
  const jornadas = isObject(source.jornadas) ? source.jornadas : {};
  const rawEventos = source.eventosAnteriores ?? source.eventos_anteriores;
  const eventosAnteriores = isObject(rawEventos) ? rawEventos : {};
  const meta = isObject(source.meta) ? source.meta : {};
  const system = isObject(source.system) ? source.system : {};
  const maintenance = isObject(system.maintenance) ? system.maintenance : {};
  const errors = isObject(system.errors) ? system.errors : {};
  const codDaysConfig = isObject(jornadas.codDaysConfig)
    ? jornadas.codDaysConfig
    : {};

  return {
    ...base,
    ...source,
    id:
      typeof source.id === "string" || typeof source.id === "number"
        ? source.id
        : undefined,
    sections: Array.isArray(source.sections)
      ? (source.sections as SectionConfig[])
      : base.sections,
    nav: {
      ...base.nav,
      ...nav,
      links: Array.isArray(nav.links)
        ? (nav.links as NavLinkConfig[])
        : base.nav.links,
    },
    contact: {
      ...base.contact,
      ...contact,
    },
    banner: {
      ...base.banner,
      ...banner,
    },
    jornadas: {
      ...base.jornadas,
      ...jornadas,
      codDaysStatus:
        typeof jornadas.codDaysStatus === "string"
          ? jornadas.codDaysStatus
          : base.jornadas.codDaysStatus,
      codDaysConfig: {
        ...base.jornadas.codDaysConfig,
        ...codDaysConfig,
      },
    },
    eventosAnteriores: {
      ...base.eventosAnteriores,
      ...eventosAnteriores,
    },
    meta: {
      ...base.meta,
      ...meta,
    },
    system: {
      ...base.system,
      ...system,
      maintenance: {
        ...base.system.maintenance,
        ...maintenance,
      },
      errors: {
        ...base.system.errors,
        ...errors,
      },
    },
  };
}

function toSupabasePayload(config: EditableSiteConfig) {
  return {
    sections: config.sections,
    nav: config.nav,
    contact: config.contact,
    banner: config.banner,
    jornadas: config.jornadas,
    eventos_anteriores: config.eventosAnteriores,
    meta: config.meta,
    system: config.system,
  };
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
    <section className="overflow-hidden rounded-2xl border border-[#EFE9DF] bg-white shadow-sm shadow-black/5">
      <div className="flex items-center gap-3 border-b border-[#EFE9DF] bg-[#F7F4EF] px-6 py-4">
        <Icon size={18} className="text-[#C5A059]" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#5F564C]">{label}</span>
      {children}
    </label>
  );
}

function ToggleButton({
  active,
  onClick,
  activeLabel = "Visible",
  inactiveLabel = "Oculta",
}: {
  active: boolean;
  onClick: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active ? "bg-green-100 text-green-800" : "bg-[#EFE9DF] text-[#5F564C]"
      }`}
    >
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#EFE9DF] px-3 py-2 text-sm outline-none transition focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20";

export default function ConfigStatusPage() {
  const { user } = useAuth();
  const [config, setConfig] = useState<EditableSiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [keepAliveStatus, setKeepAliveStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [keepAliveMessage, setKeepAliveMessage] = useState<string | null>(null);
  const [lastKeepAlive, setLastKeepAlive] = useState<string | null>(null);
  const [keepAliveResponseTime, setKeepAliveResponseTime] = useState<string | null>(null);

  const loadConfig = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from("site_config")
        .select("*")
        .single();

      if (error) throw error;

      const safe = safeConfig(data);
      setConfig(safe);
      setDirty(false);

      const lastRun = safe.system?.keepAliveLastRun;
      setLastKeepAlive(
        typeof lastRun === "string" && lastRun
          ? new Date(lastRun).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setConfig(safeConfig(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const updateField = (path: string, value: unknown) => {
    setConfig((prev) => {
      if (!prev) return prev;

      const clone = structuredClone(prev) as Record<string, any>;
      const keys = path.split(".");
      let ref = clone;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (!isObject(ref[key]) && !Array.isArray(ref[key])) {
          ref[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
        }

        ref = ref[key];
      }

      ref[keys[keys.length - 1]] = value;
      return clone as EditableSiteConfig;
    });

    setDirty(true);
    setSuccess(false);
  };

  const saveConfig = async () => {
    if (!config) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = toSupabasePayload(config);
      const request = config.id
        ? supabase.from("site_config").update(payload).eq("id", config.id)
        : supabase.from("site_config").upsert(payload);

      const { error } = await request;

      if (error) throw error;

      setDirty(false);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar la configuracion",
      );
    } finally {
      setSaving(false);
    }
  };

  const runKeepAliveCheck = async () => {
    setKeepAliveStatus("running");
    setKeepAliveMessage(null);

    try {
      const secret = import.meta.env.VITE_CRON_SECRET?.trim();
      const headers = new Headers();

      if (secret) {
        headers.set("x-cron-secret", secret);
        headers.set("Authorization", `Bearer ${secret}`);
      }

      const response = await fetch("/api/system/keep-alive", {
        headers,
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "La comprobación no pudo completarse.");
      }

      setKeepAliveStatus(payload.ok ? "success" : "error");
      setKeepAliveResponseTime(payload.responseTime ?? null);
      setLastKeepAlive(
        payload.timestamp
          ? new Date(payload.timestamp).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : null,
      );
      setKeepAliveMessage(
        payload.ok
          ? "La base de datos respondió correctamente."
          : payload.error ?? "La comprobación devolvió un error.",
      );
    } catch (err) {
      setKeepAliveStatus("error");
      setKeepAliveMessage(
        err instanceof Error ? err.message : "No se pudo completar la comprobación.",
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F4EF]">
        <RefreshCw className="animate-spin text-[#C5A059]" size={32} />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F4EF] px-4 text-[#2A241D]">
        <div className="space-y-4 rounded-2xl border border-red-200 bg-white p-6 text-center">
          <AlertTriangle className="mx-auto text-red-700" />
          <p className="text-sm text-red-700">{error ?? "Error desconocido"}</p>
          <button
            className="rounded-xl bg-[#2A241D] px-4 py-2 text-sm font-semibold text-white"
            onClick={loadConfig}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2A241D]">
      <header className="sticky top-0 z-20 border-b border-[#EFE9DF] bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold uppercase tracking-[0.18em]">
              Editor de configuracion
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5F564C]">
              {user?.email && <span>{user.email}</span>}
              {dirty && (
                <span className="font-semibold text-[#9A6B00]">
                  Cambios sin guardar
                </span>
              )}
              {success && (
                <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Guardado
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-[#EFE9DF] px-3 py-2 text-sm font-semibold transition hover:bg-[#F7F4EF]"
              onClick={loadConfig}
              type="button"
            >
              <RefreshCw className="h-4 w-4" />
              Refrescar
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d4b06a] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving || !dirty}
              onClick={saveConfig}
              type="button"
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-[#2A241D] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#3A332B]"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 p-6">
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <SectionCard icon={Eye} title="Secciones visibles">
          {config.sections.map((section, index) => (
            <div
              key={section.id}
              className="grid gap-3 rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <Field label="Etiqueta">
                <input
                  className={inputClass}
                  value={section.label}
                  onChange={(event) =>
                    updateField(`sections.${index}.label`, event.target.value)
                  }
                />
              </Field>
              <Field label="ID">
                <input className={inputClass} value={section.id} readOnly />
              </Field>
              <div className="flex items-end">
                <ToggleButton
                  active={section.visible}
                  onClick={() =>
                    updateField(`sections.${index}.visible`, !section.visible)
                  }
                />
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard icon={Navigation} title="Navegacion">
          {config.nav.links.map((link, index) => (
            <div
              key={`${link.href}-${index}`}
              className="space-y-3 rounded-xl border border-[#EFE9DF] p-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Label">
                  <input
                    className={inputClass}
                    value={link.label}
                    onChange={(event) =>
                      updateField(`nav.links.${index}.label`, event.target.value)
                    }
                  />
                </Field>
                <Field label="Href">
                  <input
                    className={inputClass}
                    value={link.href}
                    onChange={(event) =>
                      updateField(`nav.links.${index}.href`, event.target.value)
                    }
                  />
                </Field>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ToggleButton
                  active={link.visible}
                  activeLabel="Visible"
                  inactiveLabel="No visible"
                  onClick={() =>
                    updateField(`nav.links.${index}.visible`, !link.visible)
                  }
                />
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-700"
                  onClick={() => {
                    const nextLinks = [...config.nav.links];
                    nextLinks.splice(index, 1);
                    updateField("nav.links", nextLinks);
                  }}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <button
            className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d4b06a]"
            onClick={() =>
              updateField("nav.links", [
                ...config.nav.links,
                { label: "Nuevo", href: "/", visible: true, isPage: false },
              ])
            }
            type="button"
          >
            <Plus className="h-4 w-4" />
            Anadir enlace
          </button>
        </SectionCard>

        <SectionCard icon={Phone} title="Contacto">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Telefono">
              <input
                className={inputClass}
                value={config.contact.phone}
                onChange={(event) =>
                  updateField("contact.phone", event.target.value)
                }
              />
            </Field>
            <Field label="Google Maps URL">
              <input
                className={inputClass}
                value={config.contact.googleMapsUrl}
                onChange={(event) =>
                  updateField("contact.googleMapsUrl", event.target.value)
                }
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard icon={Megaphone} title="Banner">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[#5F564C]">Estado</span>
            <ToggleButton
              active={config.banner.visible}
              onClick={() =>
                updateField("banner.visible", !config.banner.visible)
              }
            />
          </div>
          <Field label="Mensaje">
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              value={config.banner.message}
              onChange={(event) =>
                updateField("banner.message", event.target.value)
              }
            />
          </Field>
        </SectionCard>

        <SectionCard icon={Calendar} title="Jornadas">
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Status">
              <select
                className={inputClass}
                value={config.jornadas.codDaysStatus}
                onChange={(event) =>
                  updateField("jornadas.codDaysStatus", event.target.value)
                }
              >
                <option value="COMING_SOON">COMING_SOON</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAST">PAST</option>
              </select>
            </Field>
            <Field label="Titulo">
              <input
                className={inputClass}
                value={config.jornadas.codDaysConfig.title}
                onChange={(event) =>
                  updateField(
                    "jornadas.codDaysConfig.title",
                    event.target.value,
                  )
                }
              />
            </Field>
            <Field label="Fechas">
              <input
                className={inputClass}
                value={config.jornadas.codDaysConfig.dates}
                onChange={(event) =>
                  updateField(
                    "jornadas.codDaysConfig.dates",
                    event.target.value,
                  )
                }
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard icon={Globe} title="Eventos anteriores">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[#5F564C]">
              Mostrar enlace a ediciones anteriores
            </span>
            <ToggleButton
              active={config.eventosAnteriores.eventosAnterioresVisible}
              onClick={() =>
                updateField(
                  "eventosAnteriores.eventosAnterioresVisible",
                  !config.eventosAnteriores.eventosAnterioresVisible,
                )
              }
            />
          </div>
        </SectionCard>

        <SectionCard icon={Settings} title="Sistema">
          <div className="space-y-4 rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#2A241D]">
                  Estado del sitio
                </p>
                <p className="text-sm text-[#5F564C]">
                  Activar modo mantenimiento para bloquear el acceso general.
                </p>
              </div>
              <ToggleButton
                active={config.system.maintenanceMode}
                activeLabel="Mantenimiento activo"
                inactiveLabel="Normal"
                onClick={() =>
                  updateField("system.maintenanceMode", !config.system.maintenanceMode)
                }
              />
            </div>

            <div className="mt-4 space-y-3 rounded-xl border border-[#EFE9DF] bg-white p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2A241D]">
                    Keep Alive de Supabase
                  </p>
                  <p className="text-sm text-[#5F564C]">
                    Comprobación ligera para evitar la hibernación de la base de datos.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runKeepAliveCheck}
                  disabled={keepAliveStatus === "running"}
                  className="rounded-xl bg-[#2A241D] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1b1713] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {keepAliveStatus === "running"
                    ? "Comprobando..."
                    : "Ejecutar comprobación"}
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F564C]">
                    Estado Base de Datos
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#2A241D]">
                    {keepAliveStatus === "success"
                      ? "Online"
                      : keepAliveStatus === "error"
                        ? "Offline"
                        : "Pendiente"}
                  </p>
                </div>
                <div className="rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F564C]">
                    Último Keep Alive
                  </p>
                  <p className="mt-2 text-sm text-[#2A241D]">
                    {lastKeepAlive ?? "Sin comprobaciones aún"}
                  </p>
                </div>
                <div className="rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F564C]">
                    Tiempo de respuesta
                  </p>
                  <p className="mt-2 text-sm text-[#2A241D]">
                    {keepAliveResponseTime ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-[#EFE9DF] bg-[#F7F4EF] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F564C]">
                    Próxima ejecución
                  </p>
                  <p className="mt-2 text-sm text-[#2A241D]">Programada cada 12 horas</p>
                </div>
              </div>

              {keepAliveMessage ? (
                <p className={`text-sm ${keepAliveStatus === "success" ? "text-green-700" : "text-[#5F564C]"}`}>
                  {keepAliveMessage}
                </p>
              ) : null}
            </div>

            {config.system.maintenanceMode ? (
              <div className="space-y-4 rounded-xl border border-[#EFE9DF] bg-white p-4">
                <Field label="Título">
                  <input
                    className={inputClass}
                    value={config.system.maintenance.title}
                    onChange={(event) =>
                      updateField("system.maintenance.title", event.target.value)
                    }
                  />
                </Field>
                <Field label="Subtítulo">
                  <input
                    className={inputClass}
                    value={config.system.maintenance.subtitle}
                    onChange={(event) =>
                      updateField("system.maintenance.subtitle", event.target.value)
                    }
                  />
                </Field>
                <Field label="Mensaje principal">
                  <textarea
                    className={`${inputClass} min-h-24 resize-y`}
                    value={config.system.maintenance.message}
                    onChange={(event) =>
                      updateField("system.maintenance.message", event.target.value)
                    }
                  />
                </Field>
                <Field label="Fecha estimada">
                  <input
                    className={inputClass}
                    value={config.system.maintenance.estimatedReturn}
                    onChange={(event) =>
                      updateField("system.maintenance.estimatedReturn", event.target.value)
                    }
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between rounded-xl border border-[#EFE9DF] p-3">
                    <span className="text-sm text-[#5F564C]">Mostrar teléfono</span>
                    <ToggleButton
                      active={config.system.maintenance.showPhone}
                      onClick={() =>
                        updateField(
                          "system.maintenance.showPhone",
                          !config.system.maintenance.showPhone,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#EFE9DF] p-3">
                    <span className="text-sm text-[#5F564C]">Mostrar botón llamar</span>
                    <ToggleButton
                      active={config.system.maintenance.showContactButton}
                      onClick={() =>
                        updateField(
                          "system.maintenance.showContactButton",
                          !config.system.maintenance.showContactButton,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#EFE9DF] p-3">
                    <span className="text-sm text-[#5F564C]">Mostrar botón ubicación</span>
                    <ToggleButton
                      active={config.system.maintenance.showMap}
                      onClick={() =>
                        updateField("system.maintenance.showMap", !config.system.maintenance.showMap)
                      }
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard icon={FileText} title="Meta">
          <Field label="Home title">
            <input
              className={inputClass}
              value={config.meta.homeTitle}
              onChange={(event) =>
                updateField("meta.homeTitle", event.target.value)
              }
            />
          </Field>
          <Field label="Home description">
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              value={config.meta.homeDescription}
              onChange={(event) =>
                updateField("meta.homeDescription", event.target.value)
              }
            />
          </Field>
          <Field label="Home Url">
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              value={config.meta.homeUrl}
              onChange={(event) =>
                updateField("meta.homeUrl", event.target.value)
              }
            />
          </Field>
        </SectionCard>
      </main>
    </div>
  );
}
