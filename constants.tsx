
import React from 'react';
import { RestaurantInfo, Category, MenuItem, Promotion, CustomerReview, PaymentMethod } from './types';

// --- ÍCONES (Manter os usados por modals/FABs) ---
export const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className }) => (
  <i className={`fa-star ${filled ? 'fas text-yellow-400' : 'far text-gray-300'} ${className || ''}`}></i>
);
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-whatsapp ${className || ''}`}></i>;
export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-phone ${className || ''}`}></i>;
export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-instagram ${className || ''}`}></i>;
export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-facebook ${className || ''}`}></i>;
export const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-credit-card ${className || ''}`}></i>;
export const PixIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fab fa-pix ${className || ''}`}></i>; 
export const MoneyBillIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-money-bill-wave ${className || ''}`}></i>;
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-times ${className || ''}`}></i>;
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-trash-alt ${className || ''}`}></i>;
export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-info-circle ${className || ''}`}></i>;
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-user ${className || ''}`}></i>;
export const AddressIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-map-marker-alt ${className || ''}`}></i>;


// --- INFORMAÇÕES DO RESTAURANTE ---
export const RESTAURANT_INFO: RestaurantInfo = {
  name: "BIG PASTEL",
  logoUrl: "https://i.imgur.com/ELEXGD3.png", 
  tagline1: "DA BEL",
  tagline2: "26CM",
  operatingHours: "", 
  contact: {
    phone: "", 
    whatsapp: "5561991775501", 
    email: "contato@bigpasteldabel.com.br"
  },
  address: "Condomínio Entre Lagos 2 CL Lote 16", 
  socialMedia: {
    instagram: "https://instagram.com/bigpasteldabel",
    facebook: "https://facebook.com/bigpasteldabel"
  },
  bookingLink: "#",
  deliveryLink: "#" 
};

// --- OPÇÕES DE FILTRO DE PREFERÊNCIA ---
export const PREFERENCE_OPTIONS: string[] = [];

// --- CATEGORIAS DE NAVEGAÇÃO (SEM "BORDAS") ---
export const NAV_CATEGORIES: Category[] = [
  { id: "all", name: "TODOS" },
  { id: "pasteis_salgados", name: "PASTÉIS SALGADOS", price: "R$ 17,00" },
  { id: "especial", name: "ESPECIAL", price: "R$ 20,00" },
  { id: "pasteis_doces", name: "PASTÉIS DOCES", price: "R$ 17,00" },
  { id: "bebidas", name: "BEBIDAS" },
];

export const IMGUR_PLACEHOLDER = "IMGUR_ITEM_IMAGE_URL_HERE"; // For actual pastéis
const IMGUR_DRINK_PLACEHOLDER = "https://i.imgur.com/tqVqFoa.png"; // Generic drink placeholder

// --- BORDAS DISPONÍVEIS (PARA O MODAL DE SELEÇÃO) ---
export const AVAILABLE_BORDAS: MenuItem[] = [
  {
    id: "borda_cheddar", name: "CHEDDAR", description: "Borda recheada com cheddar cremoso.", price: 0.00,
    category: "borda_option", itemType: "Borda", // category can be generic for options
  },
  {
    id: "borda_catupiry", name: "CATUPIRY", description: "Borda recheada com Catupiry original.", price: 0.00,
    category: "borda_option", itemType: "Borda",
  },
  {
    id: "borda_chocolate", name: "CHOCOLATE", description: "Borda recheada com chocolate ao leite.", price: 0.00,
    category: "borda_option", itemType: "Borda",
  },
];


// --- TODOS OS ITENS DO MENU (PASTÉIS E BEBIDAS) ---
export const ALL_MENU_ITEMS: MenuItem[] = [
  // Pastéis Salgados - R$ 17,00
  {
    id: "pastel_queijo", name: "QUEIJO", description: "Mussarela de primeira qualidade.", price: 17.00,
    imageUrl: "https://i.imgur.com/DTFQcok.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_queijo_presunto", name: "QUEIJO C/ PRESUNTO", description: "Mussarela e presunto sadia.", price: 17.00,
    imageUrl: "https://i.imgur.com/k5RQkQD.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_carne", name: "CARNE", description: "Carne moída temperada.", price: 17.00,
    imageUrl: "https://i.imgur.com/BHJIQhS.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_carne_queijo", name: "CARNE C/ QUEIJO", description: "Carne moída e mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/LQY67kq.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_frango", name: "FRANGO", description: "Frango desfiado e temperado.", price: 17.00,
    imageUrl: "https://i.imgur.com/1rftlSf.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_frango_queijo", name: "FRANGO C/ QUEIJO", description: "Frango desfiado com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/DxwUIPU.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_calabresa_queijo", name: "CALABRESA C/ QUEIJO", description: "Calabresa fatiada com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/PynrFPv.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },
  {
    id: "pastel_napolitano", name: "NAPOLITANO", description: "QUEIJO, PRESUNTO, TOMATE E ORÉGANO", price: 17.00,
    imageUrl: "https://i.imgur.com/WtAQWmg.jpeg", category: "pasteis_salgados", itemType: "Tradicional",
  },

  // Especial - R$ 20,00
  {
    id: "pastel_camarao_cremoso", name: "CAMARÃO CREMOSO", description: "Camarões selecionados com creme especial.", price: 20.00,
    imageUrl: "https://i.imgur.com/pq7ioJB.jpeg", category: "especial", itemType: "Especial",
  },

  // Pastéis Doces - R$ 17,00
  {
    id: "pastel_banana_queijo", name: "BANANA C/ QUEIJO", description: "Banana nanica com mussarela.", price: 17.00,
    imageUrl: "https://i.imgur.com/PlgWetd.jpeg", category: "pasteis_doces", itemType: "Doce",
  },
  {
    id: "pastel_banana_chocolate", name: "BANANA C/ CHOCOLATE", description: "Banana com chocolate ao leite.", price: 17.00,
    imageUrl: "https://i.imgur.com/in6CY75.jpeg", category: "pasteis_doces", itemType: "Doce",
  },
  {
    id: "pastel_banana_acucar_canela", name: "BANANA C/ AÇÚCAR E CANELA", description: "Banana polvilhada com açúcar e canela.", price: 17.00,
    imageUrl: "https://i.imgur.com/nR95rUI.jpeg", category: "pasteis_doces", itemType: "Doce",
  },
  {
    id: "pastel_queijo_chocolate", name: "QUEIJO C/ CHOCOLATE", description: "Mussarela com chocolate ao leite.", price: 17.00,
    imageUrl: "https://i.imgur.com/hpin1IF.jpeg", category: "pasteis_doces", itemType: "Doce",
  },
   {
    id: "pastel_romeu_julieta_limao", name: "ROMEU E JULIETA C/ RASPAS DE LIMÃO", description: "Goiabada, mussarela e raspas de limão.", price: 17.00,
    imageUrl: "https://i.imgur.com/1omNC0f.jpeg", category: "pasteis_doces", itemType: "Doce",
  },
  
  // Bebidas
  {
    id: "bebida_coca_lata", name: "COCA-COLA LATA", description: "Refrigerante Coca-Cola lata 350ml.", price: 6.00,
    imageUrl: "https://i.imgur.com/zBrS9Xu.png", category: "bebidas", itemType: "Bebida",
  },
  {
    id: "bebida_guarana_lata", name: "GUARANÁ ANTARCTICA LATA", description: "Refrigerante Guaraná Antarctica lata 350ml.", price: 5.50,
    imageUrl: "https://i.imgur.com/AHYGLUx.png", category: "bebidas", itemType: "Bebida",
  },
];

// --- PROMOÇÕES ---
export const PROMOTIONS: Promotion[] = [];

// --- AVALIAÇÕES DE CLIENTES ---
export const CUSTOMER_REVIEWS: CustomerReview[] = [];

// --- MÉTODOS DE PAGAMENTO ---
export const AVAILABLE_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'credit_card', name: 'Cartão de Crédito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'debit_card', name: 'Cartão de Débito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'pix', name: 'PIX', icon: <PixIcon className="mr-2" /> },
  { id: 'cash', name: 'Dinheiro', icon: <MoneyBillIcon className="mr-2" />, description: 'Pagamento na entrega/retirada' },
];
