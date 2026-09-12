import { FormEvent, useState } from "react";
import { adminLogin } from "../api";
import { site } from "../content";

export default function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = await adminLogin(username, password);
      onLogin(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={onSubmit}>
        <h1>شاشة المدير</h1>
        <p className="admin-login__sub">{site.name}</p>

        <label>
          اسم المستخدم
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          كلمة المرور
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="admin-login__error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "جارِ الدخول..." : "تسجيل الدخول"}
        </button>

        <a className="admin-login__back" href="#/">
          العودة إلى الموقع
        </a>
      </form>
    </div>
  );
}
