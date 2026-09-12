# موقع معهد بنين شنبارة الميمونة الأزهري

مشروع كامل: واجهة React + TypeScript، وخادم Node.js/Express للرسائل وشاشة المدير.

## البنية

```
institute/
  frontend/   # الموقع (React + Vite + TypeScript)
  backend/    # الخادم (Node + Express + TypeScript)
```

## التشغيل خطوة بخطوة

### 1) تشغيل الخادم (Backend)
```
cd backend
npm install
npm run dev
```
يعمل الخادم على: http://localhost:4000

بيانات دخول المدير الافتراضية (غيّرها فورًا):
- اسم المستخدم: `admin`
- كلمة المرور: `ChangeThisPassword123`

لتغييرها، أنشئ ملف `.env` داخل `backend` أو عدّل المتغيرات مباشرة:
```
ADMIN_USERNAME=اسمك
ADMIN_PASSWORD=كلمة_مرور_قوية
JWT_SECRET=نص_عشوائي_طويل
```

### 2) تشغيل الواجهة (Frontend)
في نافذة طرفية أخرى:
```
cd frontend
npm install
npm run dev
```
افتح المتصفح على الرابط الذي يظهر (عادة http://localhost:5173).

- الموقع العام: `/`
- شاشة المدير: `/#/admin`

## تعديل بيانات الموقع

كل النصوص (الاسم، الرؤية، الرسالة، الصفوف، الصور) موجودة في ملف واحد:
```
frontend/src/content.ts
```
عدّل فيه مباشرة وستنعكس التغييرات في كل الأقسام.

## الصور

ضع صور المعهد الحقيقية داخل:
```
frontend/public/assets/
```
بنفس الأسماء المذكورة في `content.ts` (hero.jpg, gallery-1.jpg ... إلخ)، أو غيّر الأسماء في نفس الملف.

## آلية الرسائل

- أي زائر يرسل رسالة من قسم "تواصل معنا" في الموقع.
- تُخزَّن الرسائل في `backend/data/messages.json`.
- شاشة المدير تتحقق من الرسائل الجديدة تلقائيًا كل 8 ثوانٍ (بدون الحاجة لتحديث الصفحة).

## النشر (Deployment)

المشروع جاهز للرفع مباشرة على GitHub ثم النشر. ملاحظة مهمة: **Vercel لا يصلح لاستضافة الخادم (backend)** لأنه Serverless ويمسح أي ملفات مكتوبة على القرص (ومنها `messages.json`) — لذلك الواجهة تُرفع على Vercel، والخادم يُرفع على منصة تدعم تشغيلًا دائمًا مثل Render.

### 1) رفع المشروع على GitHub
```
git init
git add .
git commit -m "أول رفع للمشروع"
git remote add origin <رابط مستودعك على GitHub>
git branch -M main
git push -u origin main
```
ملف `.gitignore` جاهز مسبقًا ويستثني `node_modules`، `dist`، بيانات الرسائل، وملفات `.env`.

### 2) نشر الخادم (backend) على Render
يوجد ملف `render.yaml` جاهز في جذر المشروع (Blueprint):
1. ادخل إلى render.com وسجّل دخولك بحساب GitHub.
2. اختر **New > Blueprint** وحدد مستودعك — سيقرأ Render ملف `render.yaml` تلقائيًا.
3. عند الطلب، أدخل قيم `ADMIN_USERNAME` و`ADMIN_PASSWORD` (كلمة مرور قوية من عندك). أما `JWT_SECRET` فسيُنشأ تلقائيًا.
4. بعد اكتمال النشر ستحصل على رابط مثل: `https://shanbara-institute-backend.onrender.com`.

(بديل يدوي بدون Blueprint: أنشئ Web Service جديد يدويًا، Root Directory = `backend`، Build Command = `npm install && npm run build`، Start Command = `npm start`.)

### 3) نشر الواجهة (frontend) على Vercel
1. ادخل إلى vercel.com وسجّل دخولك بحساب GitHub، ثم **Add New Project** واختر المستودع.
2. اضبط **Root Directory = `frontend`** (يكتشف Vite تلقائيًا).
3. من **Environment Variables** أضف:
   ```
   VITE_API_BASE_URL = https://shanbara-institute-backend.onrender.com
   ```
   (استخدم رابط خادمك الحقيقي من الخطوة السابقة، بدون `/api` في النهاية.)
4. اضغط **Deploy**. راجع ملف `frontend/.env.example` كمرجع لاسم المتغير.

### 4) تحديثات لاحقة
أي `git push` جديد على `main` يُعيد نشر الموقع والخادم تلقائيًا على كلتا المنصتين (Vercel و Render مرتبطتان بالمستودع مباشرة).
