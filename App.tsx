
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StyledCategorySection from './components/StyledCategorySection';
import FloatingActionButtons from './components/FloatingActionButtons';
import OrderViaWhatsAppModal from './components/OrderViaWhatsAppModal';
import WelcomeSection from './components/WelcomeSection';
import CategoryNavigation from './components/CategoryNavigation';
import InfoPanel from './components/InfoPanel';
import SelectBordaModal from './components/SelectBordaModal';
import CouponHighlightPopup from './components/CouponHighlightPopup';
import CouponMarquee from './components/CouponMarquee'; // Importado o CouponMarquee
import { RESTAURANT_INFO, NAV_CATEGORIES, AVAILABLE_PAYMENT_METHODS, InfoIcon, CONST_INITIAL_MENU_ITEMS, CONST_AVAILABLE_COUPONS, CONST_AVAILABLE_BORDAS } from './constants';
import { MenuItem, CartItem, Coupon } from './types';


const App: React.FC = () => {
  // Data is now sourced directly from constants
  const [menuItems, setMenuItems] = useState<MenuItem[]>([...CONST_INITIAL_MENU_ITEMS, ...CONST_AVAILABLE_BORDAS]);
  const [coupons, setCoupons] = useState<Coupon[]>(CONST_AVAILABLE_COUPONS);

  const [activeCategory, setActiveCategory] = useState<string>(NAV_CATEGORIES[0]?.id || 'all');
  const [itemsToDisplay, setItemsToDisplay] = useState<MenuItem[]>([]);

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState<string | null>(null);

  const [isBordaModalOpen, setIsBordaModalOpen] = useState(false);
  const [currentPastelForBorda, setCurrentPastelForBorda] = useState<MenuItem | undefined>(undefined);

  const [highlightedCoupon, setHighlightedCoupon] = useState<Coupon | null>(null);
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState<boolean>(false);
  const COUPON_POPUP_DISMISSED_KEY = 'couponPopupDismissedTimestamp';
  const COUPON_POPUP_DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Ajustado para acomodar o CouponMarquee (32px ou h-8)
  const fixedHeaderHeightClasses = "pt-[192px] sm:pt-[240px]"; // Height of Header + CategoryNavigation + CouponMarquee

  useEffect(() => {
    const displayableItems = menuItems.filter(item => item.itemType !== 'Borda');
    if (activeCategory === 'all') {
      setItemsToDisplay(displayableItems);
    } else {
      setItemsToDisplay(displayableItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory, menuItems]);

  useEffect(() => {
    const dismissedTimestamp = localStorage.getItem(COUPON_POPUP_DISMISSED_KEY);
    if (dismissedTimestamp && (Date.now() - parseInt(dismissedTimestamp)) < COUPON_POPUP_DISMISS_DURATION) {
      setIsCouponPopupVisible(false);
      // return; // Não retornar aqui, pois o highlightedCoupon para o marquee ainda pode ser útil
    }

    const activeCoupons = coupons.filter(c => c.isActive);
    if (activeCoupons.length > 0) {
      let bestCoupon = activeCoupons.find(c => c.expiryDate); 
      if (!bestCoupon) bestCoupon = activeCoupons.find(c => c.description); 
      if (!bestCoupon) bestCoupon = activeCoupons[0]; 
      
      if (bestCoupon) {
        setHighlightedCoupon(bestCoupon);
        // O popup pode ainda ser controlado pelo timestamp, mas o marquee sempre mostrará o cupom
        if (!(dismissedTimestamp && (Date.now() - parseInt(dismissedTimestamp)) < COUPON_POPUP_DISMISS_DURATION)) {
            const timer = setTimeout(() => setIsCouponPopupVisible(true), 1500); 
            return () => clearTimeout(timer);
        }
      }
    } else {
        setHighlightedCoupon(null); // Garante que marquee não apareça se não houver cupom ativo
    }
    // setIsCouponPopupVisible(false); // Linha removida para não interferir com o popup
  }, [coupons]); 

  const handleCloseCouponPopup = () => {
    setIsCouponPopupVisible(false);
    localStorage.setItem(COUPON_POPUP_DISMISSED_KEY, Date.now().toString());
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    const mainContentArea = document.querySelector('main');
    if (mainContentArea) mainContentArea.scrollTop = 0;
    else window.scrollTo(0,0);
  };

  const handleSelectPastelOrAddItem = (item: MenuItem) => {
    // Availability is now based on current constants.tsx data
    const liveItem = menuItems.find(mi => mi.id === item.id);
    if (!liveItem || !liveItem.isAvailable) {
      setShowAddedToCartMessage(`${item.name} está indisponível no momento.`);
      setTimeout(() => setShowAddedToCartMessage(null), 3000);
      return;
    }

    if (liveItem.itemType === 'Tradicional' || liveItem.itemType === 'Especial' || liveItem.itemType === 'Doce') {
      setCurrentPastelForBorda(liveItem);
      setIsBordaModalOpen(true);
    } else { 
      const cartItemId = liveItem.id + '_direct'; 
      setShowAddedToCartMessage(`${liveItem.name} adicionado à seleção!`);
      setTimeout(() => setShowAddedToCartMessage(null), 2000);
      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(ci => ci.cartItemId === cartItemId);
        if (existingItem) {
          return prevItems.map(ci => ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci);
        }
        return [...prevItems, { ...liveItem, cartItemId, baseItemName: liveItem.name, quantity: 1 }];
      });
    }
  };
  
  const handleConfirmBordaSelection = (pastel: MenuItem, chosenBorda?: MenuItem) => {
    const currentPastelState = menuItems.find(mi => mi.id === pastel.id);
    if (!currentPastelState || !currentPastelState.isAvailable) {
        setIsBordaModalOpen(false);
        setCurrentPastelForBorda(undefined);
        setShowAddedToCartMessage(`${pastel.name} ficou indisponível (conforme dados atuais).`);
        setTimeout(() => setShowAddedToCartMessage(null), 3000);
        return;
    }
    if (chosenBorda) {
        const currentBordaState = menuItems.find(mi => mi.id === chosenBorda.id);
        if (!currentBordaState || !currentBordaState.isAvailable) {
           setIsBordaModalOpen(false);
           setCurrentPastelForBorda(undefined);
           setShowAddedToCartMessage(`A borda ${chosenBorda.name} ficou indisponível (conforme dados atuais).`);
           setTimeout(() => setShowAddedToCartMessage(null), 3000);
           return;
        }
    }

    const cartItemId = pastel.id + (chosenBorda ? `_${chosenBorda.id}` : '_no_borda');
    const basePastelName = pastel.name;
    let displayNameInCart = basePastelName + (chosenBorda ? ` (Borda: ${chosenBorda.name})` : '');
  
    setShowAddedToCartMessage(`${displayNameInCart} adicionado à seleção!`);
    setTimeout(() => setShowAddedToCartMessage(null), 2500);
  
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(ci => ci.cartItemId === cartItemId);
      if (existingItem) {
        return prevItems.map(ci => ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prevItems, { ...pastel, cartItemId, baseItemName: basePastelName, name: displayNameInCart, quantity: 1, selectedBorda: chosenBorda, price: pastel.price + (chosenBorda?.price || 0), imageUrl: pastel.imageUrl }];
    });
  
    setIsBordaModalOpen(false);
    setCurrentPastelForBorda(undefined);
  };

  const handleRemoveSelectedItem = (cartItemIdToRemove: string) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemIdToRemove));
  };

  const handleUpdateSelectedItemQuantity = (cartItemIdToUpdate: string, newQuantity: number) => {
    if (newQuantity <= 0) handleRemoveSelectedItem(cartItemIdToUpdate);
    else setSelectedItems(prevItems => prevItems.map(item => (item.cartItemId === cartItemIdToUpdate ? { ...item, quantity: newQuantity } : item)));
  };

  const calculateSubtotalAmount = (): number => selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getSelectedItemCount = (): number => selectedItems.reduce((count, item) => count + item.quantity, 0);
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
  const availableBordasForModal = menuItems.filter(item => item.itemType === 'Borda' && item.isAvailable); 

  return (
    <div id="app-container" className="flex flex-col min-h-screen font-sans">
      <div className="fixed top-0 left-0 right-0 z-40 shadow-header">
        <Header info={RESTAURANT_INFO} />
        <CategoryNavigation
          categories={NAV_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
        <CouponMarquee coupon={highlightedCoupon} /> {/* Adicionado o CouponMarquee aqui */}
      </div>

      <main className={`flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-8 bg-lightBg ${fixedHeaderHeightClasses}`}>
        <WelcomeSection name={RESTAURANT_INFO.name} tagline1={RESTAURANT_INFO.tagline1} />

        {activeCategory === 'all' ? (
          NAV_CATEGORIES.filter(cat => cat.id !== 'all').map(loopCategory => {
            const itemsForThisCategory = itemsToDisplay.filter(item => item.category === loopCategory.id);
            return (
              <StyledCategorySection
                key={loopCategory.id}
                category={loopCategory}
                items={itemsForThisCategory}
                onSelectPastel={handleSelectPastelOrAddItem}
              />
            );
          })
        ) : currentNavCategoryObject ? (
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
                  {currentNavCategoryObject ? `Nenhum item encontrado em ${currentNavCategoryObject.name}!` : 'Categoria não encontrada.'}
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
          onClose={() => { setIsBordaModalOpen(false); setCurrentPastelForBorda(undefined); }}
          pastel={currentPastelForBorda}
          bordas={availableBordasForModal}
          onConfirm={handleConfirmBordaSelection}
        />
      )}

      <OrderViaWhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={toggleWhatsAppModal}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveSelectedItem}
        onUpdateQuantity={handleUpdateSelectedItemQuantity}
        subtotalAmount={calculateSubtotalAmount()}
        paymentMethods={AVAILABLE_PAYMENT_METHODS}
        restaurantWhatsAppNumber={RESTAURANT_INFO.contact.whatsapp}
        onOrderSent={handleWhatsAppOrderSent}
        availableCoupons={coupons} 
      />

      <CouponHighlightPopup
        coupon={highlightedCoupon}
        isVisible={isCouponPopupVisible}
        onClose={handleCloseCouponPopup}
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
