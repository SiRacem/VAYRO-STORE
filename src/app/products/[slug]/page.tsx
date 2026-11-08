'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/image';
import {
  Star,
  Ruler,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Bell,
  Box,
  Image as ImageIcon,
  Check,
  ArrowRight,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getProductBySlug, INITIAL_PRODUCTS, ProductItem } from '@/lib/products';
import SizeGuideModal from '@/components/ui/SizeGuideModal';
import Product3DViewer from '@/components/ui/Product3DViewer';
import ProductCard from '@/components/ui/ProductCard';

function ProductDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { t, language, direction } = useLanguage();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'photos' | '3d'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [stockEmail, setStockEmail] = useState('');
  const [stockAlertSuccess, setStockAlertSuccess] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Reviews state (initial mock + user additions)
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'يوسف بن علي',
      rating: 5,
      date: 'منذ يومين',
      comment: 'الجودة استثنائية والقطن ثقيل ممتاز! المقاس مضبوط 100%. أنصح به بشدة.',
    },
    {
      id: 'rev-2',
      author: 'سارة م.',
      rating: 5,
      date: 'منذ أسبوع',
      comment: 'التوصيل كان سريعاً في تونس العاصمة، والقصة الأوفرسايز أنيقة وعصرية.',
    },
  ]);

  useEffect(() => {
    async function loadProduct() {
      const p = await getProductBySlug(slug);
      if (p) {
        setProduct(p);
        if (p.sizes.length > 0) {
          const firstInStock = p.sizes.find((s) => s.stock > 0);
          setSelectedSize(firstInStock ? firstInStock.size : p.sizes[0].size);
        }
      }
    }
    loadProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const productName =
    language === 'ar'
      ? product.nameAr
      : language === 'fr'
      ? product.nameFr
      : product.nameEn;

  const productDescription =
    language === 'ar'
      ? product.descriptionAr
      : language === 'fr'
      ? product.descriptionFr
      : product.descriptionEn;

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const galleryImages = [
    activeColor?.image || product.defaultImage,
    ...product.images.filter((img) => img !== activeColor?.image),
  ];

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const isOutOfStock = currentSizeObj ? currentSizeObj.stock === 0 : false;

  const isDiscounted = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = isDiscounted
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const loyaltyPointsEarned = Math.floor(product.price * 1); // 1 point per dinar

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      name: productName,
      nameAr: product.nameAr,
      nameFr: product.nameFr,
      nameEn: product.nameEn,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      color: activeColor?.name || 'Standard',
      colorHex: activeColor?.hex,
      size: selectedSize || 'M',
      image: galleryImages[0],
      quantity,
    });
  };

  const handleStockSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockEmail) return;
    setStockAlertSuccess(true);
    setTimeout(() => {
      setStockEmail('');
      setStockAlertSuccess(false);
    }, 4000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    setReviews([
      {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'الآن',
        comment: newReviewComment,
      },
      ...reviews,
    ]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-zinc-400 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-black transition">
          الرئيسية
        </a>
        <span>/</span>
        <a href="/products" className="hover:text-black transition">
          {product.category}
        </a>
        <span>/</span>
        <span className="text-zinc-900 truncate max-w-xs">{productName}</span>
      </nav>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Visual Gallery & 3D (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* View Mode Switcher (Photos vs 3D) */}
          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setViewMode('photos')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'photos'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>معرض الصور</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === '3d'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>عرض 3D تفاعلي (360°)</span>
            </button>
          </div>

          {/* Active View Container */}
          {viewMode === '3d' ? (
            <Product3DViewer
              modelUrl={product.model3dUrl}
              images={galleryImages}
              productName={productName}
            />
          ) : (
            <div className="relative aspect-3/4 w-full rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/70">
              <Image
                src={galleryImages[activeImageIndex] || galleryImages[0]}
                alt={productName}
                fill
                priority
                className="object-cover object-center transition-all duration-300"
              />

              {/* Discount Badge */}
              {isDiscounted && (
                <div className="absolute top-4 start-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                  -{discountPercent}% خصم
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 end-4 p-3 rounded-full transition shadow-md ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white/80 hover:bg-white text-zinc-800'
                }`}
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist(product.id) ? 'fill-current' : ''
                  }`}
                />
              </button>
            </div>
          )}

          {/* Thumbnail Strip */}
          {viewMode === 'photos' && galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                    activeImageIndex === idx
                      ? 'border-black ring-2 ring-black/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productName} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Options & Purchase Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Category & Title */}
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase leading-snug">
            {productName}
          </h1>

          {/* Price & Discount */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl sm:text-3xl font-black text-black">
              {product.price.toFixed(2)} {t('currency')}
            </span>
            {isDiscounted && (
              <span className="text-base text-zinc-400 line-through">
                {product.compareAtPrice?.toFixed(2)} {t('currency')}
              </span>
            )}
          </div>

          {/* Loyalty Points Earned Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold w-fit">
            <span>⭐ تكسب</span>
            <span className="font-bold text-black">{loyaltyPointsEarned} نقطة ولاء</span>
            <span>عند إتمام هذا الطلب</span>
          </div>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  اللون: <span className="text-black font-extrabold">{activeColor?.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setActiveImageIndex(0);
                    }}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColorIndex === idx
                        ? 'border-black ring-2 ring-black ring-offset-2 scale-105'
                        : 'border-zinc-300 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColorIndex === idx && (
                      <Check
                        className={`w-4 h-4 ${
                          color.hex === '#FFFFFF' || color.hex === '#F5F5F5'
                            ? 'text-black'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector & Size Guide */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                المقاس
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>دليل المقاسات (Size Guide)</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                const isSoldOut = s.stock === 0;

                return (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 rounded-xl text-xs font-bold border transition text-center relative ${
                      isSoldOut
                        ? 'border-zinc-200 text-zinc-300 bg-zinc-50 cursor-pointer'
                        : isSelected
                        ? 'border-black bg-black text-white shadow-xs'
                        : 'border-zinc-200 text-zinc-800 hover:border-black'
                    }`}
                  >
                    <span>{s.size}</span>
                    {isSoldOut && (
                      <span className="absolute -top-1.5 -end-1.5 bg-zinc-400 text-white text-[9px] px-1 rounded-full">
                        نافد
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Out of Stock Alert Form */}
          {isOutOfStock && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold mb-2">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>هذا المقاس غير متوفر حالياً بالمخزون</span>
              </div>
              <p className="mb-3 text-amber-800">
                أدخل بريدك الإلكتروني وسنرسل لك تنبيهاً فور إعادة توفر هذا المقاس:
              </p>
              {stockAlertSuccess ? (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-center">
                  ✅ تم تسجيل بريدك بنجاح! سنخبرك فور التوفر.
                </div>
              ) : (
                <form onSubmit={handleStockSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="بريدك الإلكتروني..."
                    value={stockEmail}
                    onChange={(e) => setStockEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-amber-300 text-black text-xs bg-white focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-900 text-white rounded-xl font-bold hover:bg-amber-950 transition"
                  >
                    تنبيهي
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Quantity & Add to Cart Button */}
          <div className="mt-8 flex gap-3">
            {/* Quantity control */}
            {!isOutOfStock && (
              <div className="flex items-center border border-zinc-200 rounded-full px-3 py-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-500 hover:text-black font-bold text-lg"
                >
                  -
                </button>
                <span className="px-3 font-bold text-sm text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-zinc-500 hover:text-black font-bold text-lg"
                >
                  +
                </button>
              </div>
            )}

            {/* Add to Bag CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-4 px-6 rounded-full font-black text-sm tracking-wide uppercase transition shadow-lg flex items-center justify-center gap-2 ${
                isOutOfStock
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-zinc-800 active:scale-98'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isOutOfStock ? 'المقاس نافد بالمخزون' : 'أضف إلى السلة'}</span>
            </button>
          </div>

          {/* Instagram Video Review Link */}
          {product.instagramVideoUrl && (
            <a
              href={product.instagramVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 p-3.5 rounded-2xl border border-zinc-200 hover:border-black bg-zinc-50/70 hover:bg-white transition flex items-center justify-between text-xs font-bold text-black"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <span>شاهد فيديو استعراض القماش والتفاصيل</span>
                  <p className="text-[10px] text-zinc-500 font-normal">
                    على صفحة الإنستقرام @vayro_.official
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
            </a>
          )}

          {/* Delivery & Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-zinc-100 space-y-3.5 text-xs text-zinc-600">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-black shrink-0" />
              <span>
                توصيل سريع لكل الولايات التونسية (8 د.ت — مجاني فوق 100 د.ت).
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>قطن تونسي أصلي 100% مع ضمان جودة النسيج والياقة.</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-black shrink-0" />
              <span>إمكانية معاينة الطلب والتأكيد الفوري عبر WhatsApp.</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
              تفاصيل ومواصفات المنتج
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              {productDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 pt-12 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase text-black">
              تقييمات وآراء العملاء ({reviews.length})
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-700">
                5.0 من 5 نجوم
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List & Add Review Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reviews List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs text-black">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-zinc-400">{rev.date}</span>
                </div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Submit Review Card (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
            <h3 className="font-black text-sm text-black uppercase tracking-tight mb-3">
              أضف تقييمك للمنتج
            </h3>
            {reviewSuccess ? (
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold text-center">
                🎉 شكراً لك! تم نشر تقييمك بنجاح.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    اسمك الكامل
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد علي"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    التقييم
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-black font-semibold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5) ممتاز جداً</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5) جيد جداً</option>
                    <option value={3}>⭐⭐⭐ (3/5) متوسط</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    تعليقك ورأيك في الخامة والمقاس
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="اكتب تعليقك بصراحة..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-black focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-full font-bold hover:bg-zinc-800 transition"
                >
                  إرسال التقييم
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="mt-20 pt-12 border-t border-zinc-200">
        <h2 className="text-2xl font-black tracking-tight uppercase text-black mb-8">
          قد يعجبك أيضاً
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
