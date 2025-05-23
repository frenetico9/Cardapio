
import React from 'react';
import { RestaurantInfo, Category, MenuItem, Promotion, CustomerReview, PaymentMethod } from './types';

// --- ÍCONES (Manter os usados por modals/FABs) ---
export const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className }) => (
  <i className={`fa-star ${filled ? 'fas text-yellow-400' : 'far text-gray-300'} ${className || ''}`}></i>
);
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-whatsapp ${className || ''}`}></i>;
export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-phone ${className || ''}`}></i>;
export const PrintIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-print ${className || ''}`}></i>;
// CartIcon will be replaced by WhatsAppIcon for the main FAB, but could be used internally if needed.
// export const CartIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-shopping-cart ${className || ''}`}></i>;
export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-instagram ${className || ''}`}></i>;
export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-facebook ${className || ''}`}></i>;
export const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-credit-card ${className || ''}`}></i>;
export const PixIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-pix ${className || ''}`}></i>; // Corrected import for Pix if it's a custom component or FontAwesome brand
export const MoneyBillIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-money-bill-wave ${className || ''}`}></i>;
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-times ${className || ''}`}></i>;
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-trash-alt ${className || ''}`}></i>;
// export const TicketIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-ticket-alt ${className || ''}`}></i>; // Not needed for the reduced payment list
export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-info-circle ${className || ''}`}></i>;
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-user ${className || ''}`}></i>;
export const AddressIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-map-marker-alt ${className || ''}`}></i>;


// --- INFORMAÇÕES DO RESTAURANTE ---
export const RESTAURANT_INFO: RestaurantInfo = {
  name: "BIG PASTEL",
  logoUrl: "https://i.imgur.com/ELEXGD3.png",
  tagline1: "DA BEL",
  tagline2: "26CM",
  operatingHours: "", // Removed as per request
  contact: {
    phone: "", // Removed as per request
    whatsapp: "5561991775501", // Formatted for wa.me link
    email: "contato@bigpasteldabel.com.br"
  },
  address: "Condomínio Entre Lagos 2 CL Lote 16", // Updated address
  socialMedia: {
    instagram: "https://instagram.com/bigpasteldabel",
    facebook: "https://facebook.com/bigpasteldabel"
  },
  bookingLink: "#",
  deliveryLink: "#" // Could be a link to iFood, etc. or remove if not used
};

// --- OPÇÕES DE FILTRO DE PREFERÊNCIA ---
export const PREFERENCE_OPTIONS: string[] = [];

// --- CATEGORIAS DO MENU ---
export const MENU_CATEGORIES: Category[] = [
  { id: "pasteis_salgados", name: "PASTÉIS SALGADOS", price: "R$ 17,00" },
  { id: "especial", name: "ESPECIAL", price: "R$ 20,00" },
  { id: "pasteis_doces", name: "PASTÉIS DOCES", price: "R$ 17,00" },
  { id: "bordas", name: "BORDAS" },
];

export const IMGUR_PLACEHOLDER = "IMGUR_ITEM_IMAGE_URL_HERE"; // Kept for consistency, but ideally all images have URLs

// --- TODOS OS ITENS DO MENU ---
export const ALL_MENU_ITEMS: MenuItem[] = [
  // Pastéis Salgados - R$ 17,00
  {
    id: "pastel_queijo", name: "QUEIJO", description: "Mussarela de primeira qualidade.", price: 17.00,
    imageUrl: "https://i.imgur.com/DTFQcok.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_queijo_presunto", name: "QUEIJO C/ PRESUNTO", description: "Mussarela e presunto sadia.", price: 17.00,
    imageUrl: "https://i.imgur.com/k5RQkQD.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_carne", name: "CARNE", description: "Carne moída temperada.", price: 17.00,
    imageUrl: "https://i.imgur.com/BHJIQhS.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_carne_queijo", name: "CARNE C/ QUEIJO", description: "Carne moída e mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/LQY67kq.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_frango", name: "FRANGO", description: "Frango desfiado e temperado.", price: 17.00,
    imageUrl: "https://i.imgur.com/1rftlSf.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_frango_queijo", name: "FRANGO C/ QUEIJO", description: "Frango desfiado com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/DxwUIPU.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_calabresa_queijo", name: "CALABRESA C/ QUEIJO", description: "Calabresa fatiada com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/PynrFPv.jpeg", category: "pasteis_salgados",
  },
  {
    id: "pastel_napolitano", name: "NAPOLITANO", description: "QUEIJO, PRESUNTO, TOMATE E ORÉGANO", price: 17.00,
    imageUrl: "https://i.imgur.com/WtAQWmg.jpeg", category: "pasteis_salgados",
  },

  // Especial - R$ 20,00
  {
    id: "pastel_camarao_cremoso", name: "CAMARÃO CREMOSO", description: "Camarões selecionados com creme especial.", price: 20.00,
    imageUrl: "https://i.imgur.com/pq7ioJB.jpeg", category: "especial",
  },

  // Pastéis Doces - R$ 17,00
  {
    id: "pastel_banana_queijo", name: "BANANA C/ QUEIJO", description: "Banana nanica com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/PlgWetd.jpeg", category: "pasteis_doces",
  },
  {
    id: "pastel_banana_chocolate", name: "BANANA C/ CHOCOLATE", description: "Banana com chocolate ao leite.", price: 17.00,
    imageUrl: "https://i.imgur.com/in6CY75.jpeg", category: "pasteis_doces",
  },
  {
    id: "pastel_banana_acucar_canela", name: "BANANA C/ AÇÚCAR E CANELA", description: "Banana polvilhada com açúcar e canela.", price: 17.00,
    imageUrl: "https://i.imgur.com/nR95rUI.jpeg", category: "pasteis_doces",
  },
  {
    id: "pastel_queijo_chocolate", name: "QUEIJO C/ CHOCOLATE", description: "Mussarela com chocolate ao leite.", price: 17.00,
    imageUrl: "https://i.imgur.com/hpin1IF.jpeg", category: "pasteis_doces",
  },
   {
    id: "pastel_romeu_julieta_limao", name: "ROMEU E JULIETA C/ RASPAS DE LIMÃO", description: "Goiabada, mussarela e raspas de limão.", price: 17.00,
    imageUrl: "https://i.imgur.com/1omNC0f.jpeg", category: "pasteis_doces",
  },

  // Bordas - Sem Adicional (R$ 0,00)
  {
    id: "borda_cheddar", name: "CHEDDAR", description: "Borda recheada com cheddar cremoso.", price: 0.00,
    imageUrl: "https://i.imgur.com/gf5qaYQ.png", category: "bordas", tags: ["Sem Adicional"],
  },
  {
    id: "borda_catupiry", name: "CATUPIRY", description: "Borda recheada com Catupiry original.", price: 0.00,
    imageUrl: "https://i.imgur.com/KQV8LSh.jpeg", category: "bordas", tags: ["Sem Adicional"],
  },
  {
    id: "borda_chocolate", name: "CHOCOLATE", description: "Borda recheada com chocolate ao leite.", price: 0.00,
    imageUrl: "https://i.imgur.com/650CXcp.jpeg", category: "bordas", tags: ["Sem Adicional"],
  }
];

// --- PROMOÇÕES ---
export const PROMOTIONS: Promotion[] = [];

// --- AVALIAÇÕES DE CLIENTES ---
export const CUSTOMER_REVIEWS: CustomerReview[] = [];

// --- MÉTODOS DE PAGAMENTO ---
export const AVAILABLE_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'credit_card', name: 'Cartão de Crédito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'debit_card', name: 'Cartão de Débito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'pix', name: 'PIX', icon: <PixIcon className="mr-2" /> }, // Ensure PixIcon is correctly defined/imported if custom
  { id: 'cash', name: 'Dinheiro', icon: <MoneyBillIcon className="mr-2" />, description: 'Pagamento na entrega/retirada' },
];