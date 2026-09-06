/*
# Create products, categories, and orders tables for clothing brand store

1. New Tables
- `categories`: Product categories (men, women, kids, accessories)
  - id (uuid, PK)
  - name (text, not null)
  - name_ar (text, not null) - Arabic name
  - slug (text, unique, not null)
  - image_url (text)
  - created_at (timestamptz)

- `products`: Clothing products
  - id (uuid, PK)
  - name (text, not null)
  - name_ar (text, not null) - Arabic name
  - description (text)
  - description_ar (text) - Arabic description
  - price (numeric, not null) - in EGP
  - compare_at_price (numeric) - original price for discounts
  - category_id (uuid, FK -> categories)
  - image_url (text, not null)
  - images (text[]) - multiple images
  - sizes (text[]) - available sizes
  - colors (text[]) - available colors
  - in_stock (boolean, default true)
  - featured (boolean, default false)
  - new_arrival (boolean, default false)
  - rating (numeric, default 0)
  - reviews_count (integer, default 0)
  - created_at (timestamptz)

- `orders`: Customer orders
  - id (uuid, PK)
  - customer_name (text, not null)
  - customer_phone (text, not null)
  - customer_email (text)
  - shipping_address (text, not null)
  - city (text, not null)
  - items (jsonb, not null) - array of {product_id, name, price, quantity, size, color}
  - total (numeric, not null)
  - status (text, default 'pending')
  - created_at (timestamptz)

2. Security
- Enable RLS on all tables.
- Products and categories: public read (anon, authenticated), no public write.
- Orders: public insert (anon can place orders), no public read (orders are private to store admin).
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text NOT NULL,
  description text,
  description_ar text,
  price numeric NOT NULL,
  compare_at_price numeric,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  in_stock boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  new_arrival boolean NOT NULL DEFAULT true,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  city text NOT NULL,
  items jsonb NOT NULL,
  total numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival) WHERE new_arrival = true;
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
