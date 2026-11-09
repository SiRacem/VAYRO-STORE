'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ShippingPage() {
  const { direction } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
          DELIVERY & RETURNS • الشحن والإرجاع
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          سياسة الشحن والتوصيل في تونس
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2">
          كل ما تحتاج معرفته عن تكلفة الشحن، مدة التوصيل، وسياسة استبدال المقاسات الميسرة.
        </p>
      </div>

      {/* 3 Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {/* Card 1 */}
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 text-center">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Truck className="w-7 h-7" />
          </div>
          <h3 className="font-black text-base uppercase text-black mb-1">
            سعر ثابت 8 د.ت
          </h3>
          <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
            تكلفة توصيل موحدة لجميع الولايات التونسية الـ 24 دون أي مصاريف خفية.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
            🎉 مجاني للطلبات فوق 100 د.ت
          </span>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 text-center">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Clock className="w-7 h-7" />
          </div>
          <h3 className="font-black text-base uppercase text-black mb-1">
            24 إلى 48 ساعة
          </h3>
          <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
            توصيل فائق السرعة لتونس الكبرى والمدن الساحلية، وحتى 72 ساعة لكافة الجهات الداخلية.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-[11px] font-black">
            تأكيد مباشر عبر WhatsApp
          </span>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 text-center">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-black text-base uppercase text-black mb-1">
            معاينة قبل الدفع
          </h3>
          <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
            ادفع نقداً لمندوب الشحن بعد فحص الطرد والتأكد من المقاس وجودة القطعة.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black">
            ضمان الرضا 100%
          </span>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-8">
        {/* Section 1: How Delivery Works */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xs">
          <h2 className="text-lg font-black uppercase text-black tracking-tight mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-black" />
            <span>كيف تتم عملية التوصيل من VAYRO؟</span>
          </h2>
          <ol className="space-y-4 text-xs text-zinc-600 leading-relaxed list-decimal list-inside font-medium">
            <li>
              <strong className="text-black">تأكيد الطلب:</strong> بمجرد إرسال طلبك عبر الموقع وتحويله إلى WhatsApp، يقوم فريقنا بتسجيله وتأكيد العنوان ورقم الهاتف معك فورياً.
            </li>
            <li>
              <strong className="text-black">التجهيز والفحص:</strong> تخضع كل قطعة للفحص الدقيق للنسيج والخياطة قبل تغليفها في علبة أو كيس VAYRO الحصري.
            </li>
            <li>
              <strong className="text-black">تسليم المندوب:</strong> تُسلم الشحنة لشركة التوصيل الشريكة، ويتصل بك المندوب هاتفياً قبل الوصول لتحديد موعد ومكان التسليم المناسب لك.
            </li>
            <li>
              <strong className="text-black">الدفع عند الاستلام:</strong> تقوم بفحص طلبيتك ودفع المبلغ نقداً للمندوب.
            </li>
          </ol>
        </div>

        {/* Section 2: Size Exchange & Returns */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <h2 className="text-lg font-black uppercase text-black tracking-tight mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-black" />
            <span>سياسة استبدال المقاسات والإرجاع</span>
          </h2>
          <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
            <p>
              نحرص على أن تناسبك كل قطعة تماماً. إذا وجدت المقاس غير مناسب بعد التجربة، فنحن نضمن لك خدمة استبدال سريعة وسلسة:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-black">المهلة المتاحة:</strong> يمكنك طلب استبدال المقاس خلال <strong>48 ساعة</strong> من تاريخ استلام الطلبية.
              </li>
              <li>
                <strong className="text-black">حالة الملابس:</strong> يجب أن تكون القطع غير مستعملة، وفي حالتها الأصلية مع البطاقات والملصقات الخاصة بـ VAYRO.
              </li>
              <li>
                <strong className="text-black">طريقة الطلب:</strong> تواصل معنا عبر الواتساب على الرقم <span className="font-bold text-black" dir="ltr">+216 29 660 432</span> وسنرتب لك المقاس الجديد فوراً.
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
              <span>هل تحتاج لتغيير مقاسك الآن؟</span>
            </div>
            <a
              href="https://wa.me/21629660432?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%A8%D8%AF%D8%A7%D9%84%20%D9%85%D9%82%D8%A7%D8%B3%20%D9%82%D8%B7%D8%B9%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition"
            >
              مراسلة خدمة العملاء
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
