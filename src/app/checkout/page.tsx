'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { TUNISIAN_GOVERNORATES } from '@/lib/tunisia';
import { createOrder } from '@/lib/orders';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, freeShippingThreshold } = useCart();
  const { t, language, direction } = useLanguage();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState(TUNISIAN_GOVERNORATES[0].nameAr);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery calculation
  const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 8;
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);
  const pointsEarned = Math.floor(grandTotal);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    setIsApplyingPromo(true);

    try {
      // 1. Try querying Supabase promo_codes table
      const { data, error } = await (supabase.from('promo_codes') as any)
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();

      if (!error && data) {
        let discount = 0;
        if (data.discount_type === 'percentage') {
          discount = (subtotal * Number(data.discount_value)) / 100;
        } else {
          discount = Number(data.discount_value);
        }

        setAppliedPromo({
          code: data.code,
          discountAmount: Math.min(subtotal, discount),
        });
        setPromoInput('');
        setIsApplyingPromo(false);
        return;
      }
    } catch (err) {
      console.warn('Promo database check skipped, checking local presets', err);
    }

    // 2. Fallback preset code for demo/testing: "WELCOME10" (10% off)
    if (code === 'WELCOME10' || code === 'VAYRO10') {
      const discount = subtotal * 0.1;
      setAppliedPromo({
        code,
        discountAmount: discount,
      });
      setPromoInput('');
    } else {
      setPromoError('رمز الكوبون غير صالح أو منتهي الصلاحية');
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    if (!fullName || !phone || !address || !city) {
      alert('يرجى ملء جميع الحقول المطلوبة للمتابعة');
      return;
    }

    setIsSubmitting(true);

    const result = await createOrder({
      customerName: fullName,
      customerPhone: phone,
      governorate,
      city,
      address,
      notes,
      cart,
      subtotal,
      deliveryFee,
      discountAmount,
      total: grandTotal,
      promoCode: appliedPromo?.code,
      pointsEarned,
    });

    if (result.success) {
      // Open WhatsApp in a new tab/window immediately
      if (typeof window !== 'undefined') {
        window.open(result.whatsappUrl, '_blank');
      }

      // Clear the local cart
      clearCart();

      // Navigate to success confirmation page with order number
      router.push(`/checkout/success?order=${result.orderNumber}`);
    } else {
      setIsSubmitting(false);
      alert('حدث خطأ أثناء تسجيل الطلب، يرجى المحاولة مرة أخرى.');
    }
  };

  // If cart is completely empty
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-black text-black uppercase mb-2">
          سلة المشتريات فارغة
        </h1>
        <p className="text-xs text-zinc-500 mb-6">
          لم تقم بإضافة أي ملابس إلى سلتك بعد. تصفح التشكيلة واختر ما يناسبك!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition"
        >
          <span>تصفح المنتجات</span>
          {direction === 'rtl' ? (
            <ArrowLeft className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="mb-10 pb-4 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
          إتمام الطلب وتأكيد الشحن
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          الدفع عند الاستلام نقداً في كامل تونس بعد معاينة طلبيتك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left / Main: Shipping Details Form (7 cols) */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Step 1: Contact Details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50/70 border border-zinc-200/80">
              <h2 className="text-base font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <span>1. معلومات العميل والاتصال</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    الاسم واللقب <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف الطرابلسي"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-medium focus:outline-hidden focus:border-black transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    رقم الهاتف التونسي (للتأكيد والتوصيل){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 29660432 أو 98123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-medium focus:outline-hidden focus:border-black transition"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50/70 border border-zinc-200/80">
              <h2 className="text-base font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <span>2. عنوان التوصيل في تونس</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Governorate Dropdown */}
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      الولاية <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-bold focus:outline-hidden focus:border-black transition cursor-pointer"
                    >
                      {TUNISIAN_GOVERNORATES.map((g) => (
                        <option key={g.id} value={g.nameAr}>
                          {g.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City / Delegation */}
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      المدينة / المعتمدية <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: المرسى، النصر، سيدي بوسعيد..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-medium focus:outline-hidden focus:border-black transition"
                    />
                  </div>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    العنوان التفصيلي (الشارع، رقم العمارة/المنزل){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 15 نهج الحبيب بورقيبة، عمارة الأمل، شقة 4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-medium focus:outline-hidden focus:border-black transition"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    ملاحظات إضافية للمندوب (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-medium focus:outline-hidden focus:border-black transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="p-5 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center gap-3.5">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-black text-black block mb-0.5">
                  الدفع عند الاستلام (Paiement à la livraison)
                </span>
                <span className="text-zinc-600">
                  لا تدفع شيئاً الآن. الدفع نقداً لمندوب التوصيل بعد استلام ومعاينة طلبيتك.
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary & WhatsApp CTA (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-xl space-y-6">
            <h2 className="text-base font-black text-black uppercase tracking-tight pb-3 border-b border-zinc-100 flex items-center justify-between">
              <span>ملخص الطلب</span>
              <span className="text-xs font-bold text-zinc-500">
                ({cart.length} قطع)
              </span>
            </h2>

            {/* Items List */}
            <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="relative w-14 h-16 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-black truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {item.color} • المقاس: {item.size} • الكمية: {item.quantity}
                    </p>
                  </div>
                  <div className="text-xs font-black text-black shrink-0">
                    {(item.price * item.quantity).toFixed(2)} د.ت
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-2">
              {appliedPromo ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>تم تطبيق الكوبون: {appliedPromo.code}</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-400 absolute top-3.5 start-3" />
                    <input
                      type="text"
                      placeholder="كوبون الخصم (مثال: WELCOME10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-black uppercase focus:outline-hidden focus:border-black"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplyingPromo || !promoInput.trim()}
                    className="px-4 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition disabled:opacity-50"
                  >
                    تطبيق
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 font-semibold mt-1">
                  {promoError}
                </p>
              )}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-100 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-black">
                  {subtotal.toFixed(2)} د.ت
                </span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>قيمة الخصم ({appliedPromo.code})</span>
                  <span>-{discountAmount.toFixed(2)} د.ت</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>مصاريف التوصيل</span>
                <span className="font-bold text-black">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-black">
                      مجاني 🎉
                    </span>
                  ) : (
                    '8.00 د.ت'
                  )}
                </span>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-zinc-200 flex justify-between items-center text-sm font-black text-black">
                <span>المجموع النهائي للدفع</span>
                <span className="text-xl sm:text-2xl font-black text-black">
                  {grandTotal.toFixed(2)} د.ت
                </span>
              </div>

              {/* Points Earned Preview */}
              <div className="pt-2 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-bold">
                  ⭐ ستحصل على {pointsEarned} نقطة ولاء عند إتمام الطلب
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-black rounded-full shadow-xl transition flex items-center justify-center gap-2 tracking-wide disabled:opacity-60"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>
                {isSubmitting
                  ? 'جارٍ تجهيز الطلب...'
                  : 'تأكيد الطلب عبر WhatsApp'}
              </span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
              بالضغط على تأكيد، سيتم فتح محادثة WhatsApp تلقائياً مع متجر VAYRO
              برسالة جاهزة تحتوي على تفاصيل طلبك للمتابعة الفورية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
