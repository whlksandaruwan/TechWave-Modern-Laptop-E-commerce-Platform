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

console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Laptops
export const getLaptops = async (): Promise<Laptop[]> => {
  const response = await api.get<Laptop[]>('/laptops');
  return response.data;
};

export const getLaptop = async (id: string): Promise<Laptop> => {
  const response = await api.get<Laptop>(`/laptops/${id}`);
  return response.data;
};

export const createLaptop = async (laptop: Omit<Laptop, 'id' | 'createdAt' | 'updatedAt'>): Promise<Laptop> => {
  const response = await api.post<Laptop>('/laptops', laptop);
  return response.data;
};

export const getFeaturedLaptops = () => api.get<Laptop[]>('/laptops/featured');

export const updateLaptop = async (id: string, laptop: Partial<Laptop>): Promise<Laptop> => {
  const response = await api.patch<Laptop>(`/laptops/${id}`, laptop);
  return response.data;
};

export const deleteLaptop = async (id: string): Promise<void> => {
  await api.delete(`/laptops/${id}`);
};

// Categories
export const getCategories = () => api.get<Category[]>('/categories');
export const getLaptopsByCategory = (categoryId: string) => api.get<Laptop[]>(`/categories/${categoryId}/laptops`);

// Auth
export const login = (credentials: LoginCredentials) => api.post<AuthResponse>('/auth/login', credentials);
export const register = (userData: RegisterData) => api.post<AuthResponse>('/auth/register', userData);
export const getCurrentUser = () => api.get<User>('/auth/me');

// Orders
export const createOrder = (orderData: Partial<Order>) => api.post<Order>('/orders', orderData);
export const getOrders = () => api.get<Order[]>('/orders');
export const getOrderById = (id: string) => api.get<Order>(`/orders/${id}`);

// Cart
export const addToCart = (productId: string, quantity: number) => 
  api.post<Cart>('/cart/items', { productId, quantity });
export const removeFromCart = (itemId: string) => 
  api.delete<void>(`/cart/items/${itemId}`);
export const getCart = () => api.get<Cart>('/cart');
export const updateCartItem = (itemId: string, quantity: number) => 
  api.patch<Cart>(`/cart/items/${itemId}`, { quantity });

// Wishlist
export const getWishlistItems = () => api.get<WishlistResponse>('/wishlist');
export const addToWishlist = (productId: string) => api.post<WishlistItem>('/wishlist', { productId });
export const removeFromWishlist = (productId: string) => api.delete<void>(`/wishlist/${productId}`);

export default api; 