import { ArrowLeft } from 'lucide-react';

interface PromoBannerProps {
  onShopNow: () => void;
}

export default function PromoBanner({ onShopNow }: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left banner */}
        <div className="relative h-[300px] md:h-[450px] overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/8028056/pexels-photo-8028056.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Men's Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
            <span className="text-amber-300 text-xs font-bold tracking-[0.2em] mb-2">مجموعة الرجال</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              إطلالات العصر
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-xs">
              اكتشف أحدث صيحات الموضة الرجالية بتصاميم عصرية وأنيقة
            </p>
            <button
              onClick={() => onShopNow()}
              className="group/btn inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 text-sm font-bold transition-all hover:bg-amber-300"
            >
              تسوق الرجال
              <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Right banner */}
        <div className="relative h-[300px] md:h-[450px] overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/30590675/pexels-photo-30590675.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Women's Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-end justify-end p-8 md:p-12 text-right">
            <span className="text-amber-300 text-xs font-bold tracking-[0.2em] mb-2">مجموعة النساء</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              أناقة لا تضاهى
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-xs">
              فساتين وملابس نسائية بتصاميم راقية تليق بذوقك الرفيع
            </p>
            <button
              onClick={() => onShopNow()}
              className="group/btn inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 text-sm font-bold transition-all hover:bg-amber-300"
            >
              تسوق النساء
              <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
