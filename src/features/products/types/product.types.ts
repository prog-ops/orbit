import { Product } from '../../../types';

export type { Product };

/**
 * Filter options for product searching.
 */
export interface ProductSearchFilter {
  /** Keyword search parameter */
  keyword: string;
}
