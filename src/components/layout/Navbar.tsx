'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { t, language, setLanguage, direction } = useLanguage();
  const { totalItems, wishlist, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/products?gender=men', label: t('nav_men') },
    { href: '/products?gender=women', label: t('nav_women') },
    { href: '/products?gender=kids', label: t('nav_kids') },
    { href: '/bestsellers', label: t('nav_bestsellers') },
    { href: '/sale', label: t('nav_sale') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      {/* 1. Announcement Bar */}
      <div className="bg-black text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide">
        <span>{t('free_shipping_notice')}</span>
      </div>

      {/* 2. Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-full transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo - Nike Minimalist Style */}
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black tracking-tighter text-black uppercase hover:opacity-85 transition"
            >
              VAYRO
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-tight transition hover:text-black ${
                    isActive
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Lang, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="bg-transparent text-xs sm:text-sm text-black focus:outline-hidden w-28 sm:w-48"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-black p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 text-xs font-semibold uppercase text-gray-700 hover:text-black transition"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute top-full mt-2 ${
                    direction === 'rtl' ? 'left-0' : 'right-0'
                  } w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50`}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-start px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center justify-between ${
                        language === l.code
                          ? 'font-bold text-black bg-gray-50'
                          : 'text-gray-600'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed inset-y-0 ${
              direction === 'rtl' ? 'right-0' : 'left-0'
            } w-72 max-w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <span className="text-2xl font-black tracking-tight text-black">
                  VAYRO
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-gray-800 hover:text-black py-1"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-800 hover:text-black py-1"
                >
                  {t('nav_about')}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-800 hover:text-black py-1"
                >
                  {t('nav_contact')}
                </Link>
              </nav>
            </div>

            {/* Mobile Footer Language */}
            <div className="pt-6 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-2">
                Language / اللغة
              </div>
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border text-center transition ${
                      language === l.code
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
