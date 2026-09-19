import React, { useState } from 'react';
import { COOKIES_DATA, TESTIMONIALS_DATA, FAQ_DATA } from './data/cookies';
import { CookieItem, CartItem, BoxSize } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BoxBuilder } from './components/BoxBuilder';
import { ArtisanalProcess } from './components/ArtisanalProcess';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CookieDetailModal } from './components/CookieDetailModal';
import { FlavorFinderQuiz } from './components/FlavorFinderQuiz';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-item',
      cookieId: 'classic-chocolate-chip',
      name: 'Clássico Choco-Chunk',
      price: 16.5,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      quantity: 2,
    }
  ]);

  const [selectedCookie, setSelectedCookie] = useState<CookieItem | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState<{
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    couponCode?: string;
    cep?: string;
  } | null>(null);

  // Cart total items count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add individual cookie to cart
  const handleAddToCart = (cookie: CookieItem, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cookieId === cookie.id && !item.isCustomBox);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cookie-${cookie.id}-${Date.now()}`,
            cookieId: cookie.id,
            name: cookie.name,
            price: cookie.price,
            image: cookie.image,
            quantity: quantity,
          }
        ];
      }
    });
  };

  // Add custom box to cart
  const handleAddBoxToCart = (box: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    isCustomBox: boolean;
    boxSize: BoxSize;
    boxItems: { name: string; count: number }[];
  }) => {
    setCartItems(prev => [...prev, box]);
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Start checkout flow
  const handleCheckout = (order: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    couponCode?: string;
    cep?: string;
  }) => {
    setIsCartOpen(false);
    setCheckoutOrder(order);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#281811]">
      {/* Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExplore={() => scrollToSection('sabores')}
          onBuildBox={() => scrollToSection('monte-sua-caixa')}
        />

        <MenuSection
          cookies={COOKIES_DATA}
          onSelectCookie={(c) => setSelectedCookie(c)}
          onQuickAdd={(c) => handleAddToCart(c, 1)}
        />

        <BoxBuilder
          cookies={COOKIES_DATA}
          onAddBoxToCart={handleAddBoxToCart}
        />

        <ArtisanalProcess />

        <Testimonials testimonials={TESTIMONIALS_DATA} />

        <FAQSection items={FAQ_DATA} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CookieDetailModal
        cookie={selectedCookie}
        onClose={() => setSelectedCookie(null)}
        onAddToCart={handleAddToCart}
      />

      <FlavorFinderQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        cookies={COOKIES_DATA}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <OrderConfirmationModal
        isOpen={checkoutOrder !== null}
        onClose={() => setCheckoutOrder(null)}
        orderDetails={checkoutOrder}
      />
    </div>
  );
}
