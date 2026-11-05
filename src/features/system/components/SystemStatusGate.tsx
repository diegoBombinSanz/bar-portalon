import { useEffect, useState, type ReactNode } from "react";
import { isMaintenanceEnabled } from "../services/systemStatus";
import MaintenancePage from "../pages/MaintenancePage";

export default function SystemStatusGate({
  children,
}: {
  children: ReactNode;
}) {
  const [maintenance] = useState(() => isMaintenanceEnabled());
  const [pathname, setPathname] = useState(
    () => window.location.pathname,
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const isAdminPath =
    pathname === "/login" || pathname.startsWith("/admin");

  if (maintenance && !isAdminPath) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}