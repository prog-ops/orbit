import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback fired when modal is closed */
  onClose: () => void;
  /** Modal header title */
  title: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Optional footer action buttons */
  footer?: React.ReactNode;
  /** Maximum modal width class or inline style (default 500px) */
  maxWidth?: string;
}

/**
 * Reusable accessible Dialog Modal component.
 * Features keyboard ESC close support, backdrop click dismiss, and animated transition.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '500px',
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" style={{ maxWidth }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-actions">{footer}</div>}
      </div>
    </div>
  );
};
