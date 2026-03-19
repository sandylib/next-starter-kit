import { create } from 'zustand';
import type { CartItem } from '@/domains/cart';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (newItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === newItem.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === newItem.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.productId !== productId) };
      }
      return {
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
