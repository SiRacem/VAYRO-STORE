'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-zinc-900">
      {/* 1. Value Badges (Free shipping, Quality, Easy WhatsApp) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">
                {t('terms_delivery')}
              </h4>
              <p className="text-zinc-400 text-xs mt-1">
                8 د.ت لكل تونس — مجاناً فوق 100 د.ت
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">
                جودة أصلية وتصميم حصري
              </h4>
              <p className="text-zinc-400 text-xs mt-1">
                أقمشة مختارة بعناية وموديلات عصرية
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">
                تأكيد ومتابعة عبر WhatsApp
              </h4>
              <p className="text-zinc-400 text-xs mt-1">
                دعم سريع ومباشر على مدار الساعة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white block mb-4">
              VAYRO
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/vayro_.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/21629660432"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link
                  href="/products?gender=men"
                  className="hover:text-white transition"
                >
                  {t('nav_men')}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?gender=women"
                  className="hover:text-white transition"
                >
                  {t('nav_women')}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?gender=kids"
                  className="hover:text-white transition"
                >
                  {t('nav_kids')}
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="hover:text-white transition">
                  {t('nav_bestsellers')}
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-white transition">
                  {t('nav_sale')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t('customer_service')}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {t('nav_contact')}
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition">
                  {t('size_guide_link')}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  {t('terms_delivery')}
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Contact Box */}
          <div className="bg-zinc-900/70 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
                {t('whatsapp_help')}
              </span>
              <p className="text-zinc-400 text-xs mb-4">
                هل تحتاج مساعدة في اختيار المقاس أو تأكيد طلبك؟
              </p>
            </div>
            <a
              href="https://wa.me/21629660432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>+216 29 660 432</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div>
          © {currentYear} VAYRO STORE. {t('all_rights_reserved')}.
        </div>
        <div className="flex items-center gap-4">
          <span>تونس 🇹🇳 (TND)</span>
          <span>•</span>
          <Link href="/privacy" className="hover:text-zinc-300 transition">
            {t('privacy_policy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
