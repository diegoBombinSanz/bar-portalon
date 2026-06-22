"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Save,
  Plus,
  Trash2,
  Eye,
  Navigation,
  Phone,
  Megaphone,
  Calendar,
  FileText,
} from "lucide-react";
import { defaultSiteConfig, type SiteConfig } from "./data/siteConfig";
import { supabase } from "./lib/supabaseClient";

export default function ConfigEditorPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loadingPage, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loadConfig = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("site_config")
        .select("*")
        .single();

      if (error) throw error;
      if (data.sections.length === 0) {
        // Si no hay secciones, cargamos la configuración por defecto
        setConfig(defaultSiteConfig);
        return;
      }
      setConfig(data);
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

  const updateField = (path: string, value: any) => {
    setConfig((prev) => {
      if (!prev) return prev;

      const clone: any = structuredClone(prev);
      const keys = path.split(".");
      let ref = clone;

      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }

      ref[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const saveConfig = async () => {
    if (!config) return;

    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setSuccess(true);
    } catch (err) {
      setError("No se pudo guardar la configuración");
    } finally {
      setSaving(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <RefreshCw className="animate-spin text-[#C5A059]" size={32} />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <p className="text-red-600">{error ?? "Error desconocido"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-8 space-y-10">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#2A241D] uppercase tracking-[0.2em]">
          Editor de Configuración
        </h1>

        <button
          onClick={saveConfig}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black hover:bg-[#d4b06a]"
        >
          <Save size={16} />
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </header>

      {success && (
        <p className="text-green-700 font-medium">
          Cambios guardados correctamente
        </p>
      )}

      {error && <p className="text-red-700 font-medium">{error}</p>}

      {/* ============================
          SECTIONS
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <Eye size={18} className="text-[#C5A059]" />
          Secciones visibles
        </h2>

        <div className="space-y-4">
          {config.sections.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center justify-between border-b border-[#EFE9DF] pb-3"
            >
              <span className="text-sm">{s.label}</span>

              <button
                onClick={() => updateField(`sections.${i}.visible`, !s.visible)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  s.visible
                    ? "bg-green-100 text-green-800"
                    : "bg-[#EFE9DF] text-[#5F564C]"
                }`}
              >
                {s.visible ? "Visible" : "Oculta"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          NAV LINKS
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <Navigation size={18} className="text-[#C5A059]" />
          Navegación
        </h2>

        <div className="space-y-6">
          {config.nav.links.map((link, i) => (
            <div
              key={i}
              className="border border-[#EFE9DF] rounded-2xl p-4 space-y-3"
            >
              <div className="flex justify-between">
                <input
                  className="w-full border px-3 py-1 rounded"
                  value={link.label}
                  onChange={(e) =>
                    updateField(`nav.links.${i}.label`, e.target.value)
                  }
                />
              </div>

              <input
                className="w-full border px-3 py-1 rounded"
                value={link.href}
                onChange={(e) =>
                  updateField(`nav.links.${i}.href`, e.target.value)
                }
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">Visible</span>
                <button
                  onClick={() =>
                    updateField(`nav.links.${i}.visible`, !link.visible)
                  }
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    link.visible
                      ? "bg-green-100 text-green-800"
                      : "bg-[#EFE9DF] text-[#5F564C]"
                  }`}
                >
                  {link.visible ? "Sí" : "No"}
                </button>
              </div>

              <button
                onClick={() => {
                  const newLinks = [...config.nav.links];
                  newLinks.splice(i, 1);
                  updateField("nav.links", newLinks);
                }}
                className="text-red-600 flex items-center gap-1 text-sm"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              updateField("nav.links", [
                ...config.nav.links,
                { label: "Nuevo", href: "/", visible: true, isPage: false },
              ])
            }
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-4 py-2 text-sm font-semibold text-black"
          >
            <Plus size={14} /> Añadir enlace
          </button>
        </div>
      </section>

      {/* ============================
          CONTACTO
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <Phone size={18} className="text-[#C5A059]" />
          Contacto
        </h2>

        <input
          className="w-full border px-3 py-1 rounded mb-3"
          value={config.contact.phone}
          onChange={(e) => updateField("contact.phone", e.target.value)}
        />

        <input
          className="w-full border px-3 py-1 rounded"
          value={config.contact.googleMapsUrl}
          onChange={(e) => updateField("contact.googleMapsUrl", e.target.value)}
        />
      </section>

      {/* ============================
          BANNER
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <Megaphone size={18} className="text-[#C5A059]" />
          Banner
        </h2>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Visible</span>
          <button
            onClick={() =>
              updateField("banner.visible", !config.banner.visible)
            }
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              config.banner.visible
                ? "bg-green-100 text-green-800"
                : "bg-[#EFE9DF] text-[#5F564C]"
            }`}
          >
            {config.banner.visible ? "Sí" : "No"}
          </button>
        </div>

        <textarea
          className="w-full border px-3 py-2 rounded"
          value={config.banner.message}
          onChange={(e) => updateField("banner.message", e.target.value)}
        />
      </section>

      {/* ============================
          JORNADAS
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <Calendar size={18} className="text-[#C5A059]" />
          Jornadas
        </h2>

        <input
          className="w-full border px-3 py-1 rounded mb-3"
          value={(config.jornadas as any).codDaysStatus}
          onChange={(e) =>
            updateField("jornadas.codDaysStatus", e.target.value)
          }
        />

        <input
          className="w-full border px-3 py-1 rounded mb-3"
          value={(config.jornadas as any).codDaysConfig?.title ?? ""}
          onChange={(e) =>
            updateField("jornadas.codDaysConfig.title", e.target.value)
          }
        />

        <input
          className="w-full border px-3 py-1 rounded"
          value={(config.jornadas as any).codDaysConfig?.dates ?? ""}
          onChange={(e) =>
            updateField("jornadas.codDaysConfig.dates", e.target.value)
          }
        />
      </section>

      {/* ============================
          META
      ============================ */}
      <section className="rounded-3xl bg-white border border-[#EFE9DF] p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2A241D] mb-4">
          <FileText size={18} className="text-[#C5A059]" />
          Meta
        </h2>

        <input
          className="w-full border px-3 py-1 rounded mb-3"
          value={config.meta.homeTitle}
          onChange={(e) => updateField("meta.homeTitle", e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded"
          value={config.meta.homeDescription}
          onChange={(e) => updateField("meta.homeDescription", e.target.value)}
        />
      </section>
    </div>
  );
}
