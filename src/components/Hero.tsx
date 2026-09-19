import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Flame } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onBuildBox: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onBuildBox }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5]">
      {/* Decorative ambient background rings */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-[#EEDFD0]/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#E68A42]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tag / Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE4D6] border border-[#DFCBB5] text-[#783D15] text-xs font-semibold tracking-wide mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C44D25]" />
              <span>Cookies Artesanais de Nova York com alma brasileira</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24150E] leading-[1.12] tracking-tight mb-6">
              Bordas crocantes, centro <span className="text-[#A54714] italic">aveludado</span> e chocolate que transborda.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#554032] leading-relaxed max-w-2xl mb-8">
              Cada cookie pesa mais de <strong>125 gramas</strong> e passa por <strong>48 horas de maturação lenta</strong> com manteiga tostada <em>noisette</em>, pedaços rústicos de chocolate belga Callebaut e finalização com flor de sal. Assados em lotes pequenos durante todo o dia.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-explore-btn"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#2D1B13] hover:bg-[#43291D] text-[#FAF8F5] text-base font-semibold shadow-lg shadow-[#2D1B13]/15 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Ver Todos os Sabores</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-box-btn"
                onClick={onBuildBox}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#FAF8F5] border-2 border-[#D8CEBE] hover:border-[#B3581E] text-[#2D1B13] text-base font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm"
              >
                <span>Montar Caixa de Cookies</span>
                <span className="bg-[#B3581E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Até 15% OFF
                </span>
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E3D8CA] w-full max-w-xl">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#2D1B13]">125g+</span>
                <span className="text-xs text-[#735D4E] font-medium mt-0.5">Massa generosa & densa</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#A54714]">48 Horas</span>
                <span className="text-xs text-[#735D4E] font-medium mt-0.5">Maturação aromática</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#2D1B13]">100% Belga</span>
                <span className="text-xs text-[#735D4E] font-medium mt-0.5">Pedaços Callebaut puros</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Primary Cookie Hero Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-3 bg-gradient-to-b from-[#FFFDF9] to-[#F1E8DC] border border-[#E3D6C5] shadow-2xl shadow-[#382319]/10">
              
              {/* Fresh Oven Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-20 bg-[#2D1B13] text-[#FAF8F5] px-3.5 py-2 rounded-2xl shadow-lg border border-[#614537] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E89E62]">Ao Vivo</span>
                  <span className="text-xs font-semibold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#E68A42]" /> Fornada Fresca Saindo
                  </span>
                </div>
              </div>

              {/* Main Cookie Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2D1B13]">
                <img
                  src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85"
                  alt="Cookie artesanal com generosos pedaços de chocolate derretido e flor de sal"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider mb-1">
                    Assinatura do Atelier
                  </span>
                  <p className="text-sm font-semibold font-serif leading-snug">
                    Clássico Choco-Chunk com Flor de Sal de Guérande
                  </p>
                </div>
              </div>

              {/* Floating review/texture snippet */}
              <div className="mt-3 p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E9DFD0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF3EC] text-[#B3581E] flex items-center justify-center font-bold text-sm">
                    5.0
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#2D1B13]">Avaliação média dos clientes</span>
                    <span className="text-[11px] text-[#735D4E]">+1.200 cookies entregues neste mês</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#8C4A19] bg-[#F7EFE4] px-2.5 py-1 rounded-lg">
                  100% Artesanal
                </span>
              </div>
            </div>

            {/* Bottom mini pill indicator */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#6F5B4D] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Sem conservantes
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C44D25]" /> Ingredientes de verdade
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
