import { getSiteConfig } from "../../../app/api/site-config/route";
import type { ErrorConfig, MaintenanceConfig, SystemConfig } from "../types";

function defaultMaintenanceConfig(): MaintenanceConfig {
  return {
    title: "Estamos preparando algo especial",
    subtitle: "Próximamente volveremos con una experiencia renovada",
    message:
      "Estamos mejorando la experiencia del sitio para ofrecerte un servicio más rápido y cuidado.",
    estimatedReturn: "En breve",
    showContactButton: true,
    showPhone: true,
    showMap: false,
  };
}

function defaultErrorConfig(): ErrorConfig {
  return {
    enableFriendlyErrors: true,
    supportEmail: "",
    supportPhone: "",
    showErrorId: true,
  };
}

export function getSystemConfig(): SystemConfig {
  const config = getSiteConfig();
  const system = (config as unknown as { system?: Partial<SystemConfig> }).system;

  return {
    maintenanceMode: Boolean(system?.maintenanceMode),
    maintenance: {
      ...defaultMaintenanceConfig(),
      ...system?.maintenance,
    },
    errors: {
      ...defaultErrorConfig(),
      ...system?.errors,
    },
  };
}

export function isMaintenanceEnabled(): boolean {
  return getSystemConfig().maintenanceMode;
}

export function getMaintenanceConfig(): MaintenanceConfig {
  return getSystemConfig().maintenance;
}

export function getErrorConfig(): ErrorConfig {
  return getSystemConfig().errors;
}
