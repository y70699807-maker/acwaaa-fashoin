import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={closeCart}
        />
        <div className="absolute left-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right" style={{ animationName: 'slideInRight' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
              <h2 className="text-lg font-bold text-neutral-900">
                عربة التسوق ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-neutral-300" strokeWidth={1} />
              </div>
              <p className="text-neutral-600 font-medium mb-1">سلة التسوق فارغة</p>
              <p className="text-neutral-400 text-sm">يمكنك الاطلاع على المنتجات المتوفرة وشراء بعضها في المتجر</p>
              <button
                onClick={closeCart}
                className="mt-6 text-sm font-semibold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-70 transition-opacity"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-neutral-50 last:border-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name_ar}
                      className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-neutral-900 line-clamp-2 mb-1">
                        {item.product.name_ar}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                        <span>المقاس: {item.size}</span>
                        <span>•</span>
                        <span>اللون: {item.color}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <span className="px-3 text-sm font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-neutral-900">
                          {item.product.price * item.quantity} جنيه
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 text-neutral-300 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-100 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-neutral-600">الإجمالي</span>
                  <span className="text-xl font-bold text-neutral-900">
                    {subtotal} <span className="text-sm font-normal">جنيه</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  الشحن يحسب عند الدفع. شحن مجاني للطلبات فوق 1499 جنيه.
                </p>
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="btn-primary w-full"
                >
                  إتمام الطلب
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {checkoutOpen && (
        <CheckoutModal
          onClose={() => setCheckoutOpen(false)}
          onSuccess={() => {
            closeCart();
          }}
        />
      )}
    </>
  );
}
