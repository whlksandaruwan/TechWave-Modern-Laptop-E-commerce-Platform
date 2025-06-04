import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';
import { mockProducts } from '../data/mockData';

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId: string, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.productId === productId 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { productId, quantity }],
          };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map(item => 
            item.productId === productId 
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = mockProducts.find(p => p.id === item.productId);
          if (!product) return total;
          
          const price = product.discountPercentage 
            ? product.price * (1 - product.discountPercentage / 100) 
            : product.price;
            
          return total + (price * item.quantity);
        }, 0);
      },
      
      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);