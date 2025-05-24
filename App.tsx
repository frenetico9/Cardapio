
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

const LOCAL_STORAGE_MENU_ITEMS_KEY = 'bigPastelMenuItems_v1';
const LOCAL_STORAGE_COUPONS_KEY = 'bigPastelCoupons_v1';

const getInitialAppData = () => {
  let initialItems: MenuItem[] = [...CONST_INITIAL_MENU_ITEMS, ...CONST_AVAILABLE_BORDAS];
  let initialCoupons: Coupon[] = CONST_AVAILABLE_COUPONS;

  try {
    const storedMenuItems = localStorage.getItem(LOCAL_STORAGE_MENU_ITEMS_KEY);
    if (storedMenuItems) {
      const parsedItems = JSON.parse(storedMenuItems) as MenuItem[];
      // Basic validation: ensure it's an array and items have core properties
      if (Array.isArray(parsedItems) && parsedItems.every(item => 'id' in item && 'name' in item && 'price' in item && 'isAvailable' in item && 'category' in item)) {
        initialItems = parsedItems;
      } else {
        console.warn("Invalid menu items found in localStorage. Falling back to defaults and clearing stored data.");
        localStorage.removeItem(LOCAL_STORAGE_MENU_ITEMS_KEY);
      }
    }
  } catch (error) {
    console.error("Error loading menu items from localStorage:", error);
    localStorage.removeItem(LOCAL_STORAGE_MENU_ITEMS_KEY); // Clear potentially corrupted data
  }

  try {
    const storedCoupons = localStorage.getItem(LOCAL_STORAGE_COUPONS_KEY);
    if (storedCoupons) {
      const parsedCoupons = JSON.parse(storedCoupons) as Coupon[];
      if (Array.isArray(parsedCoupons) && parsedCoupons.every(coupon => 'id' in coupon && 'code' in coupon && 'value' in coupon)) {
        initialCoupons = parsedCoupons;
      } else {
        console.warn("Invalid coupons found in localStorage. Falling back to defaults and clearing stored data.");
        localStorage.removeItem(LOCAL_STORAGE_COUPONS_KEY);
      }
    }
  } catch (error) {
    console.error("Error loading coupons from localStorage:", error);
    localStorage.removeItem(LOCAL_STORAGE_COUPONS_KEY); // Clear potentially corrupted data
  }
  return { initialItems, initialCoupons };
};


const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const { initialItems: loadedInitialItems, initialCoupons: loadedInitialCoupons } = getInitialAppData();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(loadedInitialItems);
  const [coupons, setCoupons] = useState<Coupon[]>(loadedInitialCoupons);
  
  const [activeCategory, setActiveCategory] = useState<string>(NAV_CATEGORIES[0]?.id || 'all');
  const [itemsToDisplay, setItemsToDisplay] = useState<MenuItem[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState<string | null>(null);

  const [isBordaModalOpen, setIsBordaModalOpen] = useState(false);
  const [currentPastelForBorda, setCurrentPastelForBorda] = useState<MenuItem | undefined>(undefined);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false); 

  // Coupon Highlight Popup State
  const [highlightedCoupon, setHighlightedCoupon] = useState<Coupon | null>(null);
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState<boolean>(false);
  const COUPON_POPUP_DISMISSED_KEY = 'couponPopupDismissedTimestamp';
  const COUPON_POPUP_DISMISS_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds


  const fixedHeaderHeightClasses = "pt-[160px] sm:pt-[208px]"; 

  // Persist menuItems to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MENU_ITEMS_KEY, JSON.stringify(menuItems));
    } catch (error) {
      console.error("Error saving menu items to localStorage:", error);
    }
  }, [menuItems]);

  // Persist coupons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COUPONS_KEY, JSON.stringify(coupons));
    } catch (error) {
      console.error("Error saving coupons to localStorage:", error);
    }
  }, [coupons]);


  useEffect(() => {
    // Filter out 'Borda' type items for general display, they are handled by SelectBordaModal
    const displayableItems = menuItems.filter(item => item.itemType !== 'Borda'); 
    if (activeCategory === 'all') {
      setItemsToDisplay(displayableItems);
    } else {
      setItemsToDisplay(displayableItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory, menuItems]);

  // Coupon Highlight Logic
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
        const timer = setTimeout(() => setIsCouponPopupVisible(true), 1500);
        return () => clearTimeout(timer);
      } else {
        setIsCouponPopupVisible(false); // Ensure popup is hidden if no suitable coupon
      }
    } else {
        setIsCouponPopupVisible(false); // Ensure popup is hidden if no active coupons
    }
  }, [coupons]);

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
    // Re-check availability from the main menuItems state
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
    const basePastelName = pastel.name; // Use the original pastel name
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
          ...pastel, // Base pastel details
          cartItemId: cartItemId,
          baseItemName: basePastelName,
          name: displayNameInCart, // Composite name for display in cart
          quantity: 1,
          selectedBorda: chosenBorda,
          price: pastel.price + (chosenBorda?.price || 0), // Final price including borda
          imageUrl: pastel.imageUrl // Ensure imageUrl from base pastel is used
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

  // Admin Panel Logic
  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const addCoupon = (coupon: Coupon) => {
    if (coupons.some(c => c.code.toUpperCase() === coupon.code.toUpperCase())) {
        alert("Já existe um cupom com este código."); 
        return false; 
    }
    setCoupons(prevCoupons => [...prevCoupons, { ...coupon, id: `coupon_${Date.now()}_${Math.random().toString(36).substring(2,7)}` }]);
    return true; 
  };

  const updateCoupon = (updatedCoupon: Coupon) => {
     // Check for duplicate code if the code is being changed
    if (coupons.some(c => c.id !== updatedCoupon.id && c.code.toUpperCase() === updatedCoupon.code.toUpperCase())) {
        alert("Outro cupom já utiliza este código.");
        return false;
    }
    setCoupons(prevCoupons => 
      prevCoupons.map(c => c.id === updatedCoupon.id ? updatedCoupon : c)
    );
    return true;
  }

  const toggleCouponActivity = (couponId: string) => {
    setCoupons(prevCoupons =>
      prevCoupons.map(coupon =>
        coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
      )
    );
  };


  const currentNavCategoryObject = NAV_CATEGORIES.find(cat => cat.id === activeCategory);
  const availableBordasForModal = menuItems.filter(item => item.itemType === 'Borda' && item.isAvailable);

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
            // For 'all' view, items are filtered from the main menuItems state (which already excludes 'Borda' type for displayableItems)
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
            items={itemsToDisplay} // itemsToDisplay is already filtered by activeCategory and excludes 'Borda' type
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
          bordas={availableBordasForModal} // Pass bordas from persisted state
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
          menuItems={menuItems} // Pass all menu items, including bordas
          coupons={coupons}
          onToggleItemAvailability={toggleItemAvailability}
          onAddCoupon={addCoupon}
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
