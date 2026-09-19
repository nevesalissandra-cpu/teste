import React, { useState } from 'react';
import { Mail, Check, MessageCircle, MapPin, Clock, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#21140E] text-[#E0D3C5] pt-16 pb-12 border-t border-[#3B281E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#3B281E]">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E68A42] to-[#B3581E] flex items-center justify-center text-white shadow-md">
                <span className="text-xl leading-none">🍪</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  Cookie Atelier
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#B39988] font-semibold">
                  Bakehouse & Café
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#B39988] leading-relaxed mb-6 max-w-sm">
              Cookies autorais de 125g assados todos os dias. 100% chocolate belga nobre, manteiga de fazenda noisette e maturação lenta de 48 horas.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5511999998888"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#332017] hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                aria-label="Falar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#332017] hover:bg-[#B3581E] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold">IG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#B39988]">
              <li><a href="#sabores" className="hover:text-white transition-colors">Cardápio do Dia</a></li>
              <li><a href="#monte-sua-caixa" className="hover:text-white transition-colors">Monte Sua Caixa</a></li>
              <li><a href="#processo" className="hover:text-white transition-colors">Nosso Processo</a></li>
              <li><a href="#duvidas" className="hover:text-white transition-colors">Como Reaquecer</a></li>
              <li><a href="#duvidas" className="hover:text-white transition-colors">Eventos & Corporativo</a></li>
            </ul>
          </div>

          {/* Store Info */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#B39988]">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Atelier & Retiradas
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E68A42] shrink-0 mt-0.5" />
              <span>Rua Oscar Freire, 1120 — Jardins, São Paulo - SP</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#E68A42] shrink-0 mt-0.5" />
              <span>Terça a Domingo: 10h às 20h<br /><strong className="text-white">Fornadas às 10h e 16h</strong></span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#E68A42] shrink-0 mt-0.5" />
              <span>(11) 99999-8888</span>
            </div>
          </div>

          {/* Newsletter Club */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-2">
              Clube da Fornada
            </h4>
            <p className="text-xs text-[#B39988] mb-3">
              Receba avisos de quando a fornada quentinha sair e ganhe <strong>10% OFF</strong> na primeira compra.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#8A7568] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#2F1D14] rounded-xl border border-[#483327] text-white placeholder-[#786356] focus:border-[#E68A42] focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#B3581E] hover:bg-[#C96929] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {subscribed ? '✓ Inscrito com Sucesso!' : 'Quero Avisos de Fornada'}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" /> Use o cupom FORNADA10 no carrinho!
              </p>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7568]">
          <p>© {new Date().getFullYear()} Cookie Atelier Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-[#C44D25] fill-current" /> manteiga noisette & chocolate belga.
          </div>
        </div>

      </div>
    </footer>
  );
};
