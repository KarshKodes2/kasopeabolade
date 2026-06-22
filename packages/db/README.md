# packages/db

Centralised Prisma 7 schema, migrations, and database client for the entire monorepo. Every app that touches PostgreSQL imports from this package.

## Usage

```typescript
import { prisma } from 'db';

const tenants = await prisma.tenant.findMany({ where: { status: 'ACTIVE' } });
```

## How the client is wired

The client uses `@prisma/adapter-pg` (Prisma 7 driver adapter) with a `pg.Pool` for connection pooling. When `DATABASE_URL` is set the pool is used; otherwise it falls back to a bare `PrismaClient()` (safe for build-time imports where no DB is needed).

```text
packages/db/
├── prisma.config.ts    ← URL for CLI tools (migrate, generate, studio)
├── index.ts            ← Runtime client (pg.Pool + PrismaPg adapter)
└── lib/prisma.ts       ← Alternative singleton (used by apps that want dev-mode logging)
```

The datasource URL is **not** in `schema.prisma` (Prisma 7 requirement). It comes from:

- **CLI tools** → `prisma.config.ts` reads `process.env.DATABASE_URL`
- **Runtime** → `packages/db/index.ts` creates a `pg.Pool` with `DATABASE_URL`

## Scripts

| Command (from root) | Description |
| ------------------- | ----------- |
| `npm run db:sync` | Run pending migrations + generate Prisma client |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and re-seed |
| `npm run generate` | Generate Prisma client only (no migration) |
| `npm run seed` | Seed with test data |

Always use workspace scripts — never `npx prisma` which resolves to whichever version `npm` finds globally.

## Environment Variables

```env
# packages/db/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
```

## Schema Overview

Full schema at [`schema.prisma`](./schema.prisma).

### Enums

| Enum | Values |
| ---- | ------ |
| `Role` | `SUPER_ADMIN` · `ADMIN` · `MEMBER` · `GUEST` |
| `TenantPlan` | `FREE` · `STARTER` · `PRO` · `ENTERPRISE` |
| `TenantStatus` | `ACTIVE` · `SUSPENDED` · `CANCELLED` |
| `EventType` | `WEDDING` · `CORPORATE` · `BIRTHDAY` · `CLUB_NIGHT` · `FESTIVAL` · `CAMPUS_EVENT` · `PRIVATE_PARTY` · `FULL_PACKAGE` |
| `BookingStatus` | `PENDING` · `QUOTE_SENT` · `CONFIRMED` · `DEPOSIT_PAID` · `COMPLETED` · `CANCELLED` |
| `ServiceType` | `DJ` · `MC_HOST` · `LIGHTING` · `SOUND_SYSTEM` · `PHOTO_BOOTH` |
| `MediaType` | `MIX` · `PODCAST` · `LIVE_SET` · `PROMO_VIDEO` · `PHOTO` |
| `LeadStatus` | `NEW` · `CONTACTED` · `PROPOSAL_SENT` · `NEGOTIATION` · `WON` · `LOST` |
| `SubscriptionStatus` | `TRIALING` · `ACTIVE` · `PAST_DUE` · `CANCELLED` |

### Core Models

#### Tenant

The central multi-tenancy unit. Each entertainer who subscribes to CrowdVibe gets one `Tenant` record.

Key fields: `slug` (URL identifier), `customDomain`, `brandColor`, `accentColor`, `logoUrl`, `heroImageUrl`, `bio`, `location`, `plan`, `status`, social links (`instagramUrl`, `tiktokUrl`, `youtubeUrl`, `audiomackUrl`, `soundcloudUrl`, `spotifyUrl`), Google Calendar fields (`googleAccessToken`, `googleRefreshToken`, `googleCalendarId`).

#### User

Platform users. `tenantId` is optional — `SUPER_ADMIN` users have no tenant.

Key fields: `email`, `role`, `tenantId?`.

#### Booking

A booking request against a tenant. Full event details including payment tracking.

Key fields: `tenantId`, `clientName`, `clientEmail`, `clientPhone`, `eventType`, `eventDate`, `startTime`, `endTime`, `venue`, `venueAddress`, `guestCount`, `services[]`, `basePrice`, `totalPrice`, `depositAmount`, `depositPaid`, `paystackRef`, `stripePaymentId`, `status`, `adminNotes`, `googleCalendarEventId`, `invoiceUrl`.

#### MediaAsset

Audio, video, and photo assets uploaded to Cloudinary by a tenant.

Key fields: `tenantId`, `title`, `type` (MediaType), `url`, `thumbnailUrl`, `duration`, `featured`.

#### Event

Upcoming gigs published by a tenant — fans can view/RSVP.

Key fields: `tenantId`, `title`, `venue`, `city`, `eventDate`, `startTime`, `ticketUrl`, `published`, `featured`.

#### NewsletterSubscriber

Subscribers per-tenant (or platform-wide when `tenantId` is null).

Key fields: `email`, `name`, `tenantId?`.

#### Lead

Inbound enquiry from the Karsh Core Solutions contact form.

Key fields: `contactName`, `email`, `companyName`, `projectType`, `budget`, `message`, `status` (LeadStatus).

#### Subscription

Stripe subscription record linked to a tenant.

Key fields: `tenantId`, `plan`, `status`, `stripeSubscriptionId`, `stripeCustomerId`, `currentPeriodEnd`, `cancelAtPeriodEnd`.

#### Project

Portfolio project managed via the admin dashboard.

Key fields: `title`, `slug`, `description`, `featuredImg`, `tags[]`, `published`.

#### NextAuth Models

`Account`, `Session`, `VerificationToken` — standard NextAuth v5 Prisma adapter models.

## Project Structure

```text
packages/db/
├── prisma.config.ts    # Datasource URL config for Prisma CLI tools
├── schema.prisma       # Full multi-tenant SaaS schema
├── migrations/         # Prisma migration history
├── lib/
│   └── prisma.ts       # Singleton Prisma client (with dev logging)
├── index.ts            # Package exports (pg adapter client + re-exports)
├── seed.ts             # Test data seeder
└── package.json
```

## Creating a Migration

```bash
# From the monorepo root
npm run db:sync
# Or explicitly:
npm run --workspace=db sync -- --name your_migration_name
```

## Related

- [Monorepo root](../../README.md)
- [CrowdVibe](../../apps/crowd-vibe/README.md)
- [Admin dashboard](../../apps/admin/README.md)
