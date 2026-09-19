import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Check } from 'lucide-react';
import { CookieItem } from '../types';

interface FlavorFinderQuizProps {
  isOpen: boolean;
  onClose: () => void;
  cookies: CookieItem[];
  onAddToCart: (cookie: CookieItem, quantity: number) => void;
}

export const FlavorFinderQuiz: React.FC<FlavorFinderQuizProps> = ({
  isOpen,
  onClose,
  cookies,
  onAddToCart
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [matchedCookie, setMatchedCookie] = useState<CookieItem | null>(null);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      title: 'Qual é o seu perfil de chocolate e doçura favorito?',
      subtitle: 'Isso nos ajuda a calibrar a intensidade do cacau',
      options: [
        { id: 'intenso', label: 'Cacau Amargo & Intenso', desc: 'Menos doce, notas profundas de chocolate 70%' },
        { id: 'equilibrado', label: 'Equilíbrio Clássico', desc: 'Chocolate meio amargo com cristais de flor de sal' },
        { id: 'doce-cremoso', label: 'Doce & Aveludado', desc: 'Cremes, Nutella, doce de leite ou chocolate branco' },
        { id: 'aromatico', label: 'Especiarias & Grãos', desc: 'Canela aromática, aveia tostada ou Biscoff' },
      ]
    },
    {
      title: 'Qual a textura ideal para a sua mordida?',
      subtitle: 'A magia mora na resistência da massa',
      options: [
        { id: 'vulcao', label: 'Vulcão Derretido', desc: 'Recheio denso que escorre quente ao partir ao meio' },
        { id: 'chewy', label: 'Borda Crocante & Centro Macio', desc: 'A clássica textura nova-iorquina bem puxa-puxa' },
        { id: 'nuts', label: 'Crocância com Castanhas', desc: 'Pistaches, nozes pecã e avelãs tostadas' },
        { id: 'veludo', label: 'Bolo Aveludado & Cream Cheese', desc: 'Massa macia com contraste cítrico leve' },
      ]
    },
    {
      title: 'Qual o momento ideal para degustar seu cookie?',
      subtitle: 'Cada fornada tem sua própria ocasião perfeita',
      options: [
        { id: 'cafe', label: 'Pausa da Tarde com Café', desc: 'Aquele respiro merecido com café coado quentinho' },
        { id: 'sobremesa', label: 'Sobremesa Noturna Estupenda', desc: 'Para fechar o dia com chave de ouro e dopamina' },
        { id: 'presente', label: 'Presente ou Compartilhar', desc: 'Impressionar amigos, família ou alguém especial' },
      ]
    }
  ];

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [currentStep]: optionId };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best matching cookie based on answers
      calculateMatch(updated);
    }
  };

  const calculateMatch = (ans: Record<number, string>) => {
    let resultId = 'classic-chocolate-chip';

    if (ans[0] === 'intenso') {
      resultId = 'triplo-cacau-fudge';
    } else if (ans[1] === 'vulcao' || ans[0] === 'doce-cremoso') {
      resultId = ans[1] === 'nuts' ? 'caramel-sea-salt' : 'nutella-lava';
    } else if (ans[1] === 'nuts') {
      resultId = 'pistachio-blondie';
    } else if (ans[0] === 'aromatico') {
      resultId = ans[1] === 'chewy' ? 'lotus-biscoff-crunch' : 'aveia-canela-vegan';
    } else if (ans[1] === 'veludo') {
      resultId = 'red-velvet-cream-cheese';
    }

    const found = cookies.find(c => c.id === resultId) || cookies[0];
    setMatchedCookie(found);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedCookie(null);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!matchedCookie) return;
    onAddToCart(matchedCookie, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Quiz Modal Container */}
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E3D8C8] overflow-hidden z-10 p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE5D7] hover:bg-[#E5D5C2] text-[#2D1B13] flex items-center justify-center transition-colors"
          aria-label="Fechar quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!matchedCookie ? (
          <div>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs uppercase tracking-wider text-[#B3581E] font-bold">
                Passo {currentStep + 1} de {questions.length}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-[#E8DDD0] overflow-hidden ml-2">
                <div
                  className="h-full bg-[#B3581E] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#24150E] leading-tight">
                {questions[currentStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#735D4E] mt-1">
                {questions[currentStep].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="w-full text-left p-4 rounded-2xl bg-white hover:bg-[#F3EBE0] border border-[#DDD3C5] hover:border-[#B3581E] transition-all group flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="block font-bold text-sm text-[#2D1B13] group-hover:text-[#B3581E] transition-colors">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-[#7A6354] mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A89484] group-hover:text-[#B3581E] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D6] text-[#783D15] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#B3581E]" />
              98% de Afinidade com seu Paladar
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#24150E] mb-2">
              Seu Cookie Alma Gêmea:
            </h3>

            {/* Matched Cookie Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5DACB] shadow-md my-5 text-left flex flex-col sm:flex-row items-center gap-5">
              <img
                src={matchedCookie.image}
                alt={matchedCookie.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider text-[#8A5A36] font-bold">
                    {matchedCookie.category} • {matchedCookie.weight}
                  </span>
                  <span className="font-display font-bold text-base text-[#2D1B13]">
                    R$ {matchedCookie.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#2D1B13]">
                  {matchedCookie.name}
                </h4>
                <p className="text-xs text-[#6F5B4D] mt-1 line-clamp-2">
                  {matchedCookie.description}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2D1B13] hover:bg-[#432A1F] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Adicionado ao Carrinho!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Quero Esse Cookie no Pedido
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#D5C6B4] text-[#554032] hover:bg-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Refazer teste
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
