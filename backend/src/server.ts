import "dotenv/config";
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { addMessage, deleteMessage, markRead, readMessages } from "./db.js";
import { checkAdminCredentials, requireAdmin, signAdminToken } from "./auth.js";

const app = express();
app.use(cors());
app.use(express.json());

function handleError(res: express.Response, err: unknown) {
  console.error(err);
  res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
}

// -- Public: submit a message from the contact section --
app.post("/api/messages", async (req, res) => {
  const { name, phone, subject, body } = req.body ?? {};
  if (!name || !body) {
    return res.status(400).json({ error: "الاسم ونص الرسالة مطلوبان" });
  }
  try {
    const msg = await addMessage({
      id: nanoid(10),
      name: String(name).slice(0, 120),
      phone: phone ? String(phone).slice(0, 40) : "",
      subject: subject ? String(subject).slice(0, 160) : "بدون عنوان",
      body: String(body).slice(0, 4000),
      createdAt: new Date().toISOString(),
      read: false,
    });
    res.status(201).json({ ok: true, message: msg });
  } catch (err) {
    handleError(res, err);
  }
});

// -- Admin login --
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body ?? {};
  if (!checkAdminCredentials(username, password)) {
    return res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
  }
  res.json({ token: signAdminToken() });
});

// -- Admin: list all messages --
app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
  try {
    const messages = await readMessages();
    res.json({ messages });
  } catch (err) {
    handleError(res, err);
  }
});

// -- Admin: mark a message as read --
app.patch("/api/admin/messages/:id/read", requireAdmin, async (req, res) => {
  try {
    const updated = await markRead(req.params.id);
    if (!updated) return res.status(404).json({ error: "الرسالة غير موجودة" });
    res.json({ message: updated });
  } catch (err) {
    handleError(res, err);
  }
});

// -- Admin: delete a message --
app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
  try {
    const ok = await deleteMessage(req.params.id);
    if (!ok) return res.status(404).json({ error: "الرسالة غير موجودة" });
    res.json({ ok: true });
  } catch (err) {
    handleError(res, err);
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Shanbara Al-Maymona API running on http://localhost:${PORT}`);
});
