import React from 'react';
import { MenuItem, ItemType } from '../types';
import { IMGUR_PLACEHOLDER, BanIcon } from '../constants';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  categoryPrice?: string;
}

const tagStyles: Record<ItemType, { bgColor: string; textColor: string; borderColor?: string }> = {
  Frango: { bgColor: 'bg-amber-100', textColor: 'text-amber-800', borderColor: 'border-amber-300' },
  Combo: { bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-300' },
  Acompanhamento: { bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300' },
  Bebida: { bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300' },
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelectItem, categoryPrice }) => {
  const displayPrice =
    item.price > 0 ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : categoryPrice || 'Preço sob consulta';

  const handleButtonClick = () => {
    if (item.isAvailable) {
      onSelectItem(item);
    }
  };

  const cardClasses = `bg-cardBg rounded-2xl shadow-subtle flex flex-col transition-all duration-300 overflow-hidden group border border-amber-200 ${
    item.isAvailable ? 'hover:shadow-lifted' : 'opacity-60 cursor-not-allowed'
  }`;

  return (
    <div className={cardClasses} aria-disabled={!item.isAvailable}>
      <div className="relative">
        {item.imageUrl && item.imageUrl !== IMGUR_PLACEHOLDER ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={`w-full h-52 sm:h-60 md:h-64 object-cover transition-transform duration-300 ${
              item.isAvailable ? 'group-hover:scale-105' : ''
            }`}
          />
        ) : (
          <div className="w-full h-52 sm:h-60 md:h-64 bg-slate-200 flex items-center justify-center">
            <span className="text-slate-500 text-sm italic">
              {item.itemType === 'Bebida' ? 'Bebida' : 'Imagem indisponível'}
            </span>
          </div>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-slate-700 bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
            <BanIcon className="text-white text-4xl mb-2" />
            <span className="text-white font-semibold text-lg">Indisponível</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-amber-50/50">
        {item.itemType && tagStyles[item.itemType] && (
          <span
            className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-2 border ${tagStyles[item.itemType].bgColor} ${tagStyles[item.itemType].textColor} ${tagStyles[item.itemType].borderColor}`}
            aria-label={`Tipo: ${item.itemType}`}
          >
            {item.itemType.toUpperCase()}
          </span>
        )}
        <h3 className="text-lg font-extrabold text-brandText mb-1 leading-tight" title={item.name}>
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-itemDescriptionText mb-3 min-h-[2.5rem] line-clamp-2" title={item.description}>
            {item.description}
          </p>
        )}

        <p className="text-xl font-bold text-red-800 mt-auto mb-3">{displayPrice}</p>

        <button
          onClick={handleButtonClick}
          disabled={!item.isAvailable}
          className={`w-full font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            item.isAvailable
              ? 'bg-vibrantOrange hover:bg-vibrantOrangeHover text-white hover:shadow-lg focus:ring-vibrantOrange transform hover:-translate-y-0.5'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
          aria-label={`${item.isAvailable ? 'Adicionar' : 'Item indisponível:'} ${item.name}`}
        >
          {item.isAvailable ? 'Adicionar ao Pedido' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
