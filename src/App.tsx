import { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '@/types';
import { CartProvider } from '@/context/CartContext';
import { products as mockProducts, categories as mockCategories } from '@/lib/mockData';

import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesBar from '@/components/FeaturesBar';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import PromoBanner from '@/components/PromoBanner';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import QuickAddModal from '@/components/QuickAddModal';
import Footer from '@/components/Footer';

function StoreApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    // استخدام البيانات المحلية بدل Supabase
    const sorted = [...mockProducts].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const sortedCats = [...mockCategories].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sorted);
    setCategories(sortedCats);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNavigate = (category: string | null) => {
    setActiveCategory(category);
    setSearchQuery('');
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(null);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = products.filter((p) => {
    let matches = true;
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      matches = cat ? p.category_id === cat.id : true;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matches =
        matches &&
        (p.name_ar.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          (p.description_ar || '').toLowerCase().includes(q));
    }
    return matches;
  });

  const newArrivals = products.filter((p) => p.new_arrival).slice(0, 8);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const gridTitle = searchQuery
    ? `نتائج البحث: "${searchQuery}"`
    : activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name_ar || 'المنتجات'
    : 'كل المنتجات';

  const showHomeContent = !activeCategory && !searchQuery;

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header onSearch={handleSearch} onNavigate={handleNavigate} activeCategory={activeCategory} />

      <main>
        {showHomeContent && (
          <>
            <Hero onShopNow={() => handleNavigate(null)} />
            <FeaturesBar />

            {/* New Arrivals */}
            <div id="products-section">
              <ProductGrid
                products={newArrivals}
                loading={loading}
                onQuickAdd={setQuickAddProduct}
                onProductClick={setSelectedProduct}
                title="وصل حديثاً"
                subtitle="اكتشف أحدث المنتجات التي وصلت متجرنا"
              />
            </div>

            <CategorySection categories={categories} onNavigate={handleNavigate} />

            <PromoBanner onShopNow={() => handleNavigate(null)} />

            {/* Featured */}
            <ProductGrid
              products={featuredProducts}
              loading={loading}
              onQuickAdd={setQuickAddProduct}
              onProductClick={setSelectedProduct}
              title="منتجات مميزة"
              subtitle="تشكيلة مختارة بعناية من أفضل منتجاتنا"
            />
          </>
        )}

        {/* Filtered view */}
        {!showHomeContent && (
          <div id="products-section" className="pt-8">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onQuickAdd={setQuickAddProduct}
              onProductClick={setSelectedProduct}
              title={gridTitle}
              subtitle={
                activeCategory
                  ? 'تصفح جميع المنتجات في هذه الفئة'
                  : `${filteredProducts.length} منتج`
              }
            />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Overlays */}
      <CartDrawer />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      {quickAddProduct && (
        <QuickAddModal product={quickAddProduct} onClose={() => setQuickAddProduct(null)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}
