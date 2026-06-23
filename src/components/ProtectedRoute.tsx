import { useEffect, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "../lib/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.replace("/login");
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F4EF] text-[#2A241D]">
        <RefreshCw className="animate-spin" aria-label="Cargando sesion" />
      </div>
    );
  }

  return <>{children}</>;
}
