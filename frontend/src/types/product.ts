export type ProductCategory = {
  id: number;
  name: string;
  description?: string | null;
  created_at?: string | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price?: number | string | null;
  image_url?: string | null;
  category_id?: number | null;
  category?: ProductCategory | null;
  is_active?: boolean | null;
  created_at?: string | null;
};
