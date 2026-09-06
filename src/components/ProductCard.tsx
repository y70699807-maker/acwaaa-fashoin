import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onQuickAdd, onClick }: ProductCardProps) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  return (
    <div className="group cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
        <img
          src={product.image_url}
          alt={product.name_ar}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.new_arrival && (
            <span className="bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 tracking-wider">
              جديد
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 tracking-wider">
              خصم {discountPercent}%
            </span>
          )}
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-neutral-900 py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            إضافة سريعة
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-neutral-900 line-clamp-2 leading-relaxed group-hover:text-neutral-600 transition-colors">
          {product.name_ar}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900">
            {product.price} <span className="text-xs font-normal">جنيه</span>
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through">
              {product.compare_at_price} جنيه
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-neutral-200"
                style={{ backgroundColor: getColorValue(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-neutral-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    'White': '#ffffff',
    'Black': '#1a1a1a',
    'Navy': '#1e3a5f',
    'Grey': '#9ca3af',
    'Beige': '#e8dcc8',
    'Khaki': '#bdb76b',
    'Olive': '#808000',
    'Pink': '#ffc0cb',
    'Turquoise': '#40e0d0',
    'Red': '#dc2626',
    'Burgundy': '#800020',
    'Blue': '#3b82f6',
    'Blue Denim': '#4a6f8a',
    'Green': '#16a34a',
    'Brown': '#8b4513',
    'Sand': '#c2a778',
    'Plaid': '#c0c0c0',
  };
  return colorMap[color] || '#e5e5e5';
}
