import React, { useState } from 'react';
import { Flame, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const ArtisanalProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Manteiga Noisette (Brown Butter)',
      tagline: 'O segredo aromático de castanhas e caramelo',
      description: 'Cozinhamos manteiga de fazenda em panelas de fundo triplo até que os sólidos do leite dourem no ponto exato de noz. Esse processo confere ao cookie uma profundidade de sabor inigualável que você não encontra em cookies industriais.',
      icon: Flame,
      stat: '100% Manteiga',
      highlight: 'Sem margarinas ou gorduras hidrogenadas'
    },
    {
      step: '02',
      title: '48 Horas de Maturação a Frio',
      tagline: 'Paciência é o ingrediente principal',
      description: 'Depois de misturada, nossa massa descansa em câmara fria a 4°C por 48 horas inteiras. Isso permite que a farinha se hidrate completamente, quebrando os amidos e concentrando os açúcares para criar aquela casquinha dourada crocante com interior cremoso.',
      icon: Clock,
      stat: '48h Descanso',
      highlight: 'Desenvolvimento máximo de sabor'
    },
    {
      step: '03',
      title: 'Chocolate Belga Callebaut em Pedaços',
      tagline: 'Pedaços rústicos que derretem na boca',
      description: 'Não usamos gotas industriais padrão que não derretem. Cortamos blocos inteiros de chocolate Belga Callebaut 54% e 70% artesanalmente em tamanhos variados. O resultado são bolsões fumegantes de chocolate derretido em cada pedaço.',
      icon: Sparkles,
      stat: 'Cacau Nobre',
      highlight: 'Origem sustentável certificada'
    },
    {
      step: '04',
      title: 'Flor de Sal de Guérande',
      tagline: 'O contraste salino que desperta o paladar',
      description: 'Assim que saem do forno borbulhantes, cada cookie é polvilhado delicadamente com cristais de Flor de Sal colhidos à mão. O contraste do sal mineral com o açúcar caramelizado e o chocolate eleva a experiência sensorial a outro nível.',
      icon: CheckCircle2,
      stat: 'Finalização Manual',
      highlight: 'Cristais crocantes autênticos'
    }
  ];

  return (
    <section id="processo" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#B3581E] font-bold">
            Sem Atalhos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24150E] mt-1">
            A Alquimia da Mordida Perfeita
          </h2>
          <p className="text-sm sm:text-base text-[#6F5B4D] mt-2">
            Entenda por que nossos cookies têm aquela textura única que estala por fora e derrete deliciosamente no meio.
          </p>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#2D1B13] text-[#FAF8F5] border-[#2D1B13] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#2D1B13] border-[#E8DFCFA0] hover:border-[#D4C3AD] hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-serif text-2xl font-black ${
                      isSelected ? 'text-[#E89E62]' : 'text-[#A08878]'
                    }`}>
                      {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#432A1F] text-[#E89E62]' : 'bg-[#F4ECE0] text-[#783D15]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`font-serif text-lg font-bold mb-1.5 ${
                    isSelected ? 'text-white' : 'text-[#2D1B13]'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs font-medium mb-3 italic ${
                    isSelected ? 'text-[#D8C2B0]' : 'text-[#876F5E]'
                  }`}>
                    {item.tagline}
                  </p>

                  <p className={`text-xs leading-relaxed ${
                    isSelected ? 'text-[#C9B8AA]' : 'text-[#5B4638]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                  isSelected ? 'border-[#4A3225] text-[#E89E62]' : 'border-[#F2ECE1] text-[#783D15]'
                }`}>
                  <span className="font-bold">{item.stat}</span>
                  <span className="text-[11px] opacity-80">{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Banner Quote */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F4EDE2] to-[#EAE0D1] border border-[#DDD0BF] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2D1B13] text-white flex items-center justify-center text-xl shrink-0">
              ☕
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D1B13]">
                Harmonização Recomendada
              </h4>
              <p className="text-xs sm:text-sm text-[#634E40]">
                Experimente nossos cookies com um café coado na prensa francesa ou um copo de leite bem gelado.
              </p>
            </div>
          </div>

          <a
            href="#sabores"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D1B13] hover:bg-[#432A1F] text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
          >
            <span>Escolher Sabores Agora</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
