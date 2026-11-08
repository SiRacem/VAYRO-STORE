'use client';

import React from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({
  isOpen,
  onClose,
  category = 'Tops',
}: SizeGuideModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const sizeChart = [
    { size: 'XS', chest: '88 - 92', length: '68', shoulder: '44' },
    { size: 'S', chest: '93 - 97', length: '70', shoulder: '46' },
    { size: 'M', chest: '98 - 103', length: '72', shoulder: '48' },
    { size: 'L', chest: '104 - 109', length: '74', shoulder: '50' },
    { size: 'XL', chest: '110 - 116', length: '76', shoulder: '52' },
    { size: 'XXL', chest: '117 - 124', length: '78', shoulder: '54' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-black uppercase">
                {language === 'ar'
                  ? 'دليل المقاسات الرسمي'
                  : language === 'fr'
                  ? 'Guide des Tailles Officiel'
                  : 'Official Size Guide'}
              </h3>
              <p className="text-xs text-zinc-500">
                {language === 'ar'
                  ? 'القياسات بالسنتيمتر (cm) لقَصّة مريحة وعصرية'
                  : 'Toutes les mesures sont en centimètres (cm)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Measurement Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                <th className="py-2.5 text-start">
                  {language === 'ar' ? 'المقاس' : 'Taille'}
                </th>
                <th className="py-2.5">
                  {language === 'ar' ? 'محيط الصدر' : 'Poitrine'}
                </th>
                <th className="py-2.5">
                  {language === 'ar' ? 'الطول' : 'Longueur'}
                </th>
                <th className="py-2.5">
                  {language === 'ar' ? 'الأكتاف' : 'Épaules'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {sizeChart.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-50 transition">
                  <td className="py-3 text-start font-black text-black">
                    {row.size}
                  </td>
                  <td className="py-3 text-zinc-700">{row.chest} cm</td>
                  <td className="py-3 text-zinc-700">{row.length} cm</td>
                  <td className="py-3 text-zinc-700">{row.shoulder} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips Box */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 space-y-2">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {language === 'ar'
                ? 'قصات VAYRO مصممة بأسلوب أوفرسايز عصري (Relaxed Oversized Fit).'
                : 'Les coupes VAYRO sont conçues avec un tombé oversize moderne.'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {language === 'ar'
                ? 'إذا كنت تفضل القصة الكلاسيكية العادية، يمكنك اختيار مقاس أصغر بدرجة واحدة.'
                : 'Pour une coupe ajustée standard, optez pour une taille en dessous.'}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition"
          >
            {language === 'ar' ? 'حسناً، فهمت' : 'D’accord, fermer'}
          </button>
        </div>
      </div>
    </div>
  );
}
