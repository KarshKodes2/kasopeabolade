export type MediaType = 'MIX' | 'PODCAST' | 'LIVE_SET' | 'PROMO_VIDEO' | 'PHOTO';

export interface MediaAsset {
  id: string;
  tenantId: string;
  title: string;
  type: MediaType;
  url: string;
  thumbnailUrl: string | null;
  duration: number | null;
  description: string | null;
  featured: boolean;
  publishedAt: string | null;
}
