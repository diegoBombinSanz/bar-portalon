import { useEffect, useState } from "react";
import { getSystemConfig, isMaintenanceEnabled } from "../services/systemStatus";
import type { SystemConfig } from "../types";

export function useSystemStatus() {
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(() => getSystemConfig());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSystemConfig(getSystemConfig());
    setReady(true);
  }, []);

  return {
    ready,
    maintenanceMode: systemConfig.maintenanceMode,
    systemConfig,
    isMaintenanceEnabled: isMaintenanceEnabled(),
  };
}
