import { FormEvent, useState } from "react";
import { sendMessage } from "../api";
import { site } from "../content";
import { CornerMotif } from "./Ornament";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setError("الرجاء كتابة الاسم ونص الرسالة");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await sendMessage({ name, phone, subject, body });
      setStatus("sent");
      setName("");
      setPhone("");
      setSubject("");
      setBody("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <CornerMotif className="contact__motif" />
        <h2 className="section-title">تواصل مع إدارة المعهد</h2>
        <p className="contact__lead">
          راسلنا بأي استفسار، وستصل رسالتك مباشرة إلى شاشة المدير.
        </p>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="contact__row">
            <label>
              الاسم
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              رقم الهاتف
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
          </div>
          <label>
            الموضوع
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label>
            نص الرسالة
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          {error && <p className="contact__error">{error}</p>}
          {status === "sent" && (
            <p className="contact__success">تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا.</p>
          )}

          <button type="submit" className="contact__submit" disabled={status === "sending"}>
            {status === "sending" ? "جارِ الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>

        <p className="contact__phone">للتواصل المباشر: {site.phone}</p>
      </div>
    </section>
  );
}
