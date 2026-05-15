'use client';

import { useRef } from 'react';
import { useMediaUploadStore } from '../store/media-upload.store';
import { useMediaAssets } from '../hooks/useMediaAssets';
import { useUploadMedia } from '../hooks/useUploadMedia';
import { toggleFeaturedAsset, deleteMediaAsset } from '../api';
import type { MediaType } from '../types';

const TYPE_LABELS: Record<string, string> = {
  MIX: 'Mix', PODCAST: 'Podcast', LIVE_SET: 'Live Set', PROMO_VIDEO: 'Video', PHOTO: 'Photo',
};

const FILTER_OPTIONS: Array<'ALL' | MediaType> = ['ALL', 'MIX', 'PODCAST', 'LIVE_SET', 'PROMO_VIDEO', 'PHOTO'];

export function MediaLibrary() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { assets, uploading, filter, setFilter, toggleFeatured, removeAsset } = useMediaUploadStore();
  const { upload } = useUploadMedia();
  useMediaAssets();

  const filtered = filter === 'ALL' ? assets : assets.filter((a) => a.type === filter);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await upload(file);
    e.target.value = '';
  }

  async function handleToggleFeatured(id: string, featured: boolean) {
    await toggleFeaturedAsset(id, featured);
    toggleFeatured(id);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this asset?')) return;
    await deleteMediaAsset(id);
    removeAsset(id);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="mt-1 text-sm text-white/40">{assets.length} assets</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="rounded-xl px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          style={{ background: 'var(--cv-brand)' }}
        >
          {uploading ? 'Uploading…' : '+ Upload'}
        </button>
        <input ref={fileRef} type="file" accept="audio/*,video/*,image/*" className="hidden" onChange={handleUpload} />
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        {FILTER_OPTIONS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === t ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
            style={filter === t ? { background: 'var(--cv-brand)' } : { background: 'rgba(255,255,255,0.05)' }}
          >
            {t === 'ALL' ? 'All' : TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border p-16 text-center text-white/30" style={{ borderColor: 'var(--cv-border)' }}>
          No {filter === 'ALL' ? '' : (TYPE_LABELS[filter] ?? filter) + ' '}assets yet. Upload your first file.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((asset) => (
            <div key={asset.id} className="group relative rounded-xl border overflow-hidden" style={{ background: 'var(--cv-surface)', borderColor: 'var(--cv-border)' }}>
              {asset.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset.thumbnailUrl} alt={asset.title} className="h-36 w-full object-cover" />
              ) : (
                <div className="flex h-36 items-center justify-center text-3xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {asset.type === 'MIX' || asset.type === 'PODCAST' || asset.type === 'LIVE_SET' ? '🎵' : asset.type === 'PROMO_VIDEO' ? '🎬' : '🖼️'}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-white truncate">{asset.title}</p>
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-xs" style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--cv-brand)' }}>
                    {TYPE_LABELS[asset.type] ?? asset.type}
                  </span>
                </div>
                {asset.duration && (
                  <p className="mt-1 text-xs text-white/30">{Math.floor(asset.duration / 60)}:{String(asset.duration % 60).padStart(2, '0')}</p>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleToggleFeatured(asset.id, asset.featured)}
                    className={`text-xs ${asset.featured ? 'text-yellow-400' : 'text-white/30 hover:text-white/60'}`}
                  >
                    {asset.featured ? '★ Featured' : '☆ Feature'}
                  </button>
                  <button onClick={() => handleDelete(asset.id)} className="ml-auto text-xs text-red-400/60 hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
