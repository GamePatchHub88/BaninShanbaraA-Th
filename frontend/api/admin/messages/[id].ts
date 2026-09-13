import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureAdmin } from "../../../lib/server/auth";
import { getMessagesCollection } from "../../../lib/server/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }
  if (!ensureAdmin(req, res)) return;

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "معرّف غير صالح" });
  }

  try {
    const collection = await getMessagesCollection();
    const result = await collection.deleteOne({ id });
    if (result.deletedCount !== 1) {
      return res.status(404).json({ error: "الرسالة غير موجودة" });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}
