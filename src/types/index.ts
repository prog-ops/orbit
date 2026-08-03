/**
 * @file index.ts
 * @description Centralized domain type definitions for application-wide interfaces.
 */

/**
 * Interface representing a Product item in the store.
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;
  /** Name/title of the product */
  name: string;
  /** Unit price in New Taiwan Dollars (NT$) */
  price: number;
  /** Image URL or placeholder key */
  image: string;
  /** Optional category tag */
  category?: string;
  /** Product description */
  description?: string;
}

/**
 * Interface representing an item within the Shopping Cart.
 */
export interface CartItem {
  /** The product details */
  product: Product;
  /** Selected quantity of the product (must be > 0) */
  quantity: number;
}

/**
 * Toast Notification severity levels.
 */
export type ToastType = 'success' | 'info' | 'warning' | 'error';

/**
 * Interface representing a Toast Notification message.
 */
export interface ToastMessage {
  /** Unique ID for the toast notification */
  id: string;
  /** Main message text */
  message: string;
  /** Severity variant */
  type: ToastType;
  /** Optional title for the notification */
  title?: string;
  /** Auto-dismiss duration in milliseconds (defaults to 3000ms) */
  duration?: number;
}
