import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../../../components/ui/Button';
import { CreditCard } from 'lucide-react';

/**
 * Cart Summary Component.
 * Displays total quantities, total price, and checkout trigger button.
 */
export const CartSummary: React.FC = () => {
  const { getTotalQuantity, getTotalPrice, setCheckoutModalOpen, items } = useCartStore();

  const totalQty = getTotalQuantity();
  const totalPrice = getTotalPrice();
  const isCartEmpty = items.length === 0;

  return (
    <div className="cart-footer">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '0.4rem',
        }}
      >
        <span>商品總件數：</span>
        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{totalQty} 件</span>
      </div>

      <div className="cart-total-row">
        <span>總計金额：</span>
        <span style={{ color: 'var(--accent)' }}>NT$ {totalPrice.toLocaleString()}</span>
      </div>

      <Button
        variant="accent"
        fullWidth
        size="lg"
        disabled={isCartEmpty}
        onClick={() => setCheckoutModalOpen(true)}
        aria-label="Proceed to Checkout"
      >
        <CreditCard size={18} />
        <span>結帳購物車</span>
      </Button>
    </div>
  );
};
