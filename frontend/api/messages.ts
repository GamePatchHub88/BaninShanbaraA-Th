import type { VercelRequest, VercelResponse } from "@vercel/node";
import { nanoid } from "nanoid";
import { getMessagesCollection } from "../lib/server/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "طريقة غير مسموحة" });
  }

  const { name, phone, subject, body } = req.body ?? {};
  if (!name || !body) {
    return res.status(400).json({ error: "الاسم ونص الرسالة مطلوبان" });
  }

  try {
    const collection = await getMessagesCollection();
    const message = {
      id: nanoid(10),
      name: String(name).slice(0, 120),
      phone: phone ? String(phone).slice(0, 40) : "",
      subject: subject ? String(subject).slice(0, 160) : "بدون عنوان",
      body: String(body).slice(0, 4000),
      createdAt: new Date().toISOString(),
      read: false,
    };
    await collection.insertOne(message);
    res.status(201).json({ ok: true, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}
