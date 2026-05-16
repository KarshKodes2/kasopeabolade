import Link from 'next/link';
import type { TenantEvent } from '../types';

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

interface Props {
  event: TenantEvent;
  slug: string;
}

export function EventCard({ event, slug }: Props) {
  const isPast = new Date(event.eventDate) < new Date();

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border transition-all hover:border-[var(--cv-brand)]"
      style={{
        background: 'var(--cv-surface)',
        borderColor: 'var(--cv-border)',
        opacity: isPast ? 0.6 : 1,
      }}
    >
      {event.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.imageUrl} alt={event.title} className="aspect-video w-full object-cover" />
      )}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              background: isPast ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.15)',
              color: isPast ? 'rgba(255,255,255,0.3)' : 'var(--cv-brand)',
            }}>
            {isPast ? 'Past' : 'Upcoming'}
          </span>
          {event.featured && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--cv-accent)' }}>
              Featured
            </span>
          )}
        </div>
        <h3 className="mb-1 font-semibold text-white">{event.title}</h3>
        <p className="mb-1 text-sm text-white/50">{formatDate(event.eventDate)} · {event.startTime}</p>
        <p className="text-sm text-white/40">{event.venue}{event.city ? `, ${event.city}` : ''}</p>
        {event.description && <p className="mt-2 text-sm text-white/35 line-clamp-2">{event.description}</p>}
        {event.ticketUrl && !isPast && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--cv-brand)' }}
          >
            Get Tickets →
          </a>
        )}
      </div>
    </div>
  );
}
