
import React from 'react';

export type ItemType = 'Tradicional' | 'Especial' | 'Doce' | 'Borda' | 'Bebida';

export interface RestaurantInfo {
  name: string;
  logoUrl: string;
  tagline1?: string; 
  tagline2?: string; 
  operatingHours: string; 
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
  id: string; 
  name:string; 
  description: string; 
  price: number; 
  imageUrl?: string; 
  category: string; 
  itemType?: ItemType; 
  tags?: string[]; 
  options?: string[];
  isAvailable: boolean; 
}

export interface CartItem extends MenuItem { 
  cartItemId: string; 
  baseItemName: string; 
  quantity: number;
  selectedBorda?: MenuItem; 
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

// Coupon Type
export interface Coupon {
  id: string;
  code: string; 
  description?: string; 
  discountType: 'percentage' | 'fixed'; 
  value: number; 
  isActive: boolean; 
  expiryDate?: string; 
  minOrderValue?: number; 
  uses?: number; 
  maxUses?: number; 
}

// FIX: Define AuthView type
export type AuthView = 'login' | 'register' | 'verifyEmail';

// FIX: Define UserRole type
export type UserRole = 'admin' | 'customer';

// FIX: Define User interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  name?: string; // Optional name field
}

// FIX: Define AuthContextType
export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>; // Returns true if verification email "sent"
  logout: () => void;
  sendVerificationEmail: (email: string) => Promise<string | null>; // Returns code for mock, null on failure
  verifyEmailCode: (email: string, code: string) => Promise<boolean>;
  clearAuthError: () => void;
}
