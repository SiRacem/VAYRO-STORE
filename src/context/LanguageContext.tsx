'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'fr' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    fr: string;
    en: string;
  };
}

export const translations: Translations = {
  // Announcement bar
  free_shipping_notice: {
    ar: '🚚 توصيل مجاني لكل تونس للطلبات الأكثر من 100 دينار',
    fr: '🚚 Livraison gratuite en Tunisie pour les commandes de plus de 100 DT',
    en: '🚚 Free shipping across Tunisia on orders over 100 TND',
  },
  whatsapp_help: {
    ar: 'طلب سريع عبر الواتساب',
    fr: 'Commande rapide via WhatsApp',
    en: 'Quick order via WhatsApp',
  },

  // Navigation Links
  nav_men: {
    ar: 'رجال',
    fr: 'Hommes',
    en: 'Men',
  },
  nav_women: {
    ar: 'نساء',
    fr: 'Femmes',
    en: 'Women',
  },
  nav_kids: {
    ar: 'أطفال',
    fr: 'Enfants',
    en: 'Kids',
  },
  nav_bestsellers: {
    ar: 'الأكثر مبيعاً',
    fr: 'Meilleures Ventes',
    en: 'Bestsellers',
  },
  nav_sale: {
    ar: 'العروض والتخفيضات',
    fr: 'Promotions',
    en: 'Sale',
  },
  nav_about: {
    ar: 'من نحن',
    fr: 'À propos',
    en: 'About Us',
  },
  nav_contact: {
    ar: 'تواصل معنا',
    fr: 'Contact',
    en: 'Contact Us',
  },

  // Actions
  search_placeholder: {
    ar: 'ابحث عن ملابس، مقاسات، ألوان...',
    fr: 'Rechercher des vêtements, tailles...',
    en: 'Search apparel, sizes, colors...',
  },
  cart: {
    ar: 'سلة المشتريات',
    fr: 'Panier',
    en: 'Cart',
  },
  wishlist: {
    ar: 'المفضلة',
    fr: 'Favoris',
    en: 'Wishlist',
  },
  checkout: {
    ar: 'إتمام الطلب',
    fr: 'Commander',
    en: 'Checkout',
  },
  empty_cart: {
    ar: 'سلة المشتريات فارغة حالياً',
    fr: 'Votre panier est actuellement vide',
    en: 'Your cart is currently empty',
  },
  start_shopping: {
    ar: 'ابدأ التسوق',
    fr: 'Commencer vos achats',
    en: 'Start Shopping',
  },
  subtotal: {
    ar: 'المجموع الفرعي',
    fr: 'Sous-total',
    en: 'Subtotal',
  },
  delivery: {
    ar: 'التوصيل',
    fr: 'Livraison',
    en: 'Delivery',
  },
  free_delivery: {
    ar: 'مجاني',
    fr: 'Gratuit',
    en: 'Free',
  },
  currency: {
    ar: 'د.ت',
    fr: 'DT',
    en: 'TND',
  },
  remaining_for_free_shipping: {
    ar: 'أضف {amount} د.ت إضافية للحصول على توصيل مجاني!',
    fr: 'Ajoutez {amount} DT de plus pour la livraison gratuite !',
    en: 'Add {amount} TND more for free shipping!',
  },
  free_shipping_unlocked: {
    ar: '🎉 تهانينا! حصلت على توصيل مجاني',
    fr: '🎉 Félicitations ! Livraison gratuite obtenue',
    en: '🎉 Congratulations! You unlocked free delivery',
  },

  // Footer
  footer_tagline: {
    ar: 'براند ملابس تونسية عصرية بتصميم مينيمالست وجودة فائقة.',
    fr: 'Marque tunisienne de vêtements streetwear moderne et minimaliste.',
    en: 'Modern minimal streetwear clothing brand crafted in Tunisia.',
  },
  quick_links: {
    ar: 'روابط سريعة',
    fr: 'Liens Rapides',
    en: 'Quick Links',
  },
  customer_service: {
    ar: 'خدمة العملاء',
    fr: 'Service Client',
    en: 'Customer Service',
  },
  terms_delivery: {
    ar: 'الشحن والتوصيل في تونس',
    fr: 'Livraison en Tunisie',
    en: 'Shipping & Delivery in Tunisia',
  },
  size_guide_link: {
    ar: 'دليل المقاسات',
    fr: 'Guide des Tailles',
    en: 'Size Guide',
  },
  privacy_policy: {
    ar: 'سياسة الخصوصية',
    fr: 'Politique de confidentialité',
    en: 'Privacy Policy',
  },
  all_rights_reserved: {
    ar: 'جميع الحقوق محفوظة',
    fr: 'Tous droits réservés',
    en: 'All rights reserved',
  },
};

interface LanguageContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('vayro_language') as Language;
    if (savedLang && ['ar', 'fr', 'en'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vayro_language', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string, params?: Record<string, string | number>): string => {
    const entry = translations[key];
    if (!entry) return key;
    let text = entry[language] || entry.ar || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(`{${paramKey}}`, String(val));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
