import { Loader2, PackageSearch } from 'lucide-react';
import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onQuickAdd: (product: Product) => void;
  onProductClick: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({
  products,
  loading,
  onQuickAdd,
  onProductClick,
  title,
  subtitle,
}: ProductGridProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {title && (
          <div className="text-center mb-8 md:mb-10">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch className="w-12 h-12 text-neutral-300 mb-3" strokeWidth={1} />
            <p className="text-neutral-500 font-medium">لا توجد منتجات في هذه الفئة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={onQuickAdd}
                onClick={onProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
