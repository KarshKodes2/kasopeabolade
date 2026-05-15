export type TenantPlan = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: TenantPlan;
  status: TenantStatus;
  customDomain?: string | null;
  bio?: string | null;
  location?: string | null;
  brandColor?: string | null;
  accentColor?: string | null;
  logoUrl?: string | null;
  heroImageUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
  audiomackUrl?: string | null;
  soundcloudUrl?: string | null;
  spotifyUrl?: string | null;
}

export interface TenantSettings {
  name?: string;
  bio?: string;
  location?: string;
  brandColor?: string;
  accentColor?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  audiomackUrl?: string;
  soundcloudUrl?: string;
  spotifyUrl?: string;
  customDomain?: string;
}
