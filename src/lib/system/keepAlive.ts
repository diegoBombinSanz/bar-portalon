import { checkSupabaseHealth } from "./health";

export interface KeepAliveLogEntry {
  timestamp: string;
  success: boolean;
  responseTime: string;
  error?: string;
}

const logs: KeepAliveLogEntry[] = [];

export async function runKeepAliveCheck(): Promise<KeepAliveLogEntry> {
  const result = await checkSupabaseHealth();
  const entry: KeepAliveLogEntry = {
    timestamp: result.timestamp,
    success: result.ok,
    responseTime: result.responseTime,
    error: result.ok ? undefined : result.error,
  };

  logs.push(entry);
  return entry;
}

export function getKeepAliveLogs(): KeepAliveLogEntry[] {
  return [...logs].slice(-20);
}
