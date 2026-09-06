import { ArrowLeft } from 'lucide-react';
import type { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
  onNavigate: (slug: string) => void;
}

export default function CategorySection({ categories, onNavigate }: CategorySectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">تسوق حسب الفئة</h2>
          <p className="section-subtitle">اختر ما يناسبك من مجموعاتنا المتنوعة</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigate(category.slug)}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100"
            >
              {category.image_url && (
                <img
                  src={category.image_url}
                  alt={category.name_ar}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-center">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{category.name_ar}</h3>
                <div className="inline-flex items-center gap-1 text-white/80 text-xs md:text-sm font-medium group-hover:gap-2 transition-all">
                  تسوق الآن
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
