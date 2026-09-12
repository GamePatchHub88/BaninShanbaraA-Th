import { useCallback, useEffect, useState } from "react";
import {
  ContactMessage,
  deleteMessageApi,
  fetchMessages,
  markMessageRead,
} from "../api";
import { site } from "../content";

const POLL_INTERVAL_MS = 8000;

export default function AdminDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchMessages(token);
      setMessages(data);
      setError("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "تعذر تحميل الرسائل";
      setError(msg);
      if (msg.includes("جلسة")) onLogout();
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  async function openMessage(msg: ContactMessage) {
    setSelectedId(msg.id);
    if (!msg.read) {
      await markMessageRead(token, msg.id).catch(() => {});
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
    }
  }

  async function removeMessage(id: string) {
    await deleteMessageApi(token, id).catch(() => {});
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div>
          <h1>شاشة المدير</h1>
          <p>{site.name}</p>
        </div>
        <div className="admin-dash__header-actions">
          <span className="admin-dash__unread">
            {unreadCount > 0 ? `${unreadCount} رسالة غير مقروءة` : "لا رسائل جديدة"}
          </span>
          <button onClick={onLogout}>تسجيل الخروج</button>
        </div>
      </header>

      {error && <p className="admin-dash__error">{error}</p>}

      <div className="admin-dash__body">
        <aside className="admin-dash__list">
          {loading && <p className="admin-dash__empty">جارِ التحميل...</p>}
          {!loading && messages.length === 0 && (
            <p className="admin-dash__empty">لا توجد رسائل حتى الآن</p>
          )}
          {messages.map((m) => (
            <button
              key={m.id}
              className={`admin-dash__item ${!m.read ? "admin-dash__item--unread" : ""} ${
                selectedId === m.id ? "admin-dash__item--active" : ""
              }`}
              onClick={() => openMessage(m)}
            >
              <span className="admin-dash__item-name">{m.name}</span>
              <span className="admin-dash__item-subject">{m.subject}</span>
              <span className="admin-dash__item-date">
                {new Date(m.createdAt).toLocaleString("ar-EG")}
              </span>
            </button>
          ))}
        </aside>

        <section className="admin-dash__detail">
          {!selected && <p className="admin-dash__empty">اختر رسالة لعرض تفاصيلها</p>}
          {selected && (
            <div className="admin-dash__detail-card">
              <h2>{selected.subject}</h2>
              <p className="admin-dash__detail-meta">
                من: {selected.name}
                {selected.phone ? ` — ${selected.phone}` : ""}
              </p>
              <p className="admin-dash__detail-meta">
                {new Date(selected.createdAt).toLocaleString("ar-EG")}
              </p>
              <p className="admin-dash__detail-body">{selected.body}</p>
              <button
                className="admin-dash__delete"
                onClick={() => removeMessage(selected.id)}
              >
                حذف الرسالة
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
