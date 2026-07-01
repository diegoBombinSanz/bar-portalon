import { checkSupabaseHealth } from "../../src/lib/system/health";
import { saveKeepAliveTimestamp } from "../../src/lib/system/keepAliveStorage";

export default async function handler(request: Request) {
  const headerToken = request.headers.get("x-cron-secret") ?? request.headers.get("authorization");
  const expectedToken = process.env.CRON_SECRET;
  const keepAliveEnabled = (process.env.KEEP_ALIVE_ENABLED ?? "true").toLowerCase() === "true";

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

  const result = await checkSupabaseHealth(process.env);

  if (result.ok) {
    try {
      await saveKeepAliveTimestamp(result.timestamp, process.env);
    } catch (error) {
      console.warn("No se pudo guardar la última ejecución de keep alive:", error);
    }
  }

  return Response.json(result, {
    status: result.ok ? 200 : 503,
  });
}
