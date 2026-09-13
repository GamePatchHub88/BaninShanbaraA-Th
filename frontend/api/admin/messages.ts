import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureAdmin } from "../../lib/server/auth";
import { getMessagesCollection } from "../../lib/server/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }
  if (!ensureAdmin(req, res)) return;

  try {
    const collection = await getMessagesCollection();
    const messages = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}
