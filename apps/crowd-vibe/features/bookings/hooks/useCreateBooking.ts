'use client';

import { useState } from 'react';
import { createBooking } from '../api';
import type { BookingFormData } from '../types';

export function useCreateBooking(tenantSlug: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(data: BookingFormData) {
    setLoading(true);
    setError(null);
    try {
      const booking = await createBooking(tenantSlug, data);
      return booking;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Submission failed';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
