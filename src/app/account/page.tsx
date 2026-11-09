'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  Package,
  Heart,
  Gift,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function AccountPage() {
  const { direction } = useLanguage();
  const { wishlist } = useCart();

  // Local simulated points state for guest / registered client
  const [pointsBalance, setPointsBalance] = useState(120);
  const [calcDinars, setCalcDinars] = useState<number>(100);

  // Conversion rule from PRD: 100 points = 5 TND discount
  const discountEarned = ((calcDinars * 1) / 100) * 5;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Welcome Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-black text-white relative overflow-hidden mb-12 shadow-xl">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>VAYRO REWARDS CLUB • نادي ولاء العملاء</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-2">
            مرحباً بك في VAYRO
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6">
            تسوق وجمع النقاط مع كل طلب، واستبدلها بتخفيضات حصرية على مشترياتك القادمة.
          </p>

          {/* Quick Points Display Card */}
          <div className="inline-flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-black">
              <Award className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-300 block">رصيد نقاط الولاء الحالي</span>
              <div className="text-xl sm:text-2xl font-black text-white">
                {pointsBalance} نقطة
                <span className="text-xs font-semibold text-emerald-400 ms-2">
                  (خصم {(pointsBalance * 0.05).toFixed(2)} د.ت)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Link
          href="/track"
          className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center mb-4">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm uppercase text-black mb-1">
              تتبع الشحنات والطلبات
            </h3>
            <p className="text-xs text-zinc-500">
              أدخل رقم الطلب للاطلاع على حالة التوصيل الحالية فورياً.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-black group-hover:underline">
            <span>تتبع الآن</span>
            {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm uppercase text-black mb-1">
              قائمة المفضلة ({wishlist.length})
            </h3>
            <p className="text-xs text-zinc-500">
              استعرض القطع التي أعجبتك وقمت بحفظها لشرائها لاحقاً.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-black group-hover:underline">
            <span>عرض المفضلة</span>
            {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </div>
        </Link>

        <a
          href="https://wa.me/21629660432"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-black text-sm uppercase text-black mb-1">
              خدمة العملاء والواتساب
            </h3>
            <p className="text-xs text-zinc-500">
              تواصل مباشرة مع إدارة متجر VAYRO لأي استفسار أو تبديل مقاس.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:underline">
            <span>محادثة فورية</span>
            {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </div>
        </a>
      </div>

      {/* Loyalty Program Rules & Points Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rules */}
        <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-xs">
          <h3 className="font-black text-base text-black uppercase tracking-tight mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-black" />
            <span>كيف يعمل نظام نقاط ولاء VAYRO؟</span>
          </h3>

          <ul className="space-y-4 text-xs text-zinc-600">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block mb-0.5">1 دينار = 1 نقطة</strong>
                <span>تحصل تلقائياً على نقطة واحدة مقابل كل دينار تونسي تنفقه في المتجر.</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block mb-0.5">100 نقطة = خصم 5 د.ت</strong>
                <span>عند تجميع 100 نقطة، يمكنك تحويلها لخصم 5 د.ت فوري على طلبيتك القادمة.</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block mb-0.5">بدون تاريخ انتهاء معقد</strong>
                <span>نقاطك تظل محفوظة في رصيدك طالما تواصل التسوق معنا.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Calculator */}
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <h3 className="font-black text-base text-black uppercase tracking-tight mb-2">
            حاسبة المكافآت
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            جرّب حساب النقاط التي ستجمعها ومقدار الخصم الذي ستحصل عليه:
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1.5 font-bold text-zinc-700">
                <span>قيمة مشترياتك بالدينار التونسي:</span>
                <span className="text-base font-black text-black">{calcDinars} د.ت</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={calcDinars}
                onChange={(e) => setCalcDinars(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">النقاط التي ستكسبها:</span>
                <span className="font-bold text-black">{calcDinars} نقطة</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-100">
                <span className="text-zinc-500">قيمة الخصم المستقبلي:</span>
                <span className="font-black text-emerald-600 text-sm">{discountEarned.toFixed(2)} د.ت</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
