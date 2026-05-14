import * as React from 'react';
import { cn } from '../utils/cn';

interface StatProps {
  label: string;
  value: string | number;
  trend?: { value: number; label?: string };
  icon?: React.ReactNode;
  className?: string;
}

export function Stat({ label, value, trend, icon, className }: StatProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--cv-border,#2a2a2a)] bg-[var(--cv-surface,#111)] p-5',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-white/50">{label}</p>
        {icon && <span className="text-[var(--cv-brand,#7C3AED)] opacity-70">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {trend && (
        <p
          className={cn(
            'mt-1 text-xs font-medium',
            trend.value >= 0 ? 'text-green-400' : 'text-red-400',
          )}
        >
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ''}
        </p>
      )}
    </div>
  );
}
