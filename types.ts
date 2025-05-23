
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