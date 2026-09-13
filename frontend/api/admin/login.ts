import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAdminCredentials, signAdminToken } from "../../lib/server/auth";
import { parseBody } from "../../lib/server/request";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }

  try {
    const { username, password } = parseBody<{ username?: string; password?: string }>(req);
    if (!checkAdminCredentials(username ?? "", password ?? "")) {
      return res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
    }
    res.json({ token: signAdminToken() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}
