import React, { useState, useMemo } from 'react';
import { useProducts } from './features/products/hooks/useProducts';
import { ProductGrid } from './features/products/components/ProductGrid';
import { ProductSearch } from './features/products/components/ProductSearch';
import { CartDrawer } from './features/cart/components/CartDrawer';
import { RemoveItemModal } from './features/cart/components/RemoveItemModal';
import { CheckoutModal } from './features/checkout/components/CheckoutModal';
import { ToastContainer } from './features/notifications/components/ToastContainer';
import { useCartStore } from './features/cart/store/cartStore';
import { useDebounce } from './hooks/useDebounce';
import { ShoppingCart, Store, SlidersHorizontal } from 'lucide-react';

/**
 * Main Application Component.
 * Assembles header, search bar, product catalog grid, cart drawer, modals, and toast notifications.
 */
export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Fetch product dataset using TanStack Query
  const { data: products = [], isLoading, error, refetch } = useProducts();

  // Cart store state
  const { toggleDrawer, getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();

  // Filter products by debounced keyword search
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) return products;
    const term = debouncedQuery.toLowerCase().trim();
    return products.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      (item.category && item.category.toLowerCase().includes(term))
    );
  }, [products, debouncedQuery]);

  return (
    <div className="app-layout">
      {/* Site Header Navbar */}
      <header className="site-header">
        <div className="header-content">
          <div className="brand-title">
            <Store size={28} />
            <span>精品商店</span>
          </div>

          {/* Search Box - Requirement 4 */}
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜尋商品名稱 (例: 耳機, 鍵盤)..."
          />

          {/* Shopping Cart Icon Trigger - Requirement 3 */}
          <button
            className="cart-icon-btn"
            onClick={toggleDrawer}
            aria-label={`Open Cart (${totalQuantity} items)`}
          >
            <ShoppingCart size={20} />
            <span>購物車</span>
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-container">
        <div className="controls-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--text-muted)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {debouncedQuery ? `搜尋結果: 「${debouncedQuery}」` : '所有商品展示'}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              ({filteredProducts.length} 個商品)
            </span>
          </div>
        </div>

        {/* Product Grid View */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          searchQuery={debouncedQuery}
        />
      </main>

      {/* Cart Drawer Sidebar */}
      <CartDrawer />

      {/* Item Removal Dialog Modal - Requirement 1 */}
      <RemoveItemModal />

      {/* Checkout Dialog Modal - Requirement 1 */}
      <CheckoutModal />

      {/* Toast Notifications Container - Requirement 2 */}
      <ToastContainer />
    </div>
  );
};

export default App;
