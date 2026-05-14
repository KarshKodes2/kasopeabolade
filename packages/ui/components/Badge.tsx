import * as React from 'react';
import { cn } from '../utils/cn';

type BadgeVariant =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'paid'
  | 'quote_sent'
  | 'completed'
  | 'active'
  | 'suspended'
  | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  paid: 'bg-green-500/15 text-green-400 border-green-500/30',
  completed: 'bg-green-600/15 text-green-300 border-green-600/30',
  quote_sent: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  suspended: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  default: 'bg-white/10 text-white/60 border-white/20',
};

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
