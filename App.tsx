
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StyledCategorySection from './components/StyledCategorySection';
import FloatingActionButtons from './components/FloatingActionButtons';
import OrderViaWhatsAppModal from './components/OrderViaWhatsAppModal'; // New Modal
import WelcomeSection from './components/WelcomeSection';
import CategoryNavigation from './components/CategoryNavigation';
import InfoPanel from './components/InfoPanel';
import { RESTAURANT_INFO, MENU_CATEGORIES, ALL_MENU_ITEMS as INITIAL_MENU_ITEMS, AVAILABLE_PAYMENT_METHODS, InfoIcon } from './constants';
import { MenuItem, CartItem, Category } from './types';

const App = (): JSX.Element => {
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    MENU_CATEGORIES.length > 0 ? MENU_CATEGORIES[0].id : null
  );
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]); // Renamed from cartItems for clarity
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState<string | null>(null);

  const applyFilters = useCallback(() => {
    let itemsToFilter = [...menuItems]; 
    if (activeCategory) {
      itemsToFilter = itemsToFilter.filter(item => item.category === activeCategory);
    } else {
      itemsToFilter = menuItems.filter(item => item.category === (MENU_CATEGORIES[0]?.id || ''));
    }
    setFilteredItems(itemsToFilter);
  }, [activeCategory, menuItems]);

  useEffect(() => {
    applyFilters();
  }, [activeCategory, menuItems, applyFilters]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSelectItem = (item: MenuItem) => { // Renamed from handleAddToCart
    const message = item.category === "bordas" 
      ? `${item.name} (borda) adicionada! Adicione também seu pastel.`
      : `${item.name} adicionado à seleção!`;
    setShowAddedToCartMessage(message);
    setTimeout(() => setShowAddedToCartMessage(null), item.category === "bordas" ? 3500 : 2000);

    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveSelectedItem = (itemId: string) => { // Renamed from handleRemoveFromCart
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleUpdateSelectedItemQuantity = (itemId: string, newQuantity: number) => { // Renamed
    if (newQuantity <= 0) {
      handleRemoveSelectedItem(itemId);
    } else {
      setSelectedItems(prevItems =>
        prevItems.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const calculateTotalAmount = (): number => { // Renamed
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSelectedItemCount = (): number => { // Renamed
    return selectedItems.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleWhatsAppModal = () => setIsWhatsAppModalOpen(!isWhatsAppModalOpen);
  
  const handleWhatsAppOrderSent = () => {
    // This function is called after the WhatsApp link is generated and opened.
    // We can clear the selected items and close the modal.
    setSelectedItems([]); 
    setIsWhatsAppModalOpen(false);
    // Optionally, show a success message for a few seconds
    setShowAddedToCartMessage("Seu pedido foi enviado para o WhatsApp! Finalize por lá.");
    setTimeout(() => setShowAddedToCartMessage(null), 4000);
  };

  const currentCategoryObject = MENU_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div id="app-container" className="flex flex-col min-h-screen bg-primary">
      <Header info={RESTAURANT_INFO} />
      
      <WelcomeSection name={RESTAURANT_INFO.name} tagline1={RESTAURANT_INFO.tagline1} />

      <CategoryNavigation 
        categories={MENU_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      <main className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-8 bg-lightBg shadow-inner">
        {currentCategoryObject && (
          <StyledCategorySection 
            key={currentCategoryObject.id} 
            category={currentCategoryObject} 
            items={filteredItems}
            onAddToCart={handleSelectItem} // Prop name on StyledCategorySection kept for simplicity if not changed there
          />
        )}

        {filteredItems.length === 0 && activeCategory && (
             <div className="text-center py-10 my-8 bg-white p-6 rounded-lg shadow">
                <InfoIcon className="text-5xl text-brandText opacity-50 mb-4" />
                <p className="text-xl text-brandText font-semibold">Nenhum pastel encontrado nesta categoria!</p>
                <p className="text-itemDescriptionText opacity-75">Escolha outra categoria para ver mais delícias.</p>
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

      <OrderViaWhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={toggleWhatsAppModal}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveSelectedItem}
        onUpdateQuantity={handleUpdateSelectedItemQuantity}
        totalAmount={calculateTotalAmount()}
        paymentMethods={AVAILABLE_PAYMENT_METHODS}
        restaurantWhatsAppNumber={RESTAURANT_INFO.contact.whatsapp}
        onOrderSent={handleWhatsAppOrderSent} // New prop to reset state
      />

      {showAddedToCartMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-brandText text-primary px-6 py-3 rounded-lg shadow-xl z-[100] text-center">
          {showAddedToCartMessage}
        </div>
      )}

    </div>
  );
};

export default App;
