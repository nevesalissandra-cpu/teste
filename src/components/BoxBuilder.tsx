import React, { useState } from 'react';
import { Package, Plus, Trash2, Check, Sparkles, Gift } from 'lucide-react';
import { CookieItem, BoxSize } from '../types';

interface BoxBuilderProps {
  cookies: CookieItem[];
  onAddBoxToCart: (box: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    isCustomBox: boolean;
    boxSize: BoxSize;
    boxItems: { name: string; count: number }[];
  }) => void;
}

export const BoxBuilder: React.FC<BoxBuilderProps> = ({ cookies, onAddBoxToCart }) => {
  const [selectedSize, setSelectedSize] = useState<BoxSize>(6);
  // Array of cookie IDs representing each slot
  const [slots, setSlots] = useState<string[]>([]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Box pricing logic
  const boxPricing: Record<BoxSize, { basePrice: number; discountPercent: number; name: string }> = {
    4: { basePrice: 68.0, discountPercent: 5, name: 'Caixa Degustação (4 unid.)' },
    6: { basePrice: 102.0, discountPercent: 12, name: 'Caixa Clássica (6 unid.)' },
    12: { basePrice: 204.0, discountPercent: 18, name: 'Caixa Família & Presente (12 unid.)' },
  };

  const currentConfig = boxPricing[selectedSize];
  const finalPrice = currentConfig.basePrice * (1 - currentConfig.discountPercent / 100);

  const handleSizeChange = (newSize: BoxSize) => {
    setSelectedSize(newSize);
    setSlots(prev => prev.slice(0, newSize));
  };

  const handleAddCookieToBox = (cookieId: string) => {
    if (slots.length < selectedSize) {
      setSlots(prev => [...prev, cookieId]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    setSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearBox = () => {
    setSlots([]);
  };

  const handleCompleteBox = () => {
    if (slots.length === 0) return;

    // Group items for cart label
    const counts: Record<string, number> = {};
    slots.forEach(id => {
      const cookie = cookies.find(c => c.id === id);
      const name = cookie ? cookie.name : 'Cookie Artesanal';
      counts[name] = (counts[name] || 0) + 1;
    });

    const boxItems = Object.entries(counts).map(([name, count]) => ({ name, count }));

    onAddBoxToCart({
      id: `custom-box-${Date.now()}`,
      name: `${currentConfig.name} Customizada`,
      price: finalPrice,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
      quantity: 1,
      isCustomBox: true,
      boxSize: selectedSize,
      boxItems,
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSlots([]);
    }, 1200);
  };

  const isBoxFull = slots.length === selectedSize;

  return (
    <section id="monte-sua-caixa" className="py-16 sm:py-24 bg-[#F5EFE6]/70 border-y border-[#E8DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDBC9] text-[#7A401A] text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#B3581E]" />
            Personalize seu Mix
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24150E]">
            Monte Sua Caixa de Cookies
          </h2>
          <p className="text-sm sm:text-base text-[#6F5B4D] mt-2">
            Escolha os seus sabores preferidos um a um. Caixas fechadas recebem até <strong>18% de desconto</strong> e vêm em embalagem especial de presente com fita artesanal.
          </p>
        </div>

        {/* Box Size Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#DDD0BF] shadow-sm">
            {([4, 6, 12] as BoxSize[]).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedSize === size
                    ? 'bg-[#2D1B13] text-white shadow-sm'
                    : 'text-[#5E4A3D] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>Caixa de {size}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                  selectedSize === size ? 'bg-[#B3581E] text-white' : 'bg-[#EFE5D7] text-[#7A401A]'
                }`}>
                  -{boxPricing[size].discountPercent}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Box Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Box Slots (The Box Container) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5D9C8] shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0E6D8]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D1B13]">
                  Sua Caixa ({slots.length}/{selectedSize})
                </h3>
                <p className="text-xs text-[#735D4E]">
                  {isBoxFull
                    ? '🎉 Caixa completa! Pronta para ir para o carrinho.'
                    : `Selecione mais ${selectedSize - slots.length} cookies para completar a caixa.`}
                </p>
              </div>

              {slots.length > 0 && (
                <button
                  onClick={handleClearBox}
                  className="text-xs text-[#9B5324] hover:text-[#7A401A] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Limpar caixa
                </button>
              )}
            </div>

            {/* Grid of Slots */}
            <div className={`grid gap-3.5 sm:gap-4 ${
              selectedSize === 4 ? 'grid-cols-2 sm:grid-cols-2' :
              selectedSize === 6 ? 'grid-cols-2 sm:grid-cols-3' :
              'grid-cols-3 sm:grid-cols-4'
            }`}>
              {Array.from({ length: selectedSize }).map((_, index) => {
                const cookieId = slots[index];
                const cookie = cookieId ? cookies.find(c => c.id === cookieId) : null;

                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all min-h-[130px] sm:min-h-[145px] ${
                      cookie
                        ? 'bg-[#FAF6F0] border-2 border-[#D4C3AD]'
                        : 'bg-[#FAF8F5] border-2 border-dashed border-[#DED4C5] text-[#9A8677]'
                    }`}
                  >
                    {cookie ? (
                      <>
                        {/* Remove Slot button */}
                        <button
                          onClick={() => handleRemoveSlot(index)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 text-[#8C4A19] hover:bg-red-50 hover:text-red-600 flex items-center justify-center shadow-xs transition-colors"
                          title="Remover este cookie"
                          aria-label="Remover item da caixa"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <img
                          src={cookie.image}
                          alt={cookie.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm mb-2 border border-white"
                        />
                        <span className="text-xs font-bold text-[#2D1B13] line-clamp-1">
                          {cookie.name}
                        </span>
                        <span className="text-[10px] text-[#7A6354]">
                          {cookie.weight}
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-2">
                        <div className="w-9 h-9 rounded-full bg-[#EDE3D4] flex items-center justify-center text-[#8C7564] mb-2 font-serif text-sm">
                          {index + 1}
                        </div>
                        <span className="text-xs font-medium">Slot Vazio</span>
                        <span className="text-[10px] text-[#A69383]">Clique num sabor</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Box Progress Bar */}
            <div className="mt-6 pt-4 border-t border-[#F0E6D8]">
              <div className="flex items-center justify-between text-xs font-bold text-[#4A382D] mb-1.5">
                <span>Progresso da Caixa</span>
                <span>{Math.round((slots.length / selectedSize) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#EADECF] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C46A2A] to-[#8C4315] transition-all duration-300 rounded-full"
                  style={{ width: `${(slots.length / selectedSize) * 100}%` }}
                />
              </div>
            </div>

          </div>

          {/* Right Column: Flavor Picker & Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Flavor Picker */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5D9C8] shadow-md">
              <h3 className="font-serif text-lg font-bold text-[#2D1B13] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B3581E]" />
                Escolha os Sabores Para Adicionar
              </h3>
              <p className="text-xs text-[#735D4E] mb-4">
                Toque no botão "+" do cookie para preencher o próximo slot da sua caixa:
              </p>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {cookies.map((cookie) => {
                  const currentInBox = slots.filter(id => id === cookie.id).length;
                  return (
                    <div
                      key={cookie.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EDE2] border border-[#ECE2D5] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cookie.image}
                          alt={cookie.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#2D1B13] flex items-center gap-1.5">
                            <span>{cookie.name}</span>
                            {currentInBox > 0 && (
                              <span className="bg-[#E4D5C2] text-[#634734] px-1.5 py-0.2 rounded text-[10px]">
                                {currentInBox}x na caixa
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7A6354]">
                            {cookie.category} • {cookie.weight}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddCookieToBox(cookie.id)}
                        disabled={isBoxFull}
                        className="p-1.5 rounded-lg bg-[#2D1B13] hover:bg-[#43291D] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                        title={isBoxFull ? 'Caixa já está cheia' : 'Adicionar este sabor à caixa'}
                        aria-label={`Adicionar ${cookie.name} na caixa`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box Price & Action Card */}
            <div className="bg-[#2D1B13] text-[#FAF8F5] rounded-3xl p-6 shadow-xl border border-[#483023]">
              <div className="flex items-center justify-between pb-4 border-b border-[#4D3528] mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D9A37A] font-semibold">
                    Preço Especial do Combo
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-3xl font-extrabold text-white">
                      R$ {finalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-[#B39B8B] line-through">
                      R$ {currentConfig.basePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#A84C17] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Economize R$ {(currentConfig.basePrice - finalPrice).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#D8C7B8] mb-6">
                <p className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#E68A42]" />
                  Embalagem rústica especial para presente inclusa
                </p>
                <p className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Cartão com instruções de aquecimento e laço decorativo
                </p>
              </div>

              <button
                id="add-box-to-cart-btn"
                onClick={handleCompleteBox}
                disabled={slots.length === 0 || addedAnimation}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : slots.length === 0
                    ? 'bg-[#48352A] text-[#8C7667] cursor-not-allowed'
                    : 'bg-[#B3581E] hover:bg-[#C9682A] text-white active:scale-98'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" /> Caixa Adicionada ao Carrinho!
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    {slots.length === 0
                      ? 'Adicione cookies para montar a caixa'
                      : `Adicionar Caixa com ${slots.length} ${slots.length === 1 ? 'Cookie' : 'Cookies'}`}
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
