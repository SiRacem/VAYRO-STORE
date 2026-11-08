'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowRight, ArrowLeft, Package, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'VAYRO-STORE';
  const { direction } = useLanguage();

  const storePhone = '21629660432';
  const whatsappUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(
    `مرحباً متجر VAYRO، أود متابعة طلبي رقم: #${orderNumber}`
  )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      {/* Icon Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block mb-2">
        ORDER CONFIRMED • تم تأكيد الطلب
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mb-3">
        شكراً لتسوقك مع VAYRO!
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 max-w-lg mx-auto mb-8 leading-relaxed">
        تم استلام وتسجيل طلبك بنجاح في نظامنا. مندوب التوصيل سيتصل بك لتسليم الشحنة في أقرب وقت.
      </p>

      {/* Order Number Box */}
      <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 max-w-md mx-auto mb-10 text-center">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
          رقم الطلب الخاص بك
        </span>
        <div className="text-2xl sm:text-3xl font-black text-black tracking-wider">
          #{orderNumber}
        </div>
      </div>

      {/* What Happens Next Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-start max-w-2xl mx-auto mb-10">
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-black block mb-0.5">تأكيد فوري</span>
            <span className="text-zinc-500">تم إرسال تفاصيل طلبك إلى WhatsApp للمتابعة السريعة.</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
          <Clock className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-black block mb-0.5">توصيل سريع</span>
            <span className="text-zinc-500">تصلك الشحنة خلال 24 إلى 48 ساعة لكافة ولايات تونس.</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-black block mb-0.5">الدفع عند الاستلام</span>
            <span className="text-zinc-500">ادفع نقداً بعد فحص ومعاينة مقاس وجودة الملابس.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full transition shadow-lg flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>فتح محادثة WhatsApp للمتابعة</span>
        </a>

        <Link
          href="/products"
          className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-full transition flex items-center justify-center gap-2"
        >
          <span>مواصلة التسوق</span>
          {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
