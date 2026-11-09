# 🚀 دليل النشر السريع لمتجر VAYRO على Vercel (Deployment Guide)

المشروع مبني بإطار عمل **Next.js (App Router)**، وهو مصمم خصيصاً للتوافق التام بنسبة 100% مع منصة **Vercel** المجانية مع دعم كامل للـ SSL و CDN وسرعة فائقة في تونس والعالم.

---

## 📋 الخطوات خطوة بخطوة (تستغرق دقيقتين فقط)

### 1️⃣ الدخول إلى منصة Vercel
1. توجه إلى موقع [Vercel](https://vercel.com/) وسجّل الدخول بحسابك على **GitHub** (SiRacem).

### 2️⃣ استيراد المشروع (Import Project)
1. في لوحة تحكم Vercel Dashboard، اضغط على الزر الأزرق: **"Add New..."** ثم اختر **"Project"**.
2. ستظهر قائمة بمستودعاتك على GitHub، ابحث عن مستودع:
   👉 **`SiRacem/VAYRO-STORE`**
3. اضغط على زر **"Import"** بجانب المستودع.

---

### 3️⃣ ضبط المتغيرات البيئية (Environment Variables)
في شاشة الإعداد قبل الضغط على Deploy، افتح قسم **"Environment Variables"** وأضف المتغيرات التالية (التي أعددناها في Supabase):

| Key (اسم المتغير) | Value (القيمة) | ملاحظة |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://nlwmdkhwnmrehdivukmm.supabase.co` | رابط مشروع Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` (انسخه من ملف `.env.local`) | المفتاح العام Publishable |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` (انسخه من ملف `.env.local`) | المفتاح السري الخاص بلوحة التحكم |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+21629660432` | رقم الواتساب الرسمي |
| `NEXT_PUBLIC_STORE_NAME` | `VAYRO` | اسم المتجر |
| `NEXT_PUBLIC_SITE_URL` | `https://vayro-store.vercel.app` | رابط الموقع على Vercel أو دومينك |

---

### 4️⃣ إطلاق الموقع (Deploy)
1. اضغط على زر **"Deploy"**.
2. ستقوم منصة Vercel ببناء المشروع تلقائياً وتشغيل Turbopack وتوليد الصفحات الثابتة (SSG/ISR).
3. بعد أقل من دقيقة، ستظهر شاشة احتفالية **"Congratulations!"** مع رابط موقعك المباشر المجاني بصيغة:
   `https://vayro-store.vercel.app`

---

## 🌐 ربط دومين مخصص (Custom Domain مثل `vayro.tn`)
إذا قمت بشراء دومين خاص مثل `vayro.tn`:
1. في لوحة Vercel، ادخل إلى **Settings ➔ Domains**.
2. أضف الدومين الخاص بك (مثل `vayro.tn`).
3. انسخ إعدادات DNS (سجل A و CNAME) وأضفها في لوحة مزود النطاق.
4. سيتم تفعيل شهادة الأمان المجانية (HTTPS SSL) تلقائياً!

---

## 🔄 التحديث التلقائي المستمر (CI/CD)
المشروع مرتبط الآن مباشرة بمستودع GitHub. هذا يعني أن:
- أي تعديل كود أو إضافة مستقبلية تقوم بدفعها إلى GitHub (`git push`)، ستقوم Vercel ببنائها ونشرها فورياً على الموقع الحي دون أي تدخل يدوي!
