import { create } from 'zustand';
import type { MediaAsset, MediaType } from '../types';

type FilterType = 'ALL' | MediaType;

interface MediaUploadState {
  assets: MediaAsset[];
  uploading: boolean;
  filter: FilterType;
  setAssets: (assets: MediaAsset[]) => void;
  setUploading: (v: boolean) => void;
  setFilter: (filter: FilterType) => void;
  toggleFeatured: (id: string) => void;
  removeAsset: (id: string) => void;
}

export const useMediaUploadStore = create<MediaUploadState>((set) => ({
  assets: [],
  uploading: false,
  filter: 'ALL',
  setAssets: (assets) => set({ assets }),
  setUploading: (uploading) => set({ uploading }),
  setFilter: (filter) => set({ filter }),
  toggleFeatured: (id) =>
    set((s) => ({ assets: s.assets.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a)) })),
  removeAsset: (id) => set((s) => ({ assets: s.assets.filter((a) => a.id !== id) })),
}));
