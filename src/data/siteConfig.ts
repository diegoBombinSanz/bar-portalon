import { restaurantData } from "./restaurant";

export const defaultSiteConfig = {
  sections: [
    { id: "experienceSplit", label: "Experiencia", visible: true },
    { id: "codDays", label: "Jornadas", visible: true },
    { id: "specialties", label: "Especialidades", visible: true },
    { id: "reviews", label: "Opiniones", visible: true },
    { id: "galeriaTeaser", label: "Galería", visible: true },
    { id: "entrevinosTeaser", label: "Entrevinos", visible: true },
    { id: "mapSection", label: "Ubicación", visible: true },
  ],
  nav: {
    links: [
      { label: "El Portalón", href: "#hero", visible: true, isPage: false },
      { label: "La Barra", href: "/barra", visible: true, isPage: true },
      {
        label: "El Restaurante",
        href: "#restaurante",
        visible: true,
        isPage: false,
      },
      {
        label: "Especialidades",
        href: "#especialidades",
        visible: true,
        isPage: false,
      },
      { label: "Bacalao", href: "#bacalao", visible: true, isPage: false },
      { label: "Galería", href: "/galeria", visible: true, isPage: true },
      {
        label: "Eventos",
        href: "/antiguos-eventos",
        visible: true,
        isPage: true,
      },
      { label: "Entrevinos", href: "/entrevinos", visible: true, isPage: true },
    ],
  },
  contact: {
    phone: restaurantData.contact.phone,
    googleMapsUrl: restaurantData.location.googleMapsUrl,
  },
  banner: {
    visible: false,
    message: "Reserva tu mesa para las Jornadas del Bacalao 2026.",
  },
  jornadas: {
    codDaysStatus: restaurantData.codDaysStatus,
    codDaysConfig: restaurantData.codDaysConfig,
  },
  eventosAnteriores: {
    eventosAnterioresVisible: true, // Cambia entre true y false para mostrar el enlace a ediciones anteriores
  },
  meta: {
    homeTitle: "Bar El Portalón | Restaurante en Roa, Ribera del Duero",
    homeDescription:
      "Bar El Portalón en Roa, Burgos. Cocina tradicional, tapeo y especialidades con el mejor bacalao de temporada.",
    homeUrl: "https://bar-portalon-roa.com",
  },
  system: {
    maintenanceMode: false,
    maintenance: {
      title: "Estamos preparando algo especial",
      subtitle: "Próximamente volveremos con una experiencia renovada",
      message:
        "Estamos mejorando la experiencia del sitio para ofrecerte un servicio más rápido y cuidado.",
      estimatedReturn: "En breve",
      showContactButton: true,
      showPhone: true,
      showMap: false,
    },
    errors: {
      enableFriendlyErrors: true,
      supportEmail: "",
      supportPhone: "",
      showErrorId: true,
    },
  },
} as const;

export type SiteConfig = typeof defaultSiteConfig;

export function mergeSiteConfig(
  base: SiteConfig,
  override: Partial<SiteConfig> = {},
): SiteConfig {
  return {
    ...base,
    ...override,
    sections: override.sections ?? base.sections,
    nav: {
      ...base.nav,
      ...override.nav,
      links: override.nav?.links ?? base.nav.links,
    },
    contact: {
      ...base.contact,
      ...(override.contact ?? {}),
    },
    banner: {
      ...base.banner,
      ...(override.banner ?? {}),
    },
    jornadas: {
      ...base.jornadas,
      ...(override.jornadas ?? {}),
    },
    eventosAnteriores: {
      ...base.eventosAnteriores,
      ...(override.eventosAnteriores ?? {}),
    },
    meta: {
      ...base.meta,
      ...(override.meta ?? {}),
    },
    system: {
      ...base.system,
      ...(override.system ?? {}),
      maintenance: {
        ...base.system.maintenance,
        ...(override.system?.maintenance ?? {}),
      },
      errors: {
        ...base.system.errors,
        ...(override.system?.errors ?? {}),
      },
    },
  } as SiteConfig;
}
