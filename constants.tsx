import React from 'react';
import { RestaurantInfo, Category, MenuItem, Promotion, CustomerReview, PaymentMethod, Coupon } from './types';
import logoLosPollos from './assets/los-pollos-logo.png';
import frangoInteiroImg from './assets/frango-inteiro.png';
import meioFrangoImg from './assets/meio-frango.png';
import comboFrangoImg from './assets/frango-combo.png';
import frangoFamilyImg from './assets/frango-family.png';

// --- ÍCONES ---
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
export const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-envelope ${className || ''}`}></i>;
export const KeyIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-key ${className || ''}`}></i>;
export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-sign-out-alt ${className || ''}`}></i>;
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-cog ${className || ''}`}></i>;
export const TagIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-tag ${className || ''}`}></i>;
export const ToggleOnIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-toggle-on ${className || ''}`}></i>;
export const ToggleOffIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-toggle-off ${className || ''}`}></i>;
export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-plus-circle ${className || ''}`}></i>;
export const EditIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-edit ${className || ''}`}></i>;
export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-calendar-alt ${className || ''}`}></i>;
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-check-circle ${className || ''}`}></i>;
export const BanIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-ban ${className || ''}`}></i>;
export const GiftIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-gift ${className || ''}`}></i>;
export const SaveIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`fas fa-save ${className || ''}`}></i>;

export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'LOS POLLOS HERMANOS',
  logoUrl: logoLosPollos,
  tagline1: 'Frango Assado',
  tagline2: 'Sabor que faz a diferença!',
  operatingHours: 'Todos os dias, das 11h às 22h',
  contact: {
    phone: '',
    whatsapp: '5561991775501',
    email: 'contato@lospolloshermanos.com.br',
  },
  address: 'Condomínio Entre Lagos 2 CL Lote 16',
  socialMedia: {
    instagram: 'https://instagram.com/lospolloshermanos',
    facebook: 'https://facebook.com/lospolloshermanos',
  },
  bookingLink: '#',
  deliveryLink: '#',
};

export const PREFERENCE_OPTIONS: string[] = [];

export const NAV_CATEGORIES: Category[] = [
  { id: 'all', name: 'TODOS' },
  { id: 'frango_assado', name: 'FRANGO ASSADO', price: 'A partir de R$ 18,90' },
  { id: 'combos', name: 'COMBOS', price: 'A partir de R$ 32,90' },
  { id: 'acompanhamentos', name: 'ACOMPANHAMENTOS' },
  { id: 'bebidas', name: 'REFRIS' },
];

export const IMGUR_PLACEHOLDER = 'ITEM_IMAGE_URL_HERE';
const IMGUR_DRINK_PLACEHOLDER = 'https://i.imgur.com/tqVqFoa.png';

// Mantido por compatibilidade com o restante do sistema/API.
export const CONST_AVAILABLE_BORDAS: MenuItem[] = [];

export const CONST_INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'frango_inteiro',
    name: 'FRANGO ASSADO INTEIRO',
    description: 'Frango assado inteiro, dourado e suculento, acompanhado de farofa especial da casa.',
    price: 40.0,
    imageUrl: frangoInteiroImg,
    category: 'frango_assado',
    itemType: 'Frango',
    isAvailable: true,
  },
  {
    id: 'meio_frango',
    name: 'MEIO FRANGO ASSADO',
    description: 'Meio frango assado com pele crocante e uma porção generosa de farofa temperada.',
    price: 24.9,
    imageUrl: meioFrangoImg,
    category: 'frango_assado',
    itemType: 'Frango',
    isAvailable: true,
  },
  {
    id: 'quarto_frango',
    name: 'QUARTO DE FRANGO ASSADO',
    description: 'Porção individual de frango assado com farofa, ideal para uma refeição rápida e saborosa.',
    price: 18.9,
    imageUrl: meioFrangoImg,
    category: 'frango_assado',
    itemType: 'Frango',
    isAvailable: true,
  },
  {
    id: 'combo_individual',
    name: 'COMBO INDIVIDUAL',
    description: 'Frango assado, farofa, arroz branco e vinagrete em um combo completo para 1 pessoa.',
    price: 32.9,
    imageUrl: comboFrangoImg,
    category: 'combos',
    itemType: 'Combo',
    isAvailable: true,
  },
  {
    id: 'combo_casal',
    name: 'COMBO CASAL',
    description: 'Meio frango assado, farofa, arroz branco, vinagrete e batata rústica para compartilhar.',
    price: 54.9,
    imageUrl: comboFrangoImg,
    category: 'combos',
    itemType: 'Combo',
    isAvailable: true,
  },
  {
    id: 'combo_familia',
    name: 'COMBO FAMÍLIA',
    description: 'Frango assado inteiro com farofa, batatas rústicas e acompanhamentos para toda a família.',
    price: 79.9,
    imageUrl: frangoFamilyImg,
    category: 'combos',
    itemType: 'Combo',
    isAvailable: true,
  },
  {
    id: 'farofa_especial',
    name: 'FAROFA ESPECIAL',
    description: 'Farofa crocante e bem temperada para acompanhar o seu frango assado.',
    price: 8.0,
    imageUrl: frangoFamilyImg,
    category: 'acompanhamentos',
    itemType: 'Acompanhamento',
    isAvailable: true,
  },
  {
    id: 'arroz_branco',
    name: 'ARROZ BRANCO',
    description: 'Porção de arroz branco soltinho, ideal para acompanhar o frango assado.',
    price: 8.0,
    imageUrl: comboFrangoImg,
    category: 'acompanhamentos',
    itemType: 'Acompanhamento',
    isAvailable: true,
  },
  {
    id: 'vinagrete',
    name: 'VINAGRETE',
    description: 'Vinagrete fresco com tomate, cebola e ervas.',
    price: 7.0,
    imageUrl: comboFrangoImg,
    category: 'acompanhamentos',
    itemType: 'Acompanhamento',
    isAvailable: true,
  },
  {
    id: 'batata_rustica',
    name: 'BATATA RÚSTICA',
    description: 'Batatas assadas e douradas para completar o pedido.',
    price: 12.0,
    imageUrl: frangoInteiroImg,
    category: 'acompanhamentos',
    itemType: 'Acompanhamento',
    isAvailable: true,
  },
  {
    id: 'bebida_coca_lata',
    name: 'COCA-COLA LATA',
    description: 'Refrigerante Coca-Cola lata 350ml.',
    price: 6.0,
    imageUrl: 'https://i.imgur.com/zBrS9Xu.png',
    category: 'bebidas',
    itemType: 'Bebida',
    isAvailable: true,
  },
  {
    id: 'bebida_guarana_lata',
    name: 'GUARANÁ ANTARCTICA LATA',
    description: 'Refrigerante Guaraná Antarctica lata 350ml.',
    price: 5.5,
    imageUrl: 'https://i.imgur.com/AHYGLUx.png',
    category: 'bebidas',
    itemType: 'Bebida',
    isAvailable: true,
  },
  {
    id: 'bebida_fanta_lata',
    name: 'FANTA LARANJA LATA',
    description: 'Refrigerante Fanta Laranja lata 350ml.',
    price: 5.5,
    imageUrl: IMGUR_DRINK_PLACEHOLDER,
    category: 'bebidas',
    itemType: 'Bebida',
    isAvailable: true,
  },
  {
    id: 'bebida_coca_2l',
    name: 'COCA-COLA 2L',
    description: 'Refrigerante Coca-Cola garrafa 2 litros.',
    price: 13.0,
    imageUrl: IMGUR_DRINK_PLACEHOLDER,
    category: 'bebidas',
    itemType: 'Bebida',
    isAvailable: true,
  },
];

export const PROMOTIONS: Promotion[] = [];
export const CUSTOMER_REVIEWS: CustomerReview[] = [];

export const AVAILABLE_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'credit_card', name: 'Cartão de Crédito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'debit_card', name: 'Cartão de Débito', icon: <CreditCardIcon className="mr-2" /> },
  { id: 'pix', name: 'PIX', icon: <PixIcon className="mr-2" /> },
  { id: 'cash', name: 'Dinheiro', icon: <MoneyBillIcon className="mr-2" />, description: 'Pagamento na entrega/retirada' },
];

export const CONST_AVAILABLE_COUPONS: Coupon[] = [
  {
    id: 'cupom_pollos10',
    code: 'POLLOS10',
    description: '10% de desconto em pedidos acima de R$ 50,00.',
    discountType: 'percentage',
    value: 10,
    isActive: true,
    minOrderValue: 50,
    expiryDate: '2026-12-31',
  },
];
