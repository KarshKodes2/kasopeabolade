'use client';

import { useState } from 'react';
import { EventForm } from './EventForm';
import { createEvent, updateEvent, deleteEvent } from '../api';
import type { TenantEvent, EventFormData } from '../types';

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface Props {
  initialEvents: TenantEvent[];
}

export function EventsManager({ initialEvents }: Props) {
  const [events, setEvents] = useState(initialEvents);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  async function handleCreate(data: EventFormData) {
    const ev = await createEvent(data);
    setEvents((prev) => [ev, ...prev]);
    setCreating(false);
  }

  async function handleUpdate(id: string, data: EventFormData) {
    const ev = await updateEvent(id, data);
    setEvents((prev) => prev.map((e) => (e.id === id ? ev : e)));
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this event?')) return;
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  async function handleTogglePublish(ev: TenantEvent) {
    const updated = await updateEvent(ev.id, { published: !ev.published } as EventFormData);
    setEvents((prev) => prev.map((e) => (e.id === ev.id ? updated : e)));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Events</h1>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{ background: 'var(--cv-brand)' }}
          >
            + Add event
          </button>
        )}
      </div>

      {creating && (
        <div className="mb-6 rounded-2xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
          <h2 className="mb-4 text-sm font-semibold text-white/60">New Event</h2>
          <EventForm onSave={handleCreate} onCancel={() => setCreating(false)} />
        </div>
      )}

      {events.length === 0 && !creating && (
        <div className="rounded-xl border px-6 py-16 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
          <p className="text-3xl mb-3">🎪</p>
          <p className="font-medium text-white">No events yet</p>
          <p className="mt-1 text-sm text-white/30">Add upcoming gigs so fans can find and RSVP.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {events.map((ev) => (
          <div key={ev.id}>
            {editing === ev.id ? (
              <div className="rounded-2xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
                <EventForm initial={ev} onSave={(d) => handleUpdate(ev.id, d)} onCancel={() => setEditing(null)} />
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 rounded-xl border px-5 py-4" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-white truncate">{ev.title}</p>
                    {!ev.published && <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/30">Draft</span>}
                    {ev.featured && <span className="rounded-full text-xs px-2 py-0.5" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--cv-accent)' }}>Featured</span>}
                  </div>
                  <p className="text-sm text-white/40">{formatDate(ev.eventDate)} · {ev.startTime} · {ev.venue}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => handleTogglePublish(ev)}
                    className="rounded-lg border px-3 py-1.5 text-xs text-white/40 hover:text-white transition-colors"
                    style={{ borderColor: 'var(--cv-border)' }}>
                    {ev.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => setEditing(ev.id)}
                    className="rounded-lg border px-3 py-1.5 text-xs text-white/40 hover:text-white transition-colors"
                    style={{ borderColor: 'var(--cv-border)' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ev.id)}
                    className="rounded-lg border px-3 py-1.5 text-xs text-red-400/60 hover:text-red-400 transition-colors"
                    style={{ borderColor: 'var(--cv-border)' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
