'use client';

import dynamic from 'next/dynamic';
import type { MediaAsset } from '@prisma/client';

const WavesurferPlayer = dynamic(
  () => import('../media/WavesurferPlayer').then((m) => m.WavesurferPlayer),
  { ssr: false, loading: () => <div className="h-16 animate-pulse rounded-xl bg-white/5" /> },
);

interface FeaturedMixesProps {
  mixes: Pick<MediaAsset, 'id' | 'title' | 'url' | 'thumbnailUrl' | 'description'>[];
}

export function FeaturedMixes({ mixes }: FeaturedMixesProps) {
  return (
    <section id="mixes" className="px-6 py-24" style={{ background: 'var(--cv-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm tracking-widest uppercase" style={{ color: 'var(--cv-accent)' }}>
            Music
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Featured Mixes</h2>
        </div>

        <div className="flex flex-col gap-6">
          {mixes.map((mix) => (
            <div
              key={mix.id}
              className="rounded-2xl border p-6"
              style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{mix.title}</h3>
                  {mix.description && (
                    <p className="mt-1 text-sm text-white/40">{mix.description}</p>
                  )}
                </div>
              </div>
              <WavesurferPlayer url={mix.url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
