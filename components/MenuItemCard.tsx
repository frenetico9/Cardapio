import React from 'react';
import { MenuItem } from '../types';
import { IMGUR_PLACEHOLDER } from '../constants'; // Assuming IMGUR_PLACEHOLDER is exported

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  categoryPrice?: string; // Optional: if you want to show category price if item price is 0, e.g. for Bordas
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, categoryPrice }) => {
  const displayPrice = item.price > 0 ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : (categoryPrice || "Sem Adicional");
  const isBorda = item.category === 'bordas';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-1">
      {/* Image Section */}
      {item.imageUrl && item.imageUrl !== IMGUR_PLACEHOLDER ? (
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-40 object-cover" 
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm italic">
            {isBorda ? 'Borda' : 'Pastel'}
          </span>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-brandText mb-1 truncate" title={item.name}>
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-itemDescriptionText mb-2 h-8 overflow-hidden" title={item.description}>
            ({item.description})
          </p>
        )}
        
        <p className={`text-xl font-bold mt-auto mb-3 ${isBorda && item.price === 0 ? 'text-green-600' : 'text-categoryBg'}`}>
          {displayPrice}
        </p>

        <button
          onClick={() => onAddToCart(item)}
          className="w-full bg-categoryBg hover:bg-opacity-80 text-categoryText font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-categoryBg focus:ring-opacity-50"
          aria-label={`Adicionar ${item.name} ao carrinho`}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
