import React, { useState } from 'react';
import { Product } from '../../../types';
import { useCartStore } from '../../cart/store/cartStore';
import { useNotificationStore } from '../../notifications/store/notificationStore';
import { Button } from '../../../components/ui/Button';
import { ShoppingCart, Package, Plus, Minus } from 'lucide-react';

/**
 * Props for ProductCard component.
 */
export interface ProductCardProps {
  /** Product data object */
  product: Product;
}

/**
 * Product Card Component.
 * Displays product image, title, price, quantity multiplier selector, and Add-to-Cart trigger.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useNotificationStore((state) => state.addToast);

  const handleAddToCart = () => {
    addItem(product, selectedQty);
    addToast(
      `已將 ${selectedQty} 件「${product.name}」加入購物車`,
      'success',
      '加入購物車成功'
    );
    // Reset local quantity selector back to 1 for convenience
    setSelectedQty(1);
  };

  const handleQtyChange = (delta: number) => {
    setSelectedQty((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setSelectedQty(val);
    } else if (e.target.value === '') {
      setSelectedQty(1);
    }
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-image-container">
        <Package className="product-image-icon" />
        <span style={{ fontSize: '0.85rem' }}>{product.category || '商品圖片'}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="product-title">{product.name}</h3>
        {product.description && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            {product.description}
          </p>
        )}
        <div className="product-price">NT$ {product.price.toLocaleString()}</div>
      </div>

      <div className="card-actions" style={{ marginTop: 'auto', gap: '0.5rem' }}>
        {/* Multiples quantity selector */}
        <div className="qty-selector">
          <button
            type="button"
            className="qty-btn"
            onClick={() => handleQtyChange(-1)}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            className="qty-input"
            value={selectedQty}
            onChange={handleInputChange}
            min="1"
            aria-label="Quantity"
          />
          <button
            type="button"
            className="qty-btn"
            onClick={() => handleQtyChange(1)}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <Button
          variant="primary"
          onClick={handleAddToCart}
          style={{ flex: 1 }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={16} />
          <span>加入購物車</span>
        </Button>
      </div>
    </div>
  );
};
