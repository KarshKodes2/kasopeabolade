import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { redirect } from 'next/navigation';
import { EventsManager } from '@/features/events';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Events' };

export default async function EventsPage() {
  const session = await auth();
  if (!session?.user?.tenantId) redirect('/dashboard');

  const events = await prisma.event.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { eventDate: 'asc' },
  });

  return <EventsManager initialEvents={events as never} />;
}
