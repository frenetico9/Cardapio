import React from 'react';
import { Category, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard'; // Import the new card component

interface StyledCategorySectionProps {
  category: Category;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const StyledCategorySection: React.FC<StyledCategorySectionProps> = ({ category, items, onAddToCart }) => {
  // Section will only render if there are items for this category
  if (items.length === 0) return null; 

  const isBordas = category.id === 'bordas';

  return (
    <section id={category.id} className="mb-12"> 
      {/* Category Header */}
      <div className="mb-6 p-4 rounded-lg shadow-lg bg-lightBg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold text-categoryBg mb-2 sm:mb-0">
              {category.name}
            </h2>
            {category.price && !isBordas && (
              <div className="bg-categoryBg text-priceTextOnCategory text-center py-2 px-5 rounded-md shadow-sm">
                <p className="text-lg sm:text-xl font-bold">{category.price}</p>
              </div>
            )}
            {isBordas && (
                 <div 
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm text-sm"
                 >
                    SEM ADICIONAL
                </div>
            )}
        </div>
        {isBordas && (
            <p className="text-sm text-itemDescriptionText mt-3 text-center sm:text-left">
                Adicione bordas recheadas ao seu pastel favorito! Escolha uma das opções e adicione ao carrinho.
            </p>
        )}
      </div>
      
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {items.map(item => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart}
            categoryPrice={isBordas ? "Sem Adicional" : category.price}
          />
        ))}
      </div>
    </section>
  );
};

export default StyledCategorySection;