'use client';

import { useEffect, useState } from 'react';
import { fetchAvailability } from '../api';

export function useAvailability(tenantId: string, month: string) {
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  useEffect(() => {
    if (!tenantId || !month) return;
    fetchAvailability(tenantId, month).then(setBookedDates);
  }, [tenantId, month]);

  return { bookedDates };
}
