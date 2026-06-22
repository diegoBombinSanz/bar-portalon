import {
  defaultSiteConfig,
  mergeSiteConfig,
  type SiteConfig,
} from "../../../data/siteConfig";

import { fetchSiteConfig } from "./siteConfigService";

/* =========================
   🔒 GUARDAS DE SEGURIDAD
========================= */

function isObject(value: any) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function safeArray(value: any): any[] {
  return Array.isArray(value) ? value : [];
}

function safeObject(value: any): Record<string, any> {
  return isObject(value) ? value : {};
}

/* =========================
   🧼 NORMALIZADOR SUPABASE
========================= */

function normalizeRemoteConfig(raw: any): Partial<SiteConfig> {
  if (!isObject(raw)) return {};

  return {
    ...raw,

    // 🔥 FIX CRÍTICO: sections puede venir como {} en Supabase
    sections: safeArray(raw.sections),

    // nav.links puede romper UI
    nav: {
      ...safeObject(raw.nav),
      links: safeArray(raw?.nav?.links),
    },

    contact: safeObject(raw.contact),

    banner: safeObject(raw.banner),

    jornadas: safeObject(raw.jornadas),

    eventosAnteriores: safeObject(raw.eventos_anteriores),

    meta: safeObject(raw.meta),
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