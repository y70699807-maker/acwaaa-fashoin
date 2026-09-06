export interface Category {
  id: string;
  name: string;
  name_ar: string;
  slug: string;
  image_url: string | null;
}

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  description: string | null;
  description_ar: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  image_url: string;
  images: string[];
  sizes: string[];
  colors: string[];
  in_stock: boolean;
  featured: boolean;
  new_arrival: boolean;
  rating: number;
  reviews_count: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  city: string;
  items: CartItem[];
  total: number;
}
