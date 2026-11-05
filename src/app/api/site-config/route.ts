import {
  defaultSiteConfig,
  mergeSiteConfig,
  type SiteConfig,
} from "../../../data/siteConfig";

import { fetchSiteConfig } from "./siteConfigService";

/* =========================
   GUARDAS DE SEGURIDAD
========================= */

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function safeObject<T extends object>(value: unknown): T {
  return (isObject(value) ? value : {}) as T;
}

/* =========================
   NORMALIZADOR SUPABASE
========================= */

function normalizeRemoteConfig(raw: unknown): Partial<SiteConfig> {
  const source = safeObject<Record<string, unknown>>(raw);
  const nav = safeObject<Record<string, unknown>>(source.nav);

  return {
    ...source,

    sections: safeArray<SiteConfig["sections"][number]>(
      source.sections,
    ) as unknown as SiteConfig["sections"],

    nav: {
      ...nav,
      links: safeArray<SiteConfig["nav"]["links"][number]>(
        nav.links,
      ) as unknown as SiteConfig["nav"]["links"],
    },

    contact: safeObject<SiteConfig["contact"]>(source.contact),

    banner: safeObject<SiteConfig["banner"]>(source.banner),

    jornadas: safeObject<SiteConfig["jornadas"]>(source.jornadas),

    eventosAnteriores: safeObject<SiteConfig["eventosAnteriores"]>(
      source.eventos_anteriores,
    ),

    meta: safeObject<SiteConfig["meta"]>(source.meta),

    system: safeObject<SiteConfig["system"]>(source.system),
  };
}

/* =========================
   ⚠️ CARGA SEGURA
========================= */

let siteConfigOverrides: Partial<SiteConfig> = {};

try {
  const raw = await fetchSiteConfig();
  siteConfigOverrides = normalizeRemoteConfig(raw);
} catch (err) {
  console.warn("Error cargando siteConfig remoto, usando fallback:", err);
  siteConfigOverrides = {};
}

/* =========================
   📦 API FINAL
========================= */

export function getSiteConfig(): SiteConfig {
  try {
    return mergeSiteConfig(defaultSiteConfig, siteConfigOverrides);
  } catch (err) {
    console.warn("Error en mergeSiteConfig, usando fallback:", err);
    return defaultSiteConfig;
  }
}
