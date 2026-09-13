import type { VercelRequest } from "@vercel/node";

/**
 * Vercel يفكّك body تلقائيًا عادة عند وجود Content-Type: application/json،
 * لكن هذه الدالة تحمي الكود إذا وصل body كنص خام لأي سبب.
 */
export function parseBody<T = Record<string, unknown>>(req: VercelRequest): T {
  const raw = req.body;
  if (raw == null) return {} as T;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return {} as T;
    }
  }
  return raw as T;
}
