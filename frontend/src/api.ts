export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

// في التطوير المحلي يُترك هذا فارغًا ويعمل عبر إعادة التوجيه في vite.config.ts.
// في الإنتاج (بعد رفع الخادم)، عرّف VITE_API_BASE_URL في إعدادات Vercel
// بقيمة مثل: https://your-backend.onrender.com
const BASE = `${import.meta.env.VITE_API_BASE_URL ?? ""}/api`;

export async function sendMessage(input: {
  name: string;
  phone: string;
  subject: string;
  body: string;
}): Promise<void> {
  const res = await fetch(`${BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "تعذر إرسال الرسالة");
  }
}

export async function adminLogin(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "تعذر تسجيل الدخول");
  return data.token as string;
}

export async function fetchMessages(token: string): Promise<ContactMessage[]> {
  const res = await fetch(`${BASE}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "تعذر تحميل الرسائل");
  return data.messages as ContactMessage[];
}

export async function markMessageRead(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE}/admin/messages/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "تعذر تحديث الرسالة");
  }
}

export async function deleteMessageApi(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE}/admin/messages/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "تعذر حذف الرسالة");
  }
}
