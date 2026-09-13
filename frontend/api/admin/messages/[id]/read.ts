import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureAdmin } from "../../../../lib/server/auth";
import { getMessagesCollection } from "../../../../lib/server/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }
  if (!ensureAdmin(req, res)) return;

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "معرّف غير صالح" });
  }

  try {
    const collection = await getMessagesCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: { read: true } },
      { returnDocument: "after", projection: { _id: 0 } }
    );
    if (!result) return res.status(404).json({ error: "الرسالة غير موجودة" });
    res.json({ message: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}
