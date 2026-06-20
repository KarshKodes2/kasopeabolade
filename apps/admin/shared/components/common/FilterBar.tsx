'use client';

import { Search, X } from 'lucide-react';

type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    value: string;
    onChange: (val: string) => void;
    options: FilterOption[];
    placeholder?: string;
  }>;
  total?: number;
  label?: string;
  actions?: React.ReactNode;
};

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filters = [],
  total,
  label,
  actions,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1" style={{ minWidth: '200px', maxWidth: '320px' }}>
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--cv-text-muted)' }}
        />
        <input
          className="admin-input"
          style={{ paddingLeft: '34px', paddingRight: search ? '34px' : undefined }}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--cv-text-muted)', lineHeight: 1 }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Filters */}
      {filters.map((f) => (
        <select
          key={f.key}
          className="admin-select"
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
        >
          <option value="">{f.placeholder ?? 'All'}</option>
          {f.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {/* Count */}
      {total !== undefined && label && (
        <p className="text-sm" style={{ color: 'var(--cv-text-muted)', marginLeft: 'auto' }}>
          {total} {label}
        </p>
      )}

      {/* Actions (e.g. Add button) */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
