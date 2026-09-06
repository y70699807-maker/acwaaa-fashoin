import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (category: string | null) => void;
  activeCategory: string | null;
}

export default function Header({ onSearch, onNavigate, activeCategory }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', category: null },
    { label: 'رجالي', category: 'men' },
    { label: 'نسائي', category: 'women' },
    { label: 'أطفال', category: 'kids' },
    { label: 'ملابس منزلية', category: 'sleepwear' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
            : 'bg-white border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="القائمة"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <button
              onClick={() => onNavigate(null)}
              className="flex items-center gap-2 group"
            >
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                ACWA FASHION
              </span>
              <span className="hidden sm:inline text-[10px] tracking-[0.3em] text-neutral-400 font-medium mt-1">
                STORES
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative group ${
                    activeCategory === item.category
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neutral-900 transition-all duration-300 ${
                      activeCategory === item.category ? 'w-6' : 'w-0 group-hover:w-6'
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-full transition-all"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                className="hidden md:block p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-full transition-all"
                aria-label="المفضلة"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                className="relative p-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-full transition-all"
                aria-label="عربة التسوق"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 bg-neutral-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-neutral-100 bg-white animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن المنتجات..."
                  autoFocus
                  className="flex-1 bg-transparent text-sm md:text-base outline-none placeholder:text-neutral-400 text-neutral-900"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <span className="font-display text-2xl font-bold text-neutral-900">ACWA FASHION</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.category);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-right px-6 py-4 text-base font-medium transition-colors border-b border-neutral-50 ${
                    activeCategory === item.category
                      ? 'text-neutral-900 bg-neutral-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
