import React, { useState } from 'react';
import { X, Flame, ShieldAlert, Sparkles, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { CookieItem } from '../types';

interface CookieDetailModalProps {
  cookie: CookieItem | null;
  onClose: () => void;
  onAddToCart: (cookie: CookieItem, quantity: number) => void;
}

export const CookieDetailModal: React.FC<CookieDetailModalProps> = ({
  cookie,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!cookie) return null;

  const handleAdd = () => {
    onAddToCart(cookie, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E3D8C8] overflow-hidden z-10 transition-all my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2D1B13] flex items-center justify-center shadow-md transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Side */}
          <div className="md:col-span-5 relative h-64 md:h-auto bg-[#2D1B13]">
            <img
              src={cookie.image}
              alt={cookie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            
            {cookie.badge && (
              <span className="absolute top-4 left-4 bg-[#B3581E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {cookie.badge}
              </span>
            )}

            <div className="absolute bottom-4 left-4 text-white md:hidden">
              <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold">{cookie.weight}</span>
              <h3 className="text-xl font-serif font-bold">{cookie.name}</h3>
            </div>
          </div>

          {/* Details Content */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Header */}
              <div className="hidden md:flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-[#8A5A36] font-bold">
                  {cookie.weight} • Artesanal
                </span>
                {cookie.cocoaPercentage && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EFE5D7] text-[#4A382D]">
                    {cookie.cocoaPercentage}% Cacau
                  </span>
                )}
              </div>

              <h2 className="hidden md:block font-serif text-2xl sm:text-3xl font-bold text-[#2D1B13] mb-2 leading-tight">
                {cookie.name}
              </h2>

              <p className="text-sm text-[#735D4E] italic mb-4">
                "{cookie.tagline}"
              </p>

              <p className="text-sm text-[#4A382D] leading-relaxed mb-6">
                {cookie.description}
              </p>

              {/* Sensory Profile Bars */}
              <div className="bg-[#F3ECE0] rounded-2xl p-4 mb-6 border border-[#E4D8C8]">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#644937] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B3581E]" />
                  Perfil de Sabor & Textura
                </h4>
                
                <div className="space-y-2.5 text-xs font-medium text-[#4A382D]">
                  <div className="flex items-center justify-between">
                    <span>Maciadez do Centro</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`w-4 h-2 rounded-sm ${
                            lvl <= cookie.chewinessLevel ? 'bg-[#B3581E]' : 'bg-[#DCD0C0]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Equilíbrio de Doçura</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`w-4 h-2 rounded-sm ${
                            lvl <= cookie.sweetnessLevel ? 'bg-[#C97940]' : 'bg-[#DCD0C0]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Intensidade do Cacau</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`w-4 h-2 rounded-sm ${
                            lvl <= cookie.richnessLevel ? 'bg-[#4A2613]' : 'bg-[#DCD0C0]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reheating tip */}
              <div className="flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl mb-4 text-xs text-amber-900 leading-relaxed">
                <Flame className="w-4 h-4 text-[#C44D25] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Dica de mestre: </span>
                  {cookie.reheatingTip}
                </div>
              </div>

              {/* Allergens warning */}
              <div className="flex items-center gap-2 text-xs text-[#7A6354] mb-6">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Alérgicos: Contém {cookie.allergens.join(', ')}.</span>
              </div>
            </div>

            {/* Bottom Buy Section */}
            <div className="pt-4 border-t border-[#E8DDCF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7A6354]">Valor unitário</span>
                <div className="font-display text-2xl font-bold text-[#2D1B13]">
                  R$ {(cookie.price * quantity).toFixed(2).replace('.', ',')}
                </div>
              </div>

              {/* Quantity selector & Add Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center bg-[#EFE5D7] rounded-xl p-1 border border-[#DECFC0]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2D1B13] hover:bg-white disabled:opacity-40 transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#2D1B13]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2D1B13] hover:bg-white transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2D1B13] hover:bg-[#43291D] text-[#FAF8F5]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> Adicionado!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Adicionar ao Carrinho
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
