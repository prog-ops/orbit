import React, { useState } from 'react';
import { useCartStore } from '../../cart/store/cartStore';
import { useNotificationStore } from '../../notifications/store/notificationStore';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, CreditCard } from 'lucide-react';

/**
 * Checkout Dialog Modal Component.
 * Fulfills Requirement 1 for checkout dialog window with order summary, simulated payment processing, and state reset.
 */
export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutModalOpen,
    setCheckoutModalOpen,
    getTotalPrice,
    getTotalQuantity,
    clearCart,
    setDrawerOpen,
  } = useCartStore();
  const addToast = useNotificationStore((state) => state.addToast);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const totalPrice = getTotalPrice();
  const totalQty = getTotalQuantity();

  const handleClose = () => {
    if (isProcessing) return;
    setCheckoutModalOpen(false);
    // Reset state after dialog animation finishes
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  const handleConfirmCheckout = () => {
    setIsProcessing(true);

    // Simulate payment API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      addToast('結帳成功！感謝您的購買。', 'success', '訂單完成');

      // Auto close dialog after 2s
      setTimeout(() => {
        setCheckoutModalOpen(false);
        setDrawerOpen(false);
        setIsSuccess(false);
      }, 2000);
    }, 1200);
  };

  return (
    <Modal
      isOpen={isCheckoutModalOpen}
      onClose={handleClose}
      title={isSuccess ? '訂單結帳完成' : '確認結帳訂單'}
      footer={
        !isSuccess ? (
          <>
            <Button variant="secondary" onClick={handleClose} disabled={isProcessing}>
              取消返回
            </Button>
            <Button
              variant="accent"
              onClick={handleConfirmCheckout}
              isLoading={isProcessing}
            >
              <CreditCard size={16} />
              <span>確認付款 NT$ {totalPrice.toLocaleString()}</span>
            </Button>
          </>
        ) : null
      }
    >
      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <CheckCircle2
            size={64}
            color="#10b981"
            style={{ marginBottom: '1rem', animation: 'pulseBadge 0.4s ease' }}
          />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            交易成功！
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            感謝您的訂購，我們已收到您的訂單並開始為您準備商品。
          </p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            請確認您的購物車明細及結帳金額：
          </p>

          <div
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#f8fafc',
            }}
          >
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0',
                  borderBottom: '1px dashed #e2e8f0',
                  fontSize: '0.9rem',
                }}
              >
                <span>
                  {item.product.name} <strong style={{ color: 'var(--primary)' }}>x{item.quantity}</strong>
                </span>
                <span style={{ fontWeight: 600 }}>
                  NT$ {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: '#eef2ff',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>總件數：</span>
              <strong style={{ marginLeft: '0.25rem' }}>{totalQty} 件</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>應付總額：</span>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent)', marginLeft: '0.4rem' }}>
                NT$ {totalPrice.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
