
import React from 'react';
import { PrintIcon, WhatsAppIcon } from '../constants'; // Changed CartIcon to WhatsAppIcon

interface FloatingActionButtonsProps {
  itemCount: number; // Renamed from cartItemCount for clarity as it's a general item count before order finalization
  onWhatsAppOrderClick: () => void; // Renamed from onCartIconClick
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ itemCount, onWhatsAppOrderClick }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50">
      <button
        onClick={handlePrint}
        title="Imprimir / Salvar como PDF"
        aria-label="Imprimir cardápio"
        className="bg-brandText hover:bg-opacity-80 text-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-brandText"
      >
        <PrintIcon className="text-2xl" />
      </button>
      <button
        onClick={onWhatsAppOrderClick} // Updated handler
        title="Revisar e Enviar Pedido via WhatsApp" // Updated title
        aria-label={`Revisar e Enviar Pedido via WhatsApp, ${itemCount} itens selecionados`} // Updated aria-label
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-600 relative" // Changed color for WhatsApp
      >
        <WhatsAppIcon className="text-2xl" /> {/* Changed icon */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-xs text-brandText font-bold rounded-full px-1.5 py-0.5 min-w-[20px] h-[20px] flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButtons;
