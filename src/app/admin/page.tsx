'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Lock,
  LogOut,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Settings,
  Tag,
  Plus,
  Trash2,
  MessageCircle,
  RefreshCw,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  fetchStoreSettings,
  updateStoreSetting,
  fetchAllOrders,
  updateOrderStatus,
  fetchPromoCodes,
  createPromoCode,
  deletePromoCode,
  StoreSettingsMap,
  DEFAULT_SETTINGS,
} from '@/lib/admin';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/products';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons' | 'settings'>('overview');

  // Data states
  const [settings, setSettings] = useState<StoreSettingsMap>(DEFAULT_SETTINGS);
  const [orders, setOrders] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // New coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState<number>(10);

  // New product modal state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(65);
  const [newProdCategory, setNewProdCategory] = useState('t-shirts');
  const [newProdGender, setNewProdGender] = useState<'men' | 'women' | 'kids' | 'unisex'>('unisex');
  const [newProdImage, setNewProdImage] = useState('');

  // Check login from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('vayro_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadData() {
      setLoading(true);
      const [fetchedSettings, fetchedOrders, fetchedPromos] = await Promise.all([
        fetchStoreSettings(),
        fetchAllOrders(),
        fetchPromoCodes(),
      ]);

      setSettings(fetchedSettings);
      setOrders(fetchedOrders);
      setPromoCodes(fetchedPromos);
      setLoading(false);
    }

    loadData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for VAYRO owner
    if (pinCode === 'vayro2026' || pinCode === '2026' || pinCode === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('vayro_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مرة أخرى.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vayro_admin_auth');
  };

  // Status changer
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  // Coupon creator
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    const success = await createPromoCode(newCouponCode, newCouponType, newCouponValue);
    if (success) {
      const refreshed = await fetchPromoCodes();
      setPromoCodes(refreshed);
      setNewCouponCode('');
    } else {
      alert('حدث خطأ أثناء إنشاء الكوبون');
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكوبون؟')) return;
    const success = await deletePromoCode(id);
    if (success) {
      setPromoCodes((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedSuccess(false);

    await Promise.all([
      updateStoreSetting('delivery_fee', settings.delivery_fee),
      updateStoreSetting('free_delivery_threshold', settings.free_delivery_threshold),
      updateStoreSetting('whatsapp_number', settings.whatsapp_number),
      updateStoreSetting('points_per_dinar', settings.points_per_dinar),
      updateStoreSetting('points_redeem_rate', settings.points_redeem_rate),
      updateStoreSetting('social_links', {
        instagram: settings.instagram_url,
        facebook: settings.facebook_url,
        tiktok: settings.tiktok_url,
      }),
    ]);

    setSavingSettings(false);
    setSettingsSavedSuccess(true);
    setTimeout(() => setSettingsSavedSuccess(false), 3000);
  };

  // Add Product (Local + memory)
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameAr || !newProdPrice) return;

    const newP: ProductItem = {
      id: `vayro-${Date.now()}`,
      slug: `vayro-${newProdCategory}-${Date.now()}`,
      nameAr: newProdNameAr,
      nameFr: newProdNameAr,
      nameEn: newProdNameAr,
      descriptionAr: 'قطعة ملابس جديدة حصرية من علامة VAYRO.',
      descriptionFr: 'Nouvelle pièce exclusive VAYRO.',
      descriptionEn: 'New exclusive VAYRO apparel piece.',
      price: newProdPrice,
      compareAtPrice: null,
      gender: newProdGender,
      category: newProdCategory,
      categorySlug: newProdCategory,
      isFeatured: true,
      isBestseller: false,
      defaultImage: newProdImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900',
      images: [newProdImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900'],
      colors: [{ name: 'Standard', hex: '#111111', image: newProdImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900' }],
      sizes: [{ size: 'M', stock: 15 }, { size: 'L', stock: 10 }],
    };

    setProducts([newP, ...products]);
    setShowAddProduct(false);
    setNewProdNameAr('');
    setNewProdPrice(65);
    setNewProdImage('');
  };

  // If not logged in -> Show sleek login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
            VAYRO ADMIN PORTAL
          </span>
          <h1 className="text-2xl font-black text-black uppercase tracking-tight mb-2">
            لوحة تحكم صاحب المتجر
          </h1>
          <p className="text-xs text-zinc-500 mb-6">
            أدخل كلمة المرور الخاصة بالإدارة للوصول إلى إدارة الطلبات والمنتجات والإعدادات.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="كلمة المرور (الافتراضية: 2026)"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-black text-center font-bold text-sm tracking-widest focus:outline-hidden focus:bg-white focus:border-black transition"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-bold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-zinc-800 transition shadow-lg"
            >
              تسجيل الدخول
            </button>
          </form>

          <p className="text-[11px] text-zinc-400 mt-6">
            مخصصة حصرياً لإدارة متجر VAYRO الملابس.
          </p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'new' || o.status === 'shipping').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              VAYRO BACKOFFICE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-1">
            لوحة إدارة المتجر
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 text-xs font-bold text-zinc-700 hover:text-black transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>معاينة المتجر</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-zinc-100 text-xs font-black uppercase">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-black text-white shadow-md'
              : 'bg-zinc-100 text-zinc-600 hover:text-black'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>الإحصائيات العامة</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-black text-white shadow-md'
              : 'bg-zinc-100 text-zinc-600 hover:text-black'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>الطلبات ({orders.length})</span>
          {pendingOrders > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-black text-white shadow-md'
              : 'bg-zinc-100 text-zinc-600 hover:text-black'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>المنتجات ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'coupons'
              ? 'bg-black text-white shadow-md'
              : 'bg-zinc-100 text-zinc-600 hover:text-black'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>الكوبونات ({promoCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-black text-white shadow-md'
              : 'bg-zinc-100 text-zinc-600 hover:text-black'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>إعدادات الموقع</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                إجمالي الإيرادات
              </span>
              <div className="text-3xl font-black text-black">
                {totalRevenue.toFixed(2)} د.ت
              </div>
              <span className="text-[11px] text-zinc-500 mt-2 block">
                مجموع المبيعات المسجلة
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                إجمالي الطلبات
              </span>
              <div className="text-3xl font-black text-black">
                {orders.length} طلب
              </div>
              <span className="text-[11px] text-zinc-500 mt-2 block">
                من مختلف الولايات التونسية
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                طلبات قيد المتابعة
              </span>
              <div className="text-3xl font-black text-amber-900">
                {pendingOrders}
              </div>
              <span className="text-[11px] text-amber-700 mt-2 block">
                جديدة أو مع مندوب التوصيل
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                تم التسليم بنجاح
              </span>
              <div className="text-3xl font-black text-emerald-900">
                {deliveredOrders}
              </div>
              <span className="text-[11px] text-emerald-700 mt-2 block">
                اكتملت واستلمها العميل
              </span>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="p-8 rounded-3xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                جاهز لإرسال شحنات اليوم؟
              </h3>
              <p className="text-xs text-zinc-300 max-w-lg leading-relaxed">
                يمكنك الدخول لتبويب "الطلبات" لمعاينة كل طلب جديد والتواصل مباشرة عبر زر الواتساب مع العميل لتأكيد شحنته.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="px-6 py-3 bg-white text-black font-black text-xs rounded-full hover:bg-zinc-200 transition shrink-0"
            >
              عرض جدول الطلبات
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-black uppercase">
              قائمة الطلبات المسجلة ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-50 border border-zinc-200 text-zinc-500">
              <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <p className="font-bold text-sm text-black">لا توجد طلبات مسجلة بعد في قاعدة البيانات</p>
              <p className="text-xs mt-1">عندما يقوم زائر بالطلب عبر صفحة Checkout ستظهر طلبيته هنا فوراً.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-black">
                        #{ord.order_number}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'shipping'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status === 'delivered'
                          ? 'تم التسليم'
                          : ord.status === 'shipping'
                          ? 'قيد التوصيل'
                          : ord.status === 'cancelled'
                          ? 'ملغي'
                          : 'جديد'}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {new Date(ord.created_at).toLocaleDateString('ar-TN')}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span><strong>العميل:</strong> {ord.customer_name}</span>
                      <span><strong>الهاتف:</strong> {ord.customer_phone}</span>
                      <span><strong>العنوان:</strong> {ord.customer_city} ({ord.customer_address})</span>
                    </div>

                    {/* Items snapshot */}
                    {ord.order_items && ord.order_items.length > 0 && (
                      <div className="pt-2 text-xs text-zinc-500">
                        {ord.order_items.map((it: any, idx: number) => (
                          <span key={idx} className="inline-block me-3 bg-zinc-100 px-2 py-0.5 rounded-md text-[11px] text-zinc-800">
                            {it.product_name} ({it.size} - {it.color}) × {it.quantity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className="text-start sm:text-end">
                      <span className="text-xs text-zinc-400 block">المبلغ الإجمالي</span>
                      <span className="text-base font-black text-black">
                        {Number(ord.total).toFixed(2)} د.ت
                      </span>
                    </div>

                    {/* WhatsApp Action to contact customer */}
                    <a
                      href={`https://wa.me/${ord.customer_phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `مرحباً ${ord.customer_name}، نتواصل معك من متجر VAYRO بخصوص طلبك رقم #${ord.order_number}...`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>واتساب العميل</span>
                    </a>

                    {/* Status updater select */}
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="px-3 py-2 bg-zinc-100 rounded-xl text-xs font-bold text-black border-none focus:outline-hidden cursor-pointer"
                    >
                      <option value="new">حالة: طلب جديد</option>
                      <option value="shipping">حالة: قيد التوصيل</option>
                      <option value="delivered">حالة: تم التسليم</option>
                      <option value="cancelled">حالة: ملغي</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-black uppercase">
              كتالوج المنتجات المعروضة ({products.length})
            </h2>
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة منتج جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-sm flex gap-4 items-center"
              >
                <div className="relative w-20 h-24 rounded-2xl bg-zinc-100 overflow-hidden shrink-0">
                  <Image
                    src={p.defaultImage}
                    alt={p.nameAr}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                    {p.category}
                  </span>
                  <h4 className="font-bold text-xs text-black truncate mb-1">
                    {p.nameAr}
                  </h4>
                  <div className="text-sm font-black text-black">
                    {p.price.toFixed(2)} د.ت
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-600">
                      {p.gender}
                    </span>
                    {p.isBestseller && (
                      <span className="px-2 py-0.5 rounded-md bg-black text-white text-[10px] font-bold">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Promo Codes Management */}
      {activeTab === 'coupons' && (
        <div className="space-y-8">
          {/* Add Coupon Form */}
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <h3 className="font-black text-base text-black uppercase tracking-tight mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-black" />
              <span>إنشاء كوبون خصم جديد</span>
            </h3>

            <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  رمز الكوبون (مثال: VAYRO20)
                </label>
                <input
                  type="text"
                  required
                  placeholder="CODE"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  نوع الخصم
                </label>
                <select
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white font-bold cursor-pointer"
                >
                  <option value="percentage">نسبة مئوية (%)</option>
                  <option value="fixed">مبلغ ثابت بالدينار (د.ت)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  قيمة الخصم
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white font-bold"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition"
                >
                  إضافة الكوبون
                </button>
              </div>
            </form>
          </div>

          {/* Coupons List */}
          <div>
            <h3 className="font-black text-sm uppercase text-black mb-4">
              الكوبونات الفعالة حالياً ({promoCodes.length})
            </h3>
            {promoCodes.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-zinc-200 text-xs text-zinc-500">
                لا توجد كوبونات إضافية في قاعدة البيانات حالياً (كود الترحيب التجريبي الافتراضي: WELCOME10).
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {promoCodes.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-black text-sm text-black block tracking-wider">
                        {c.code}
                      </span>
                      <span className="text-zinc-500">
                        خصم {c.discount_value}{c.discount_type === 'percentage' ? '%' : ' د.ت'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteCoupon(c.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 transition"
                      title="حذف الكوبون"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Site Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-zinc-100 flex justify-between items-center">
              <div>
                <h3 className="font-black text-base uppercase text-black tracking-tight">
                  إعدادات المتجر العامة والأسعار
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  تعديل أسعار التوصيل، قنوات الاتصال، ونظام المكافآت مع حفظ فوري في Supabase.
                </p>
              </div>
            </div>

            {settingsSavedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تم حفظ وتحديث إعدادات المتجر بنجاح في قاعدة البيانات!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Delivery Fee */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1.5">
                  سعر التوصيل الثابت (د.ت)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.5"
                  value={settings.delivery_fee}
                  onChange={(e) =>
                    setSettings({ ...settings, delivery_fee: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold focus:outline-hidden focus:bg-white focus:border-black"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  التكلفة الثابتة للشحن لكامل ولايات تونس (الحالية: 8 د.ت).
                </span>
              </div>

              {/* Free delivery threshold */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1.5">
                  الحد الأدنى للتوصيل المجاني (د.ت)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={settings.free_delivery_threshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      free_delivery_threshold: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold focus:outline-hidden focus:bg-white focus:border-black"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  إذا تجاوزت السلة هذا المبلغ يصبح التوصيل 0 د.ت (الحالي: 100 د.ت).
                </span>
              </div>

              {/* WhatsApp Business Phone */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1.5">
                  رقم هاتف WhatsApp لاستقبال الطلبات
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsapp_number}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp_number: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold focus:outline-hidden focus:bg-white focus:border-black"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  الرقم الذي تُرسل إليه رسائل الطلبات من العملاء (حالياً: +21629660432).
                </span>
              </div>

              {/* Instagram URL */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1.5">
                  رابط حساب Instagram الرسمي
                </label>
                <input
                  type="url"
                  value={settings.instagram_url}
                  onChange={(e) =>
                    setSettings({ ...settings, instagram_url: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold focus:outline-hidden focus:bg-white focus:border-black"
                />
                <span className="text-[11px] text-zinc-400 mt-1 block">
                  حساب إنستقرام البراند (@vayro_.official).
                </span>
              </div>
            </div>

            {/* Loyalty points settings */}
            <div className="pt-6 border-t border-zinc-100">
              <h4 className="font-black text-xs uppercase tracking-wider text-black mb-4">
                إعدادات نظام نقاط الولاء
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    النقاط المكتسبة لكل دينار مصروف
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={settings.points_per_dinar}
                    onChange={(e) =>
                      setSettings({ ...settings, points_per_dinar: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    قيمة النقطة الواحدة بالدينار (0.05 = 100 نقطة بـ 5 د.ت)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={settings.points_redeem_rate}
                    onChange={(e) =>
                      setSettings({ ...settings, points_redeem_rate: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-zinc-100 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-8 py-3.5 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase rounded-full shadow-lg transition flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'جارٍ الحفظ...' : 'حفظ وتحديث الإعدادات'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Modal: Add Product */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowAddProduct(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl z-10">
            <h3 className="text-lg font-black text-black uppercase mb-4">
              إضافة قطعة ملابس جديدة
            </h3>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  اسم المنتج
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تيشيرت أوفرسايز بيج VAYRO"
                  value={newProdNameAr}
                  onChange={(e) => setNewProdNameAr(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    السعر (د.ت)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    الفئة
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200"
                  >
                    <option value="t-shirts">تيشيرتات (T-Shirts)</option>
                    <option value="hoodies">هوديات (Hoodies)</option>
                    <option value="pants">بناطيل (Pants)</option>
                    <option value="accessories">إكسسوارات (Accessories)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  الفئة المستهدفة
                </label>
                <select
                  value={newProdGender}
                  onChange={(e) => setNewProdGender(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200"
                >
                  <option value="unisex">للجنسين (Unisex)</option>
                  <option value="men">رجال (Men)</option>
                  <option value="women">نساء (Women)</option>
                  <option value="kids">أطفال (Kids)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  رابط صورة المنتج (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 py-3 border border-zinc-200 rounded-full font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white rounded-full font-bold"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
