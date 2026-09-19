import React, { useState, useMemo } from 'react';
import { Star, Plus, Search, Eye } from 'lucide-react';
import { CookieItem } from '../types';

interface MenuSectionProps {
  cookies: CookieItem[];
  onSelectCookie: (cookie: CookieItem) => void;
  onQuickAdd: (cookie: CookieItem) => void;
}

type FilterCategory = 'todos' | 'classicos' | 'recheados' | 'chocolatudos' | 'especiais' | 'veganos';

export const MenuSection: React.FC<MenuSectionProps> = ({
  cookies,
  onSelectCookie,
  onQuickAdd
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredCookies = useMemo(() => {
    return cookies.filter((item) => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [cookies, activeCategory, searchQuery]);

  const handleQuickAddWithFeedback = (cookie: CookieItem) => {
    onQuickAdd(cookie);
    setAddedIds(prev => ({ ...prev, [cookie.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [cookie.id]: false }));
    }, 900);
  };

  const categories: { key: FilterCategory; label: string; count: number }[] = [
    { key: 'todos', label: 'Todos os Sabores', count: cookies.length },
    { key: 'classicos', label: 'Clássicos NY', count: cookies.filter(c => c.category === 'classicos').length },
    { key: 'recheados', label: 'Vulcão & Recheados', count: cookies.filter(c => c.category === 'recheados').length },
    { key: 'chocolatudos', label: 'Chocolatudos 70%', count: cookies.filter(c => c.category === 'chocolatudos').length },
    { key: 'especiais', label: 'Especiais & Nuts', count: cookies.filter(c => c.category === 'especiais').length },
    { key: 'veganos', label: 'Veganos', count: cookies.filter(c => c.category === 'veganos').length }
  ];

  return (
    <section id="sabores" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B3581E] font-bold">
              Cardápio Autoral
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24150E] mt-1">
              Fornadas do Dia
            </h2>
            <p className="text-sm sm:text-base text-[#6E594A] mt-2 max-w-xl">
              Produzidos artesanalmente sem essências artificiais. Cada unidade com mais de 125g de recheio e pura cremosidade.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7665] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por pistache, avelã..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#DDD3C5] focus:border-[#B3581E] focus:outline-none text-sm text-[#2D1B13] placeholder-[#9E8B7C] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7665] hover:text-[#2D1B13]"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#2D1B13] text-[#FAF8F5] shadow-sm'
                  : 'bg-white hover:bg-[#F2ECE0] text-[#554032] border border-[#DDD2C2]'
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-[#EAE1D3] text-[#634E40]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Cookies Grid */}
        {filteredCookies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE3D7] p-8">
            <span className="text-4xl">🍪</span>
            <h3 className="font-serif text-xl font-bold text-[#2D1B13] mt-3">
              Nenhum sabor encontrado
            </h3>
            <p className="text-sm text-[#735D4E] mt-1">
              Tente buscar por outro termo ou escolha outra categoria acima.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#EFE4D6] text-[#783D15] text-xs font-semibold hover:bg-[#E5D7C5]"
            >
              Ver todos os sabores
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredCookies.map((cookie) => (
              <article
                key={cookie.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E9DFCFA0] hover:border-[#D6C5B0] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#2D1B13] cursor-pointer" onClick={() => onSelectCookie(cookie)}>
                    <img
                      src={cookie.image}
                      alt={cookie.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Badge */}
                    {cookie.badge && (
                      <span className="absolute top-3 left-3 bg-[#2D1B13]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {cookie.badge}
                      </span>
                    )}

                    {/* Weight tag */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#4A382D] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {cookie.weight}
                    </span>

                    {/* Hover quick view overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#2D1B13] text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-[#735D4E] mb-2">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-bold text-[#2D1B13]">{cookie.rating.toFixed(1)}</span>
                      <span>({cookie.reviewCount})</span>
                    </div>

                    <h3 
                      onClick={() => onSelectCookie(cookie)}
                      className="font-serif text-lg font-bold text-[#24150E] group-hover:text-[#B3581E] transition-colors cursor-pointer line-clamp-1"
                    >
                      {cookie.name}
                    </h3>

                    <p className="text-xs text-[#6F5B4D] mt-1.5 line-clamp-2 leading-relaxed">
                      {cookie.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="p-4 sm:p-5 pt-0 border-t border-[#F4EFE6] mt-2 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#917B6D] font-semibold">Valor</span>
                    <span className="font-display text-lg font-bold text-[#2D1B13]">
                      R$ {cookie.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectCookie(cookie)}
                      className="p-2 rounded-xl text-[#735D4E] hover:text-[#2D1B13] hover:bg-[#F4EFE6] transition-colors"
                      title="Ver perfil completo"
                      aria-label={`Ver detalhes de ${cookie.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleQuickAddWithFeedback(cookie)}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm ${
                        addedIds[cookie.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#2D1B13] hover:bg-[#43291D] text-white'
                      }`}
                    >
                      {addedIds[cookie.id] ? (
                        <span>✓ Adicionado</span>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pedir</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
