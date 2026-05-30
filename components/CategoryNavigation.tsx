import React from 'react';
import { Category } from '../types';

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav className="bg-brandText h-12 border-t border-red-900/20 border-b border-red-900/20">
      <div className="container mx-auto px-2 sm:px-4 flex items-center space-x-1 sm:space-x-2 overflow-x-auto h-full">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-2 sm:px-4 h-full flex items-center text-sm font-bold tracking-wide transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none ${
              activeCategory === cat.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-amber-100/80 hover:text-primary hover:border-b-2 hover:border-primary/50'
            }`}
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
