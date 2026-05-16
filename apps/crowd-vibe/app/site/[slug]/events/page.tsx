import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/shared/lib/prisma';
import { SiteNav } from '@/shared/components/layout/SiteNav';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import { EventCard } from '@/features/events';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug }, select: { name: true } });
  return { title: `Events — ${tenant?.name ?? 'Artist'}` };
}

export default async function EventsPage({ params }: Props) {
  const { slug } = await params;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true, name: true, logoUrl: true, slug: true },
  });
  if (!tenant) notFound();

  const events = await prisma.event.findMany({
    where: { tenant: { slug }, published: true },
    orderBy: { eventDate: 'asc' },
  });

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.eventDate) >= now);
  const past = events.filter((e) => new Date(e.eventDate) < now);

  return (
    <>
      <SiteNav tenant={tenant} />
      <main className="min-h-screen pt-20" style={{ background: 'var(--cv-bg)' }}>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link href={`/site/${slug}`} className="mb-6 inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
            ← Back to site
          </Link>
          <h1 className="mb-2 text-4xl font-black text-white md:text-5xl">Events</h1>
          <p className="mb-12 text-white/40">{upcoming.length} upcoming · {past.length} past</p>

          {upcoming.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/30">Upcoming</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((ev) => (
                  <EventCard key={ev.id} event={ev as never} slug={slug} />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/30">Past Events</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {past.map((ev) => (
                  <EventCard key={ev.id} event={ev as never} slug={slug} />
                ))}
              </div>
            </section>
          )}

          {events.length === 0 && (
            <div className="rounded-2xl border px-6 py-20 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
              <p className="text-3xl mb-3">🎪</p>
              <p className="font-medium text-white">No upcoming events</p>
              <p className="mt-2 text-sm text-white/30">Check back soon — new gigs coming!</p>
              <Link href={`/site/${slug}/book`} className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ background: 'var(--cv-brand)' }}>
                Book a private event →
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter tenant={tenant} />
    </>
  );
}
