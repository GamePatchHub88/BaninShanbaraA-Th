import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ملاحظة: دوال /api هنا هي Vercel Serverless Functions.
// لتجربتها محليًا مع الواجهة معًا استخدم: npx vercel dev
// (تشغيل npm run dev العادي يشغّل الواجهة فقط بدون endpoints الخاصة بـ /api)
export default defineConfig({
  plugins: [react()],
});
