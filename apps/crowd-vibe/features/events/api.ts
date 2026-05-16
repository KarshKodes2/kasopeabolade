import type { EventFormData, TenantEvent } from './types';

export async function fetchEvents(): Promise<TenantEvent[]> {
  const res = await fetch('/api/events');
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function createEvent(data: EventFormData): Promise<TenantEvent> {
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
}

export async function updateEvent(id: string, data: Partial<EventFormData>): Promise<TenantEvent> {
  const res = await fetch(`/api/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
}

export async function deleteEvent(id: string): Promise<void> {
  await fetch(`/api/events/${id}`, { method: 'DELETE' });
}
