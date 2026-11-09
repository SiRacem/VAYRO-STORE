import { supabase } from './supabase';

export interface StoreSettingsMap {
  delivery_fee: number;
  free_delivery_threshold: number;
  whatsapp_number: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  points_per_dinar: number;
  points_redeem_rate: number;
}

export const DEFAULT_SETTINGS: StoreSettingsMap = {
  delivery_fee: 8,
  free_delivery_threshold: 100,
  whatsapp_number: '+21629660432',
  instagram_url: 'https://www.instagram.com/vayro_.official/',
  facebook_url: '',
  tiktok_url: '',
  points_per_dinar: 1,
  points_redeem_rate: 0.05,
};

// Fetch current store settings from Supabase
export async function fetchStoreSettings(): Promise<StoreSettingsMap> {
  try {
    const { data, error } = await supabase.from('store_settings').select('*');
    if (!error && data && data.length > 0) {
      const map = { ...DEFAULT_SETTINGS };
      data.forEach((row: any) => {
        if (row.key === 'delivery_fee') map.delivery_fee = Number(row.value);
        if (row.key === 'free_delivery_threshold') map.free_delivery_threshold = Number(row.value);
        if (row.key === 'whatsapp_number') map.whatsapp_number = String(row.value);
        if (row.key === 'points_per_dinar') map.points_per_dinar = Number(row.value);
        if (row.key === 'points_redeem_rate') map.points_redeem_rate = Number(row.value);
        if (row.key === 'social_links' && typeof row.value === 'object') {
          map.instagram_url = row.value?.instagram || map.instagram_url;
          map.facebook_url = row.value?.facebook || '';
          map.tiktok_url = row.value?.tiktok || '';
        }
      });
      return map;
    }
  } catch (e) {
    console.warn('Failed to fetch store settings from Supabase, using defaults', e);
  }
  return DEFAULT_SETTINGS;
}

// Update store settings in Supabase
export async function updateStoreSetting(key: string, value: any): Promise<boolean> {
  try {
    const { error } = await (supabase.from('store_settings') as any).upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch (e) {
    console.error(`Failed to update setting ${key}`, e);
    return false;
  }
}

// Fetch all orders
export async function fetchAllOrders(): Promise<any[]> {
  try {
    const { data, error } = await (supabase.from('orders') as any)
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) return data;
  } catch (e) {
    console.warn('Failed to fetch orders from Supabase', e);
  }
  return [];
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  try {
    const { error } = await (supabase.from('orders') as any)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    return !error;
  } catch (e) {
    console.error('Failed to update order status', e);
    return false;
  }
}

// Promo codes
export async function fetchPromoCodes(): Promise<any[]> {
  try {
    const { data, error } = await (supabase.from('promo_codes') as any)
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data;
  } catch (e) {
    console.warn('Failed to fetch promo codes', e);
  }
  return [];
}

export async function createPromoCode(code: string, discountType: 'percentage' | 'fixed', discountValue: number): Promise<boolean> {
  try {
    const { error } = await (supabase.from('promo_codes') as any).insert({
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: discountValue,
      is_active: true,
    });
    return !error;
  } catch (e) {
    console.error('Failed to create promo code', e);
    return false;
  }
}

export async function deletePromoCode(id: string): Promise<boolean> {
  try {
    const { error } = await (supabase.from('promo_codes') as any).delete().eq('id', id);
    return !error;
  } catch (e) {
    console.error('Failed to delete promo code', e);
    return false;
  }
}
