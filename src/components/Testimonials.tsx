import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6]/60 border-t border-[#E8DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D6] text-[#783D15] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C44D25] fill-current" />
            Cookie Lovers Apaixonados
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24150E]">
            Quem Provou Não Consegue Esquecer
          </h2>
          <p className="text-sm sm:text-base text-[#6E594A] mt-2">
            Mais de 15.000 fornadas entregues com nota média 4.9/5 em avaliações espontâneas.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFCFA0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#EADCCE] absolute top-6 right-6" />

              <div>
                {/* Stars */}
                <div className="flex text-amber-500 mb-4 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#48352A] leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EAE0] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#E3D4C2]"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2D1B13]">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-[#7A6354]">
                    {t.role}
                  </p>
                  <span className="inline-block mt-0.5 text-[10px] text-[#A54714] font-semibold bg-[#F9F3EA] px-2 py-0.2 rounded-md">
                    Favorito: {t.favoriteCookie}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
