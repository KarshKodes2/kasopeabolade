import { z } from 'zod';
import { Role } from '@prisma/client';

export const UserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email(),
  image: z.url().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'GUEST']).default(Role.GUEST),
});

export const ProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  featuredImg: z.url().optional(),
  createdById: z.cuid().optional(),
});

export const BookingSchema = z.object({
  eventDate: z.coerce.date(),
  clientName: z.string().min(2),
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending'),
  userId: z.cuid().optional(),
});

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type UserInput = z.infer<typeof UserSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
export type BookingInput = z.infer<typeof BookingSchema>;
export type AuthInput = z.infer<typeof AuthSchema>;
