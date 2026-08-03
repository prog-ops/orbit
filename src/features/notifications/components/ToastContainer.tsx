import React from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

/**
 * Toast Container Component.
 * Displays floating notification toasts at the bottom right of the viewport.
 */
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="toast-icon" size={20} color="#10b981" />;
            case 'error':
              return <XCircle className="toast-icon" size={20} color="#ef4444" />;
            case 'warning':
              return <AlertCircle className="toast-icon" size={20} color="#f59e0b" />;
            default:
              return <Info className="toast-icon" size={20} color="#6366f1" />;
          }
        };

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            {getIcon()}
            <div className="toast-content">
              {toast.title && <div className="toast-title">{toast.title}</div>}
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              className="close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
