import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import { BookingTable } from '@/features/bookings';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Bookings' };

export default async function BookingsPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const tenantId = session.user?.tenantId as string | null;
  if (!tenantId) redirect('/dashboard');

  const bookings = await prisma.booking.findMany({
    where: { tenantId },
    orderBy: { eventDate: 'asc' },
  });

  const pending = bookings.filter((b) => b.status === 'PENDING').length;
  const confirmed = bookings.filter((b) => b.status === 'CONFIRMED').length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="mt-1 text-sm text-white/40">{bookings.length} total · {pending} pending · {confirmed} confirmed</p>
        </div>
      </div>

      <BookingTable bookings={bookings as never} />
    </div>
  );
}
