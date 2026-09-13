# موقع معهد بنين شنبارة الميمونة الأزهري

مشروع كامل يعمل بالكامل على **Vercel وحده** — الواجهة (React) ودوال الخادم (Serverless Functions) في مشروع واحد، مع **MongoDB** لتخزين الرسائل بشكل دائم.

## البنية

```
institute/
  frontend/
    src/            # الموقع (React + Vite + TypeScript)
    api/            # دوال الخادم (Vercel Serverless Functions)
    lib/server/      # كود مشترك (اتصال MongoDB، التحقق من هوية المدير)
  backend/          # (اختياري) نسخة Express كاملة لمن يريد استضافة خادم منفصل بدل Vercel — غير مطلوبة إذا اتبعت هذا الدليل
```

## 1) إعداد قاعدة بيانات MongoDB (مرة واحدة فقط)

1. أنشئ حسابًا مجانيًا على https://www.mongodb.com/cloud/atlas
2. أنشئ Cluster مجاني.
3. من **Database Access** أنشئ مستخدمًا وكلمة مرور (احتفظ بهما).
4. من **Network Access** اختر Allow Access from Anywhere.
5. من **Connect > Drivers** انسخ رابط الاتصال، شكله:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

## 2) التشغيل محليًا (اختياري، للتجربة قبل الرفع)

```
cd frontend
npm install
```

أنشئ ملف `.env.local` بجانب `package.json` وضع فيه:
```
MONGODB_URI=رابط_الاتصال_من_الخطوة_السابقة
MONGODB_DB_NAME=shanbara_institute
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeThisPassword123
JWT_SECRET=نص-عشوائي-طويل
```

لتجربة الموقع **مع** دوال `/api` معًا محليًا (وليس الواجهة فقط):
```
npx vercel dev
```
(تشغيل `npm run dev` العادي يعرض الواجهة فقط بدون استجابة حقيقية من `/api`.)

## 3) الرفع على GitHub

```
git init
git add .
git commit -m "أول رفع للمشروع"
git remote add origin <رابط مستودعك>
git branch -M main
git push -u origin main
```

## 4) النشر على Vercel

1. ادخل إلى vercel.com وسجّل الدخول بحساب GitHub، ثم **Add New Project** واختر المستودع.
2. اضبط **Root Directory = `frontend`**.
3. من **Environment Variables** أضف كل المتغيرات التالية (بنفس القيم التي استخدمتها محليًا):
   ```
   MONGODB_URI
   MONGODB_DB_NAME   (مثال: shanbara_institute)
   ADMIN_USERNAME
   ADMIN_PASSWORD
   JWT_SECRET
   ```
4. اضغط **Deploy**.

بعد النشر، الموقع ودوال الرسائل وشاشة المدير تعمل كلها من نفس الرابط، بدون الحاجة لأي استضافة إضافية مثل Render.

## تعديل بيانات الموقع

كل النصوص (الاسم، الرؤية، الرسالة، الصفوف، الصور) في ملف واحد:
```
frontend/src/content.ts
```

## الصور

ضع صور المعهد الحقيقية داخل `frontend/public/assets/` بنفس الأسماء المذكورة في `content.ts`.

## آلية الرسائل وشاشة المدير

- أي رسالة من قسم "تواصل معنا" تُخزَّن في MongoDB مباشرة (مجموعة `messages`) — دائمة ولا تُفقد عند إعادة النشر.
- شاشة المدير على الرابط: `https://موقعك.vercel.app/#/admin`
- تتحقق تلقائيًا من الرسائل الجديدة كل 8 ثوانٍ.
- بيانات الدخول هي نفس `ADMIN_USERNAME` و`ADMIN_PASSWORD` اللذان وضعتهما في متغيرات البيئة.

## ملاحظة أمان

بعد الانتهاء من الإعداد، إذا شاركت كلمة مرور MongoDB في أي مكان (رسالة، محادثة، إلخ)، اذهب إلى Atlas > Database Access وأعد توليد كلمة مرور جديدة لذلك المستخدم.
