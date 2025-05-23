
import React from 'react';

interface WelcomeSectionProps {
  name: string;
  tagline1?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ name, tagline1 }) => {
  return (
    <section className="bg-primary text-brandText py-8 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Bem-vindo ao {name} {tagline1}!
        </h2>
        <p className="text-lg opacity-90">
          O maior e mais saboroso pastel de 26cm da região. Explore nosso cardápio!
        </p>
      </div>
    </section>
  );
};

export default WelcomeSection;