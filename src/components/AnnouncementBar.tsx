import { Truck, Tag, RotateCcw } from 'lucide-react';

const announcements = [
  { icon: Truck, text: 'شحن مجاني للطلبات فوق 1499 جنيه' },
  { icon: Tag, text: 'اشترى 3 قطع من الداخلي الرجالي و احصل على قطعه مجانا' },
  { icon: RotateCcw, text: 'استبدال سهل خلال 14 يوم' },
];

export default function AnnouncementBar() {
  const items = [...announcements, ...announcements, ...announcements, ...announcements];
  return (
    <div className="bg-neutral-900 text-white overflow-hidden py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-2 px-8 text-xs md:text-sm">
              <Icon className="w-4 h-4 text-amber-300" strokeWidth={1.5} />
              <span className="font-medium tracking-wide">{item.text}</span>
              <span className="text-amber-300/40 mx-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
