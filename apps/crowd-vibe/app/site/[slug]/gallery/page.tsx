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
  const tenant = await prisma.tenant.findUnique({ where: { slug }, select: { name: true } });
  return { title: `Gallery — ${tenant?.name ?? 'Artist'}` };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true, name: true, logoUrl: true, slug: true },
  });
  if (!tenant) notFound();

  const assets = await prisma.mediaAsset.findMany({
    where: { tenant: { slug }, type: { in: ['PHOTO', 'PROMO_VIDEO'] } },
    orderBy: { createdAt: 'desc' },
  });

  const photos = assets.filter((a) => a.type === 'PHOTO');
  const videos = assets.filter((a) => a.type === 'PROMO_VIDEO');

  return (
    <>
      <SiteNav tenant={tenant} />

      <main className="min-h-screen pt-20" style={{ background: 'var(--cv-bg)' }}>
        {/* Header */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link href={`/site/${slug}`} className="mb-6 inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
            ← Back to site
          </Link>
          <h1 className="text-4xl font-black text-white md:text-5xl">Gallery</h1>
          <p className="mt-2 text-white/40">{photos.length} photos · {videos.length} videos</p>
        </div>

        {/* Video section */}
        {videos.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-16">
            <h2 className="mb-6 text-sm font-semibold text-white/60 uppercase tracking-widest">Videos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <div key={v.id} className="group relative aspect-video overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--cv-border)', background: 'var(--cv-surface)' }}>
                  {v.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnailUrl} alt={v.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <a href={v.url} target="_blank" rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                      style={{ background: 'var(--cv-brand)' }}>
                      ▶
                    </a>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 p-4 translate-y-full transition-transform group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white">{v.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24">
            <h2 className="mb-6 text-sm font-semibold text-white/60 uppercase tracking-widest">Photos</h2>
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group mb-3 overflow-hidden rounded-xl break-inside-avoid">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.thumbnailUrl ?? photo.url}
                    alt={photo.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {assets.length === 0 && (
          <div className="mx-auto max-w-6xl px-6 pb-24 text-center">
            <p className="text-white/30">No gallery content yet.</p>
          </div>
        )}
      </main>

      <SiteFooter tenant={tenant} />
    </>
  );
}
