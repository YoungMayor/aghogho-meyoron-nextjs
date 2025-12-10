import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import SpinnerIcon from '@/components/icons/SpinnerIcon';

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
          <SpinnerIcon className="h-4 w-4 animate-spin" />
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
