'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export interface ProductCardProps {
  id: string;
  slug: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  gender: string;
  isBestseller?: boolean;
  colors?: { name: string; hex: string; image: string }[];
  defaultImage: string;
}

export default function ProductCard({
  id,
  slug,
  nameAr,
  nameFr,
  nameEn,
  price,
  compareAtPrice,
  category,
  gender,
  isBestseller,
  colors = [],
  defaultImage,
}: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { language, t } = useLanguage();

  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const activeColor = colors[activeColorIndex];
  const currentImage = activeColor?.image || defaultImage;

  const productName =
    language === 'ar' ? nameAr : language === 'fr' ? nameFr : nameEn;

  const isDiscounted = compareAtPrice && compareAtPrice > price;
  const discountPercent = isDiscounted
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: id,
      name: productName,
      nameAr,
      nameFr,
      nameEn,
      price,
      compareAtPrice,
      color: activeColor?.name || 'Standard',
      colorHex: activeColor?.hex,
      size: 'M', // default size for quick add
      image: currentImage,
      quantity: 1,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <div className="group relative flex flex-col bg-white">
      {/* 1. Image Container with Badges & Action Buttons */}
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Link href={`/products/${slug}`} className="block w-full h-full">
          <Image
            src={currentImage}
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {isBestseller && (
            <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t('nav_bestsellers')}
            </span>
          )}
          {isDiscounted && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 end-3 p-2 rounded-full transition shadow-xs z-10 ${
            isInWishlist(id)
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 hover:bg-white text-zinc-700 hover:text-black backdrop-blur-xs'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist(id) ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-black text-xs font-bold rounded-xl shadow-lg backdrop-blur-xs flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('cart')}</span>
          </button>
          <Link
            href={`/products/${slug}`}
            className="p-2.5 bg-black/85 hover:bg-black text-white rounded-xl shadow-lg backdrop-blur-xs flex items-center justify-center transition"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setActiveColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeColorIndex === idx
                    ? 'ring-2 ring-black ring-offset-1 scale-110'
                    : 'border-zinc-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Category / Gender Subtitle */}
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          {category}
        </span>

        {/* Title */}
        <Link
          href={`/products/${slug}`}
          className="font-bold text-sm text-zinc-900 hover:text-zinc-600 transition line-clamp-1 mt-0.5 tracking-tight"
        >
          {productName}
        </Link>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-extrabold text-sm text-zinc-950">
            {price.toFixed(2)} {t('currency')}
          </span>
          {isDiscounted && (
            <span className="text-xs text-zinc-400 line-through">
              {compareAtPrice?.toFixed(2)} {t('currency')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
