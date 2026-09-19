import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (orderDetails: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    couponCode?: string;
    cep?: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.percent) / 100 : 0;
  
  // Free shipping above R$ 90,00 or R$ 9.90 if CEP entered
  const shipping = shippingCalculated ? (subtotal - discount >= 90 ? 0 : 9.9) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'FORNADA10' || clean === 'PRIMEIRACOMPRA') {
      setAppliedCoupon({ code: clean, percent: 10 });
      setCouponError('');
    } else if (clean === 'COOKIEVIP') {
      setAppliedCoupon({ code: clean, percent: 15 });
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Tente FORNADA10');
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setShippingCalculated(true);
    }
  };

  const handleProceedCheckout = () => {
    onCheckout({
      items: cartItems,
      subtotal,
      discount,
      shipping,
      total,
      couponCode: appliedCoupon?.code,
      cep: shippingCalculated ? cep : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5DACB] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Top Cart Header */}
          <div className="p-6 border-b border-[#EADECE] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF3EC] text-[#B3581E] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D1B13]">
                  Sua Sacola
                </h3>
                <span className="text-xs text-[#7A6354]">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {cartItems.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#7A6354] hover:text-[#2D1B13] hover:bg-[#F2ECE0] transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-5xl mb-3">🍪</div>
                <h4 className="font-serif text-lg font-bold text-[#2D1B13]">
                  Sua sacola está vazia
                </h4>
                <p className="text-xs text-[#735D4E] mt-1 max-w-xs mx-auto">
                  Que tal experimentar nosso Clássico Choco-Chunk ou montar uma caixa personalizada?
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#2D1B13] text-white text-xs font-semibold hover:bg-[#432A1F] transition-all"
                >
                  Explorar Sabores
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress bar */}
                <div className="bg-[#EFE5D7] rounded-xl p-3 text-xs text-[#4A382D] mb-4">
                  {subtotal >= 90 ? (
                    <div className="flex items-center gap-2 font-bold text-[#2D1B13]">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Parabéns! Você ganhou Frete Grátis para entrega hoje!</span>
                    </div>
                  ) : (
                    <div>
                      <span>Faltam <strong>R$ {(90 - subtotal).toFixed(2).replace('.', ',')}</strong> para ganhar <strong>Frete Grátis</strong>!</span>
                      <div className="w-full h-2 rounded-full bg-white/60 overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-[#B3581E] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 90) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-[#EBE1D3] shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#F0E6D8]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#2D1B13] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#997F6F] hover:text-red-600 p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Custom box breakdown if box */}
                      {item.isCustomBox && item.boxItems && (
                        <div className="text-[11px] text-[#786151] mt-0.5 space-y-0.5">
                          {item.boxItems.map((bi, idx) => (
                            <span key={idx} className="block truncate">
                              • {bi.count}x {bi.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-display font-bold text-sm text-[#2D1B13]">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>

                        {/* Quantity adjust */}
                        <div className="flex items-center bg-[#F4EFE6] rounded-lg border border-[#DECFC0]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2D1B13] hover:bg-white rounded-l-lg transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#2D1B13]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2D1B13] hover:bg-white rounded-r-lg transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8F7969] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cupom de desconto"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D8CEBE] focus:border-[#B3581E] focus:outline-none uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#EFE5D7] hover:bg-[#E2D5C3] text-[#7A401A] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                  {appliedCoupon && (
                    <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Cupom {appliedCoupon.code} aplicado ({appliedCoupon.percent}% OFF)
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-emerald-900 font-bold ml-2 text-[11px]"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-600 mt-1 block">
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Shipping Estimator */}
                <div className="pt-1">
                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <div className="relative flex-1">
                      <Truck className="w-3.5 h-3.5 text-[#8F7969] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Informe seu CEP (ex: 01310-100)"
                        value={cep}
                        maxLength={9}
                        onChange={(e) => setCep(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D8CEBE] focus:border-[#B3581E] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-white border border-[#D8CEBE] hover:bg-[#FAF8F5] text-[#554032] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>
                  {shippingCalculated && (
                    <div className="mt-1.5 text-xs text-[#523F32] bg-[#F2ECE0] p-2 rounded-lg flex items-center justify-between">
                      <span>Entrega expressa (45-60 min)</span>
                      <span className="font-bold">
                        {subtotal >= 90 ? 'GRÁTIS' : 'R$ 9,90'}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EADECE] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6F5B4D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto ({appliedCoupon.percent}%)</span>
                    <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                {shippingCalculated && (
                  <div className="flex justify-between">
                    <span>Taxa de Entrega</span>
                    <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2D1B13] pt-2 border-t border-[#F2ECE1]">
                  <span>Total</span>
                  <span className="font-display text-lg text-[#2D1B13]">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 rounded-xl bg-[#2D1B13] hover:bg-[#432A1F] text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#8C7667]">
                🔒 Pagamento 100% seguro via Pix ou Cartão na entrega
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
