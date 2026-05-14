import { notFound } from 'next/navigation';
import { prisma } from '../../../../lib/prisma';
import { BookingWizard } from '../../../../components/booking/BookingWizard';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug }, select: { name: true } });
  return { title: `Book ${tenant?.name ?? 'Artist'} — CrowdVibe` };
}

export default async function BookPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { type } = await searchParams;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true, name: true, brandColor: true, accentColor: true },
  });

  if (!tenant) notFound();

  // Fetch already-booked dates for calendar blocking
  const bookings = await prisma.booking.findMany({
    where: { tenantId: tenant.id, status: { notIn: ['CANCELLED'] } },
    select: { eventDate: true },
  });

  const bookedDates = bookings.map((b) => b.eventDate.toISOString());

  return (
    <main
      className="min-h-screen px-4 py-24"
      style={{ background: 'var(--cv-bg)' }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="text-sm tracking-widest uppercase text-white/30">Booking</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Book {tenant.name}</h1>
          <p className="mt-2 text-white/50">Fill in the details and we'll send you a quote within 24 hours.</p>
        </div>

        <BookingWizard
          tenantId={tenant.id}
          tenantName={tenant.name}
          tenantSlug={slug}
          bookedDates={bookedDates}
          initialEventType={type}
        />
      </div>
    </main>
  );
}
