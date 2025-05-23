
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StyledCategorySection from './components/StyledCategorySection';
import FloatingActionButtons from './components/FloatingActionButtons';
import OrderViaWhatsAppModal from './components/OrderViaWhatsAppModal';
import WelcomeSection from './components/WelcomeSection';
import CategoryNavigation from './components/CategoryNavigation';
import InfoPanel from './components/InfoPanel';
import SelectBordaModal from './components/SelectBordaModal'; // New modal
import { RESTAURANT_INFO, NAV_CATEGORIES, ALL_MENU_ITEMS as INITIAL_MENU_ITEMS, AVAILABLE_PAYMENT_METHODS, AVAILABLE_BORDAS, InfoIcon } from './constants';
import { MenuItem, CartItem, Category } from './types';

const App = (): JSX.Element => {
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>(NAV_CATEGORIES[0]?.id || 'all');
  const [itemsToDisplay, setItemsToDisplay] = useState<MenuItem[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState<string | null>(null);

  // State for Borda Selection Modal
  const [isBordaModalOpen, setIsBordaModalOpen] = useState(false);
  const [currentPastelForBorda, setCurrentPastelForBorda] = useState<MenuItem | undefined>(undefined);

  // Mobile: h-28 (112px) header + h-12 (48px) nav = 160px
  // SM and up: h-40 (160px) header + h-12 (48px) nav = 208px
  const fixedHeaderHeightClasses = "pt-[160px] sm:pt-[208px]"; 

  useEffect(() => {
    if (activeCategory === 'all') {
      setItemsToDisplay(menuItems.filter(item => item.itemType !== 'Borda')); // Exclude borda definitions
    } else {
      setItemsToDisplay(menuItems.filter(item => item.category === activeCategory && item.itemType !== 'Borda'));
    }
  }, [activeCategory, menuItems]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    const mainContentArea = document.querySelector('main');
    if (mainContentArea) {
        mainContentArea.scrollTop = 0; // Scroll main content to top
    } else {
        window.scrollTo(0,0); // Fallback to window scroll
    }
  };

  const handleSelectPastelOrAddItem = (item: MenuItem) => {
    if (item.itemType === 'Tradicional' || item.itemType === 'Especial' || item.itemType === 'Doce') {
      setCurrentPastelForBorda(item);
      setIsBordaModalOpen(true);
    } else { // For Bebidas or other direct-add items
      const cartItemId = item.id + '_direct'; 
      const message = `${item.name} adicionado à seleção!`;
      setShowAddedToCartMessage(message);
      setTimeout(() => setShowAddedToCartMessage(null), 2000);

      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(ci => ci.cartItemId === cartItemId);
        if (existingItem) {
          return prevItems.map(ci =>
            ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
          );
        }
        return [
          ...prevItems,
          {
            ...item,
            cartItemId: cartItemId,
            baseItemName: item.name,
            quantity: 1,
          },
        ];
      });
    }
  };
  
  const handleConfirmBordaSelection = (pastel: MenuItem, chosenBorda?: MenuItem) => {
    const cartItemId = pastel.id + (chosenBorda ? `_${chosenBorda.id}` : '_no_borda');
    const basePastelName = pastel.name;
    const bordaDisplayName = chosenBorda ? chosenBorda.name : '';
  
    let displayNameInCart = basePastelName;
    if (chosenBorda) {
      displayNameInCart += ` (Borda: ${bordaDisplayName})`;
    }
  
    const message = `${displayNameInCart} adicionado à seleção!`;
    setShowAddedToCartMessage(message);
    setTimeout(() => setShowAddedToCartMessage(null), 2500);
  
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(ci => ci.cartItemId === cartItemId);
      if (existingItem) {
        return prevItems.map(ci =>
          ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prevItems,
        {
          ...pastel, 
          cartItemId: cartItemId,
          baseItemName: basePastelName,
          name: displayNameInCart,
          quantity: 1,
          selectedBorda: chosenBorda,
          price: pastel.price + (chosenBorda?.price || 0), 
          imageUrl: pastel.imageUrl 
        },
      ];
    });
  
    setIsBordaModalOpen(false);
    setCurrentPastelForBorda(undefined);
  };


  const handleRemoveSelectedItem = (cartItemIdToRemove: string) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemIdToRemove));
  };

  const handleUpdateSelectedItemQuantity = (cartItemIdToUpdate: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveSelectedItem(cartItemIdToUpdate);
    } else {
      setSelectedItems(prevItems =>
        prevItems.map(item => (item.cartItemId === cartItemIdToUpdate ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const calculateTotalAmount = (): number => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSelectedItemCount = (): number => {
    return selectedItems.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleWhatsAppModal = () => setIsWhatsAppModalOpen(!isWhatsAppModalOpen);
  
  const handleWhatsAppOrderSent = () => {
    setSelectedItems([]); 
    setIsWhatsAppModalOpen(false);
    setIsBordaModalOpen(false);
    setCurrentPastelForBorda(undefined);
    setShowAddedToCartMessage("Seu pedido foi enviado para o WhatsApp! Finalize por lá.");
    setTimeout(() => setShowAddedToCartMessage(null), 4000);
  };

  const currentNavCategoryObject = NAV_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div id="app-container" className="flex flex-col min-h-screen font-sans">
      <div className="fixed top-0 left-0 right-0 z-40 shadow-header">
        <Header info={RESTAURANT_INFO} />
        <CategoryNavigation 
          categories={NAV_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>
      
      <main className={`flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-8 bg-lightBg ${fixedHeaderHeightClasses}`}>
        <WelcomeSection name={RESTAURANT_INFO.name} tagline1={RESTAURANT_INFO.tagline1} />
        
        {activeCategory === 'all' ? (
          NAV_CATEGORIES.filter(cat => cat.id !== 'all').map(loopCategory => {
            if (loopCategory.id === 'bordas') return null; 
            const itemsForThisCategory = menuItems.filter(item => item.category === loopCategory.id && item.itemType !== 'Borda');
            if (itemsForThisCategory.length === 0) return null;
            return (
              <StyledCategorySection
                key={loopCategory.id}
                category={loopCategory}
                items={itemsForThisCategory}
                onSelectPastel={handleSelectPastelOrAddItem}
              />
            );
          })
        ) : currentNavCategoryObject && itemsToDisplay.length > 0 ? (
          <StyledCategorySection
            key={currentNavCategoryObject.id}
            category={currentNavCategoryObject}
            items={itemsToDisplay}
            onSelectPastel={handleSelectPastelOrAddItem}
          />
        ) : (
             <div className="text-center py-6 sm:py-10 my-6 sm:my-8 bg-cardBg p-4 sm:p-6 rounded-lg shadow-subtle">
                <InfoIcon className="text-4xl sm:text-5xl text-brandText opacity-50 mb-3 sm:mb-4" />
                <p className="text-lg sm:text-xl text-brandText font-semibold">
                  {currentNavCategoryObject ? `Nenhum item encontrado em ${currentNavCategoryObject.name}!` : 'Carregando itens...'}
                </p>
                <p className="text-itemDescriptionText opacity-75 text-sm sm:text-base">Por favor, selecione outra categoria ou verifique a aba "Todos".</p>
            </div>
        )}
        
        <InfoPanel 
            info={RESTAURANT_INFO} 
            paymentMethods={AVAILABLE_PAYMENT_METHODS} 
        />
      </main>
      
      <Footer info={RESTAURANT_INFO} />
      <FloatingActionButtons 
        itemCount={getSelectedItemCount()} 
        onWhatsAppOrderClick={toggleWhatsAppModal} 
      />

      {currentPastelForBorda && (
        <SelectBordaModal
          isOpen={isBordaModalOpen}
          onClose={() => {
            setIsBordaModalOpen(false);
            setCurrentPastelForBorda(undefined);
          }}
          pastel={currentPastelForBorda}
          bordas={AVAILABLE_BORDAS}
          onConfirm={handleConfirmBordaSelection}
        />
      )}

      <OrderViaWhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={toggleWhatsAppModal}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveSelectedItem}
        onUpdateQuantity={handleUpdateSelectedItemQuantity}
        totalAmount={calculateTotalAmount()}
        paymentMethods={AVAILABLE_PAYMENT_METHODS}
        restaurantWhatsAppNumber={RESTAURANT_INFO.contact.whatsapp}
        onOrderSent={handleWhatsAppOrderSent}
      />

      {showAddedToCartMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-brandText text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-xl z-[100] text-center font-medium text-sm sm:text-base">
          {showAddedToCartMessage}
        </div>
      )}

    </div>
  );
};

export default App;