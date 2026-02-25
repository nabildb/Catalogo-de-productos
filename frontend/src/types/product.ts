// Tipos de datos para productos y categorías usados en toda la app.
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
  image_url_2?: string | null;
  category_id?: number | null;
  category?: ProductCategory | null;
  is_active?: boolean | null;
  created_at?: string | null;
};
