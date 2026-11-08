'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ui/ProductCard';

export default function HomePage() {
  const { t, direction, language } = useLanguage();

  // Curated sample products showcasing VAYRO brand aesthetic
  const featuredProducts = [
    {
      id: 'prod-1',
      slug: 'vayro-oversized-heavy-tee-black',
      nameAr: 'تيشيرت أوفرسايز بريميوم أسود VAYRO',
      nameFr: 'T-Shirt Oversized Premium Noir VAYRO',
      nameEn: 'VAYRO Heavyweight Oversized Tee Black',
      price: 65,
      compareAtPrice: 85,
      category: 'تيشيرتات / T-Shirts',
      gender: 'unisex',
      isBestseller: true,
      defaultImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop',
      colors: [
        {
          name: 'أسود / Black',
          hex: '#111111',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop',
        },
        {
          name: 'أبيض / Off-White',
          hex: '#F4F4F4',
          image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop',
        },
        {
          name: 'بيج / Sand',
          hex: '#D7C4B7',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'prod-2',
      slug: 'vayro-minimalist-hoodie-washed-grey',
      nameAr: 'هودي ستريت وير قطن ثقيل رمادي مغسول',
      nameFr: 'Hoodie Streetwear Coton Épais Gris Lavé',
      nameEn: 'VAYRO Washed Grey Heavy Cotton Hoodie',
      price: 120,
      compareAtPrice: 145,
      category: 'هوديات / Hoodies',
      gender: 'men',
      isBestseller: true,
      defaultImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
      colors: [
        {
          name: 'رمادي مغسول',
          hex: '#5A5A5C',
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop',
        },
        {
          name: 'أسود فحمي',
          hex: '#1A1A1A',
          image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=900&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'prod-3',
      slug: 'vayro-cargo-pants-tactical-black',
      nameAr: 'بنطلون كارجو ستريت فلكس أسود',
      nameFr: 'Pantalon Cargo Street Flex Noir',
      nameEn: 'VAYRO Tactical Street Cargo Pants',
      price: 95,
      compareAtPrice: 115,
      category: 'بناطيل / Pants',
      gender: 'unisex',
      isBestseller: false,
      defaultImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop',
      colors: [
        {
          name: 'أسود',
          hex: '#0A0A0A',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop',
        },
        {
          name: 'زيتي كلاسيك',
          hex: '#3D4436',
          image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=900&auto=format&fit=crop',
        },
      ],
    },
    {
      id: 'prod-4',
      slug: 'vayro-signature-cap-monogram',
      nameAr: 'كاب VAYRO مطرز حصري',
      nameFr: 'Casquette VAYRO Broderie Exclusive',
      nameEn: 'VAYRO Signature Embroidered Cap',
      price: 45,
      compareAtPrice: null,
      category: 'إكسسوارات / Accessories',
      gender: 'unisex',
      isBestseller: true,
      defaultImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=900&auto=format&fit=crop',
      colors: [
        {
          name: 'أسود',
          hex: '#111111',
          image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=900&auto=format&fit=crop',
        },
        {
          name: 'كريمي',
          hex: '#ECE7DE',
          image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=900&auto=format&fit=crop',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Nike Style Full-width statement) */}
      <section className="relative w-full bg-zinc-950 text-white overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop"
            alt="VAYRO Collection"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-start flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>COLLECTION 2026 • تونس</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-3xl mb-6">
            REDISCOVER YOUR STREETWEAR IDENTITY
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 max-w-xl mb-8 leading-relaxed font-normal">
            تصاميم مينيمالست عصرية تجمع بين الراحة المطلقة والأناقة الحضرية.
            صُنعت خصيصاً لتواكب إيقاعك اليومي.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-black font-extrabold text-sm rounded-full hover:bg-zinc-200 transition-all shadow-xl flex items-center gap-2 active:scale-95"
            >
              <span>{t('start_shopping')}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Link>

            <Link
              href="/bestsellers"
              className="px-8 py-4 bg-transparent border-2 border-white/40 hover:border-white text-white font-bold text-sm rounded-full transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{t('nav_bestsellers')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TILES (Nike Style 3-Column Visual Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
              تسوق حسب الفئة
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              اختر الفئة المفضلة واستكشف التشكيلة الحصرية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Men */}
          <Link
            href="/products?gender=men"
            className="group relative aspect-4/5 rounded-3xl overflow-hidden bg-zinc-100 flex flex-col justify-end p-8"
          >
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop"
              alt="Men Fashion"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                تشكيلة الرجال
              </span>
              <h3 className="text-2xl font-black tracking-tight uppercase mt-1">
                {t('nav_men')}
              </h3>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:underline">
                <span>تصفح الآن</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
          </Link>

          {/* Card: Women */}
          <Link
            href="/products?gender=women"
            className="group relative aspect-4/5 rounded-3xl overflow-hidden bg-zinc-100 flex flex-col justify-end p-8"
          >
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop"
              alt="Women Fashion"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                تشكيلة النساء
              </span>
              <h3 className="text-2xl font-black tracking-tight uppercase mt-1">
                {t('nav_women')}
              </h3>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:underline">
                <span>تصفح الآن</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
          </Link>

          {/* Card: Accessories & Kids */}
          <Link
            href="/products?gender=kids"
            className="group relative aspect-4/5 rounded-3xl overflow-hidden bg-zinc-100 flex flex-col justify-end p-8"
          >
            <Image
              src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=900&auto=format&fit=crop"
              alt="Kids Fashion"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                تشكيلة الأطفال
              </span>
              <h3 className="text-2xl font-black tracking-tight uppercase mt-1">
                {t('nav_kids')}
              </h3>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:underline">
                <span>تصفح الآن</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Grid of clean minimalist cards) */}
      <section className="bg-zinc-50/70 py-16 sm:py-24 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>HOT DROPS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black uppercase">
                المنتجات الأكثر طلباً
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-black hover:opacity-75 transition"
            >
              <span>عرض كل المنتجات</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL BANNER (Nike High-Contrast Brand Statement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="relative rounded-3xl bg-black text-white p-8 sm:p-14 lg:p-20 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">
              THE VAYRO PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-tight mb-6">
              LESS NOISE. MORE CHARACTER.
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-8">
              لا نبيع مجرد قطع قماش، بل نقدم أسلوب حياة يعكس الثقة والبساطة.
              كل قطعة من VAYRO مصممة لتدوم طويلاً، بأقمشة فاخرة وقصات تلائمك تماماً.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>قطن 100% عالي الكثافة</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>دفع وتأكيد سريع عبر WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTAGRAM COMMUNITY BANNER */}
      <section className="bg-zinc-100 py-16 text-center border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="w-14 h-14 rounded-full bg-black text-white mx-auto flex items-center justify-center mb-4 shadow-md">
            <InstagramIcon className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase mb-2">
            انضم إلى مجتمع VAYRO
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm mb-6 max-w-md mx-auto">
            تابع آخر الإطلاقات، استعراضات الفيديو وتنسيقات الستريت وير على حسابنا الرسمي
          </p>
          <a
            href="https://www.instagram.com/vayro_.official/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition shadow-md"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@vayro_.official</span>
          </a>
        </div>
      </section>
    </div>
  );
}
