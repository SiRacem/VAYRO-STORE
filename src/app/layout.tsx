import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VAYRO — متجر الملابس العصري في تونس | Minimal Streetwear Store',
  description:
    'تسوق أرقى الملابس العصرية والستريت وير في تونس مع VAYRO. توصيل سريع لكل الولايات، مقاسات متعددة وجودة فائقة.',
  keywords: [
    'VAYRO',
    'ملابس تونس',
    'متجر ملابس',
    'streetwear tunisie',
    'fashion tunisia',
    'vetements homme femme',
  ],
  authors: [{ name: 'VAYRO' }],
  metadataBase: new URL('https://vayro.tn'),
  openGraph: {
    title: 'VAYRO — متجر الملابس العصري',
    description: 'ماركة تونسية جديدة بتصاميم استثنائية وأقمشة عالية الجودة.',
    url: 'https://vayro.tn',
    siteName: 'VAYRO',
    locale: 'ar_TN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 antialiased selection:bg-black selection:text-white">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
