
import React from 'react';
import { Category } from '../types';

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav className="sticky top-0 z-30 bg-primary shadow-md py-3">
      <div className="container mx-auto px-2 sm:px-4 flex justify-center items-center space-x-1 sm:space-x-2 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ease-in-out whitespace-nowrap
              ${activeCategory === cat.id 
                ? 'bg-categoryBg text-categoryText shadow-lg transform scale-105' 
                : 'bg-primaryHover text-brandText hover:bg-brandText hover:text-primary'}`}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNavigation;