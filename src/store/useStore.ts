import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, Cart, Laptop, Category } from '../types/api';
import * as api from '../lib/api';

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // Cart
  cart: Cart | null;
  
  // Data
  laptops: Laptop[];
  categories: Category[];
  featuredLaptops: Laptop[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  fetchLaptops: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchFeaturedLaptops: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  clearError: () => void;
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        token: null,
        cart: null,
        laptops: [],
        categories: [],
        featuredLaptops: [],
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.login({ email, password });
            localStorage.setItem('auth_token', data.token);
            set({ 
              user: data.user, 
              isAuthenticated: true, 
              token: data.token,
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to login', 
              isLoading: false 
            });
          }
        },

        logout: () => {
          localStorage.removeItem('auth_token');
          set({ 
            user: null, 
            isAuthenticated: false, 
            token: null,
            cart: null 
          });
        },

        register: async (userData) => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.register(userData);
            localStorage.setItem('auth_token', data.token);
            set({ 
              user: data.user, 
              isAuthenticated: true, 
              token: data.token,
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to register', 
              isLoading: false 
            });
          }
        },

        fetchLaptops: async () => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.getLaptops();
            set({ laptops: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch laptops', 
              isLoading: false 
            });
          }
        },

        fetchCategories: async () => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.getCategories();
            set({ categories: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch categories', 
              isLoading: false 
            });
          }
        },

        fetchFeaturedLaptops: async () => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.getFeaturedLaptops();
            set({ featuredLaptops: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch featured laptops', 
              isLoading: false 
            });
          }
        },

        addToCart: async (productId: string, quantity: number) => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.addToCart(productId, quantity);
            set({ cart: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to add item to cart', 
              isLoading: false 
            });
          }
        },

        removeFromCart: async (itemId: string) => {
          try {
            set({ isLoading: true, error: null });
            await api.removeFromCart(itemId);
            const { data } = await api.getCart();
            set({ cart: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to remove item from cart', 
              isLoading: false 
            });
          }
        },

        updateCartItem: async (itemId: string, quantity: number) => {
          try {
            set({ isLoading: true, error: null });
            const { data } = await api.updateCartItem(itemId, quantity);
            set({ cart: data, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update cart item', 
              isLoading: false 
            });
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'laptop-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useStore; 