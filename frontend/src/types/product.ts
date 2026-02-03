export type Product = {
  id: number;
  name: string;
  description: string;
  category?: string | null;
  image_url?: string | null;
  price?: number | null;
};
