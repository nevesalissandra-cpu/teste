import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, Copy, Check, Clock, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    couponCode?: string;
    cep?: string;
  } | null;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  orderDetails
}) => {
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen || !orderDetails) return null;

  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  // Generate WhatsApp message with order details
  const getWhatsAppMessage = () => {
    let msg = `*NOVO PEDIDO NO COOKIE ATELIER (#${orderNumber})*\n\n`;
    msg += `*Cliente:* ${customerName || 'Cliente'}\n`;
    if (customerPhone) msg += `*Telefone:* ${customerPhone}\n`;
    if (deliveryAddress) msg += `*Endereço de Entrega:* ${deliveryAddress}\n\n`;
    
    msg += `*ITENS DO PEDIDO:*\n`;
    orderDetails.items.forEach(item => {
      msg += `• ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})\n`;
      if (item.isCustomBox && item.boxItems) {
        item.boxItems.forEach(bi => {
          msg += `    - ${bi.count}x ${bi.name}\n`;
        });
      }
    });

    msg += `\n*Subtotal:* R$ ${orderDetails.subtotal.toFixed(2).replace('.', ',')}\n`;
    if (orderDetails.discount > 0) {
      msg += `*Desconto:* - R$ ${orderDetails.discount.toFixed(2).replace('.', ',')}\n`;
    }
    msg += `*Taxa de Entrega:* ${orderDetails.shipping === 0 ? 'Grátis' : `R$ ${orderDetails.shipping.toFixed(2).replace('.', ',')}`}\n`;
    msg += `*TOTAL:* R$ ${orderDetails.total.toFixed(2).replace('.', ',')}\n`;
    msg += `*Forma de Pagamento:* ${paymentMethod === 'pix' ? 'Pix Imediato' : 'Cartão na Entrega'}\n\n`;
    msg += `Gostaria de confirmar a fornada para hoje!`;

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/5511999998888?text=${getWhatsAppMessage()}`;

  const handleCopySummary = () => {
    const text = decodeURIComponent(getWhatsAppMessage());
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E3D8C8] overflow-hidden z-10 p-6 sm:p-8 my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE5D7] hover:bg-[#E2D5C3] text-[#2D1B13] flex items-center justify-center transition-colors"
          aria-label="Fechar confirmação"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderSent ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF3EC] text-[#B3581E] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2D1B13]">
                  Quase Lá! Seus Dados de Entrega
                </h3>
                <p className="text-xs text-[#7A6354]">
                  Pedido #{orderNumber} • Fornada quentinha
                </p>
              </div>
            </div>

            {/* Quick Form */}
            <div className="space-y-3.5 my-5">
              <div>
                <label className="block text-xs font-bold text-[#4A382D] mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Amanda Silva"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8CEBE] focus:border-[#B3581E] focus:outline-none text-sm text-[#2D1B13]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A382D] mb-1">
                  WhatsApp para Contato *
                </label>
                <input
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8CEBE] focus:border-[#B3581E] focus:outline-none text-sm text-[#2D1B13]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A382D] mb-1">
                  Endereço Completo de Entrega *
                </label>
                <input
                  type="text"
                  placeholder="Rua, número, complemento e bairro"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8CEBE] focus:border-[#B3581E] focus:outline-none text-sm text-[#2D1B13]"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-[#4A382D] mb-1">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'pix'
                        ? 'bg-[#2D1B13] text-white border-[#2D1B13]'
                        : 'bg-white text-[#4A382D] border-[#D8CEBE] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>⚡ Pix Imediato</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'cartao'
                        ? 'bg-[#2D1B13] text-white border-[#2D1B13]'
                        : 'bg-white text-[#4A382D] border-[#D8CEBE] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>💳 Cartão na Entrega</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Total Box */}
            <div className="bg-[#F3ECE0] rounded-2xl p-4 border border-[#E3D6C5] flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-[#7A6354]">Total a pagar</span>
                <div className="font-display text-xl font-bold text-[#2D1B13]">
                  R$ {orderDetails.total.toFixed(2).replace('.', ',')}
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Previsão: 45 min
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOrderSent(true)}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmar Pedido via WhatsApp</span>
              </a>

              <button
                onClick={handleCopySummary}
                className="w-full py-3 rounded-xl bg-white border border-[#D8CEBE] hover:bg-[#FAF8F5] text-[#554032] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Resumo Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar Resumo do Pedido
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2D1B13] mb-1">
              Pedido Enviado com Sucesso!
            </h3>
            <p className="text-xs sm:text-sm text-[#735D4E] max-w-sm mx-auto mb-6">
              Nosso confeiteiro já recebeu os detalhes do seu pedido <strong>#{orderNumber}</strong>. Em breve seus cookies estarão saindo do forno!
            </p>

            <div className="bg-white rounded-2xl p-4 border border-[#E3D6C5] text-left text-xs space-y-2 mb-6">
              <div className="flex items-center gap-2 text-[#4A382D]">
                <Clock className="w-4 h-4 text-[#B3581E]" />
                <span>Tempo estimado: <strong>45 minutos</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#4A382D]">
                <MapPin className="w-4 h-4 text-[#B3581E]" />
                <span>Entrega em: {deliveryAddress || 'Endereço informado'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#2D1B13] text-white font-bold text-sm hover:bg-[#432A1F] transition-all cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
