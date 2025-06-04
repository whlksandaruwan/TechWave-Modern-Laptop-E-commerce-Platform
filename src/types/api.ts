import { Product } from './index';

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  rating: number;
  category: string;
  featured: boolean;
  images: string[];
  slug: string;
  specifications: {
    processor: string;
    memory: string;
    storage: string;
    display: string;
    graphics: string;
    operatingSystem: string;
    battery: string;
    weight: string;
    ports: string[];
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  laptop: Laptop;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  userId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface WishlistItem {
  id: string;
  laptop: Laptop;
  userId: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
} 