

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StyledCategorySection from './components/StyledCategorySection';
import FloatingActionButtons from './components/FloatingActionButtons';
import OrderViaWhatsAppModal from './components/OrderViaWhatsAppModal';
import WelcomeSection from './components/WelcomeSection';
import CategoryNavigation from './components/CategoryNavigation';
import InfoPanel from './components/InfoPanel';
import SelectBordaModal from './components/SelectBordaModal';
import AuthModal from './components/AuthModal';
import AdminPanelModal from './components/AdminPanelModal';
import CouponHighlightPopup from './components/CouponHighlightPopup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RESTAURANT_INFO, NAV_CATEGORIES, ALL_MENU_ITEMS as CONST_INITIAL_MENU_ITEMS, AVAILABLE_PAYMENT_METHODS, AVAILABLE_BORDAS as CONST_AVAILABLE_BORDAS, AVAILABLE_COUPONS as CONST_AVAILABLE_COUPONS, InfoIcon } from './constants';
import { MenuItem, CartItem, Coupon } from './types';

// Chaves de localStorage removidas, pois os dados agora seriam gerenciados por um backend.

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>(NAV_CATEGORIES[0]?.id || 'all');
  const [itemsToDisplay, setItemsToDisplay] = useState<MenuItem[]>([]);

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState<string | null>(null);

  const [isBordaModalOpen, setIsBordaModalOpen] = useState(false);
  const [currentPastelForBorda, setCurrentPastelForBorda] = useState<MenuItem | undefined>(undefined);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const [highlightedCoupon, setHighlightedCoupon] = useState<Coupon | null>(null);
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState<boolean>(false);
  const COUPON_POPUP_DISMISSED_KEY = 'couponPopupDismissedTimestamp';
  const COUPON_POPUP_DISMISS_DURATION = 24 * 60 * 60 * 1000;

  const fixedHeaderHeightClasses = "pt-[160px] sm:pt-[208px]";

  // Simular carregamento inicial de dados de uma API
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsDataLoading(true);
      console.log("SIMULATING API CALL: GET /api/menu-items");
      console.log("SIMULATING API CALL: GET /api/coupons");
      // Simula um delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Em uma aplicação real, você usaria fetch() para chamar suas Serverless Functions.
      // Ex: const menuResponse = await fetch('/api/menu-items');
      //     const menuData = await menuResponse.json();
      //     setMenuItems(menuData);
      //
      //     const couponResponse = await fetch('/api/coupons');
      //     const couponData = await couponResponse.json();
      //     setCoupons(couponData);

      // Usando dados constantes para simulação:
      setMenuItems([...CONST_INITIAL_MENU_ITEMS, ...CONST_AVAILABLE_BORDAS]);
      setCoupons(CONST_AVAILABLE_COUPONS);
      setIsDataLoading(false);
    };

    fetchInitialData();
  }, []);


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
      return;
    }

    const activeCoupons = coupons.filter(c => c.isActive);
    if (activeCoupons.length > 0) {
      let bestCoupon = activeCoupons.find(c => c.expiryDate);
      if (!bestCoupon) {
        bestCoupon = activeCoupons.find(c => c.description);
      }
      if (!bestCoupon) {
        bestCoupon = activeCoupons[0];
      }
      
      if (bestCoupon) {
        setHighlightedCoupon(bestCoupon);
        const timer = setTimeout(() => setIsCouponPopupVisible(true), isDataLoading ? 2500 : 1500); // Delay longer if still loading
        return () => clearTimeout(timer);
      } else {
        setIsCouponPopupVisible(false);
      }
    } else {
        setIsCouponPopupVisible(false);
    }
  }, [coupons, isDataLoading]);

  const handleCloseCouponPopup = () => {
    setIsCouponPopupVisible(false);
    localStorage.setItem(COUPON_POPUP_DISMISSED_KEY, Date.now().toString());
  };


  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    const mainContentArea = document.querySelector('main');
    if (mainContentArea) {
        mainContentArea.scrollTop = 0;
    } else {
        window.scrollTo(0,0);
    }
  };

  const handleSelectPastelOrAddItem = (item: MenuItem) => {
    if (!item.isAvailable) {
      setShowAddedToCartMessage(`${item.name} está indisponível no momento.`);
      setTimeout(() => setShowAddedToCartMessage(null), 3000);
      return;
    }

    if (item.itemType === 'Tradicional' || item.itemType === 'Especial' || item.itemType === 'Doce') {
      setCurrentPastelForBorda(item);
      setIsBordaModalOpen(true);
    } else {
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
    const currentPastelState = menuItems.find(mi => mi.id === pastel.id);
    if (!currentPastelState || !currentPastelState.isAvailable) {
        setIsBordaModalOpen(false);
        setCurrentPastelForBorda(undefined);
        setShowAddedToCartMessage(`${pastel.name} ficou indisponível.`);
        setTimeout(() => setShowAddedToCartMessage(null), 3000);
        return;
    }
    if (chosenBorda) {
        const currentBordaState = menuItems.find(mi => mi.id === chosenBorda.id);
        if (!currentBordaState || !currentBordaState.isAvailable) {
           setIsBordaModalOpen(false);
           setCurrentPastelForBorda(undefined);
           setShowAddedToCartMessage(`A borda ${chosenBorda.name} ficou indisponível.`);
           setTimeout(() => setShowAddedToCartMessage(null), 3000);
           return;
        }
    }

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

  const calculateSubtotalAmount = (): number => {
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

  // Admin Panel Logic - agora simula chamadas de API
  const toggleItemAvailability = async (itemId: string) => {
    const itemToToggle = menuItems.find(item => item.id === itemId);
    if (!itemToToggle) return;

    const newAvailability = !itemToToggle.isAvailable;
    // Simula chamada de API
    // Em uma app real: const response = await fetch(`/api/admin/menu-items/${itemId}/availability`, { method: 'PUT', body: JSON.stringify({ isAvailable: newAvailability }), headers: {'Content-Type': 'application/json'} });
    // if (response.ok) { /* atualiza estado */ } else { /* trata erro */ }
    console.log(`SIMULATING API CALL: PUT /api/admin/menu-items/${itemId}/availability - Payload: { isAvailable: ${newAvailability} }`);
    
    // Atualização otimista do estado
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isAvailable: newAvailability } : item
      )
    );
  };

  const addCoupon = async (couponData: Omit<Coupon, 'id'>): Promise<boolean> => {
    if (coupons.some(c => c.code.toUpperCase() === couponData.code.toUpperCase())) {
        // alert("Já existe um cupom com este código."); // Alert will be handled in AdminPanelModal based on return
        return false;
    }
    
    const newCouponWithId = { ...couponData, id: `coupon_${Date.now()}_${Math.random().toString(36).substring(2,7)}` };
    
    // Simula chamada de API
    // Em uma app real: const response = await fetch('/api/admin/coupons', { method: 'POST', body: JSON.stringify(newCouponWithId), headers: {'Content-Type': 'application/json'} });
    // const addedCoupon = await response.json(); // API retornaria o cupom com ID do banco
    // if (response.ok) { setCoupons(prev => [...prev, addedCoupon]); return true; } else { /* trata erro */; return false; }
    console.log(`SIMULATING API CALL: POST /api/admin/coupons - Payload:`, newCouponWithId);

    // Atualização otimista
    setCoupons(prevCoupons => [...prevCoupons, newCouponWithId]);
    return true;
  };

  const updateCoupon = async (updatedCoupon: Coupon): Promise<boolean> => {
    if (coupons.some(c => c.id !== updatedCoupon.id && c.code.toUpperCase() === updatedCoupon.code.toUpperCase())) {
        // alert("Outro cupom já utiliza este código."); // Alert will be handled in AdminPanelModal based on return
        return false;
    }

    // Simula chamada de API
    // Em uma app real: const response = await fetch(`/api/admin/coupons/${updatedCoupon.id}`, { method: 'PUT', body: JSON.stringify(updatedCoupon), headers: {'Content-Type': 'application/json'} });
    // if (response.ok) { /* atualiza estado */ return true; } else { /* trata erro */; return false; }
    console.log(`SIMULATING API CALL: PUT /api/admin/coupons/${updatedCoupon.id} - Payload:`, updatedCoupon);
    
    // Atualização otimista
    setCoupons(prevCoupons =>
      prevCoupons.map(c => c.id === updatedCoupon.id ? updatedCoupon : c)
    );
    return true;
  }

  const toggleCouponActivity = async (couponId: string) => {
    const couponToToggle = coupons.find(c => c.id === couponId);
    if (!couponToToggle) return;

    const newActivityState = !couponToToggle.isActive;
    // Simula chamada de API
    // Em uma app real: const response = await fetch(`/api/admin/coupons/${couponId}/activity`, { method: 'PUT', body: JSON.stringify({ isActive: newActivityState }), headers: {'Content-Type': 'application/json'} });
    // if (response.ok) { /* atualiza estado */ } else { /* trata erro */ }
    console.log(`SIMULATING API CALL: PUT /api/admin/coupons/${couponId}/activity - Payload: { isActive: ${newActivityState} }`);

    // Atualização otimista
    setCoupons(prevCoupons =>
      prevCoupons.map(coupon =>
        coupon.id === couponId ? { ...coupon, isActive: newActivityState } : coupon
      )
    );
  };

  const currentNavCategoryObject = NAV_CATEGORIES.find(cat => cat.id === activeCategory);
  const availableBordasForModal = menuItems.filter(item => item.itemType === 'Borda' && item.isAvailable);

  if (isDataLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-lightBg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-lg text-brandText font-semibold">Carregando cardápio...</p>
      </div>
    );
  }

  return (
    <div id="app-container" className="flex flex-col min-h-screen font-sans">
      <div className="fixed top-0 left-0 right-0 z-40 shadow-header">
        <Header
          info={RESTAURANT_INFO}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onAdminPanelClick={() => setIsAdminPanelOpen(true)}
        />
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {currentUser?.role === 'admin' && isAdminPanelOpen && (
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          menuItems={menuItems}
          coupons={coupons}
          onToggleItemAvailability={toggleItemAvailability}
          // Fix: Prop types for onAddCoupon and onUpdateCoupon now match the async functions being passed.
          onAddCoupon={addCoupon}
          // Fix: Prop types for onAddCoupon and onUpdateCoupon now match the async functions being passed.
          onUpdateCoupon={updateCoupon}
          onToggleCouponActivity={toggleCouponActivity}
        />
      )}

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

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;