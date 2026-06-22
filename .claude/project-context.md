# Project Context

Comprehensive context about the Kasope Abolade monorepo for Claude agents.

## Project Overview

**Name**: Kasope Abolade Monorepo
**Type**: Full-stack Next.js monorepo
**Purpose**: Multiple personal brand and business applications under Karsh Core Solutions

## Architecture

### Monorepo Structure

```text
kasopeabolade/
├── apps/                    # Application frontends
│   ├── admin/              # Super-admin dashboard (port 3001)
│   ├── portfolio/          # Public portfolio site (port 3002)
│   ├── crowd-vibe/         # Multi-tenant SaaS entertainment platform (port 3003)
│   └── karsh-core/         # Corporate website (port 3004)
├── packages/               # Shared packages
│   ├── db/                 # Prisma 7 database package + pg adapter
│   ├── ui/                 # Shared UI components
│   └── utils/              # Shared utilities (RBAC, validation, tenant helpers)
├── scripts/                # Database and setup scripts
├── e2e/                    # Playwright E2E tests
└── .claude/                # Claude agent configuration
```

### Package Import Paths

Apps import from shared packages using the workspace package name (NOT `@karsh/` prefixes):

```typescript
import { prisma } from 'db';           // packages/db
import { Button, Card } from 'ui';     // packages/ui
import { hasAccess } from 'utils/rbac'; // packages/utils
import { BookingCreateSchema } from 'utils/validation';
import { getTenantBySlug } from 'utils/tenant';
```

## Technology Stack

### Frontend

| Technology | Version | Usage |
| ---------- | ------- | ----- |
| Next.js | 15.3.5 | App Router framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.4.0 | Type safety (strict) |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | UI animations (primary) |
| GSAP | 3.x | Canvas/scroll animations (heavy use only) |

### Backend

| Technology | Version | Usage |
| ---------- | ------- | ----- |
| Next.js API Routes | 15.3.5 | API endpoints |
| NextAuth.js | v5 | Authentication |
| Prisma | 7.8.0 | ORM |
| `@prisma/adapter-pg` | 7.8.0 | pg driver adapter |
| PostgreSQL | 15 | Database |
| Resend | v4 | Transactional email |
| Stripe | v17 | International payments |
| Paystack | latest | Nigerian/African payments |
| Cloudinary | v2 | Media storage |

### Build Tools

| Technology | Version | Usage |
| ---------- | ------- | ----- |
| Turbo | 2.5.4 | Monorepo orchestration |
| npm workspaces | 8.5.0 | Package management |
| tsx | 4.x | TypeScript execution |

### Testing

| Technology | Version | Usage |
| ---------- | ------- | ----- |
| Playwright | 1.54.1 | E2E tests |

### Code Quality

| Technology | Version | Usage |
| ---------- | ------- | ----- |
| ESLint | 9.31.0 | Linting |
| Prettier | 3.6.2 | Formatting |
| TypeScript strict | true | Type checking |

## Apps Overview

### apps/admin (port 3001)

**Purpose**: Super-admin dashboard for managing all products in the monorepo.

**Features**:

- Global KPI overview (tenants, bookings, leads, projects)
- Recharts analytics (monthly bookings, lead funnel, plan distribution)
- CrowdVibe: tenant management, booking management (cross-tenant)
- Portfolio: project CRUD + blog post management
- Karsh Core: lead CRM pipeline
- ADMIN team member management
- Dialog-driven CRUD — no separate /new or /edit pages

**Auth**: NextAuth.js v5 with GitHub OAuth — SUPER_ADMIN only

**URL**: http://localhost:3001 (dev)

### apps/portfolio (port 3002)

**Purpose**: Kasope's public developer portfolio.

**Features**:

- 6-theme system (Light/Dark/Forest/Ocean/Rose/Slate)
- Hero with GSAP particle canvas + Framer Motion letter animation
- Projects (from DB, static fallback), blog, newsletter, resources, contact, search
- DM Sans + DM Serif Display fonts

**URL**: http://localhost:3002 (dev) → kasope.dev (prod)

### apps/crowd-vibe (port 3003)

**Purpose**: Multi-tenant SaaS entertainment booking platform.

**Features**:

- Custom domain routing via Next.js Edge Middleware
- Three site templates: PERSONAL (DJ/MC), PORTFOLIO, CORPORATE
- REDIRECT type (middleware 301)
- 5-step booking wizard (Paystack + Stripe)
- Tenant dashboard: bookings, media, events, settings, billing, analytics
- Google Calendar sync, PDF invoice generation
- Newsletter subscriber management

**URL**: http://localhost:3003 (dev) → crowdvibe.io (prod)

### apps/karsh-core (port 3004)

**Purpose**: Corporate website + lead capture.

**Features**:

- Home (Hero, Services, Stats, CTA), Services, About, Contact pages
- Contact form → Lead model + Resend email notification
- SEO: OG, JSON-LD, sitemap, robots

**URL**: http://localhost:3004 (dev) → karshcoresolutions.com (prod)

## Packages Overview

### packages/db

**Purpose**: Centralised Prisma 7 database package with pg driver adapter.

**Key files**:

- `schema.prisma` — Full multi-tenant SaaS schema (no `url` in datasource)
- `prisma.config.ts` — Datasource URL for CLI tools (migrate, generate, studio)
- `index.ts` — Runtime client using `@prisma/adapter-pg` + `pg.Pool`
- `lib/prisma.ts` — Alternative singleton with dev logging
- `migrations/` — Prisma migration history
- `seed.ts` — Seed data

**Models**: `Tenant`, `User`, `Account`, `Session`, `VerificationToken`, `Booking`, `MediaAsset`, `Event`, `NewsletterSubscriber`, `Lead`, `Subscription`, `Project`

**Key enums**: `Role`, `TenantPlan`, `TenantStatus`, `EventType`, `BookingStatus`, `ServiceType`, `MediaType`, `LeadStatus`, `SubscriptionStatus`

### packages/ui

**Purpose**: Shared React UI components.

**Components**: `Button`, `Card`, `Badge`, `Modal`, `Table`, `Stat`, `Avatar`, `Input`, `Select`

**Import**: `import { Button, Card } from 'ui';`

### packages/utils

**Purpose**: Shared utility functions.

**Contents**:

- `rbac.ts` — `hasAccess()`, `assertAccess()`, role hierarchy
- `validation.ts` — Zod schemas: `BookingCreateSchema`, `TenantOnboardingSchema`, `TenantSettingsSchema`, `MediaUploadSchema`, `LeadSchema`
- `tenant.ts` — DB helpers: `getTenantBySlug`, `getTenantByDomain`, `getTenantWithMedia`, `getBookedDates`

## Database Schema

### User Roles

```typescript
enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN', // Full system access — admin app only
  ADMIN       = 'ADMIN',       // Scoped sections in admin app
  MEMBER      = 'MEMBER',      // Standard CrowdVibe tenant user
  GUEST       = 'GUEST',       // Read-only
}
```

### CrowdVibe Multi-Tenancy

```text
Tenant 1──────N User
Tenant 1──────N Booking
Tenant 1──────N MediaAsset
Tenant 1──────N Event
Tenant 1──────N NewsletterSubscriber
Tenant 1──────N Subscription
```

## API Conventions

### Route Pattern

All API routes MUST include `export const dynamic = 'force-dynamic'` as the first line — this prevents Next.js from attempting to statically pre-render API routes during build when `DATABASE_URL` is not available.

```typescript
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'db';

export async function GET(req: NextRequest) {
  // ...
}
```

### Auth Pattern

```typescript
import { auth } from '@/shared/lib/auth'; // crowd-vibe
// or
import { auth } from '@/lib/auth';         // admin

const session = await auth();
if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
assertAccess(session.user.role, [Role.SUPER_ADMIN]);
```

## Commit Convention

```text
{scope}: ({type}:) {description}

Scopes: admin, portfolio, crowd-vibe, karsh-core, db, ui, utils, root, ci, docs
Types:  feat, fix, chore, docs, style, refactor, test, perf, build, ci
```

## Deployment

| App | Platform | Reason |
| --- | -------- | ------ |
| crowd-vibe | Vercel | Edge Middleware for custom domain routing |
| portfolio | Vercel | Free tier, near-static |
| karsh-core | Vercel | Free tier |
| admin | Railway | Internal tool |
| PostgreSQL | Neon | Serverless Postgres, Vercel-native |

## CI/CD

GitHub Actions workflows:

- `crowd-vibe.yml` — Lint → Type check → Build
- `admin.yml` — Lint → Type check → Build
- `portfolio.yml` — Lint → Build → E2E
