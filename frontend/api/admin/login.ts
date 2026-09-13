import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAdminCredentials, signAdminToken } from "../../lib/server/auth";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }

  const { username, password } = req.body ?? {};
  if (!checkAdminCredentials(username, password)) {
    return res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
  }
  res.json({ token: signAdminToken() });
}
