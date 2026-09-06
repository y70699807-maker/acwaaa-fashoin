import { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import type { OrderData } from '@/types';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ onClose, onSuccess }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    shipping_address: '',
    city: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData: OrderData = {
        ...form,
        customer_email: form.customer_email || null,
        items: items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name_ar,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total: subtotal,
      };

      const { error: insertError } = await supabase.from('orders').insert({
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_email: orderData.customer_email,
        shipping_address: orderData.shipping_address,
        city: orderData.city,
        items: orderData.items,
        total: orderData.total,
        status: 'pending',
      });

      if (insertError) throw insertError;

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const shipping = subtotal >= 1499 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl animate-slide-up">
        {success ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">تم استلام طلبك!</h2>
            <p className="text-neutral-500">سنتواصل معك قريباً لتأكيد الطلب والتوصيل.</p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 bg-white flex items-center justify-between p-5 border-b border-neutral-100 z-10">
              <h2 className="text-xl font-bold text-neutral-900">إتمام الطلب</h2>
              <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 text-sm outline-none focus:border-neutral-900 transition-colors"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">رقم الهاتف *</label>
                  <input
                    type="tel"
                    required
                    value={form.customer_phone}
                    onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 text-sm outline-none focus:border-neutral-900 transition-colors"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={form.customer_email}
                    onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 text-sm outline-none focus:border-neutral-900 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">المدينة *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 text-sm outline-none focus:border-neutral-900 transition-colors"
                    placeholder="القاهرة، الإسكندرية..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">العنوان بالتفصيل *</label>
                <textarea
                  required
                  rows={2}
                  value={form.shipping_address}
                  onChange={(e) => setForm({ ...form, shipping_address: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-200 text-sm outline-none focus:border-neutral-900 transition-colors resize-none"
                  placeholder="الشارع، المبنى، الشقة..."
                />
              </div>

              {/* Order summary */}
              <div className="bg-neutral-50 p-4 space-y-2">
                <h3 className="text-sm font-bold text-neutral-900 mb-3">ملخص الطلب</h3>
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-neutral-600">
                    <span className="line-clamp-1 max-w-[60%]">
                      {item.product.name_ar} ({item.size} / {item.color}) × {item.quantity}
                    </span>
                    <span className="font-medium">{item.product.price * item.quantity} جنيه</span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-2 space-y-1.5">
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} جنيه</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>الشحن</span>
                    <span>{shipping === 0 ? 'مجاني' : `${shipping} جنيه`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 pt-1">
                    <span>الإجمالي</span>
                    <span>{total} جنيه</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  `تأكيد الطلب (${total} جنيه)`
                )}
              </button>
              <p className="text-xs text-neutral-400 text-center">
                الدفع عند الاستلام متاح. سنتواصل معك لتأكيد الطلب.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
