import Link from 'next/link';
import type { MediaAsset } from '@prisma/client';

interface GallerySectionProps {
  assets: Pick<MediaAsset, 'id' | 'url' | 'thumbnailUrl' | 'title'>[];
  slug: string;
}

export function GallerySection({ assets, slug }: GallerySectionProps) {
  return (
    <section className="px-6 py-24" style={{ background: 'var(--cv-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: 'var(--cv-accent)' }}>
              Gallery
            </p>
            <h2 className="text-3xl font-bold text-white">Moments</h2>
          </div>
          <Link href={`/site/${slug}/gallery`} className="text-sm text-white/40 hover:text-white">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.thumbnailUrl ?? asset.url}
                alt={asset.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
