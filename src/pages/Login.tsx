import { useState, type FormEvent } from "react";
import { AlertTriangle, LogIn } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.assign("/admin/config");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F4EF] px-4 text-[#2A241D]">
      <main className="w-full max-w-sm rounded-2xl border border-[#EFE9DF] bg-white p-6 shadow-sm shadow-black/5">
        <div className="mb-6 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
            Bar El Portalon
          </p>
          <h1 className="text-2xl font-bold">Acceso admin</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#5F564C]">Email</span>
            <input
              className="w-full rounded-xl border border-[#EFE9DF] px-4 py-3 text-sm outline-none transition focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#5F564C]">
              Contrasena
            </span>
            <input
              className="w-full rounded-xl border border-[#EFE9DF] px-4 py-3 text-sm outline-none transition focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2A241D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3A332B] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={submitting}
          >
            <LogIn className="h-4 w-4" />
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    </div>
  );
}
