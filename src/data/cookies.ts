import { CookieItem, Testimonial, FAQItem } from '../types';

export const COOKIES_DATA: CookieItem[] = [
  {
    id: 'classic-chocolate-chip',
    name: 'Clássico Choco-Chunk',
    tagline: 'Manteiga noisette e generosos pedaços de chocolate belga meio amargo 54%',
    description: 'Nossa receita de assinatura que deu origem ao atelier. Massa maturada por 48h com manteiga tostada artesanalmente, criando notas amendoadas inconfundíveis e pedaços rústicos de chocolate belga derretido a cada mordida. Finalizado com um toque sutil de flor de sal.',
    price: 16.5,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    category: 'classicos',
    badge: 'Mais Pedido',
    rating: 4.9,
    reviewCount: 342,
    weight: '125g',
    cocoaPercentage: 54,
    sweetnessLevel: 3,
    chewinessLevel: 5,
    richnessLevel: 4,
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    ingredients: ['Farinha de trigo especial', 'Manteiga de fazenda noisette', 'Chocolate Belga Callebaut 54%', 'Açúcar mascavo orgânico', 'Ovos caipiras', 'Flor de Sal de Guérande'],
    reheatingTip: 'Aqueça por 15 segundos no micro-ondas ou 3 minutos na Airfryer a 160°C para o centro derreter novamente.'
  },
  {
    id: 'triplo-cacau-fudge',
    name: 'Triplo Cacau & Fudge Belga',
    tagline: 'Massa negra 70% cacau com recheio vulcão de ganache aveludada',
    description: 'Para verdadeiros apaixonados por chocolate intenso. Uma massa incrivelmente aveludada feita com cacau alcalino holandês 100%, pedaços de chocolate 70% e um coração cremoso de fudge de chocolate nobre que escorre ao ser partido ao meio.',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    category: 'chocolatudos',
    badge: 'Favorito do Chef',
    rating: 5.0,
    reviewCount: 289,
    weight: '130g',
    cocoaPercentage: 70,
    sweetnessLevel: 2,
    chewinessLevel: 4,
    richnessLevel: 5,
    allergens: ['Glúten', 'Lactose', 'Ovos', 'Soja'],
    ingredients: ['Cacau em pó alcalino holandês', 'Chocolate 70% Callebaut', 'Manteiga extra', 'Creme de leite fresco', 'Açúcar demerara'],
    reheatingTip: 'Coloque na Airfryer a 170°C por 3 minutos e sinta o recheio se transformar em lava vulcânica.'
  },
  {
    id: 'red-velvet-cream-cheese',
    name: 'Red Velvet Cream Cheese',
    tagline: 'Massa carmim aveludada com generoso recheio de cheesecake cítrico',
    description: 'Inspirado na clássica confeitaria nova-iorquina. Textura úmida com notas sutis de cacau, coloração rubi natural e um recheio generoso de cream cheese artesanal aromatizado com raspas de fava de baunilha de Madagascar.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&w=800&q=80',
    category: 'recheados',
    badge: 'Destaque',
    rating: 4.8,
    reviewCount: 215,
    weight: '130g',
    cocoaPercentage: 35,
    sweetnessLevel: 3,
    chewinessLevel: 4,
    richnessLevel: 4,
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    ingredients: ['Cream cheese Philadelphia', 'Chocolate branco belga', 'Cacau puro', 'Fava de baunilha natural', 'Manteiga tostada'],
    reheatingTip: 'Sirva levemente morno para contrastar a massa macia com a cremosidade geladinha do cream cheese.'
  },
  {
    id: 'pistachio-blondie',
    name: 'Pistache Siciliano & Choco Branco',
    tagline: 'Pistaches tostados da Sicília e gotas aveludadas de chocolate branco caramelizado',
    description: 'Uma explosão de sofisticação. Massa amanteigada enriquecida com pasta pura de pistache italiano, nozes de pistache crocantes tostadas e gotas nobres de chocolate branco assadas até o ponto de caramelo doce e salgado.',
    price: 21.0,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    category: 'especiais',
    badge: 'Edição Especial',
    rating: 4.9,
    reviewCount: 178,
    weight: '125g',
    sweetnessLevel: 3,
    chewinessLevel: 4,
    richnessLevel: 5,
    allergens: ['Glúten', 'Lactose', 'Ovos', 'Oleaginosas (Pistache)'],
    ingredients: ['Pistache tostado importado', 'Pasta 100% pura de pistache', 'Chocolate branco Belga Callebaut W2', 'Flor de sal'],
    reheatingTip: 'Aqueça 10 segundos no micro-ondas para liberar os óleos essenciais e o aroma marcante do pistache tostado.'
  },
  {
    id: 'nutella-lava',
    name: 'Vulcão de Avelã & Nutella',
    tagline: 'Coração fumegante de creme de avelã puro envolto em massa amanteigada crocante',
    description: 'Quando você parte ao meio, o recheio denso de creme de avelã transborda imediatamente. Coberto com avelãs picadas e tostadas que trazem uma crocância irresistível em contraste com o centro cremoso.',
    price: 19.0,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    category: 'recheados',
    badge: 'Mais Recheado',
    rating: 4.9,
    reviewCount: 310,
    weight: '135g',
    sweetnessLevel: 4,
    chewinessLevel: 5,
    richnessLevel: 5,
    allergens: ['Glúten', 'Lactose', 'Ovos', 'Avelãs'],
    ingredients: ['Nutella / Creme de avelã com cacau', 'Avelãs torradas inteiras', 'Farinha selecionada', 'Manteiga noisette'],
    reheatingTip: '20 segundos no micro-ondas ou 4 minutos no forno pré-aquecido a 180°C para o vulcão perfeito.'
  },
  {
    id: 'caramel-sea-salt',
    name: 'Caramelo Salgado & Pecã Tostada',
    tagline: 'Fudge de caramelo puxa-puxa artesanal com nozes pecãs crocantes',
    description: 'Nosso caramelo é feito em tacho de cobre no atelier com açúcar caramelizado lentamente e creme fresco. Combinado com pecãs crocantes salpicadas e chocolate ao leite 40%. O equilíbrio entre o doce intenso e os cristais salinos.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=800&q=80',
    category: 'especiais',
    rating: 4.8,
    reviewCount: 164,
    weight: '125g',
    cocoaPercentage: 40,
    sweetnessLevel: 4,
    chewinessLevel: 5,
    richnessLevel: 4,
    allergens: ['Glúten', 'Lactose', 'Ovos', 'Nozes Pecã'],
    ingredients: ['Caramelo artesanal toffee', 'Nozes pecãs douradas', 'Chocolate belga 40%', 'Flor de sal marinho'],
    reheatingTip: 'Aqueça levemente para o caramelo voltar à consistência cremosa elástica irresistível.'
  },
  {
    id: 'aveia-canela-vegan',
    name: 'Aveia Dourada & Canela do Ceilão',
    tagline: '100% Plant-Based: Flocos nobres de aveia tostada, canela aromática e gotas 70%',
    description: 'Desenvolvido para quem busca sabor pleno sem derivados animais. Feito com óleo de coco virgem emulsionado, aveia em flocos grossos tostada, açúcar demerara perfumado com verdadeira canela do Ceilão e generosas gotas de chocolate 70% vegano.',
    price: 17.0,
    image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=800&q=80',
    category: 'veganos',
    badge: '100% Vegano',
    rating: 4.9,
    reviewCount: 142,
    weight: '120g',
    cocoaPercentage: 70,
    sweetnessLevel: 2,
    chewinessLevel: 4,
    richnessLevel: 3,
    allergens: ['Aveia (sem contaminação cruzada)', 'Pode conter traços de soja'],
    ingredients: ['Aveia em flocos nobres', 'Canela pura do Ceilão', 'Chocolate vegano 70%', 'Óleo de coco prensado a frio', 'Sementes de linhaça dourada'],
    reheatingTip: 'Perfeito para acompanhar um café coado ou chá fumegante da tarde.'
  },
  {
    id: 'lotus-biscoff-crunch',
    name: 'Biscoff Caramel Spiced',
    tagline: 'Massa infundida com especiarias speculoos e centro cremoso de pasta Lotus',
    description: 'A união da tradição belga de biscoitos de especiarias com o nosso cookie clássico. Recheado até a borda com autêntico creme Lotus Biscoff, coroado com um biscoito crocante dourado sobre a massa.',
    price: 19.5,
    image: 'https://images.unsplash.com/photo-1557082673-e9d40029dd23?auto=format&fit=crop&w=800&q=80',
    category: 'recheados',
    badge: 'Sensação',
    rating: 5.0,
    reviewCount: 267,
    weight: '135g',
    sweetnessLevel: 4,
    chewinessLevel: 4,
    richnessLevel: 5,
    allergens: ['Glúten', 'Lactose', 'Ovos', 'Soja'],
    ingredients: ['Pasta original Lotus Biscoff', 'Biscoito speculoos belga', 'Manteiga noisette', 'Canela, cravo e cardamomo'],
    reheatingTip: 'Aqueça 15s no micro-ondas para o recheio de Biscoff se espalhar aveludado.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    author: 'Camila Mendonça',
    role: 'Cliente Frequente — Jardins, SP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'O Choco-Chunk com flor de sal é simplesmente surreal. A massa é macia no meio e crocante nas bordas, exatamente como os cookies autênticos de Nova York. A embalagem para presente é maravilhosa!',
    rating: 5,
    favoriteCookie: 'Clássico Choco-Chunk'
  },
  {
    id: '2',
    author: 'Rodrigo Fontes',
    role: 'Crítico Gastronômico Amador',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Dá para notar a diferença da manteiga noisette e do descanso de 48h. Não tem aquele gosto de gordura hidrogenada ou açúcar excessivo. O de Triplo Cacau 70% é obra de arte.',
    rating: 5,
    favoriteCookie: 'Triplo Cacau & Fudge Belga'
  },
  {
    id: '3',
    author: 'Juliana e Renato',
    role: 'Encomenda Corporativa de Fim de Ano',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    comment: 'Pedimos caixas de 6 unidades para presentear toda a equipe da nossa agência. Chegaram mornos, perfumando a sala inteira. O atendimento e a rapidez no WhatsApp foram impecáveis.',
    rating: 5,
    favoriteCookie: 'Caixa Degustação 6 Unidades'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'produtos',
    question: 'Quanto tempo duram os cookies e como devo conservá-los?',
    answer: 'Nossos cookies não contêm conservantes químicos. Eles mantêm a textura perfeita por até 5 dias em temperatura ambiente em pote hermeticamente fechado. Se preferir, você pode congelá-los por até 60 dias e reaquecer direto no forno ou airfryer!'
  },
  {
    category: 'conservacao',
    question: 'Qual o melhor jeito de reaquecer em casa para parecer recém-saído do forno?',
    answer: 'Na Airfryer ou forninho elétrico pré-aquecido a 160°C por 3 a 4 minutos é o método supremo! As bordas voltam a chiar e o centro fica ultra derretido. No micro-ondas, 15 segundos são suficientes.'
  },
  {
    category: 'entrega',
    question: 'Qual o prazo e raio de entrega para pedidos imediatos?',
    answer: 'Atendemos pedidos expressos com entrega em até 45 a 60 minutos via motoboy parceiro nas principais regiões atendidas. Você também pode agendar a retirada presencial sem custo em nosso atelier.'
  },
  {
    category: 'produtos',
    question: 'Vocês realizam pedidos especiais para casamentos, festas ou empresas?',
    answer: 'Sim! Produzimos mini cookies personalizados, caixas especiais com fita de cetim e cinta com a identidade visual do seu evento. Fale conosco pelo botão do WhatsApp para um catálogo exclusivo de eventos.'
  },
  {
    category: 'produtos',
    question: 'Vocês têm opções sem glúten ou 100% veganas?',
    answer: 'Temos opções 100% veganas como nosso Cookie de Aveia Dourada & Canela. Para celíacos severos, alertamos que nossa cozinha manipula farinha de trigo com glúten nos demais preparos, embora haja higienização rigorosa.'
  }
];
