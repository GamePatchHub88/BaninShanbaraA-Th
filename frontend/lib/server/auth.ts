import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const JWT_SECRET = process.env.JWT_SECRET || "shanbara-almaymona-secret-change-me";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeThisPassword123";

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

/**
 * يتحقق من وجود توكن مدير صالح. يعيد true إذا كان الطلب مصرّحًا،
 * وإلا يرسل استجابة 401 بنفسه ويعيد false (استدعِ return بعده مباشرة).
 */
export function ensureAdmin(req: VercelRequest, res: VercelResponse): boolean {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "غير مصرح بالدخول" });
    return false;
  }
  const token = header.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    if (decoded.role !== "admin") throw new Error("not admin");
    return true;
  } catch {
    res.status(401).json({ error: "جلسة غير صالحة، الرجاء تسجيل الدخول مرة أخرى" });
    return false;
  }
}
