type Status =
  | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED'
  | 'PENDING' | 'QUOTE_SENT' | 'CONFIRMED' | 'DEPOSIT_PAID' | 'COMPLETED'
  | 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST'
  | 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE'
  | 'TRIALING' | 'PAST_DUE'
  | 'PUBLISHED' | 'DRAFT'
  | 'PERSONAL' | 'PORTFOLIO' | 'CORPORATE' | 'REDIRECT'
  | string;

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  // Tenant status
  ACTIVE:        { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  SUSPENDED:     { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },
  CANCELLED:     { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af' },

  // Booking status
  PENDING:       { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  QUOTE_SENT:    { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  CONFIRMED:     { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  DEPOSIT_PAID:  { bg: 'rgba(124,58,237,0.12)',  color: '#a78bfa' },
  COMPLETED:     { bg: 'rgba(16,185,129,0.08)',  color: '#6ee7b7' },

  // Lead status
  NEW:           { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  CONTACTED:     { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  PROPOSAL_SENT: { bg: 'rgba(124,58,237,0.12)',  color: '#a78bfa' },
  NEGOTIATION:   { bg: 'rgba(245,158,11,0.12)',  color: '#fcd34d' },
  WON:           { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  LOST:          { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },

  // Plan
  FREE:          { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af' },
  STARTER:       { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  PRO:           { bg: 'rgba(124,58,237,0.12)',  color: '#a78bfa' },
  ENTERPRISE:    { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },

  // Subscription
  TRIALING:      { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  PAST_DUE:      { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },

  // Post
  PUBLISHED:     { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  DRAFT:         { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af' },

  // Site type
  PERSONAL:      { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  PORTFOLIO:     { bg: 'rgba(124,58,237,0.12)',  color: '#a78bfa' },
  CORPORATE:     { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  REDIRECT:      { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af' },
};

const FALLBACK = { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af' };

type Props = {
  status: Status;
  label?: string;
};

export function StatusBadge({ status, label }: Props) {
  const style = STATUS_STYLES[status] ?? FALLBACK;
  return (
    <span
      className="badge"
      style={{ background: style.bg, color: style.color }}
    >
      {label ?? status.replace(/_/g, ' ')}
    </span>
  );
}
