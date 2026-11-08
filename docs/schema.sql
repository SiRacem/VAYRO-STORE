-- ==============================================================================
-- 🛍️ VAYRO E-Commerce — Supabase Database Schema & RLS Policies
-- Based on docs/PRD.md
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE product_gender AS ENUM ('men', 'women', 'kids', 'unisex');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('new', 'shipping', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLES
-- ==============================================================================

-- 3.1 Store Settings (Configurable from Dashboard)
CREATE TABLE IF NOT EXISTS public.store_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default settings from PRD
INSERT INTO public.store_settings (key, value, description)
VALUES 
    ('delivery_fee', '8'::jsonb, 'Standard flat delivery fee in TND'),
    ('free_delivery_threshold', '100'::jsonb, 'Minimum order amount for free delivery in TND'),
    ('points_per_dinar', '1'::jsonb, 'Loyalty points earned per 1 TND spent'),
    ('points_redeem_rate', '0.05'::jsonb, 'Value of 1 point in TND (100 points = 5 TND)'),
    ('min_points_to_redeem', '100'::jsonb, 'Minimum points required to redeem discount'),
    ('whatsapp_number', '"+21629660432"'::jsonb, 'WhatsApp business phone number'),
    ('social_links', '{"instagram": "https://www.instagram.com/vayro_.official/", "facebook": "", "tiktok": ""}'::jsonb, 'Social media links')
ON CONFLICT (key) DO NOTHING;

-- 3.2 Customer Profiles (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    city TEXT,
    address TEXT,
    points_balance INT DEFAULT 0 CHECK (points_balance >= 0),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.3 Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price > price),
    gender product_gender NOT NULL DEFAULT 'unisex',
    category TEXT NOT NULL, -- e.g. 't-shirts', 'hoodies', 'pants', 'jackets', 'accessories'
    instagram_video_url TEXT,
    model_3d_url TEXT, -- URL to .glb file if available
    size_guide JSONB, -- Measurement chart and instructions
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.4 Product Variants (Colors, Sizes, Stock & Image associations)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    color_name TEXT NOT NULL, -- e.g. "Noir / أسود"
    color_hex TEXT NOT NULL,  -- e.g. "#000000"
    size TEXT NOT NULL,       -- e.g. 'XS', 'S', 'M', 'L', 'XL', 'XXL'
    sku TEXT UNIQUE,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    images TEXT[] DEFAULT '{}', -- Array of image URLs for this specific color variant
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.5 Promo Codes
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_type discount_type NOT NULL DEFAULT 'percentage',
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
    min_order_amount NUMERIC(10, 2) DEFAULT 0 CHECK (min_order_amount >= 0),
    max_uses INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.6 Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL, -- e.g. VAYRO-1001
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Nullable for Guest Checkout
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_city TEXT NOT NULL,       -- Governorate / City
    customer_address TEXT NOT NULL,
    status order_status NOT NULL DEFAULT 'new',
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 8.00 CHECK (delivery_fee >= 0),
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (discount_amount >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    promo_code_id UUID REFERENCES public.promo_codes(id) ON DELETE SET NULL,
    points_used INT DEFAULT 0 CHECK (points_used >= 0),
    points_earned INT DEFAULT 0 CHECK (points_earned >= 0),
    whatsapp_sent BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.7 Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    color TEXT NOT NULL,
    size TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.8 Product Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.9 Back In Stock Subscriptions
CREATE TABLE IF NOT EXISTS public.stock_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.10 Loyalty Points Transactions Ledger
CREATE TABLE IF NOT EXISTS public.points_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    points INT NOT NULL, -- Positive for earned, negative for redeemed
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4.1 Store Settings
CREATE POLICY "Public read store settings" 
    ON public.store_settings FOR SELECT USING (true);

CREATE POLICY "Admin update store settings" 
    ON public.store_settings FOR ALL 
    USING (public.is_admin());

-- 4.2 Profiles
CREATE POLICY "Users can read own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- 4.3 Products & Variants
CREATE POLICY "Public read non-archived products" 
    ON public.products FOR SELECT 
    USING (is_archived = false OR public.is_admin());

CREATE POLICY "Admin manage products" 
    ON public.products FOR ALL 
    USING (public.is_admin());

CREATE POLICY "Public read product variants" 
    ON public.product_variants FOR SELECT 
    USING (true);

CREATE POLICY "Admin manage product variants" 
    ON public.product_variants FOR ALL 
    USING (public.is_admin());

-- 4.4 Promo Codes
CREATE POLICY "Public read active promo codes" 
    ON public.promo_codes FOR SELECT 
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage promo codes" 
    ON public.promo_codes FOR ALL 
    USING (public.is_admin());

-- 4.5 Orders & Order Items
-- Allow anyone (including Guest / Anon) to create an order
CREATE POLICY "Anyone can create orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view own orders" 
    ON public.orders FOR SELECT 
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin manage all orders" 
    ON public.orders FOR ALL 
    USING (public.is_admin());

CREATE POLICY "Anyone can insert order items" 
    ON public.order_items FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view own order items" 
    ON public.order_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

-- 4.6 Reviews
CREATE POLICY "Public read approved reviews" 
    ON public.reviews FOR SELECT 
    USING (is_visible = true OR public.is_admin());

CREATE POLICY "Anyone can submit reviews" 
    ON public.reviews FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admin manage reviews" 
    ON public.reviews FOR ALL 
    USING (public.is_admin());

-- 4.7 Stock Notifications
CREATE POLICY "Anyone can subscribe to stock alerts" 
    ON public.stock_notifications FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admin manage stock notifications" 
    ON public.stock_notifications FOR ALL 
    USING (public.is_admin());

-- 4.8 Points Transactions
CREATE POLICY "Users can view own points transactions" 
    ON public.points_transactions FOR SELECT 
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin manage points transactions" 
    ON public.points_transactions FOR ALL 
    USING (public.is_admin());

-- ==============================================================================
-- 5. STORAGE BUCKETS (Product Images & 3D Models)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('products', 'products', true),
    ('models_3d', 'models_3d', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for images and 3D files
CREATE POLICY "Public can view product media"
ON storage.objects FOR SELECT
USING (bucket_id IN ('products', 'models_3d'));

-- Only admin can upload/update/delete product media
CREATE POLICY "Admin can upload product media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('products', 'models_3d') AND public.is_admin());

CREATE POLICY "Admin can update product media"
ON storage.objects FOR UPDATE
USING (bucket_id IN ('products', 'models_3d') AND public.is_admin());

CREATE POLICY "Admin can delete product media"
ON storage.objects FOR DELETE
USING (bucket_id IN ('products', 'models_3d') AND public.is_admin());
