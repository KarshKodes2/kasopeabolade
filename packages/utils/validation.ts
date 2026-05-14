import { z } from 'zod';

export const BookingCreateSchema = z.object({
  tenantId: z.string().cuid(),
  eventType: z.enum(['WEDDING', 'CORPORATE', 'CLUB_NIGHT', 'FESTIVAL', 'BIRTHDAY', 'CONCERT', 'PRIVATE_PARTY', 'OTHER']),
  eventDate: z.string().datetime(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  clientName: z.string().min(2).max(100),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(7).max(20),
  venue: z.string().min(2).max(200).optional(),
  venueAddress: z.string().max(300).optional(),
  guestCount: z.number().int().positive().optional(),
  services: z.array(z.string()).optional(),
  equipmentNeeded: z.string().max(500).optional(),
  specialRequests: z.string().max(1000).optional(),
  basePrice: z.number().positive().optional(),
  paymentMethod: z.enum(['PAYSTACK', 'STRIPE']).optional(),
});

export const TenantOnboardingSchema = z.object({
  name: z.string().min(2).max(80),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  location: z.string().max(100).optional(),
});

export const TenantSettingsSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  brandColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  heroImageUrl: z.string().url().optional().or(z.literal('')),
  customDomain: z.string().max(253).optional().or(z.literal('')),
  instagram: z.string().max(60).optional(),
  tiktok: z.string().max(60).optional(),
  youtube: z.string().max(100).optional(),
  audiomack: z.string().max(100).optional(),
  soundcloud: z.string().max(100).optional(),
});

export const LeadSchema = z.object({
  contactName: z.string().min(2).max(100),
  email: z.string().email(),
  companyName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  projectType: z.string().min(2).max(100),
  budget: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
});

export const MediaUploadSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['MIX', 'TRACK', 'VIDEO', 'PHOTO', 'PODCAST']),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  duration: z.number().int().positive().optional(),
  description: z.string().max(1000).optional(),
  platforms: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export type BookingCreate = z.infer<typeof BookingCreateSchema>;
export type TenantOnboarding = z.infer<typeof TenantOnboardingSchema>;
export type TenantSettings = z.infer<typeof TenantSettingsSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type MediaUpload = z.infer<typeof MediaUploadSchema>;
