import type { Booking, BookingFormData } from './types';

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch('/api/bookings');
  if (!res.ok) throw new Error('Failed to fetch bookings');
  const data = await res.json() as { bookings: Booking[] };
  return data.bookings;
}

export async function createBooking(tenantSlug: string, data: BookingFormData): Promise<Booking> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, tenantSlug }),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  const json = await res.json() as { booking: Booking };
  return json.booking;
}

export async function updateBookingStatus(
  id: string,
  status: string,
  adminNotes?: string
): Promise<void> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, adminNotes }),
  });
  if (!res.ok) throw new Error('Failed to update booking');
}

export async function fetchAvailability(tenantId: string, month: string): Promise<string[]> {
  const res = await fetch(`/api/availability?tenantId=${tenantId}&month=${month}`);
  if (!res.ok) return [];
  const data = await res.json() as { bookedDates: string[] };
  return data.bookedDates;
}
