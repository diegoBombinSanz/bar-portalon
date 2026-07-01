import { checkSupabaseHealth } from "../../../../lib/system/health";
import { saveKeepAliveTimestamp } from "../../../../lib/system/keepAliveStorage";

function getRuntimeEnv() {
  return (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
}

export async function GET(request: Request) {
  const env = getRuntimeEnv();
  const expectedToken = env.CRON_SECRET;
  const keepAliveEnabled = (env.KEEP_ALIVE_ENABLED ?? "true").toLowerCase() === "true";
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

  const result = await checkSupabaseHealth(env);

  if (result.ok) {
    try {
      await saveKeepAliveTimestamp(result.timestamp, env);
    } catch (error) {
      console.warn("No se pudo guardar la última ejecución de keep alive:", error);
    }
  }

  return Response.json(result, {
    status: result.ok ? 200 : 503,
  });
}
