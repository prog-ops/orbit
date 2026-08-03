import React from 'react';
import { CartItem as CartItemType } from '../../../types';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus, Package } from 'lucide-react';

/**
 * Props for CartItem component.
 */
export interface CartItemProps {
  /** Cart item data containing product and quantity */
  item: CartItemType;
}

/**
 * Cart Item Component.
 * Displays individual cart product with direct quantity editing, step multipliers (+1, -1, +5),
 * subtotal calculation, and remove confirmation trigger.
 */
export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setItemToRemove = useCartStore((state) => state.setItemToRemove);

  const subtotal = product.price * quantity;

  const handleQtyChange = (delta: number) => {
    updateQuantity(product.id, quantity + delta);
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      updateQuantity(product.id, val);
    } else if (e.target.value === '') {
      updateQuantity(product.id, 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <Package size={24} />
      </div>

      <div className="cart-item-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 className="cart-item-name">{product.name}</h4>
          <button
            type="button"
            className="close-btn"
            style={{ color: '#ef4444', padding: '2px' }}
            onClick={() => setItemToRemove(product)}
            title="移除商品"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart-item-price">NT$ {product.price.toLocaleString()}</div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
          }}
        >
          {/* Quantity Controls fixing quantity multiples issue */}
          <div className="qty-selector">
            <button
              type="button"
              className="qty-btn"
              onClick={() => handleQtyChange(-1)}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <input
              type="number"
              className="qty-input"
              value={quantity}
              onChange={handleDirectInput}
              min="1"
              aria-label="Quantity"
            />
            <button
              type="button"
              className="qty-btn"
              onClick={() => handleQtyChange(1)}
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
            NT$ {subtotal.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
