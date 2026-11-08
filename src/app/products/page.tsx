'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, X, ArrowUpDown, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts, ProductItem } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialGender = searchParams.get('gender') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const { t, language } = useLanguage();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedGender(initialGender);
  }, [initialGender]);

  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      const data = await getProducts({
        gender: selectedGender,
        category: selectedCategory,
        maxPrice: maxPrice < 200 ? maxPrice : undefined,
        sort: sortOption,
        query: searchQuery,
      });
      setProducts(data);
      setLoading(false);
    }
    fetchCatalog();
  }, [selectedGender, selectedCategory, maxPrice, sortOption, searchQuery]);

  const categories = [
    { slug: 'all', label: language === 'ar' ? 'جميع الفئات' : 'Toutes les catégories' },
    { slug: 't-shirts', label: language === 'ar' ? 'تيشيرتات' : 'T-Shirts' },
    { slug: 'hoodies', label: language === 'ar' ? 'هوديات وسويت شيرت' : 'Hoodies & Sweats' },
    { slug: 'pants', label: language === 'ar' ? 'بناطيل وكارجو' : 'Pantalons & Cargos' },
    { slug: 'accessories', label: language === 'ar' ? 'إكسسوارات وكاب' : 'Accessoires' },
  ];

  const genders = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'Tous' },
    { id: 'men', label: language === 'ar' ? 'رجال' : 'Hommes' },
    { id: 'women', label: language === 'ar' ? 'نساء' : 'Femmes' },
    { id: 'kids', label: language === 'ar' ? 'أطفال' : 'Enfants' },
  ];

  const resetFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setMaxPrice(200);
    setSortOption('newest');
  };

  const hasActiveFilters =
    selectedGender !== 'all' || selectedCategory !== 'all' || maxPrice < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            VAYRO CATALOGUE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase mt-1">
            {selectedGender === 'men'
              ? 'تشكيلة الرجال'
              : selectedGender === 'women'
              ? 'تشكيلة النساء'
              : selectedGender === 'kids'
              ? 'تشكيلة الأطفال'
              : 'جميع الملابس والمنتجات'}
          </h1>
        </div>

        {/* Filter Trigger on Mobile & Sort Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-black"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>الفلاتر</span>
          </button>

          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5 text-xs font-bold">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent focus:outline-hidden text-black font-semibold cursor-pointer"
            >
              <option value="newest">الأحدث</option>
              <option value="bestseller">الأكثر طلباً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters & Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters (1 col) */}
        <aside className="hidden lg:block space-y-8 pr-4">
          {/* Active Filter Clear */}
          {hasActiveFilters && (
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
              <span className="text-xs font-bold text-zinc-500">فلاتر نشطة</span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>إعادة تعيين</span>
              </button>
            </div>
          )}

          {/* Gender Filter */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3">
              الفئة المستهدفة
            </h3>
            <div className="space-y-2">
              {genders.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGender(g.id)}
                  className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    selectedGender === g.id
                      ? 'bg-black text-white'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3">
              نوع الملابس
            </h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    selectedCategory === c.slug
                      ? 'bg-black text-white'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                أقصى سعر
              </h3>
              <span className="text-xs font-extrabold text-black">
                {maxPrice} د.ت
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
              <span>30 د.ت</span>
              <span>200 د.ت</span>
            </div>
          </div>
        </aside>

        {/* Products Grid (3 cols) */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-zinc-50 rounded-3xl">
              <span className="text-3xl mb-3">🔍</span>
              <h3 className="font-black text-base text-black mb-1">
                لم نجد أي منتجات تطابق هذه الفلاتر
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                جرب تغيير خيارات الفلترة أو إعادة تعيينها لمشاهدة جميع المنتجات
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          ) : (
            <div>
              <div className="text-xs font-semibold text-zinc-500 mb-4">
                عرض {products.length} من أصل {products.length} منتج
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <span className="font-black text-base uppercase text-black">
                  فلاتر المنتجات
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-zinc-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Gender */}
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">
                  الفئة المستهدفة
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {genders.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        selectedGender === g.id
                          ? 'border-black bg-black text-white'
                          : 'border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Category */}
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">
                  نوع الملابس
                </h4>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`w-full text-start py-2 px-3 rounded-xl text-xs font-bold transition ${
                        selectedCategory === c.slug
                          ? 'bg-black text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-bold uppercase text-zinc-500">
                    أقصى سعر
                  </h4>
                  <span className="text-xs font-black text-black">
                    {maxPrice} د.ت
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="200"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-zinc-200 rounded-full text-xs font-bold text-zinc-700"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-black text-white rounded-full text-xs font-bold"
              >
                تطبيق ({products.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
