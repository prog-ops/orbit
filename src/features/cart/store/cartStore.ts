import { create } from 'zustand';
import { CartItem, Product } from '../../../types';

/**
 * State & Action definitions for Cart Store.
 */
interface CartState {
  /** Array of cart items */
  items: CartItem[];
  /** Flag controlling cart sidebar visibility */
  isDrawerOpen: boolean;
  /** Item queued for removal confirmation dialog */
  itemToRemove: Product | null;
  /** Checkout confirmation modal visibility */
  isCheckoutModalOpen: boolean;

  /** Toggle cart drawer open/close */
  toggleDrawer: () => void;
  /** Set cart drawer open state */
  setDrawerOpen: (open: boolean) => void;

  /**
   * Add a product to the cart with specified quantity.
   * Resolves multiples bug by ensuring strict numeric addition.
   */
  addItem: (product: Product, quantity?: number) => void;

  /**
   * Update quantity of a specific item in cart.
   * Safely handles multiples, steps, and numeric conversion.
   */
  updateQuantity: (productId: number, quantity: number) => void;

  /** Remove item directly from cart */
  removeItem: (productId: number) => void;

  /** Prompt confirmation dialog for removing item */
  setItemToRemove: (product: Product | null) => void;

  /** Set checkout modal open state */
  setCheckoutModalOpen: (open: boolean) => void;

  /** Clear all items from cart */
  clearCart: () => void;

  /** Helper getter: Returns total unique items */
  getUniqueCount: () => number;

  /** Helper getter: Returns total total quantity across all items (Requirement 3) */
  getTotalQuantity: () => number;

  /** Helper getter: Returns total cost of cart items */
  getTotalPrice: () => number;
}

/**
 * Zustand Store for Cart management.
 * Guarantees clean state mutations and fixes quantity multiples calculations.
 */
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  itemToRemove: null,
  isCheckoutModalOpen: false,

  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),

  addItem: (product, qty = 1) => {
    // Ensure quantity is parsed strictly as a positive integer number
    const quantityToAdd = Math.max(1, Math.floor(Number(qty) || 1));

    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        // Product exists -> update quantity strictly adding numbers
        const updatedItems = [...state.items];
        const currentQty = Number(updatedItems[existingIndex].quantity) || 0;
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: currentQty + quantityToAdd,
        };
        return { items: updatedItems };
      } else {
        // Product is new -> insert to cart
        return {
          items: [...state.items, { product, quantity: quantityToAdd }],
        };
      }
    });
  },

  updateQuantity: (productId, newQuantity) => {
    const parsedQty = Math.floor(Number(newQuantity));

    set((state) => {
      if (parsedQty <= 0) {
        // If quantity set to 0 or negative, remove from cart
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        items: state.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: parsedQty }
            : item
        ),
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
      itemToRemove: null,
    }));
  },

  setItemToRemove: (product) => set({ itemToRemove: product }),

  setCheckoutModalOpen: (open) => set({ isCheckoutModalOpen: open }),

  clearCart: () => set({ items: [] }),

  getUniqueCount: () => get().items.length,

  getTotalQuantity: () =>
    get().items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),

  getTotalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * (Number(item.quantity) || 0),
      0
    ),
}));
