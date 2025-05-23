
import React from 'react';
import { Category, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard'; 

interface StyledCategorySectionProps {
  category: Category;
  items: MenuItem[];
  onSelectPastel: (item: MenuItem) => void;
}

const StyledCategorySection: React.FC<StyledCategorySectionProps> = ({ category, items, onSelectPastel }) => {
  if (items.length === 0) return null; 

  return (
    <section id={category.id} className="mb-8 sm:mb-12"> 
      <div className="mb-6 p-4 rounded-lg shadow-subtle bg-cardBg border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-2 sm:mb-0">
              {category.name}
            </h2>
            {category.price && ( 
              <div className="bg-slate-100 text-slate-700 text-center py-1.5 px-4 rounded-md shadow-sm">
                <p className="text-md sm:text-lg font-medium">{category.price}</p>
              </div>
            )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6"> {/* Max 4 columns for larger cards */}
        {items.map(item => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            onSelectPastel={onSelectPastel}
            categoryPrice={category.price}
          />
        ))}
      </div>
    </section>
  );
};

export default StyledCategorySection;