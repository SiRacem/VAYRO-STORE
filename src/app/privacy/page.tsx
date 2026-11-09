'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { direction } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="pb-8 border-b border-zinc-200 mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
          LEGAL & PRIVACY • سياسة الخصوصية
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
          سياسة الخصوصية وحماية البيانات
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2">
          نحن في VAYRO نلتزم بحماية خصوصية عملائنا وسلامة بياناتهم الشخصية في كافة مراحل الطلب والتوصيل.
        </p>
      </div>

      <div className="space-y-8 text-xs text-zinc-600 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <h2 className="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-black" />
            <span>1. البيانات التي نقوم بجمعها</span>
          </h2>
          <p className="mb-2">
            عند قيامك بطلب ملابس عبر متجر VAYRO، نقوم بجمع المعلومات الأساسية الضرورية فقط لإتمام الشحنة:
          </p>
          <ul className="list-disc list-inside space-y-1.5 font-medium text-zinc-700">
            <li>الاسم واللقب لتعريف صاحب الشحنة.</li>
            <li>رقم الهاتف التونسي للتواصل وتأكيد التسليم.</li>
            <li>عنوان التوصيل (الولاية، المدينة، والشارع) لتسليم الطرد عبر مندوب الشحن.</li>
            <li>البريد الإلكتروني (اختياري) لإرسال تنبيهات "عاد للمخزون" أو الفواتير.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <h2 className="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>2. كيف نستخدم بياناتك</span>
          </h2>
          <p>
            تُستخدم بياناتك حصرياً لتجهيز الطلبية، والتواصل معك عبر WhatsApp للتأكيد، وتوجيه مندوب التوصيل إلى مكان تواجدك. لا نقوم مطلقاً ببيع، تأجير، أو مشاركة بياناتك مع أي جهات خارجية أو أطراف تسويقية غير معنية بطلبك.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <h2 className="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-black" />
            <span>3. أمان الاتصال والرسائل</span>
          </h2>
          <p>
            جميع المعاملات والرسائل المتبادلة عبر WhatsApp مشفرة من طرف إلى طرف (End-to-End Encryption)، ويتم حفظ تفاصيل الطلبات في خوادم سحابية مؤمنة وفق أعلى معايير الحماية الدولية.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-200 flex justify-between items-center text-xs">
        <span className="text-zinc-500">آخر تحديث: نوفمبر 2026</span>
        <Link href="/" className="font-bold text-black hover:underline flex items-center gap-1.5">
          <span>العودة للرئيسية</span>
          {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </Link>
      </div>
    </div>
  );
}
