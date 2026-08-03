import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Props for ProductSearch component.
 */
export interface ProductSearchProps {
  /** Current search input value */
  value: string;
  /** Callback fired when search text changes */
  onChange: (value: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
}

/**
 * Product Search Box Component.
 * Provides a responsive search input bar with an instant clear button.
 */
export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  placeholder = '搜尋商品名稱...',
}) => {
  return (
    <div className="search-box-container">
      <Search className="search-icon" />
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      {value && (
        <button
          type="button"
          className="clear-search-btn"
          onClick={() => onChange('')}
          aria-label="Clear search input"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
