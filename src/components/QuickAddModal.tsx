import { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface QuickAddModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickAddModal({ product, onClose }: QuickAddModalProps) {
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAdd = () => {
    addItem(product, product.sizes[0] || 'Standard', product.colors[0] || 'Default', 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl animate-slide-up p-6">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="flex gap-4 mb-5">
          <img
            src={product.image_url}
            alt={product.name_ar}
            className="w-24 h-32 object-cover bg-neutral-100 flex-shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-base font-bold text-neutral-900 mb-1 line-clamp-2">
              {product.name_ar}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">{product.price} جنيه</span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  {product.compare_at_price} جنيه
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {product.sizes.length > 0 && `المقاس: ${product.sizes[0]}`}
              {product.sizes.length > 0 && product.colors.length > 0 && ' • '}
              {product.colors.length > 0 && `اللون: ${product.colors[0]}`}
            </p>
          </div>
        </div>

        <button onClick={handleAdd} className="btn-primary w-full">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}
