import { type ReactNode, type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...props
}: CardProps) {
  // Base styles - Soft UI with gradients
  const baseStyles = 'rounded-2xl transition-all duration-200';

  // Variant styles - Using soft gradients and ambient shadows
  const variantStyles = {
    default: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950',
    bordered:
      'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
    elevated:
      'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]',
  };

  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Hoverable styles - Soft UI hover effects
  const hoverStyles = hoverable
    ? 'cursor-pointer hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
