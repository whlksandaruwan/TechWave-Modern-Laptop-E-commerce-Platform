import axios from 'axios';
import {
  Laptop,
  Category,
  User,
  Cart,
  Order,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  WishlistItem,
  WishlistResponse
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Check if we're in a browser environment and if localhost is accessible
const isLocalhostAvailable = () => {
  // If we're on GitHub Pages or any other domain, localhost won't be available
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }
  return false;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000, // 3 second timeout
});

// Mock data for GitHub Pages deployment
const mockLaptops = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3 Pro',
    description: 'Powerful laptop with M3 Pro chip, perfect for professionals and developers.',
    price: 2499.99,
    specs: {
      processor: 'Apple M3 Pro',
      ram: '18GB Unified Memory',
      storage: '512GB SSD',
      display: '16-inch Liquid Retina XDR',
      graphics: 'M3 Pro Integrated GPU',
      battery: 'Up to 22 hours'
    },
    images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
    stock: 10,
    categoryId: 'apple',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with stunning display and powerful performance.',
    price: 1999.99,
    specs: {
      processor: 'Intel Core i9-13900H',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6" 4K OLED Touch',
      graphics: 'NVIDIA RTX 4070',
      battery: 'Up to 13 hours'
    },
    images: ['https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
    stock: 15,
    categoryId: 'creator',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'ASUS ROG Strix G15',
    description: 'Gaming powerhouse with RTX graphics and high refresh rate display.',
    price: 1599.99,
    specs: {
      processor: 'AMD Ryzen 7 6800H',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6" 144Hz FHD',
      graphics: 'NVIDIA RTX 4060',
      battery: 'Up to 8 hours'
    },
    images: ['https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    stock: 25,
    categoryId: 'gaming',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'MacBook Air M2',
    description: 'Ultra-portable laptop with incredible battery life and performance.',
    price: 1199.99,
    specs: {
      processor: 'Apple M2',
      ram: '8GB Unified Memory',
      storage: '256GB SSD',
      display: '13.6" Liquid Retina',
      graphics: 'M2 Integrated GPU',
      battery: 'Up to 18 hours'
    },
    images: ['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
    stock: 30,
    categoryId: 'apple',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Enhanced API functions with fallback to mock data
export const getLaptops = async () => {
  try {
    const response = await api.get('/laptops');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using mock data');
    return mockLaptops;
  }
};

export const getLaptop = async (id: string) => {
  try {
    const response = await api.get(`/laptops/${id}`);
    return response.data;
  } catch (error) {
    console.log('Backend not available, using mock data');
    return mockLaptops.find(laptop => laptop.id === id) || null;
  }
};

export const getFeaturedLaptops = async () => {
  try {
    const response = await api.get('/laptops/featured');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using mock featured data');
    return mockLaptops.filter(laptop => laptop.featured);
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using mock categories');
    return [
      { id: 'apple', name: 'Apple', description: 'MacBooks and Macs' },
      { id: 'gaming', name: 'Gaming', description: 'Gaming laptops' },
      { id: 'creator', name: 'Creator', description: 'Professional creator laptops' },
      { id: 'business', name: 'Business', description: 'Business laptops' },
      { id: 'ultrabook', name: 'Ultrabook', description: 'Ultra-portable laptops' }
    ];
  }
};

// Authentication functions
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed - backend not available');
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed - backend not available');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error('Get current user failed - backend not available');
  }
};

// Cart functions
export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using empty cart');
    return { items: [], totalAmount: 0 };
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data;
  } catch (error) {
    throw new Error('Add to cart failed - backend not available');
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error('Remove from cart failed - backend not available');
  }
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  try {
    const response = await api.patch(`/cart/items/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error('Update cart item failed - backend not available');
  }
};

// Wishlist functions
export const getWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using empty wishlist');
    return [];
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const response = await api.post(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Add to wishlist failed - backend not available');
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Remove from wishlist failed - backend not available');
  }
};

// Orders functions
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.log('Backend not available, using empty orders');
    return [];
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw new Error('Create order failed - backend not available');
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Get order failed - backend not available');
  }
};

// Admin functions
export const deleteLaptop = async (id: string) => {
  try {
    const response = await api.delete(`/laptops/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Delete laptop failed - backend not available');
  }
};

export const createLaptop = async (laptopData: any) => {
  try {
    const response = await api.post('/laptops', laptopData);
    return response.data;
  } catch (error) {
    throw new Error('Create laptop failed - backend not available');
  }
};

export const updateLaptop = async (id: string, laptopData: any) => {
  try {
    const response = await api.put(`/laptops/${id}`, laptopData);
    return response.data;
  } catch (error) {
    throw new Error('Update laptop failed - backend not available');
  }
};

export default api; 