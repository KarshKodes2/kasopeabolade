'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventTypeStep } from './steps/EventTypeStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { DetailsStep } from './steps/DetailsStep';
import { ContactStep } from './steps/ContactStep';
import { PaymentStep } from './steps/PaymentStep';

export interface BookingFormData {
  eventType: string;
  eventDate: string;
  startTime: string;
  venue: string;
  venueAddress: string;
  guestCount: string;
  services: string[];
  equipmentNeeded: boolean;
  specialRequests: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod: 'paystack' | 'stripe';
}

const STEPS = ['Event Type', 'Date & Time', 'Details', 'Contact', 'Payment'];

interface Props {
  tenantId: string;
  tenantName: string;
  tenantSlug: string;
  bookedDates: string[];
  initialEventType?: string;
}

export function BookingWizard({ tenantId, tenantName, tenantSlug, bookedDates, initialEventType }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(initialEventType ? 1 : 0);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BookingFormData>>({
    eventType: initialEventType ?? '',
    services: [],
    equipmentNeeded: false,
    paymentMethod: 'paystack',
  });

  const update = (data: Partial<BookingFormData>) => setForm((prev) => ({ ...prev, ...data }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tenantId }),
      });
      const data = (await res.json()) as { id: string };
      if (!res.ok) throw new Error('Booking failed');
      setBookingId(data.id);
      setStep(5); // success screen
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (step === 5) {
    return (
      <div className="rounded-2xl border p-8 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="mb-2 text-2xl font-bold text-white">Booking request sent!</h2>
        <p className="text-white/50">
          We'll review your request and send a quote to <strong className="text-white">{form.clientEmail}</strong> within 24 hours.
        </p>
        <button
          onClick={() => router.push(`/site/${tenantSlug}`)}
          className="mt-8 rounded-xl px-6 py-2.5 text-sm font-medium text-white"
          style={{ background: 'var(--cv-brand)' }}
        >
          Back to site
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs text-white/30">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'var(--cv-border)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: 'var(--cv-brand)' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
      >
        {step === 0 && <EventTypeStep value={form.eventType ?? ''} onChange={(v) => update({ eventType: v })} onNext={next} />}
        {step === 1 && <DateTimeStep bookedDates={bookedDates} value={{ date: form.eventDate ?? '', time: form.startTime ?? '' }} onChange={(v) => update({ eventDate: v.date, startTime: v.time })} onNext={next} onBack={back} />}
        {step === 2 && <DetailsStep value={form} onChange={update} onNext={next} onBack={back} />}
        {step === 3 && <ContactStep value={form} onChange={update} onNext={next} onBack={back} />}
        {step === 4 && <PaymentStep value={form} tenantName={tenantName} onSubmit={submit} onBack={back} submitting={submitting} />}
      </div>
    </div>
  );
}
