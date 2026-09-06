import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'شحن سريع',
    description: 'توصيل لكل محافظات مصر خلال 2-4 أيام',
  },
  {
    icon: RotateCcw,
    title: 'استبدال سهل',
    description: 'استبدال مجاني خلال 14 يوم من الاستلام',
  },
  {
    icon: ShieldCheck,
    title: 'دفع آمن',
    description: 'الدفع عند الاستلام في كل أنحاء مصر',
  },
  {
    icon: Headphones,
    title: 'دعم متواصل',
    description: 'فريق خدمة العملاء متاح 24/7 لمساعدتك',
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center md:flex-row md:text-right md:items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
