# packages/db

Centralised Prisma 6 schema, migrations, and database client for the entire monorepo. Every app that touches PostgreSQL imports from this package.

## Usage

```typescript
import { prisma } from 'db';

const tenants = await prisma.tenant.findMany({ where: { status: 'ACTIVE' } });
```

## Important — Always use workspace-pinned Prisma v6

```bash
# Correct — uses the pinned v6.x from this package's package.json
npm run db:sync
npm run --workspace=db generate

# Wrong — fetches the latest Prisma (currently v7) which has breaking changes
npx prisma generate
```

## Scripts

| Command (from root) | Description |
| ------------------- | ----------- |
| `npm run db:sync` | Run pending migrations + generate Prisma client |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and re-seed |
| `npm run generate` | Generate Prisma client only (no migration) |
| `npm run seed` | Seed with test data |

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
| `EventType` | `WEDDING` · `CORPORATE` · `CLUB_NIGHT` · `FESTIVAL` · `BIRTHDAY` · `CONCERT` · `PRIVATE_PARTY` · `OTHER` |
| `BookingStatus` | `PENDING` · `QUOTE_SENT` · `CONFIRMED` · `DEPOSIT_PAID` · `PAID` · `CANCELLED` · `COMPLETED` |
| `ServiceType` | `DJ_SET` · `MC_HOST` · `SOUND_SYSTEM` · `LIGHTING` · `PHOTO_BOOTH` · `LIVE_BAND` · `OTHER` |
| `MediaType` | `MIX` · `TRACK` · `VIDEO` · `PHOTO` · `PODCAST` |
| `LeadStatus` | `NEW` · `CONTACTED` · `PROPOSAL_SENT` · `NEGOTIATION` · `WON` · `LOST` |
| `SubscriptionStatus` | `TRIALING` · `ACTIVE` · `PAST_DUE` · `CANCELLED` · `UNPAID` |

### Core Models

#### Tenant

The central multi-tenancy unit. Each entertainer who subscribes to CrowdVibe gets one `Tenant` record.

Key fields: `slug` (URL identifier), `customDomain`, `brandColor`, `accentColor`, `logoUrl`, `heroImageUrl`, `bio`, `location`, `plan`, `status`, social links (`instagramUrl`, `tiktokUrl`, `youtubeUrl`, `audiomackUrl`, `soundcloudUrl`).

#### User

Platform users. `tenantId` is optional — `SUPER_ADMIN` users have no tenant.

Key fields: `email`, `role`, `tenantId?`.

#### Booking

A booking request against a tenant. Full event details including payment tracking.

Key fields: `tenantId`, `clientName`, `clientEmail`, `clientPhone`, `eventType`, `eventDate`, `startTime`, `endTime`, `venue`, `venueAddress`, `guestCount`, `services[]`, `basePrice`, `totalPrice`, `depositAmount`, `depositPaid`, `paystackRef`, `stripePaymentId`, `status`, `adminNotes`.

#### MediaAsset

Audio, video, and photo assets uploaded to Cloudinary by a tenant.

Key fields: `tenantId`, `title`, `type` (MediaType), `url`, `thumbnailUrl`, `duration`, `featured`.

#### Lead

Inbound enquiry from the Karsh Core Solutions contact form.

Key fields: `contactName`, `email`, `companyName`, `projectType`, `budget`, `message`, `status` (LeadStatus).

#### Subscription

Stripe subscription record linked to a tenant.

Key fields: `tenantId`, `plan`, `status`, `stripeSubscriptionId`, `stripeCustomerId`, `currentPeriodEnd`, `cancelAtPeriodEnd`.

#### Project

Portfolio project managed via the admin dashboard and displayed on `kasope.dev`.

Key fields: `title`, `slug`, `description`, `featuredImg`, `tags[]`, `liveUrl`, `repoUrl`, `published`.

#### NextAuth Models

`Account`, `Session`, `VerificationToken` — standard NextAuth v5 Prisma adapter models.

## Project Structure

```text
packages/db/
├── schema.prisma       # Full multi-tenant SaaS schema
├── migrations/         # Prisma migration history
├── lib/
│   └── prisma.ts       # Singleton Prisma client
├── index.ts            # Package exports (re-exports prisma + PrismaClient)
├── seed.ts             # Test data seeder
└── package.json
```

## Creating a Migration

```bash
# From the monorepo root — do NOT cd into packages/db
npm run --workspace=db migrate -- --name your_migration_name
```

## Related

- [Monorepo root](../../README.md)
- [CrowdVibe](../../apps/crowd-vibe/README.md)
- [Admin dashboard](../../apps/admin/README.md)
