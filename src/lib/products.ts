import { supabase } from './supabase';
import { Database } from '@/types/database';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionFr: string;
  descriptionEn: string;
  price: number;
  compareAtPrice: number | null;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  category: string;
  categorySlug: string;
  isFeatured: boolean;
  isBestseller: boolean;
  defaultImage: string;
  images: string[];
  colors: ProductColor[];
  sizes: { size: string; stock: number }[];
  instagramVideoUrl?: string | null;
  model3dUrl?: string | null;
}

// Initial rich curated catalog for VAYRO
export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'vayro-1',
    slug: 'vayro-oversized-heavy-tee-black',
    nameAr: 'تيشيرت أوفرسايز بريميوم أسود VAYRO',
    nameFr: 'T-Shirt Oversized Premium Noir VAYRO',
    nameEn: 'VAYRO Heavyweight Oversized Tee Black',
    descriptionAr:
      'تيشيرت بقصة أوفرسايز مصنوع من قطن تونسي 100% عالي الكثافة (240 GSM). يوفر راحة فائقة ومظهراً عصرياً يدوم طويلاً مع ياقة محاكة متينة لا ترتخي بعد الغسيل.',
    descriptionFr:
      'T-shirt coupe oversized confectionné en 100% coton tunisien haute densité (240 GSM). Offre un confort exceptionnel et un look streetwear moderne qui dure.',
    descriptionEn:
      'Oversized fit t-shirt crafted from 100% high-density Tunisian cotton (240 GSM). Features heavy ribbed collar and premium drape designed to last.',
    price: 65,
    compareAtPrice: 85,
    gender: 'unisex',
    category: 'تيشيرتات / T-Shirts',
    categorySlug: 't-shirts',
    isFeatured: true,
    isBestseller: true,
    defaultImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'أسود / Black',
        hex: '#111111',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      },
      {
        name: 'أبيض / Off-White',
        hex: '#F5F5F5',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop',
      },
      {
        name: 'بيج رملي / Sand',
        hex: '#D7C4B7',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 0 }, // Out of stock example
    ],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
  {
    id: 'vayro-2',
    slug: 'vayro-minimalist-hoodie-washed-grey',
    nameAr: 'هودي ستريت وير قطن ثقيل رمادي مغسول',
    nameFr: 'Hoodie Streetwear Coton Épais Gris Lavé',
    nameEn: 'VAYRO Washed Grey Heavy Cotton Hoodie',
    descriptionAr:
      'هودي شتوي فاخر بقماش قطن مفرود (French Terry 400 GSM) بتأثير غسيل حمضي خفيف. جيب كنغر أمامي فسيح وقبعة مبطنة مزدوجة تمنح دفئاً وأناقة لا مثيل لها.',
    descriptionFr:
      'Hoodie streetwear haut de gamme en coton lourd (400 GSM) avec effet délavé subtil. Poche kangourou et capuche doublée pour un confort thermique supérieur.',
    descriptionEn:
      'Premium streetwear hoodie in heavy French Terry (400 GSM) featuring an acid-wash look, drop shoulders, and double-layered hood.',
    price: 120,
    compareAtPrice: 145,
    gender: 'men',
    category: 'هوديات / Hoodies',
    categorySlug: 'hoodies',
    isFeatured: true,
    isBestseller: true,
    defaultImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'رمادي مغسول',
        hex: '#5A5A5C',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      },
      {
        name: 'أسود كربوني',
        hex: '#1A1A1A',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [
      { size: 'M', stock: 10 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 5 },
    ],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
  {
    id: 'vayro-3',
    slug: 'vayro-cargo-pants-tactical-black',
    nameAr: 'بنطلون كارجو ستريت فلكس أسود',
    nameFr: 'Pantalon Cargo Street Flex Noir',
    nameEn: 'VAYRO Tactical Street Cargo Pants',
    descriptionAr:
      'بنطلون كارجو عملي بجيوب جانبية مدمجة وقصة مستقيمة مريحة. قماش معالج ضد التمزق ومقاوم للرطوبة، مزود برباط خصر مطاطي وسحاب عالي الجودة.',
    descriptionFr:
      'Pantalon cargo streetwear avec multiples poches fonctionnelles et tissu ripstop durable. Ceinture élastique avec cordon de serrage.',
    descriptionEn:
      'Tactical street cargo pants with 6 utility pockets, relaxed silhouette, and durable ripstop stretch cotton.',
    price: 95,
    compareAtPrice: 115,
    gender: 'unisex',
    category: 'بناطيل / Pants',
    categorySlug: 'pants',
    isFeatured: true,
    isBestseller: false,
    defaultImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'أسود تكتيكي',
        hex: '#0A0A0A',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      },
      {
        name: 'زيتي كلاسيكي',
        hex: '#3D4436',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 4 },
    ],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
  {
    id: 'vayro-4',
    slug: 'vayro-signature-cap-monogram',
    nameAr: 'كاب VAYRO مطرز حصري',
    nameFr: 'Casquette VAYRO Broderie Exclusive',
    nameEn: 'VAYRO Signature Embroidered Cap',
    descriptionAr:
      'قبعة بيسبول مينيمالست بتطريز شعار VAYRO الأمامي بتقنية 3D. حزام خلفي قابل للتعديل بإبزيم معدني غير قابل للصدأ.',
    descriptionFr:
      'Casquette minimaliste avec broderie 3D VAYRO. Sangle réglable avec boucle métallique premium.',
    descriptionEn:
      'Minimalist unstructured dad cap featuring 3D puff embroidery and vintage brass buckle closure.',
    price: 45,
    compareAtPrice: null,
    gender: 'unisex',
    category: 'إكسسوارات / Accessories',
    categorySlug: 'accessories',
    isFeatured: false,
    isBestseller: true,
    defaultImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'أسود مطفأ',
        hex: '#111111',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
      },
      {
        name: 'كريمي عاجي',
        hex: '#ECE7DE',
        image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [{ size: 'One Size', stock: 35 }],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
  {
    id: 'vayro-5',
    slug: 'vayro-boxy-cropped-tee-women',
    nameAr: 'تيشيرت بوكسي نسائي VAYRO كلاسيك',
    nameFr: 'T-Shirt Boxy Femme VAYRO Classique',
    nameEn: 'VAYRO Women Boxy Cropped Tee',
    descriptionAr:
      'تيشيرت عصري بقصة بوكسي واسعة تلائم التنسيقات اليومية الحضرية مع بناطيل الكارجو أو الجينز عالي الخصر. ناعم وخفيف الوزن.',
    descriptionFr:
      'T-shirt boxy pour femme, coupe tendance parfaite pour un look streetwear avec pantalon cargo ou jeans.',
    descriptionEn:
      'Trendy boxy silhouette tee tailored for women, featuring drop shoulders and relaxed crew neck.',
    price: 55,
    compareAtPrice: 70,
    gender: 'women',
    category: 'تيشيرتات / T-Shirts',
    categorySlug: 't-shirts',
    isFeatured: true,
    isBestseller: true,
    defaultImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'أبيض ناصع',
        hex: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
    ],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
  {
    id: 'vayro-6',
    slug: 'vayro-kids-oversized-mini-crew',
    nameAr: 'سويت شيرت ميني كرو للأطفال',
    nameFr: 'Sweat Mini Crew Oversized Enfants',
    nameEn: 'VAYRO Kids Oversized Mini Crew Sweatshirt',
    descriptionAr:
      'سويت شيرت قطني مريح للأطفال آمن ومضاد للحساسية بقماش ناعم يمنح حرية الحركة طوال اليوم.',
    descriptionFr:
      'Sweatshirt confortable pour enfants, 100% coton hypoallergénique pour un confort optimal.',
    descriptionEn:
      'Ultra-soft children streetwear crewneck sweatshirt designed for everyday play and comfort.',
    price: 60,
    compareAtPrice: null,
    gender: 'kids',
    category: 'هوديات / Hoodies',
    categorySlug: 'hoodies',
    isFeatured: false,
    isBestseller: false,
    defaultImage: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop',
    ],
    colors: [
      {
        name: 'رمادي ميلانج',
        hex: '#B0B0B0',
        image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    sizes: [
      { size: '6-8Y', stock: 8 },
      { size: '8-10Y', stock: 10 },
      { size: '10-12Y', stock: 7 },
    ],
    instagramVideoUrl: 'https://www.instagram.com/vayro_.official/',
    model3dUrl: null,
  },
];

export interface ProductFilters {
  gender?: string | null;
  category?: string | null;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  query?: string;
  isBestseller?: boolean;
  isSale?: boolean;
}

export async function getProducts(filters?: ProductFilters): Promise<ProductItem[]> {
  try {
    // Attempt to query Supabase products first
    let query = supabase.from('products').select(`
      *,
      product_variants (*)
    `).eq('is_archived', false);

    if (filters?.gender && filters.gender !== 'all') {
      query = query.or(`gender.eq.${filters.gender},gender.eq.unisex`);
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.isBestseller) {
      query = query.eq('is_bestseller', true);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      // Map supabase rows to ProductItem format
      return data.map((row: any) => {
        const variants = row.product_variants || [];
        const colorsMap = new Map();
        const sizesMap = new Map();

        variants.forEach((v: any) => {
          if (!colorsMap.has(v.color_name)) {
            colorsMap.set(v.color_name, {
              name: v.color_name,
              hex: v.color_hex,
              image: v.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000',
            });
          }
          sizesMap.set(v.size, (sizesMap.get(v.size) || 0) + v.stock_quantity);
        });

        const colors = Array.from(colorsMap.values());
        const sizes = Array.from(sizesMap.entries()).map(([size, stock]) => ({
          size,
          stock: stock as number,
        }));

        return {
          id: row.id,
          slug: row.slug,
          nameAr: row.name_ar,
          nameFr: row.name_fr,
          nameEn: row.name_en,
          descriptionAr: row.description_ar || '',
          descriptionFr: row.description_fr || '',
          descriptionEn: row.description_en || '',
          price: Number(row.price),
          compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
          gender: row.gender,
          category: row.category,
          categorySlug: row.category.toLowerCase().replace(/\s+/g, '-'),
          isFeatured: row.is_featured,
          isBestseller: row.is_bestseller,
          defaultImage: colors[0]?.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000',
          images: colors.map((c: any) => c.image),
          colors,
          sizes: sizes.length > 0 ? sizes : [{ size: 'M', stock: 10 }],
          instagramVideoUrl: row.instagram_video_url,
          model3dUrl: row.model_3d_url,
        };
      });
    }
  } catch (err) {
    console.error('Error fetching products from Supabase, using catalog fallback', err);
  }

  // Fallback to static rich initial catalog with local filtering
  let list = [...INITIAL_PRODUCTS];

  if (filters?.gender && filters.gender !== 'all') {
    list = list.filter(
      (p) => p.gender === filters.gender || p.gender === 'unisex'
    );
  }

  if (filters?.category && filters.category !== 'all') {
    list = list.filter((p) => p.categorySlug === filters.category);
  }

  if (filters?.isBestseller) {
    list = list.filter((p) => p.isBestseller);
  }

  if (filters?.isSale) {
    list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameFr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters?.minPrice !== undefined) {
    const minP = filters.minPrice;
    list = list.filter((p) => p.price >= minP);
  }

  if (filters?.maxPrice !== undefined && filters.maxPrice > 0) {
    const maxP = filters.maxPrice;
    list = list.filter((p) => p.price <= maxP);
  }

  if (filters?.sort) {
    if (filters.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'bestseller') {
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) || null;
}
