'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
};

export function AppPagination({ page, totalPages, onPageChange, pageSize, totalItems }: Props) {
  if (totalPages <= 1) return null;

  const start = totalItems && pageSize ? (page - 1) * pageSize + 1 : null;
  const end = totalItems && pageSize ? Math.min(page * pageSize, totalItems) : null;

  return (
    <div className="mt-4 flex items-center justify-between px-1">
      {start !== null && end !== null && totalItems ? (
        <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          Showing {start}–{end} of {totalItems}
        </p>
      ) : (
        <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
          Page {page} of {totalPages}
        </p>
      )}

      <div className="flex items-center gap-1">
        <button
          className="btn-ghost"
          style={{ padding: '6px 8px' }}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft size={15} />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNum = totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i;
          if (pageNum > totalPages) return null;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className="btn-ghost"
              style={{
                padding: '6px 10px',
                fontSize: '13px',
                background: pageNum === page ? 'rgba(124, 58, 237, 0.15)' : undefined,
                color: pageNum === page ? 'var(--cv-brand-light)' : undefined,
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="btn-ghost"
          style={{ padding: '6px 8px' }}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
