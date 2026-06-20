import { prisma } from 'db';
import { BookingsPageClient } from '../../../../features/bookings/components/BookingsPageClient';

export const metadata = { title: 'All Bookings' };

export default async function AllBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { tenant: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>All Bookings</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {bookings.length} total across all tenants
        </p>
      </div>
      <BookingsPageClient bookings={bookings} />
    </div>
  );
}
