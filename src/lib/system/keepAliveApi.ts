import { checkSupabaseHealth } from "./health";
import { saveKeepAliveTimestamp } from "./keepAliveStorage";

export type KeepAliveEnv = Record<string, string | undefined>;

function mergeEnv(env: KeepAliveEnv = {}) {
  const runtimeEnv = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  return { ...runtimeEnv, ...env };
}

export async function handleKeepAliveRequest(request: Request, env: KeepAliveEnv = {}) {
  const runtimeEnv = mergeEnv(env);
  const expectedToken = runtimeEnv.CRON_SECRET ?? runtimeEnv.VITE_CRON_SECRET;
  const keepAliveEnabled = (runtimeEnv.KEEP_ALIVE_ENABLED ?? "true").toLowerCase() === "true";
  const headerToken = request.headers.get("x-cron-secret") ?? request.headers.get("authorization");

  if (!keepAliveEnabled) {
    return Response.json({ ok: false, error: "Keep alive deshabilitado" }, { status: 503 });
  }

  if (!expectedToken) {
    return Response.json({ ok: false, error: "CRON_SECRET no configurado" }, { status: 500 });
  }

  const providedToken = headerToken?.startsWith("Bearer ")
    ? headerToken.slice(7).trim()
    : headerToken?.trim();

  if (!providedToken || providedToken !== expectedToken) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const result = await checkSupabaseHealth(runtimeEnv);

  if (result.ok) {
    try {
      await saveKeepAliveTimestamp(result.timestamp, runtimeEnv);
    } catch (error) {
      console.warn("No se pudo guardar última ejecución de keep alive:", error);
    }
  }

  return Response.json(result, {
    status: result.ok ? 200 : 503,
  });
}
