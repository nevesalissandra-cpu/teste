import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Clock, Flame } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuiz
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      {/* Announcement Bar */}
      <div className="bg-[#2D1B13] text-[#F3ECE1] text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 overflow-hidden">
        <Flame className="w-3.5 h-3.5 text-[#E68A42] animate-pulse" />
        <span>Fornadas diárias saindo às <strong>10h</strong> e <strong>16h</strong> • Entrega quentinha para hoje</span>
        <span className="hidden sm:inline-block text-[#9B887B]">|</span>
        <span className="hidden sm:inline-block bg-[#41281D] text-[#FFD7A8] px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
          Cupom: FORNADA10 (10% OFF)
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a 
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E68A42] to-[#B3581E] flex items-center justify-center text-white shadow-md shadow-[#E68A42]/20 group-hover:scale-105 transition-transform">
            <span className="text-xl leading-none select-none">🍪</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D1B13] group-hover:text-[#B3581E] transition-colors">
              Cookie Atelier
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#876F5E] font-semibold -mt-1">
              Bakehouse & Café
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A382D]">
          <button 
            onClick={() => scrollToSection('sabores')} 
            className="hover:text-[#B3581E] transition-colors cursor-pointer py-1"
          >
            Cardápio de Cookies
          </button>
          <button 
            onClick={() => scrollToSection('monte-sua-caixa')} 
            className="hover:text-[#B3581E] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span>Monte Sua Caixa</span>
            <span className="bg-[#EEDFD0] text-[#7A401A] text-[10px] font-bold px-1.5 py-0.5 rounded-md">Combo</span>
          </button>
          <button 
            onClick={() => scrollToSection('processo')} 
            className="hover:text-[#B3581E] transition-colors cursor-pointer py-1"
          >
            Nosso Segredo
          </button>
          <button 
            onClick={onOpenQuiz} 
            className="hover:text-[#B3581E] text-[#B3581E] transition-colors cursor-pointer py-1 flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Descobrir Meu Cookie
          </button>
          <button 
            onClick={() => scrollToSection('duvidas')} 
            className="hover:text-[#B3581E] transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            id="open-cart-btn"
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EFE8DC] hover:bg-[#E5DBCB] text-[#2D1B13] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#B3581E]/40 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C4A19]" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="bg-[#C44D25] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Order CTA */}
          <button
            onClick={() => scrollToSection('sabores')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#2D1B13] hover:bg-[#41281D] text-[#FAF8F5] text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            Pedir Agora
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#4A382D] hover:bg-[#EFE8DC] focus:outline-none"
            aria-label="Abrir menu mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE3D6] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('sabores')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-[#2D1B13] hover:bg-[#EFE8DC]"
          >
            🍪 Cardápio de Cookies
          </button>
          <button
            onClick={() => scrollToSection('monte-sua-caixa')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-[#2D1B13] hover:bg-[#EFE8DC]"
          >
            🎁 Monte Sua Caixa (Desconto)
          </button>
          <button
            onClick={() => scrollToSection('processo')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#4A382D] hover:bg-[#EFE8DC]"
          >
            ✨ Nosso Processo Artesanal
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-[#B3581E] bg-[#F7EFE4] hover:bg-[#EEDFD0]"
          >
            🔍 Quiz: Descubra Seu Cookie Ideal
          </button>
          <button
            onClick={() => scrollToSection('duvidas')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#4A382D] hover:bg-[#EFE8DC]"
          >
            ❓ Dúvidas e Como Reaquecer
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('sabores')}
              className="w-full py-3 rounded-xl bg-[#2D1B13] text-white font-semibold text-center text-sm shadow-sm"
            >
              Ver Sabores Disponíveis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
