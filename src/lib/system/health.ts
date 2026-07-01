import { createClient } from "@supabase/supabase-js";

interface RuntimeEnv {
  process?: {
    env?: Record<string, string | undefined>;
  };
}

export interface HealthCheckResult {
  ok: boolean;
  timestamp: string;
  database: "online" | "offline";
  responseTime: string;
  error?: string;
}

export type ServerEnv = Record<string, string | undefined>;

function getSupabaseConfig(env?: ServerEnv) {
  const runtime = globalThis as typeof globalThis & RuntimeEnv;
  const runtimeEnv = runtime.process?.env ?? {};
  const mergedEnv = { ...runtimeEnv, ...(env ?? {}) };
  const url = mergedEnv.VITE_SUPABASE_URL ?? mergedEnv.SUPABASE_URL;
  const key = mergedEnv.VITE_SUPABASE_ANON_KEY ?? mergedEnv.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Faltan variables de entorno de Supabase.");
  }

  return { url, key };
}

export async function checkSupabaseHealth(env?: ServerEnv): Promise<HealthCheckResult> {
  const startedAt = Date.now();

  try {
    const { url, key } = getSupabaseConfig(env);
    const client = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await client
      .from("site_config")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return {
      ok: true,
      timestamp: new Date().toISOString(),
      database: "online",
      responseTime: `${Date.now() - startedAt}ms`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";

    return {
      ok: false,
      timestamp: new Date().toISOString(),
      database: "offline",
      responseTime: `${Date.now() - startedAt}ms`,
      error: message,
    };
  }
}
