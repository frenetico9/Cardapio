import React from 'react';

interface WelcomeSectionProps {
  name: string;
  tagline1?: string;
  tagline2?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ name, tagline1, tagline2 }) => {
  return (
    <section className="bg-gradient-to-r from-red-900 via-red-800 to-amber-700 text-white py-7 sm:py-9 text-center mb-6 sm:mb-8 shadow-lifted rounded-2xl border border-amber-300/40 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff,_transparent_40%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <p className="uppercase tracking-[0.3em] text-amber-200 text-xs sm:text-sm font-bold mb-2">Cardápio Digital</p>
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-2">
          Bem-vindo ao <span className="text-primary">{name}</span>
        </h2>
        <p className="text-lg sm:text-xl text-amber-100 font-semibold mb-2">{tagline1}</p>
        <p className="text-sm sm:text-base text-amber-50/90 max-w-3xl mx-auto">
          {tagline2 || 'Frango assado dourado, farofa especial e combos irresistíveis para toda a família.'}
        </p>
      </div>
    </section>
  );
};

export default WelcomeSection;
