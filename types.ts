import React from 'react';

export type ItemType = 'Tradicional' | 'Especial' | 'Doce' | 'Borda' | 'Bebida';

export interface RestaurantInfo {
  name: string;
  logoUrl: string;
  tagline1?: string; // For "DA BEL"
  tagline2?: string; // For "26CM"
  operatingHours: string; // Can be used for other info if needed
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  address: string;
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  bookingLink: string;
  deliveryLink: string;
}

export interface MenuItem {
  id: string; // Unique ID for the base item (pastel, bebida, borda definition)
  name:string; 
  description: string; 
  price: number; 
  imageUrl?: string; // Optional, as bordas won't have images
  category: string; // Matches Category id (for pastéis and bebidas)
  itemType?: ItemType; 
  tags?: string[]; 
  options?: string[];
  isAvailable: boolean; // Novo campo para disponibilidade
}

export interface CartItem extends MenuItem { // MenuItem properties here are the base pastel/bebida
  cartItemId: string; // Unique ID for this specific cart entry, e.g., "pastel_carne_borda_cheddar"
  baseItemName: string; // Original name of the pastel or bebida
  quantity: number;
  selectedBorda?: MenuItem; // The selected borda item, if applicable
  // The 'name' property in CartItem will be composite (e.g., "Pastel de Carne (Borda: Cheddar)")
  // The 'price' property in CartItem will be pastel.price + (selectedBorda?.price || 0)
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode; 
  price?: string; 
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number; 
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number; 
  comment: string;
  avatarUrl?: string;
}

export interface Filters {
  category?: string;
  preferences: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode; 
  description?: string; 
}

// Authentication Types
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean; // For customer email verification
  // password will not be stored here directly in a real app
}

export type AuthView = 'login' | 'register' | 'verifyEmail';

export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>; // Returns true if verification email "sent"
  logout: () => void;
  sendVerificationEmail: (email: string) => Promise<string | null>; // Returns mock code or null on error
  verifyEmailCode: (email: string, code: string) => Promise<boolean>; // Returns true if code is correct
  clearAuthError: () => void;
}

// Coupon Type
export interface Coupon {
  id: string;
  code: string; // Unique code for the coupon
  description?: string; // Brief description
  discountType: 'percentage' | 'fixed'; // Type of discount
  value: number; // Discount value (percentage or fixed amount)
  isActive: boolean; // If the coupon is currently active
  expiryDate?: string; // Optional expiry date (e.g., "YYYY-MM-DD")
  minOrderValue?: number; // Optional minimum order value to apply coupon
  uses?: number; // Optional: how many times it has been used
  maxUses?: number; // Optional: max number of uses
}