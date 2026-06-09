import { defaultSiteConfig, mergeSiteConfig, type SiteConfig } from "../../../data/siteConfig";

const siteConfigOverrides: Partial<SiteConfig> = {
  // Este objeto puede crecer más adelante con persistencia real o Supabase.
  // Por ahora se mantiene vacío para que el endpoint devuelva la configuración
  // de fallback si no hay overrides definidos.
};

export function getSiteConfig() {
  return mergeSiteConfig(defaultSiteConfig, siteConfigOverrides);
}
