'use client';

import { useRouter } from 'next/navigation';
import { useBookingWizardStore } from '../store/booking-wizard.store';
import { useCreateBooking } from '../hooks/useCreateBooking';
import type { EventType } from '../types';
import { EventTypeStep } from './steps/EventTypeStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { DetailsStep } from './steps/DetailsStep';
import { ContactStep } from './steps/ContactStep';
import { PaymentStep } from './steps/PaymentStep';

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
  const { step, formData, submitted, updateForm, nextStep, prevStep, setSubmitted, setError } =
    useBookingWizardStore();
  const { submit, loading } = useCreateBooking(tenantSlug);

  const handleSubmit = async () => {
    const booking = await submit({
      ...formData,
      tenantId,
    } as Parameters<typeof submit>[0]);
    if (booking) setSubmitted(true);
    else setError('Something went wrong. Please try again.');
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border p-8 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="mb-2 text-2xl font-bold text-white">Booking request sent!</h2>
        <p className="text-white/50">
          We'll review your request and send a quote to{' '}
          <strong className="text-white">{formData.clientEmail}</strong> within 24 hours.
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

      <div className="rounded-2xl border p-6" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
        {step === 0 && (
          <EventTypeStep
            value={formData.eventType ?? (initialEventType as typeof formData.eventType) ?? ''}
            onChange={(v) => updateForm({ eventType: v as EventType })}
            onNext={nextStep}
          />
        )}
        {step === 1 && (
          <DateTimeStep
            bookedDates={bookedDates}
            value={{ date: formData.eventDate ?? '', time: formData.startTime ?? '' }}
            onChange={(v) => updateForm({ eventDate: v.date, startTime: v.time })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 2 && <DetailsStep value={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <ContactStep value={formData} onChange={updateForm} onNext={nextStep} onBack={prevStep} />}
        {step === 4 && (
          <PaymentStep
            value={formData}
            tenantName={tenantName}
            onChange={updateForm}
            onSubmit={handleSubmit}
            onBack={prevStep}
            submitting={loading}
          />
        )}
      </div>
    </div>
  );
}
