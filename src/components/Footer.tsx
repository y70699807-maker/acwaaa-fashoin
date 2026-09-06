import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (category: string | null) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">اشترك في نشرتنا</h2>
              <p className="text-white/60 text-sm md:text-base">
                كن أول من يعرف عن المنتجات الجديدة والعروض الحصرية
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
              />
              <button className="bg-white text-neutral-900 px-6 py-3 text-sm font-bold hover:bg-amber-300 transition-colors">
                اشترك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold">ACWA FASHION</span>
              <span className="text-[10px] tracking-[0.3em] text-white/40 font-medium mt-1">STORE</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              متجرك الأول للأزياء في مصر. ملابس رجالية ونسائية وأطفال بجودة عالية وأسعار مناسبة.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold mb-4">تسوق</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'رجالي', cat: 'men' },
                { label: 'نسائي', cat: 'women' },
                { label: 'أطفال', cat: 'kids' },
                { label: 'ملابس منزلية', cat: 'sleepwear' },
              ].map((item) => (
                <li key={item.cat}>
                  <button
                    onClick={() => onNavigate(item.cat)}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-bold mb-4">المساعدة</h3>
            <ul className="space-y-2.5">
              {['سياسة الاستبدال', 'الشحن والتوصيل', 'الأسئلة الشائعة', 'تتبع طلبك', 'اتصل بنا'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span>19xxx</span>
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span>info@acwafashion.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span>القاهرة، مصر</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2026 ACWA Fashion. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs">طرق الدفع:</span>
            <div className="flex items-center gap-2">
              {['VISA', 'MC', 'COD'].map((method) => (
                <span
                  key={method}
                  className="text-[10px] font-bold text-white/60 border border-white/20 px-2 py-1 rounded"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
