export interface MaintenanceConfig {
  title: string;
  subtitle: string;
  message: string;
  estimatedReturn: string;
  showContactButton: boolean;
  showPhone: boolean;
  showMap: boolean;
}

export interface ErrorConfig {
  enableFriendlyErrors: boolean;
  supportEmail: string;
  supportPhone: string;
  showErrorId: boolean;
}

export interface SystemConfig {
  maintenanceMode: boolean;
  maintenance: MaintenanceConfig;
  errors: ErrorConfig;
  keepAliveLastRun?: string;
}
