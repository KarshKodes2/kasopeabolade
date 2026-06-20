import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { BookingDetailClient } from '@/features/bookings/components/BookingDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id }, select: { clientName: true } });
  return { title: booking ? `Booking — ${booking.clientName}` : 'Booking' };
}

export default async function BookingDetailPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const { id } = await params;
  const tenantId = session.user?.tenantId as string | null;
  if (!tenantId) redirect('/dashboard');

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { tenant: { select: { name: true, slug: true } } },
  });

  if (!booking || booking.tenantId !== tenantId) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/bookings" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--cv-text-secondary)' }}>
          ← All bookings
        </Link>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{booking.clientName}</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            {booking.eventType.replace(/_/g, ' ')} · {new Date(booking.eventDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <BookingDetailClient booking={booking as never} />
    </div>
  );
}
