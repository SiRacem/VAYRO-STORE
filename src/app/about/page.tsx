'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Heart, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { direction } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Statement Banner */}
      <section className="relative py-20 sm:py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1800&auto=format&fit=crop"
            alt="VAYRO Philosophy"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>قصة العلامة التجارية • VAYRO STORY</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
            نحن نعيد تعريف أزياء الشارع في تونس
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            وُلدت علامة VAYRO من شغف حقيقي بالبساطة والأناقة الحضرية. نؤمن بأن الملابس ليست مجرد قطع ترتديها، بل هي وسيلة تعبر بها عن حضورك وثقتك دون الحاجة للكثير من الكلام.
          </p>
        </div>
      </section>

      {/* 2. Brand Pillars (Our Core Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
            OUR CORE VALUES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            ركائزنا ومبادئنا في التصميم
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            كل قطعة من VAYRO تخضع لمعايير صارمة في اختيار الخامة وجودة الخياطة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base uppercase text-black mb-2 tracking-tight">
              1. أقمشة فاخرة 100% قطن
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              نختار أجود أنواع القطن التونسي عالي الكثافة (من 240 إلى 400 GSM) لضمان متانة النسيج، ومقاومة التكتل، والحفاظ على رونق اللون بعد عشرات الغسلات.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base uppercase text-black mb-2 tracking-tight">
              2. قصات مينيمالست حصرية
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              تصاميمنا مستوحاة من فلسفة البساطة المعاصرة (Minimalist Streetwear). قصات مدروسة بدقة تمنحك مظهراً منسقاً وراحة فائقة طوال اليوم.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-black transition">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 shadow-md">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base uppercase text-black mb-2 tracking-tight">
              3. تجربة شراء شخصية
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              لسنا مجرد متجر آلي؛ فالمتابعة عبر WhatsApp والتأكيد الشخصي والدفع عند الاستلام بعد المعاينة تضمن لك راحة البال وثقة كاملة في كل طلب.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual Story Section */}
      <section className="bg-zinc-50 py-16 sm:py-24 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-zinc-200">
              <Image
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop"
                alt="Crafting VAYRO Apparel"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                CRAFTED IN TUNISIA • صُنع بشغف في تونس
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase leading-snug">
                من الفكرة والتصميم إلى خزانتك
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                كل إصدار جديد لـ VAYRO يمر بمراحل دقيقة من اختيار الألوان، واختبار العينات، وتدقيق مقاسات الياقة والأكمام. نحن ننتج بكميات مدروسة لضمان التفرد وأعلى درجات الإتقان.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition shadow-lg flex items-center gap-2"
                >
                  <span>استكشف التشكيلة</span>
                  {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
                <a
                  href="https://www.instagram.com/vayro_.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white border border-zinc-300 text-black text-xs font-bold rounded-full hover:bg-zinc-100 transition flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>تابعنا على إنستقرام</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
