import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Product } from '../../../types';

/**
 * Custom TanStack Query hook to fetch and manage product catalog data.
 * Handles automatic caching, loading states, and error handling.
 *
 * @returns Object containing products array, loading state, error state, and refetch handler
 */
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: productService.fetchProducts,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2,
  });
}
