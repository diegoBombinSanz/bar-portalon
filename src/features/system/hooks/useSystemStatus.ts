import { useState } from "react";
import {
  getSystemConfig,
  isMaintenanceEnabled,
} from "../services/systemStatus";
import type { SystemConfig } from "../types";

export function useSystemStatus() {
  const [systemConfig] = useState<SystemConfig>(
    () => getSystemConfig(),
  );

  return {
    ready: true,
    maintenanceMode: systemConfig.maintenanceMode,
    systemConfig,
    isMaintenanceEnabled: isMaintenanceEnabled(),
  };
}