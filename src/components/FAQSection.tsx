import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Flame } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  items: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="duvidas" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D6] text-[#783D15] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#B3581E]" />
            Dúvidas Frequentes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24150E]">
            Tudo o que Você Precisa Saber
          </h2>
          <p className="text-sm sm:text-base text-[#6E594A] mt-2">
            Como conservar, tempo de forno e orientações de entrega para a melhor experiência.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E8DFCFA0] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#2D1B13]">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#F4EDE2] flex items-center justify-center text-[#554032] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#2D1B13] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#5C483A] leading-relaxed border-t border-[#F5EFE6] bg-[#FAF8F5]/50 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Airfryer Reheating Callout Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#F0E6D8] border border-[#DDD0BE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#2D1B13] text-[#E89E62] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#2D1B13]">
                Guia Rápido: Como Reaquecer em 3 Minutos
              </h4>
              <p className="text-xs text-[#634F40]">
                Airfryer a 160°C por 3 min ou micro-ondas por 15s. O chocolate volta a borbulhar como se estivesse no atelier!
              </p>
            </div>
          </div>
          <a
            href="#sabores"
            className="px-4 py-2 rounded-xl bg-[#2D1B13] hover:bg-[#432A1F] text-white text-xs font-bold whitespace-nowrap transition-colors"
          >
            Fazer Meu Pedido
          </a>
        </div>

      </div>
    </section>
  );
};
