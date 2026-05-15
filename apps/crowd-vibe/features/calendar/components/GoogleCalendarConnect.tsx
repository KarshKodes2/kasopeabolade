'use client';

import { useGoogleCalendar } from '../hooks/useGoogleCalendar';

export function GoogleCalendarConnect({ connected }: { connected: boolean }) {
  const { connect, disconnect, connecting, disconnecting } = useGoogleCalendar();

  if (connected) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Calendar synced — confirmed bookings auto-create events
        </div>
        <button
          onClick={disconnect}
          disabled={disconnecting}
          className="ml-auto rounded-lg border px-4 py-2 text-sm text-white/40 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
          style={{ borderColor: 'var(--cv-border)' }}
        >
          {disconnecting ? 'Disconnecting...' : 'Disconnect'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={connecting}
      className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-[var(--cv-brand)] hover:bg-[rgba(124,58,237,0.08)] disabled:opacity-40"
      style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-elevated)' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {connecting ? 'Redirecting to Google...' : 'Connect Google Calendar'}
    </button>
  );
}
