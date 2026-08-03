import { useState, useEffect } from 'react';

/**
 * Custom hook to subscribe to CSS media query changes.
 *
 * @param {string} query - The CSS media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} - Returns true if the media query matches, false otherwise.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
