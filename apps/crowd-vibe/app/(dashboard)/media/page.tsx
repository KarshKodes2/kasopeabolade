'use client';

import { useEffect, useState, useRef } from 'react';

interface MediaAsset {
  id: string;
  title: string;
  type: string;
  url: string;
  thumbnailUrl: string | null;
  duration: number | null;
  description: string | null;
  featured: boolean;
  publishedAt: string | null;
}

const TYPE_LABELS: Record<string, string> = {
  MIX: 'Mix',
  TRACK: 'Track',
  VIDEO: 'Video',
  PHOTO: 'Photo',
  PODCAST: 'Podcast',
};

export default function MediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/media').then((r) => r.json()).then((d) => {
      setAssets(d.assets ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'ALL' ? assets : assets.filter((a) => a.type === filter);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('title', file.name.replace(/\.[^.]+$/, ''));
    const type = file.type.startsWith('audio') ? 'MIX' : file.type.startsWith('video') ? 'VIDEO' : 'PHOTO';
    form.append('type', type);
    await fetch('/api/media', { method: 'POST', body: form });
    const fresh = await fetch('/api/media').then((r) => r.json());
    setAssets(fresh.assets ?? []);
    setUploading(false);
    e.target.value = '';
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await fetch(`/api/media/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !featured }),
    });
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, featured: !featured } : a)));
  }

  async function deleteAsset(id: string) {
    if (!confirm('Delete this asset?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    setAssets((prev) => prev.filter((a) => a.id !== id));
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

      <div className="mb-6 flex gap-2">
        {['ALL', 'MIX', 'TRACK', 'VIDEO', 'PHOTO'].map((t) => (
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

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl" style={{ background: 'var(--cv-surface)' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border p-16 text-center text-white/30" style={{ borderColor: 'var(--cv-border)' }}>
          No {filter === 'ALL' ? '' : TYPE_LABELS[filter] + ' '}assets yet. Upload your first file.
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
                  {asset.type === 'MIX' || asset.type === 'TRACK' ? '🎵' : asset.type === 'VIDEO' ? '🎬' : '🖼️'}
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
                    onClick={() => toggleFeatured(asset.id, asset.featured)}
                    className={`text-xs ${asset.featured ? 'text-yellow-400' : 'text-white/30 hover:text-white/60'}`}
                  >
                    {asset.featured ? '★ Featured' : '☆ Feature'}
                  </button>
                  <button onClick={() => deleteAsset(asset.id)} className="ml-auto text-xs text-red-400/60 hover:text-red-400">
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
