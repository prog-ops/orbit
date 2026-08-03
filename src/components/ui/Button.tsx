import React from 'react';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width modifier */
  fullWidth?: boolean;
  /** Loading state flag */
  isLoading?: boolean;
}

/**
 * Reusable Button component with loading spinner support and accessible styling.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const fullWidthClass = fullWidth ? 'btn-full' : '';
  const sizePadding = size === 'sm' ? '0.4rem 0.8rem' : size === 'lg' ? '0.8rem 1.6rem' : '0.6rem 1.2rem';
  const fontSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.05rem' : '0.95rem';

  return (
    <button
      className={`btn ${variantClass} ${fullWidthClass} ${className}`}
      style={{ padding: sizePadding, fontSize }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner" style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite'
          }} />
          <span>載入中...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
