export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProductGender = 'men' | 'women' | 'kids' | 'unisex';
export type OrderStatus = 'new' | 'shipping' | 'delivered' | 'cancelled';
export type DiscountType = 'percentage' | 'fixed';

export interface Database {
  public: {
    Tables: {
      store_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          city: string | null;
          address: string | null;
          points_balance: number;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          address?: string | null;
          points_balance?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          address?: string | null;
          points_balance?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name_ar: string;
          name_fr: string;
          name_en: string;
          description_ar: string | null;
          description_fr: string | null;
          description_en: string | null;
          slug: string;
          price: number;
          compare_at_price: number | null;
          gender: ProductGender;
          category: string;
          instagram_video_url: string | null;
          model_3d_url: string | null;
          size_guide: Json | null;
          is_featured: boolean;
          is_bestseller: boolean;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_fr: string;
          name_en: string;
          description_ar?: string | null;
          description_fr?: string | null;
          description_en?: string | null;
          slug: string;
          price: number;
          compare_at_price?: number | null;
          gender?: ProductGender;
          category: string;
          instagram_video_url?: string | null;
          model_3d_url?: string | null;
          size_guide?: Json | null;
          is_featured?: boolean;
          is_bestseller?: boolean;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_fr?: string;
          name_en?: string;
          description_ar?: string | null;
          description_fr?: string | null;
          description_en?: string | null;
          slug?: string;
          price?: number;
          compare_at_price?: number | null;
          gender?: ProductGender;
          category?: string;
          instagram_video_url?: string | null;
          model_3d_url?: string | null;
          size_guide?: Json | null;
          is_featured?: boolean;
          is_bestseller?: boolean;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          color_name: string;
          color_hex: string;
          size: string;
          sku: string | null;
          stock_quantity: number;
          images: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          color_name: string;
          color_hex: string;
          size: string;
          sku?: string | null;
          stock_quantity?: number;
          images?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          color_name?: string;
          color_hex?: string;
          size?: string;
          sku?: string | null;
          stock_quantity?: number;
          images?: string[];
          created_at?: string;
        };
      };
      promo_codes: {
        Row: {
          id: string;
          code: string;
          discount_type: DiscountType;
          discount_value: number;
          min_order_amount: number;
          max_uses: number | null;
          used_count: number;
          is_active: boolean;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          discount_type?: DiscountType;
          discount_value: number;
          min_order_amount?: number;
          max_uses?: number | null;
          used_count?: number;
          is_active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          discount_type?: DiscountType;
          discount_value?: number;
          min_order_amount?: number;
          max_uses?: number | null;
          used_count?: number;
          is_active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_city: string;
          customer_address: string;
          status: OrderStatus;
          subtotal: number;
          delivery_fee: number;
          discount_amount: number;
          total: number;
          promo_code_id: string | null;
          points_used: number;
          points_earned: number;
          whatsapp_sent: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_city: string;
          customer_address: string;
          status?: OrderStatus;
          subtotal: number;
          delivery_fee?: number;
          discount_amount?: number;
          total: number;
          promo_code_id?: string | null;
          points_used?: number;
          points_earned?: number;
          whatsapp_sent?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_phone?: string;
          customer_city?: string;
          customer_address?: string;
          status?: OrderStatus;
          subtotal?: number;
          delivery_fee?: number;
          discount_amount?: number;
          total?: number;
          promo_code_id?: string | null;
          points_used?: number;
          points_earned?: number;
          whatsapp_sent?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          variant_id: string | null;
          product_name: string;
          color: string;
          size: string;
          unit_price: number;
          quantity: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          variant_id?: string | null;
          product_name: string;
          color: string;
          size: string;
          unit_price: number;
          quantity: number;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          product_name?: string;
          color?: string;
          size?: string;
          unit_price?: number;
          quantity?: number;
          total_price?: number;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          author_name: string;
          rating: number;
          comment: string;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id?: string | null;
          author_name: string;
          rating: number;
          comment: string;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string | null;
          author_name?: string;
          rating?: number;
          comment?: string;
          is_visible?: boolean;
          created_at?: string;
        };
      };
      stock_notifications: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          email: string;
          notified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          email: string;
          notified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          email?: string;
          notified?: boolean;
          created_at?: string;
        };
      };
      points_transactions: {
        Row: {
          id: string;
          user_id: string;
          order_id: string | null;
          points: number;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_id?: string | null;
          points: number;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_id?: string | null;
          points?: number;
          description?: string;
          created_at?: string;
        };
      };
    };
  };
}
