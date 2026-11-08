import { supabase } from './supabase';
import { CartItem } from '@/context/CartContext';

export interface OrderInput {
  customerName: string;
  customerPhone: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  promoCode?: string;
  pointsEarned: number;
}

export interface CreateOrderResult {
  success: boolean;
  orderNumber: string;
  whatsappUrl: string;
  error?: string;
}

export function formatWhatsAppMessage(orderNumber: string, input: OrderInput): string {
  const storePhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+21629660432';

  let itemsText = '';
  input.cart.forEach((item, index) => {
    itemsText += `${index + 1}. *${item.name}*\n`;
    itemsText += `   • المقاس: ${item.size} | اللون: ${item.color}\n`;
    itemsText += `   • الكمية: ${item.quantity} | السعر: ${(item.price * item.quantity).toFixed(2)} د.ت\n\n`;
  });

  const deliveryText =
    input.deliveryFee === 0 ? 'مجاني 🎉 (عرض أكثر من 100 د.ت)' : `${input.deliveryFee.toFixed(2)} د.ت`;

  const promoText =
    input.discountAmount > 0
      ? `• كود الخصم: ${input.promoCode || ''} (-${input.discountAmount.toFixed(2)} د.ت)\n`
      : '';

  const notesText = input.notes ? `• ملاحظات: ${input.notes}\n` : '';

  const rawMessage = `🛍️ *طلب جديد — متجر VAYRO*
رقم الطلب: *#${orderNumber}*
────────────────────
👤 *بيانات العميل:*
• الاسم: ${input.customerName}
• الهاتف: ${input.customerPhone}
• الولاية: ${input.governorate}
• العنوان: ${input.city} — ${input.address}
${notesText}────────────────────
📦 *المنتجات المطلوبة:*
${itemsText}────────────────────
💰 *ملخص الحساب:*
• المجموع الفرعي: ${input.subtotal.toFixed(2)} د.ت
${promoText}• مصاريف الشحن: ${deliveryText}
• *المجموع الإجمالي للدفع عند الاستلام:* *${input.total.toFixed(2)} د.ت*
⭐ *نقاط الولاء المكتسبة:* ${input.pointsEarned} نقطة

أرجو تأكيد استلام الطلب وتجهيز الشحنة. شكراً لكم!`;

  const encoded = encodeURIComponent(rawMessage);
  // Clean phone number from non-digits except +
  const cleanPhone = storePhone.replace(/[^0-9]/g, '');

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export async function createOrder(input: OrderInput): Promise<CreateOrderResult> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `VAYRO-${randomSuffix}`;
  const whatsappUrl = formatWhatsAppMessage(orderNumber, input);

  try {
    // 1. Insert order into Supabase orders table
    const { data: orderData, error: orderError } = await (supabase.from('orders') as any)
      .insert({
        order_number: orderNumber,
        customer_name: input.customerName,
        customer_phone: input.customerPhone,
        customer_city: `${input.governorate} - ${input.city}`,
        customer_address: input.address,
        subtotal: input.subtotal,
        delivery_fee: input.deliveryFee,
        discount_amount: input.discountAmount,
        total: input.total,
        points_earned: input.pointsEarned,
        notes: input.notes || null,
        status: 'new',
        whatsapp_sent: true,
      })
      .select('id')
      .single();

    if (!orderError && orderData?.id) {
      // 2. Insert items
      const itemsToInsert = input.cart.map((item) => ({
        order_id: orderData.id,
        product_name: item.name,
        color: item.color,
        size: item.size,
        unit_price: item.price,
        quantity: item.quantity,
        total_price: item.price * item.quantity,
      }));

      await (supabase.from('order_items') as any).insert(itemsToInsert);
    } else if (orderError) {
      console.warn('Could not record order to Supabase table, proceeding with WhatsApp fallback', orderError);
    }
  } catch (err) {
    console.error('Database order logging error, continuing with WhatsApp', err);
  }

  return {
    success: true,
    orderNumber,
    whatsappUrl,
  };
}
