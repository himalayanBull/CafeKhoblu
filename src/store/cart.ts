import { create } from 'zustand';
import { Dish } from '@/types';

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (dish) =>
    set((state) => {
      const existing = state.items.find((item) => item.dish.id === dish.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { dish, quantity: 1 }] };
    }),

  removeItem: (dishId) =>
    set((state) => ({
      items: state.items.filter((item) => item.dish.id !== dishId),
    })),

  updateQuantity: (dishId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.dish.id !== dishId) };
      }
      return {
        items: state.items.map((item) =>
          item.dish.id === dishId ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  setIsOpen: (isOpen) => set({ isOpen }),

  getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  getTotalPrice: () => get().items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
}));
