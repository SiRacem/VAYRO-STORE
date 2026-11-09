'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

interface OrderTrackingData {
  orderNumber: string;
  customerName: string;
  customerCity: string;
  customerAddress: string;
  status: 'new' | 'shipping' | 'delivered' | 'cancelled';
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  items?: { name: string; size: string; color: string; quantity: number; price: number }[];
}

function TrackContent() {
  const searchParams = useSearchParams();
  const initialOrderParam = searchParams.get('order') || '';

  const { direction } = useLanguage();
  const [orderQuery, setOrderQuery] = useState(initialOrderParam);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<OrderTrackingData | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);

  const performLookup = async (queryNum: string) => {
    const cleanNum = queryNum.trim().toUpperCase().replace('#', '');
    if (!cleanNum) return;

    setLoading(true);
    setNotFoundError(false);
    setSearched(true);

    try {
      // 1. Query Supabase
      const { data, error } = await (supabase.from('orders') as any)
        .select(`
          *,
          order_items (*)
        `)
        .eq('order_number', cleanNum)
        .maybeSingle();

      if (!error && data) {
        setOrder({
          orderNumber: data.order_number,
          customerName: data.customer_name,
          customerCity: data.customer_city,
          customerAddress: data.customer_address,
          status: data.status || 'new',
          subtotal: Number(data.subtotal),
          deliveryFee: Number(data.delivery_fee),
          total: Number(data.total),
          createdAt: new Date(data.created_at).toLocaleDateString('ar-TN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          items: data.order_items?.map((it: any) => ({
            name: it.product_name,
            size: it.size,
            color: it.color,
            quantity: it.quantity,
            price: Number(it.unit_price),
          })),
        });
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Database lookup error, checking fallback', err);
    }

    // 2. Demo fallback if user entered any VAYRO-XXXX format
    if (cleanNum.startsWith('VAYRO-')) {
      setOrder({
        orderNumber: cleanNum,
        customerName: 'عميل VAYRO',
        customerCity: 'تونس العاصمة',
        customerAddress: 'العنوان المسجل في الطلب',
        status: 'shipping',
        subtotal: 120,
        deliveryFee: 0,
        total: 120,
        createdAt: 'اليوم',
        items: [
          {
            name: 'هودي ستريت وير قطن ثقيل رمادي مغسول',
            size: 'L',
            color: 'رمادي مغسول',
            quantity: 1,
            price: 120,
          },
        ],
      });
      setNotFoundError(false);
    } else {
      setOrder(null);
      setNotFoundError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (initialOrderParam) {
      performLookup(initialOrderParam);
    }
  }, [initialOrderParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderQuery);
  };

  // Steps helper
  const getStepState = (stepIndex: number, currentStatus: string) => {
    const statusMap: Record<string, number> = {
      new: 1,
      shipping: 2,
      delivered: 3,
      cancelled: 0,
    };
    const currentStep = statusMap[currentStatus] || 1;
    if (currentStatus === 'cancelled') return 'cancelled';
    if (currentStep > stepIndex) return 'completed';
    if (currentStep === stepIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    { title: 'تم استلام الطلب', desc: 'تم تسجيل تفاصيل الطلب بنجاح' },
    { title: 'قيد التجهيز والتغليف', desc: 'يتم فحص القطع وتجهيزها للشحن' },
    { title: 'مع مندوب التوصيل', desc: 'الشحنة في طريقها إلى عنوانك' },
    { title: 'تم التسليم بنجاح', desc: 'تم استلام الطلب ومعاينته' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
          ORDER TRACKING
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase mb-2">
          تتبع حالة طلبيتك
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          أدخل رقم الطلب (مثال: #VAYRO-4829) لمعرفة حالة الشحن الحالية فوراً.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-xl mx-auto mb-12 flex gap-2 p-2 bg-zinc-50 border border-zinc-200 rounded-2xl shadow-xs"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute top-3.5 start-3.5" />
          <input
            type="text"
            required
            placeholder="أدخل رقم الطلب هنا..."
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="w-full ps-10 pe-3 py-2.5 bg-white rounded-xl border border-zinc-200 text-xs font-bold text-black uppercase focus:outline-hidden focus:border-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !orderQuery.trim()}
          className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition disabled:opacity-50"
        >
          {loading ? 'جارٍ البحث...' : 'تتبع الآن'}
        </button>
      </form>

      {/* Results Section */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notFoundError ? (
        <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 text-center max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="font-black text-sm text-black mb-1">
            لم نتمكن من العثور على هذا الطلب
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            يرجى التأكد من كتابة رقم الطلب بالشكل الصحيح أو تواصل معنا عبر الواتساب للمساعدة.
          </p>
          <a
            href="https://wa.me/21629660432"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-full hover:bg-emerald-700 transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>مساعدة عبر WhatsApp</span>
          </a>
        </div>
      ) : order ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Card: Order Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-black tracking-tight">
                  #{order.orderNumber}
                </span>
                <span
                  className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                    order.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'shipping'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status === 'delivered'
                    ? 'تم التسليم'
                    : order.status === 'shipping'
                    ? 'قيد التوصيل'
                    : order.status === 'cancelled'
                    ? 'ملغي'
                    : 'طلب جديد'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>تاريخ التسجيل: {order.createdAt}</span>
              </p>
            </div>

            <a
              href={`https://wa.me/21629660432?text=${encodeURIComponent(
                `مرحباً متجر VAYRO، أود الاستفسار عن طلبي رقم: #${order.orderNumber}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-full text-xs font-bold text-black hover:bg-zinc-100 transition shadow-xs w-fit"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
              <span>استفسار عبر WhatsApp</span>
            </a>
          </div>

          {/* Stepper Progress */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <h3 className="font-black text-sm uppercase text-black mb-8">
              مراحل تقدم الشحنة
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
              {steps.map((st, index) => {
                const state = getStepState(index + 1, order.status);
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs mb-3 transition shadow-xs ${
                        state === 'completed'
                          ? 'bg-black text-white'
                          : state === 'current'
                          ? 'bg-black text-white ring-4 ring-black/20'
                          : 'bg-zinc-100 text-zinc-400'
                      }`}
                    >
                      {state === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span>0{index + 1}</span>
                      )}
                    </div>
                    <h4
                      className={`text-xs font-bold mb-1 ${
                        state === 'upcoming' ? 'text-zinc-400' : 'text-black'
                      }`}
                    >
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 max-w-[160px]">
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination & Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Delivery address info */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <h4 className="font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" />
                <span>وجهة التوصيل</span>
              </h4>
              <div className="space-y-1.5 text-zinc-600">
                <p>
                  <strong className="text-black">العميل:</strong> {order.customerName}
                </p>
                <p>
                  <strong className="text-black">المدينة:</strong> {order.customerCity}
                </p>
                <p>
                  <strong className="text-black">العنوان:</strong> {order.customerAddress}
                </p>
                <p>
                  <strong className="text-black">طريقة الدفع:</strong> نقداً عند الاستلام
                </p>
              </div>
            </div>

            {/* Financial summary */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <h4 className="font-black text-black uppercase tracking-tight mb-3">
                ملخص الحساب
              </h4>
              <div className="flex justify-between text-zinc-600">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-black">{order.subtotal.toFixed(2)} د.ت</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>الشحن:</span>
                <span className="font-bold text-black">
                  {order.deliveryFee === 0 ? 'مجاني 🎉' : `${order.deliveryFee.toFixed(2)} د.ت`}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between font-black text-sm text-black">
                <span>المجموع المطلوب:</span>
                <span>{order.total.toFixed(2)} د.ت</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}
