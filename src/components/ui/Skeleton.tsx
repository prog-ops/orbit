import React from 'react';

/**
 * Props for Skeleton component.
 */
export interface SkeletonProps {
  /** Width value (e.g. '100%', '200px') */
  width?: string;
  /** Height value (e.g. '1rem', '200px') */
  height?: string;
  /** Border radius inline style */
  borderRadius?: string;
  /** Additional inline style */
  style?: React.CSSProperties;
}

/**
 * Skeleton placeholder component for loading states.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-sm)',
  style,
}) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};
