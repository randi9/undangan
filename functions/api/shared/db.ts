/**
 * D1 Database Helper Layer
 * Replaces the Supabase SDK client factory.
 * Provides typed helpers for common query patterns.
 */

export function getDb(env: any): D1Database {
  if (!env?.DB) {
    throw new Error("D1 database binding (DB) belum dikonfigurasi di Cloudflare Pages.");
  }
  return env.DB;
}

// --- JSON column helpers ---

/**
 * Parse a TEXT column that stores JSON. Returns fallback on failure.
 */
export function parseJsonColumn<T = any>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Stringify a value for insertion into a TEXT column that stores JSON.
 */
export function stringifyJsonColumn(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value ?? null);
}

// --- Row helpers ---

/**
 * Hydrate JSON columns on a row after SELECT.
 * Call this on invitation rows to convert TEXT→object for `love_story`, `banks`, etc.
 */
export function hydrateInvitation(row: any): any {
  if (!row) return row;
  return {
    ...row,
    love_story: parseJsonColumn(row.love_story, []),
    banks: parseJsonColumn(row.banks, []),
    streaming_enabled: !!row.streaming_enabled,
    show_doa_pengantin: !!row.show_doa_pengantin,
  };
}

/**
 * Hydrate JSON columns on a payment_logs row.
 */
export function hydratePaymentLog(row: any): any {
  if (!row) return row;
  return {
    ...row,
    webhook_payload: parseJsonColumn(row.webhook_payload, null),
  };
}
