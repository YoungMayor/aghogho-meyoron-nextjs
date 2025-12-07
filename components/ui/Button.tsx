import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles - Soft UI with rounded corners
  const baseStyles = [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl font-medium',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' ');

  // Variant styles - Soft UI with gradients and subtle shadows
  const variantStyles = {
    primary:
      'bg-primary text-primary-foreground hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-[1.02] focus:ring-primary dark:shadow-[0_4px_12px_rgba(255,255,255,0.2)]',
    secondary:
      'bg-secondary text-secondary-foreground hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-[1.02] focus:ring-muted-foreground',
    outline:
      'bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-[1.02] focus:ring-primary',
    ghost:
      'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-muted-foreground',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
