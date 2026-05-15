'use client';

import { useState } from 'react';
import { format, addMonths, startOfMonth, eachDayOfInterval, endOfMonth, isSameDay, isBefore, startOfDay } from 'date-fns';

interface Props {
  bookedDates: string[];
  value: { date: string; time: string };
  onChange: (v: { date: string; time: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIMES = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

export function DateTimeStep({ bookedDates, value, onChange, onNext, onBack }: Props) {
  const [month, setMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const booked = bookedDates.map((d) => startOfDay(new Date(d)));

  const isBooked = (d: Date) => booked.some((b) => isSameDay(b, d));
  const isPast = (d: Date) => isBefore(d, today);

  const selectedDate = value.date ? startOfDay(new Date(value.date)) : null;

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-white">When is your event?</h2>
      <p className="mb-6 text-sm text-white/40">Select a date and start time.</p>

      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setMonth(addMonths(month, -1))} className="rounded-lg p-2 text-white/40 hover:text-white">←</button>
        <span className="text-sm font-medium text-white">{format(month, 'MMMM yyyy')}</span>
        <button onClick={() => setMonth(addMonths(month, 1))} className="rounded-lg p-2 text-white/40 hover:text-white">→</button>
      </div>

      {/* Calendar */}
      <div className="mb-6 grid grid-cols-7 gap-1 text-center text-xs">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1 text-white/30 font-medium">{d}</div>
        ))}
        {Array.from({ length: days[0].getDay() }).map((_, i) => <div key={`e${i}`} />)}
        {days.map((day) => {
          const past = isPast(day);
          const busy = isBooked(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          return (
            <button
              key={day.toISOString()}
              disabled={past || busy}
              onClick={() => onChange({ date: day.toISOString(), time: value.time })}
              className="rounded-lg py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-25"
              style={{
                background: selected ? 'var(--cv-brand)' : busy ? 'rgba(239,68,68,0.15)' : 'transparent',
                color: selected ? 'white' : busy ? '#ef4444' : 'rgba(255,255,255,0.7)',
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time selection */}
      {value.date && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-white/60">Start time</p>
          <div className="flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ date: value.date, time: t })}
                className="rounded-lg border px-3 py-1.5 text-sm transition-all"
                style={{
                  background: value.time === t ? 'var(--cv-brand)' : 'var(--cv-elevated)',
                  borderColor: value.time === t ? 'var(--cv-brand)' : 'var(--cv-border)',
                  color: 'white',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-medium text-white/50 hover:text-white" style={{ borderColor: 'var(--cv-border)' }}>← Back</button>
        <button onClick={onNext} disabled={!value.date || !value.time} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-30" style={{ background: 'var(--cv-brand)' }}>Continue →</button>
      </div>
    </div>
  );
}
