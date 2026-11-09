'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { direction } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Direct WhatsApp message formatting from contact form
    const storePhone = '21629660432';
    const text = encodeURIComponent(
      `رسالة من صفحة اتصل بنا — متجر VAYRO:\nالاسم: ${name}\nالهاتف: ${phone}\nالبريد: ${email}\nالرسالة: ${message}`
    );
    window.open(`https://wa.me/${storePhone}?text=${text}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-1">
          GET IN TOUCH • تواصل معنا
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          نحن هنا لمساعدتك
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2">
          لديك استفسار حول مقاس، طلبية، أو ترغب في متابعة شحنتك؟ فريق VAYRO جاهز للإجابة فوراً.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Contact Information & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Box */}
          <div className="p-8 rounded-3xl bg-zinc-950 text-white relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  القناة الأسرع
                </span>
                <h3 className="text-base font-black uppercase">
                  محادثة WhatsApp مباشرة
                </h3>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
              للحصول على رد فوري واستشارة سريعة حول المقاسات والطلبات، راسلنا مباشرة عبر الواتساب.
            </p>

            <a
              href="https://wa.me/21629660432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-black text-xs rounded-full hover:bg-zinc-200 transition shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
              <span>+216 29 660 432</span>
            </a>
          </div>

          {/* Social & Details Box */}
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6 text-xs">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                <InstagramIcon className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-bold text-black block mb-0.5">
                  حساب إنستقرام الرسمي
                </span>
                <a
                  href="https://www.instagram.com/vayro_.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-black font-semibold underline"
                >
                  @vayro_.official
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-bold text-black block mb-0.5">
                  أوقات العمل والتأكيد
                </span>
                <span className="text-zinc-500">
                  يومياً من 09:00 صباحاً إلى 20:00 مساءً (توقيت تونس)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-bold text-black block mb-0.5">
                  المقر والتوزيع
                </span>
                <span className="text-zinc-500">
                  تونس — شحن سريع وتوصيل لجميع الولايات الـ 24
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <h2 className="text-xl font-black text-black uppercase tracking-tight mb-2">
              أرسل لنا رسالة
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              املأ البيانات التالية وسيتواصل معك فريق VAYRO في أقرب وقت.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-black text-sm text-emerald-900">
                  تم إرسال رسالتك بنجاح!
                </h3>
                <p className="text-xs text-emerald-700">
                  شكراً لتواصلك، تم توجيه رسالتك أيضاً إلى WhatsApp للمتابعة الفورية.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد المنصوري"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black focus:outline-hidden focus:bg-white focus:border-black transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1.5">
                      رقم الهاتف التونسي
                    </label>
                    <input
                      type="tel"
                      placeholder="مثال: 29660432"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black focus:outline-hidden focus:bg-white focus:border-black transition font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black focus:outline-hidden focus:bg-white focus:border-black transition font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1.5">
                    نص الرسالة أو الاستفسار <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب استفسارك بالتفصيل..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-black focus:outline-hidden focus:bg-white focus:border-black transition font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white text-xs font-black uppercase rounded-full hover:bg-zinc-800 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
