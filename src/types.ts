export interface CookieItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: 'classicos' | 'recheados' | 'chocolatudos' | 'especiais' | 'veganos';
  badge?: string;
  rating: number;
  reviewCount: number;
  weight: string; // e.g. "120g"
  cocoaPercentage?: number;
  sweetnessLevel: number; // 1 to 5
  chewinessLevel: number; // 1 to 5
  richnessLevel: number; // 1 to 5
  allergens: string[];
  ingredients: string[];
  reheatingTip: string;
}

export interface CartItem {
  id: string; // unique item cart key (could be cookie ID or box ID)
  cookieId?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isCustomBox?: boolean;
  boxItems?: { name: string; count: number }[];
  boxSize?: number;
}

export type BoxSize = 4 | 6 | 12;

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  favoriteCookie: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'produtos' | 'entrega' | 'conservacao';
}
