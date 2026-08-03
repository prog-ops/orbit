import React from 'react';
import { Product } from '../../../types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Button } from '../../../components/ui/Button';
import { PackageSearch, AlertCircle } from 'lucide-react';

/**
 * Props for ProductGrid component.
 */
export interface ProductGridProps {
  /** Array of products to render */
  products: Product[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Error state object if fetch fails */
  error: Error | null;
  /** Callback to retry fetching products */
  onRetry?: () => void;
  /** Active search query string */
  searchQuery?: string;
}

/**
 * Product Grid Component.
 * Displays grid layout of product cards, skeleton loaders, error states, and empty search results.
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  error,
  onRetry,
  searchQuery = '',
}) => {
  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="products-grid">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="product-card"
            style={{ height: '360px', pointerEvents: 'none' }}
          >
            <Skeleton height="180px" borderRadius="var(--radius-sm)" />
            <div style={{ padding: '1rem 0' }}>
              <Skeleton height="1.25rem" width="80%" style={{ marginBottom: '0.5rem' }} />
              <Skeleton height="1rem" width="60%" style={{ marginBottom: '1rem' }} />
              <Skeleton height="1.5rem" width="40%" />
            </div>
            <Skeleton height="2.5rem" borderRadius="var(--radius-sm)" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: '#fff1f2',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #fecdd3',
          margin: '2rem 0',
        }}
      >
        <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', color: '#9f1239', marginBottom: '0.5rem' }}>
          載入商品時發生錯誤
        </h3>
        <p style={{ color: '#be123c', marginBottom: '1.5rem' }}>{error.message}</p>
        {onRetry && (
          <Button variant="danger" onClick={onRetry}>
            重新嘗試
          </Button>
        )}
      </div>
    );
  }

  // Empty Search Result State
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)',
          margin: '2rem 0',
        }}
      >
        <PackageSearch size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          找不到符合的商品
        </h3>
        <p style={{ color: 'var(--text-muted)' }}>
          {searchQuery
            ? `找不到與「${searchQuery}」相關的商品，請嘗試其他關鍵字`
            : '目前尚無商品上架'}
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
