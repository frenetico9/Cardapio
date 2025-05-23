
import React from 'react';

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
  id: string;
  name:string; // Name of the pastel
  description: string; // For ingredients list like (Queijo, Presunto, Tomate e Orégano)
  price: number; // Individual item price, will be set by category group price
  imageUrl: string; // Placeholder for Imgur link, not displayed in this layout
  category: string; // Matches Category id
  tags?: string[]; 
  options?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode; // Kept for potential future use, but not used in current design
  price?: string; // Group price for the category, e.g., "R$ 17,00"
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