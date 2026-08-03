import React from 'react';
import { useCartStore } from '../store/cartStore';
import { CartItemComponent } from './CartItem';
import { CartSummary } from './CartSummary';
import { ShoppingBag, X } from 'lucide-react';

/**
 * Cart Drawer Component.
 * Responsive sidebar sliding from right showing active items and totals.
 */
export const CartDrawer: React.FC = () => {
  const { items, isDrawerOpen, setDrawerOpen, getTotalQuantity } = useCartStore();

  const totalQty = getTotalQuantity();

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`cart-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Cart Sidebar */}
      <aside className={`cart-sidebar ${isDrawerOpen ? 'open' : ''}`} aria-label="Shopping Cart">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={22} color="var(--primary)" />
            <span>購物車 ({totalQty})</span>
          </div>
          <button
            className="close-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={56} strokeWidth={1.5} />
              <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>購物車是空的</p>
              <p style={{ fontSize: '0.85rem' }}>快去挑選喜歡的商品加入吧！</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItemComponent key={item.product.id} item={item} />
            ))
          )}
        </div>

        {items.length > 0 && <CartSummary />}
      </aside>
    </>
  );
};
