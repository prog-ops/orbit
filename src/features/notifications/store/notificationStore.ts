import { create } from 'zustand';
import { ToastMessage, ToastType } from '../../../types';

/**
 * State and Action definitions for Notification Store.
 */
interface NotificationState {
  /** Array of active toasts */
  toasts: ToastMessage[];
  /** Add a toast notification */
  addToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  /** Remove a toast notification by ID */
  removeToast: (id: string) => void;
}

/**
 * Zustand store for managing global toast notifications.
 */
export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],

  addToast: (message, type = 'success', title, duration = 3500) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type, title, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto dismiss toast after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
