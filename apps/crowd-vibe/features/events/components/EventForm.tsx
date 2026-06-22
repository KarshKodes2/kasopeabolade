'use client';

import { useState } from 'react';
import type { EventFormData, TenantEvent } from '../types';

interface Props {
  initial?: Partial<TenantEvent>;
  onSave: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
}

const FIELD_CONFIG: { key: string; label: string; type: string; required?: boolean; placeholder?: string }[] = [
  { key: 'title', label: 'Event title', type: 'text', required: true, placeholder: 'e.g. DJ Karsh Live @ Club XYZ' },
  { key: 'venue', label: 'Venue', type: 'text', required: true, placeholder: 'Club XYZ' },
  { key: 'city', label: 'City', type: 'text', placeholder: 'Lagos' },
  { key: 'eventDate', label: 'Date', type: 'date', required: true },
  { key: 'startTime', label: 'Start time', type: 'time', required: true },
  { key: 'endTime', label: 'End time', type: 'time' },
  { key: 'ticketUrl', label: 'Ticket link', type: 'url', placeholder: 'https://...' },
  { key: 'imageUrl', label: 'Event image URL', type: 'url', placeholder: 'https://...' },
];

export function EventForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<EventFormData>>({
    title: initial?.title ?? '',
    venue: initial?.venue ?? '',
    city: initial?.city ?? '',
    eventDate: initial?.eventDate ? new Date(initial.eventDate).toISOString().slice(0, 10) : '',
    startTime: initial?.startTime ?? '',
    endTime: initial?.endTime ?? '',
    ticketUrl: initial?.ticketUrl ?? '',
    imageUrl: initial?.imageUrl ?? '',
    description: initial?.description ?? '',
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form as EventFormData);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {FIELD_CONFIG.map(({ key, label, type, required, placeholder }) => (
        <div key={key}>
          <label className="mb-1.5 block text-sm font-medium text-white/70">{label}{required && ' *'}</label>
          <input
            type={type}
            required={required}
            value={(form[key as keyof EventFormData] as string) ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            placeholder={placeholder}
            className="w-full rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--cv-brand)]"
            style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
          />
        </div>
      ))}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/70">Description</label>
        <textarea
          rows={3}
          value={form.description ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--cv-brand)]"
          style={{ background: 'var(--cv-elevated)', borderColor: 'var(--cv-border)' }}
        />
      </div>

      <div className="flex gap-6">
        {(['published', 'featured'] as const).map((key) => (
          <label key={key} className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={!!form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
              className="rounded accent-[var(--cv-brand)]" />
            <span className="text-sm text-white/60 capitalize">{key}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 rounded-xl border py-2.5 text-sm text-white/40 hover:text-white"
          style={{ borderColor: 'var(--cv-border)' }}>
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          style={{ background: 'var(--cv-brand)' }}>
          {saving ? 'Saving...' : 'Save event'}
        </button>
      </div>
    </form>
  );
}
