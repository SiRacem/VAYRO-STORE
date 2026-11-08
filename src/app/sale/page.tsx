'use client';

import React, { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';
import { getProducts, ProductItem } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

export default function SalePage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProducts({ isSale: true });
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="pb-8 border-b border-zinc-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
          <Tag className="w-4 h-4 fill-current" />
          <span>EXCLUSIVE OFFERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          العروض والتخفيضات الخاصة
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-xl">
          فرصتك لاقتناء قطعك المفضلة من VAYRO بأسعار خاصة لفترة محدودة وحتى نفاد الكمية.
        </p>
      </div>

      <div className="pt-10">
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
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
