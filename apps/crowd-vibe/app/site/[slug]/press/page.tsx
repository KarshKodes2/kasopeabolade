import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/shared/lib/prisma';
import { SiteNav } from '@/shared/components/layout/SiteNav';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug }, select: { name: true, bio: true } });
  return {
    title: `Press Kit — ${tenant?.name ?? 'Artist'}`,
    description: tenant?.bio ?? `Electronic Press Kit for ${tenant?.name}`,
  };
}

export default async function PressPage({ params }: Props) {
  const { slug } = await params;

  const [tenant, featuredMixes, galleryPhotos, bookingStats] = await Promise.all([
    prisma.tenant.findUnique({
      where: { slug },
      select: {
        id: true, name: true, slug: true, bio: true, location: true,
        logoUrl: true, heroImageUrl: true,
        instagramUrl: true, tiktokUrl: true, youtubeUrl: true,
        audiomackUrl: true, soundcloudUrl: true, spotifyUrl: true,
        createdAt: true,
      },
    }),
    prisma.mediaAsset.findMany({
      where: { tenant: { slug }, type: { in: ['MIX', 'LIVE_SET', 'PODCAST'] }, featured: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }),
    prisma.mediaAsset.findMany({
      where: { tenant: { slug }, type: 'PHOTO' },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.booking.aggregate({
      where: { tenant: { slug }, status: { in: ['CONFIRMED', 'COMPLETED', 'DEPOSIT_PAID'] } },
      _count: true,
    }),
  ]);

  if (!tenant) notFound();

  const yearsActive = new Date().getFullYear() - new Date(tenant.createdAt).getFullYear() || 1;

  const socials = [
    { key: 'instagram', label: 'Instagram', url: tenant.instagramUrl },
    { key: 'tiktok', label: 'TikTok', url: tenant.tiktokUrl },
    { key: 'youtube', label: 'YouTube', url: tenant.youtubeUrl },
    { key: 'audiomack', label: 'Audiomack', url: tenant.audiomackUrl },
    { key: 'soundcloud', label: 'SoundCloud', url: tenant.soundcloudUrl },
    { key: 'spotify', label: 'Spotify', url: tenant.spotifyUrl },
  ].filter((s) => s.url);

  return (
    <>
      <SiteNav tenant={tenant} />

      <main className="min-h-screen pt-20" style={{ background: 'var(--cv-bg)' }}>

        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, var(--cv-brand), transparent)' }} />
          <div className="relative mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--cv-accent)' }}>
              Electronic Press Kit
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {tenant.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tenant.logoUrl} alt={tenant.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2" style={{ ringColor: 'var(--cv-brand)' }} />
              )}
              <div>
                <h1 className="text-4xl font-black text-white md:text-6xl">{tenant.name}</h1>
                {tenant.location && <p className="mt-1 text-white/40">{tenant.location}</p>}
                {tenant.bio && <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{tenant.bio}</p>}
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-3">
              {[
                { label: 'Confirmed Bookings', value: bookingStats._count },
                { label: 'Years Active', value: yearsActive },
                { label: 'Mixes & Sets', value: featuredMixes.length },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border p-4 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
                  <p className="text-3xl font-black text-white">{s.value}+</p>
                  <p className="mt-1 text-xs text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="border-y px-6 py-8" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/60">Available for bookings — weddings, clubs, festivals, corporate events.</p>
            <Link
              href={`/site/${slug}/book`}
              className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--cv-brand)' }}
            >
              Book {tenant.name} →
            </Link>
          </div>
        </section>

        {/* Featured mixes */}
        {featuredMixes.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="mb-8 text-sm font-semibold tracking-widest uppercase text-white/40">Featured Mixes & Sets</h2>
            <div className="flex flex-col gap-3">
              {featuredMixes.map((mix) => (
                <a
                  key={mix.id}
                  href={mix.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[var(--cv-brand)]"
                  style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'var(--cv-elevated)' }}>
                    {mix.type === 'PODCAST' ? '🎙️' : mix.type === 'LIVE_SET' ? '🎤' : '🎵'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{mix.title}</p>
                    {mix.description && <p className="text-xs text-white/40 truncate">{mix.description}</p>}
                  </div>
                  <span className="shrink-0 text-xs opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--cv-brand)' }}>
                    Listen →
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Photo gallery */}
        {galleryPhotos.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40">Press Photos</h2>
              <Link href={`/site/${slug}/gallery`} className="text-xs text-white/30 hover:text-white transition-colors">
                Full gallery →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryPhotos.map((photo) => (
                <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.thumbnailUrl ?? photo.url} alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs text-white/70">Download ↓</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Social links */}
        {socials.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 pb-16">
            <h2 className="mb-6 text-sm font-semibold tracking-widest uppercase text-white/40">Find on Platforms</h2>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a key={s.key} href={s.url!} target="_blank" rel="noopener noreferrer"
                  className="rounded-xl border px-4 py-2 text-sm font-medium text-white/60 transition-all hover:border-[var(--cv-brand)] hover:text-white"
                  style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contact for bookings */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border p-8 text-center" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
            <p className="mb-2 text-sm tracking-widest uppercase text-white/30">Booking Enquiries</p>
            <h3 className="mb-4 text-2xl font-bold text-white">Let's create something unforgettable</h3>
            <Link
              href={`/site/${slug}/book`}
              className="inline-block rounded-xl px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--cv-brand)' }}
            >
              Submit a booking request
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter tenant={tenant} />
    </>
  );
}
