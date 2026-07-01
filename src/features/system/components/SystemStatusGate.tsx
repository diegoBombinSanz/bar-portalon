import { useEffect, useState, type ReactNode } from "react";
import { isMaintenanceEnabled } from "../services/systemStatus";
import MaintenancePage from "../pages/MaintenancePage";

export default function SystemStatusGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const nextValue = isMaintenanceEnabled();
    setMaintenance(nextValue);
    setReady(true);

    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-[#f5f5f1]">
        <div className="rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#f2d7a1]">
          Cargando experiencia…
        </div>
      </div>
    );
  }

  const isAdminPath = pathname === "/login" || pathname.startsWith("/admin");

  if (maintenance && !isAdminPath) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}
