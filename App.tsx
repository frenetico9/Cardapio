
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
import AuthModal from './components/AuthModal';
import AdminPanelModal from './components/AdminPanelModal';
import CouponHighlightPopup from './components/CouponHighlightPopup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RESTAURANT_INFO, NAV_CATEGORIES, AVAILABLE_PAYMENT_METHODS, InfoIcon, CONST_INITIAL_MENU_ITEMS, CONST_AVAILABLE_COUPONS, CONST_AVAILABLE_BORDAS } from './constants';
import { MenuItem, CartItem, Coupon } from './types';

const APP_DATA_BLOB_PATH = 'data/app_data.json'; // Define um caminho padrão no Blob

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [dataError, setDataError] = useState<string | null>(null);
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

  const fetchAppData = useCallback(async () => {
    setIsDataLoading(true);
    setDataError(null);
    try {
      console.log("Fetching app data from /api/app-data");
      const response = await fetch('/api/app-data');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch app data: ${response.statusText}`);
      }
      const data = await response.json();
      setMenuItems(data.menuItems || []);
      setCoupons(data.coupons || []);
    } catch (error) {
      console.error("Error fetching app data:", error);
      setDataError((error as Error).message);
      // Fallback to constants if API fails critically for the first load
      if (menuItems.length === 0) setMenuItems([...CONST_INITIAL_MENU_ITEMS, ...CONST_AVAILABLE_BORDAS]);
      if (coupons.length === 0) setCoupons(CONST_AVAILABLE_COUPONS);
    } finally {
      setIsDataLoading(false);
    }
  }, [menuItems.length, coupons.length]); // Dependencies to avoid re-fetching if already populated by fallback

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);


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
      if (!bestCoupon) bestCoupon = activeCoupons.find(c => c.description);
      if (!bestCoupon) bestCoupon = activeCoupons[0];
      
      if (bestCoupon) {
        setHighlightedCoupon(bestCoupon);
        const timer = setTimeout(() => setIsCouponPopupVisible(true), isDataLoading ? 2500 : 1500);
        return () => clearTimeout(timer);
      }
    }
    setIsCouponPopupVisible(false);
  }, [coupons, isDataLoading]);

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
      setShowAddedToCartMessage(`${item.name} adicionado à seleção!`);
      setTimeout(() => setShowAddedToCartMessage(null), 2000);
      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(ci => ci.cartItemId === cartItemId);
        if (existingItem) {
          return prevItems.map(ci => ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci);
        }
        return [...prevItems, { ...item, cartItemId, baseItemName: item.name, quantity: 1 }];
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

  // Admin Panel Logic - Local updates, server save is separate
  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prevItems => prevItems.map(item => item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>): Promise<boolean> => {
    if (coupons.some(c => c.code.toUpperCase() === couponData.code.toUpperCase())) return Promise.resolve(false);
    const newCouponWithId = { ...couponData, id: `coupon_${Date.now()}_${Math.random().toString(36).substring(2,7)}` };
    setCoupons(prevCoupons => [...prevCoupons, newCouponWithId]);
    return Promise.resolve(true);
  };

  const updateCoupon = (updatedCoupon: Coupon): Promise<boolean> => {
    if (coupons.some(c => c.id !== updatedCoupon.id && c.code.toUpperCase() === updatedCoupon.code.toUpperCase())) return Promise.resolve(false);
    setCoupons(prevCoupons => prevCoupons.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
    return Promise.resolve(true);
  }

  const toggleCouponActivity = (couponId: string) => {
    setCoupons(prevCoupons => prevCoupons.map(coupon => coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon));
  };

  const handleSaveChangesToServer = async (): Promise<{success: boolean, message: string}> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: "Apenas administradores podem salvar."};
    }
    console.log("Saving all data to server via /api/admin/update-app-data");
    try {
      const adminApiSecret = prompt("Digite a chave secreta de API para salvar (simulação):");
      if (!adminApiSecret) return { success: false, message: "Chave de API não fornecida."};

      const response = await fetch('/api/admin/update-app-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-API-Secret': adminApiSecret,
        },
        body: JSON.stringify({ menuItems, coupons }),
      });

      if (!response.ok) {
        let errorText = `Erro do servidor: ${response.status} ${response.statusText}`;
        try {
          // Tenta ler o corpo da resposta como texto, pois pode não ser JSON
          const responseBody = await response.text();
          if (responseBody) {
             // Tenta analisar como JSON se o tipo de conteúdo sugerir
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    const errorData = JSON.parse(responseBody);
                    errorText = errorData.message || responseBody;
                } catch (jsonError) {
                    // Falhou ao analisar JSON, usa o corpo do texto bruto
                    errorText = responseBody; 
                }
            } else {
                 errorText = responseBody; // Não é JSON, usa o corpo do texto bruto
            }
          }
        } catch (e) {
          // Falha ao ler o corpo do texto, mantenha o erro de status
          console.error("Falha ao ler o corpo da resposta de erro:", e);
        }
        console.error("Server error details:", errorText);
        throw new Error(errorText);
      }

      // Se response.ok for true, espera-se JSON
      const result = await response.json();
      console.log("Data saved successfully:", result);
      return { success: true, message: result.message || "Dados salvos no servidor com sucesso!" };

    } catch (error) {
      console.error("Error saving data to server:", error);
      return { success: false, message: (error as Error).message || "Erro desconhecido ao salvar." };
    }
  };


  const currentNavCategoryObject = NAV_CATEGORIES.find(cat => cat.id === activeCategory);
  const availableBordasForModal = menuItems.filter(item => item.itemType === 'Borda' && item.isAvailable);

  if (isDataLoading && menuItems.length === 0 && coupons.length === 0) { // Only show full page loader on initial absolute load
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-lightBg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-lg text-brandText font-semibold">Carregando cardápio...</p>
      </div>
    );
  }
   if (dataError && menuItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-lightBg p-4 text-center">
        <InfoIcon className="text-5xl text-red-500 mb-4" />
        <h2 className="text-2xl text-brandText font-semibold mb-2">Oops! Algo deu errado.</h2>
        <p className="text-itemDescriptionText mb-1">Não foi possível carregar os dados do cardápio do servidor.</p>
        <p className="text-sm text-slate-500 mb-4">Detalhe do erro: {dataError}</p>
        <p className="text-itemDescriptionText">Estamos mostrando uma versão offline com dados padrão.</p>
        <button 
          onClick={fetchAppData} 
          className="mt-6 bg-primary hover:bg-primaryHover text-brandText font-semibold py-2 px-4 rounded-lg shadow-sm"
        >
          Tentar Novamente
        </button>
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {currentUser?.role === 'admin' && isAdminPanelOpen && (
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          menuItems={menuItems}
          coupons={coupons}
          onToggleItemAvailability={toggleItemAvailability}
          onAddCoupon={addCoupon}
          onUpdateCoupon={updateCoupon}
          onToggleCouponActivity={toggleCouponActivity}
          onSaveChangesToServer={handleSaveChangesToServer} // Passando a nova função
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

const App = (): JSX.Element => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
