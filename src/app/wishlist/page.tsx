'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, ProductItem } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useCart();
  const { direction } = useLanguage();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      setLoading(true);
      const all = await getProducts();
      const filtered = all.filter((p) => wishlist.includes(p.id));
      setProducts(filtered);
      setLoading(false);
    }
    loadWishlistProducts();
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="pb-8 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>MY WISHLIST</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            قائمة المفضلة ({wishlist.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            الملابس والقطع التي قمت بحفظها للرجوع إليها وشرائها في أي وقت.
          </p>
        </div>

        {wishlist.length > 0 && (
          <Link
            href="/products"
            className="text-xs font-bold text-black hover:underline flex items-center gap-1.5"
          >
            <span>مواصلة التسوق</span>
            {direction === 'rtl' ? (
              <ArrowLeft className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="pt-10">
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : wishlist.length === 0 || products.length === 0 ? (
          <div className="min-h-[45vh] flex flex-col items-center justify-center text-center p-8 bg-zinc-50 rounded-3xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-lg font-black text-black uppercase mb-1">
              قائمة المفضلة فارغة حالياً
            </h2>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed max-w-sm">
              لم تقم بحفظ أي قطعة بعد. اضغط على أيقونة القلب على أي منتج يعجبك لحفظه هنا ومتابعته لاحقاً!
            </p>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition shadow-md"
            >
              استكشف تشكيلة VAYRO
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
