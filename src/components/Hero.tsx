import { ArrowLeft } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative h-[70vh] md:h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/833169/pexels-photo-833169.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="ACWA Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
            <span className="text-white text-xs md:text-sm font-medium tracking-wide">
              مجموعة صيف 2026
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6">
            صيفك يبدأ
            <br />
            <span className="text-amber-300">من هنا</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            اكتشف أحدث كوليكشن بإطلالات خفيفة، مريحة، وشيك. ملابس رجالية ونسائية وأطفال بجودة عالية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onShopNow}
              className="group inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-amber-300 hover:shadow-2xl active:scale-[0.98]"
            >
              تسوق الآن
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-white/10 backdrop-blur-sm active:scale-[0.98]">
              اكتشف المجموعة
            </button>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-around md:justify-between gap-4">
          {[
            { value: '+500', label: 'منتج متنوع' },
            { value: '+50K', label: 'عميل سعيد' },
            { value: '14 يوم', label: 'استبدال مجاني' },
            { value: '24/7', label: 'دعم متواصل' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-bold text-lg md:text-2xl">{stat.value}</div>
              <div className="text-white/60 text-[10px] md:text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
