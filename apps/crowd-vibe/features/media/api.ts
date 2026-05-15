import type { MediaAsset } from './types';

export async function fetchMediaAssets(): Promise<MediaAsset[]> {
  const res = await fetch('/api/media');
  if (!res.ok) throw new Error('Failed to fetch media');
  const data = await res.json() as { assets: MediaAsset[] };
  return data.assets ?? [];
}

export async function uploadMediaAsset(file: File): Promise<MediaAsset> {
  const form = new FormData();
  form.append('file', file);
  form.append('title', file.name.replace(/\.[^.]+$/, ''));
  const type = file.type.startsWith('audio') ? 'MIX' : file.type.startsWith('video') ? 'PROMO_VIDEO' : 'PHOTO';
  form.append('type', type);

  const res = await fetch('/api/media', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json() as { asset: MediaAsset };
  return data.asset;
}

export async function toggleFeaturedAsset(id: string, featured: boolean): Promise<void> {
  const res = await fetch(`/api/media/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ featured: !featured }),
  });
  if (!res.ok) throw new Error('Failed to update asset');
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete asset');
}
