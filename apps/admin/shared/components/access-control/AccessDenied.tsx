import { ShieldX } from 'lucide-react';
import Link from 'next/link';

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: '60vh', gap: '16px' }}>
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
      >
        <ShieldX size={28} color="#ef4444" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--cv-text)' }}>
          Access Denied
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          You don't have permission to view this section.
        </p>
      </div>
      <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>
        Back to Dashboard
      </Link>
    </div>
  );
}
