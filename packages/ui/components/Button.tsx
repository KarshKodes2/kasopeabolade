'use client';

import * as React from 'react';
import { cn } from '../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--cv-brand,#7C3AED)] text-white hover:opacity-90 shadow-[0_0_20px_var(--cv-glow,rgba(124,58,237,0.35))]',
  secondary:
    'bg-[var(--cv-surface,#111)] border border-[var(--cv-border,#2a2a2a)] text-white hover:border-[var(--cv-brand,#7C3AED)]',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  danger:
    'bg-red-600 text-white hover:bg-red-700',
  accent:
    'bg-[var(--cv-accent,#F59E0B)] text-black font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(245,158,11,0.35)]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cv-brand,#7C3AED)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
