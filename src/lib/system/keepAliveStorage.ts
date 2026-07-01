import { createClient } from "@supabase/supabase-js";

export type KeepAliveStorageEnv = Record<string, string | undefined>;

interface RuntimeEnv {
  process?: {
    env?: Record<string, string | undefined>;
  };
}

function getRuntimeEnv() {
  const runtime = globalThis as typeof globalThis & RuntimeEnv;
  return runtime.process?.env ?? {};
}

function getSupabaseConfig(env?: KeepAliveStorageEnv) {
  const runtimeEnv = getRuntimeEnv();
  const mergedEnv = { ...runtimeEnv, ...(env ?? {}) };
  const url = mergedEnv.VITE_SUPABASE_URL ?? mergedEnv.SUPABASE_URL;
  const key =
    mergedEnv.SUPABASE_SERVICE_ROLE ??
    mergedEnv.VITE_SUPABASE_SERVICE_ROLE ??
    mergedEnv.VITE_SUPABASE_ANON_KEY ??
    mergedEnv.SUPABASE_ANON_KEY ??
    mergedEnv.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Faltan variables de entorno de Supabase.");
  }

  return { url, key };
}

export async function saveKeepAliveTimestamp(
  timestamp: string,
  env?: KeepAliveStorageEnv,
): Promise<boolean> {
  const { url, key } = getSupabaseConfig(env);
  const client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error: selectError } = await client
    .from("site_config")
    .select("id, system")
    .limit(1)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  if (!data || !data.id) {
    return false;
  }

  const existingSystem = typeof data.system === "object" && data.system !== null ? data.system : {};
  const nextSystem = {
    ...existingSystem,
    keepAliveLastRun: timestamp,
  };

  const { error: updateError } = await client
    .from("site_config")
    .update({ system: nextSystem })
    .eq("id", data.id);

  if (updateError) {
    throw updateError;
  }

  return true;
}
