import { X, ShoppingBag, Star, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAdd = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
      setAdded(false);
    }, 800);
  };

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const images = product.images.length > 0 ? product.images : [product.image_url];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-neutral-600 hover:text-neutral-900 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="bg-neutral-50">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name_ar}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-neutral-900' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">
                  {product.rating} ({product.reviews_count} تقييم)
                </span>
              </div>
            )}

            <h1 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-relaxed">
              {product.name_ar}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-neutral-900">
                {product.price} <span className="text-base font-normal">جنيه</span>
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {product.compare_at_price} جنيه
                  </span>
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1">
                    خصم {Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            {product.description_ar && (
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {product.description_ar}
              </p>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">المقاس</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 py-2 text-sm font-medium border transition-all ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">اللون</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 text-sm font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">الكمية</h3>
              <div className="flex items-center border border-neutral-200 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-neutral-500 hover:text-neutral-900 transition-colors text-lg"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-neutral-500 hover:text-neutral-900 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              {product.in_stock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-600 font-medium">متوفر في المخزون</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-red-600 font-medium">غير متوفر</span>
                </>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!product.in_stock || added}
              className="btn-primary w-full disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  تمت الإضافة
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  أضف إلى السلة
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-neutral-100">
              <div className="text-center">
                <div className="text-xs font-semibold text-neutral-900 mb-1">شحن سريع</div>
                <div className="text-[10px] text-neutral-400">2-4 أيام</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-neutral-900 mb-1">استبدال مجاني</div>
                <div className="text-[10px] text-neutral-400">خلال 14 يوم</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-neutral-900 mb-1">دفع آمن</div>
                <div className="text-[10px] text-neutral-400">عند الاستلام</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
