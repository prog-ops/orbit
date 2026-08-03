import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any value.
 * Useful for optimizing search inputs and preventing excessive recalculations or API calls.
 *
 * @template T - Type of the value to debounce
 * @param {T} value - The input value to be debounced
 * @param {number} delay - Debounce delay in milliseconds (default 300ms)
 * @returns {T} - The debounced value
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
