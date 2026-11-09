'use client';

import React from 'react';
import Link from 'next/link';
import { Ruler, Check, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SizeGuidePage() {
  const { direction } = useLanguage();

  const topsChart = [
    { size: 'XS', chest: '88 - 92 cm', length: '68 cm', shoulder: '44 cm' },
    { size: 'S', chest: '93 - 97 cm', length: '70 cm', shoulder: '46 cm' },
    { size: 'M', chest: '98 - 103 cm', length: '72 cm', shoulder: '48 cm' },
    { size: 'L', chest: '104 - 109 cm', length: '74 cm', shoulder: '50 cm' },
    { size: 'XL', chest: '110 - 116 cm', length: '76 cm', shoulder: '52 cm' },
    { size: 'XXL', chest: '117 - 124 cm', length: '78 cm', shoulder: '54 cm' },
  ];

  const pantsChart = [
    { size: 'S (28-30)', waist: '74 - 78 cm', length: '100 cm', hip: '96 cm' },
    { size: 'M (31-32)', waist: '79 - 84 cm', length: '102 cm', hip: '101 cm' },
    { size: 'L (33-34)', waist: '85 - 90 cm', length: '104 cm', hip: '106 cm' },
    { size: 'XL (36-38)', waist: '91 - 96 cm', length: '106 cm', hip: '111 cm' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
          SIZE & FIT GUIDE • دليل المقاسات
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          كيف تختار مقاسك المثالي
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2">
          تم تصميم جميع قطع VAYRO بقصات ستريت وير عصرية ومريحة بالسنتيمتر (cm).
        </p>
      </div>

      {/* Tops Size Chart */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase text-black tracking-tight">
              جدول مقاسات التيشيرتات والهوديات (Tops)
            </h2>
            <p className="text-xs text-zinc-500">
              قَصّة أوفرسايز منسدلة (Relaxed Drop-Shoulder Fit)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 font-black uppercase tracking-wider">
                <th className="py-3 text-start">المقاس القياسي</th>
                <th className="py-3">محيط الصدر (Chest)</th>
                <th className="py-3">طول التيشيرت (Length)</th>
                <th className="py-3">عرض الأكتاف (Shoulder)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {topsChart.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-50 transition">
                  <td className="py-3.5 text-start font-black text-black text-sm">
                    {row.size}
                  </td>
                  <td className="py-3.5 text-zinc-700">{row.chest}</td>
                  <td className="py-3.5 text-zinc-700">{row.length}</td>
                  <td className="py-3.5 text-zinc-700">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pants Size Chart */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase text-black tracking-tight">
              جدول مقاسات البناطيل والكارجو (Pants)
            </h2>
            <p className="text-xs text-zinc-500">
              قصة مستقيمة مريحة مع خصر مطاطي برباط شد
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 font-black uppercase tracking-wider">
                <th className="py-3 text-start">المقاس القياسي</th>
                <th className="py-3">محيط الخصر (Waist)</th>
                <th className="py-3">الطول الكلي (Length)</th>
                <th className="py-3">محيط الورك (Hip)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {pantsChart.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-50 transition">
                  <td className="py-3.5 text-start font-black text-black text-sm">
                    {row.size}
                  </td>
                  <td className="py-3.5 text-zinc-700">{row.waist}</td>
                  <td className="py-3.5 text-zinc-700">{row.length}</td>
                  <td className="py-3.5 text-zinc-700">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Measure & Fit Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-4">
          <h3 className="font-black text-base text-black uppercase tracking-tight">
            كيف تأخذ مقاسك بشكل صحيح؟
          </h3>
          <ul className="space-y-3 text-xs text-zinc-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">محيط الصدر:</strong> لف شريط القياس حول أعرض نقطة في صدرك تحت الإبطين مباشرة مع إبقاء الشريط مستوياً.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">الطول:</strong> قس من أعلى نقطة في الكتف بمحاذاة الياقة إلى الأسفل حتى الحافة السفلية.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">الخصر:</strong> قس حول محيط خصرك الطبيعي حيث ترتدي البنطلون عادة.
              </div>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-950 text-white space-y-4">
          <h3 className="font-black text-base uppercase tracking-tight">
            نصيحة أسلوب القصة (Oversized vs Regular)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-normal">
            تصاميم VAYRO تعتمد قصة أوفرسايز مريحة وعصرية بطبيعتها.
          </p>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-zinc-200 space-y-2">
            <p>
              • <strong>لمظهر ستريت وير أوفرسايز مميز:</strong> اختر مقاسك المعتاد تماماً.
            </p>
            <p>
              • <strong>لمظهر كلاسيكي كاجوال أقرب للجسم:</strong> اختر مقاساً أصغر بدرجة واحدة.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-white hover:underline"
            >
              <span>تسوق التشكيلة الآن</span>
              {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
