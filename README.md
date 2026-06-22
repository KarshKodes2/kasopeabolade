# Kasope Abolade — Karsh Core Solutions Monorepo

A full-stack Next.js monorepo powering four production products under the **Karsh Core Solutions** brand. One codebase, one database, shared infrastructure.

## Products

| App | Port | URL | Purpose |
| --- | ---- | --- | ------- |
| [crowd-vibe](./apps/crowd-vibe/) | 3003 | crowdvibe.io | Multi-tenant SaaS — entertainment booking platform for DJs, MCs, and event hosts |
| [admin](./apps/admin/) | 3001 | admin.karshcoresolutions.com | Super-admin central command for all apps |
| [portfolio](./apps/portfolio/) | 3002 | kasope.dev | Kasope's public developer portfolio |
| [karsh-core](./apps/karsh-core/) | 3004 | karshcoresolutions.com | Karsh Core Solutions corporate site + lead capture |

## Architecture

```text
kasopeabolade/
├── apps/
│   ├── crowd-vibe/     # CrowdVibe SaaS platform (multi-tenant)
│   ├── admin/          # Super-admin dashboard (manages all apps)
│   ├── portfolio/      # Public developer portfolio
│   └── karsh-core/     # Corporate site + CRM lead capture
├── packages/
│   ├── db/             # Prisma 7 schema + pg driver adapter client
│   ├── ui/             # Shared component library (9 components)
│   └── utils/          # RBAC, Zod schemas, tenant helpers
├── scripts/            # Database and setup scripts
├── e2e/                # Playwright end-to-end tests
├── .github/workflows/  # CI/CD pipelines
└── turbo.json          # Turbo task pipeline
```

## Tech Stack

| Category | Technology |
| -------- | ---------- |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL 15 + Prisma 7 + `@prisma/adapter-pg` |
| Auth | NextAuth.js v5 (GitHub OAuth + email magic link) |
| Build | Turbo 2.5 + npm workspaces |
| Payments | Paystack (₦ Nigeria/Africa) + Stripe (international) |
| Media | Cloudinary (images, audio, video) |
| Email | Resend (transactional emails) |
| Animation | Framer Motion 12 |
| Audio | Wavesurfer.js 7 (waveform players) |
| Validation | Zod 4 + React Hook Form |
| State | Zustand 5 (booking wizard) |
| Testing | Playwright (E2E) |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 8.5+
- Docker (for local PostgreSQL) or a Neon/Railway database URL

### Installation

```bash
git clone https://github.com/KarshKodes2/kasopeabolade.git
cd kasopeabolade
npm install
```

### Database

```bash
# Start local PostgreSQL via Docker
npm run start:db

# Run migrations and generate Prisma client
npm run db:sync

# Seed with test data (optional)
npm run seed
```

### Development

```bash
npm run dev              # All apps in parallel
npm run dev:crowd-vibe   # CrowdVibe only  → localhost:3003
npm run dev:admin        # Admin only      → localhost:3001
npm run dev:portfolio    # Portfolio only  → localhost:3002
npm run dev:karsh-core   # Karsh Core only → localhost:3004
```

## Environment Variables

Each app has its own `.env.local`. The database URL is shared via `packages/db/.env`.

### `packages/db/.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
```

### `apps/crowd-vibe/.env.local`

```env
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://crowdvibe.io
```

### `apps/admin/.env.local`

```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
DATABASE_URL=  # same as packages/db/.env
```

### `apps/karsh-core/.env.local`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
RESEND_API_KEY=
```

## Scripts Reference

### Dev scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start all apps (Turbo parallel) |
| `npm run dev:crowd-vibe` | CrowdVibe on port 3003 |
| `npm run dev:admin` | Admin on port 3001 |
| `npm run dev:portfolio` | Portfolio on port 3002 |
| `npm run dev:karsh-core` | Karsh Core on port 3004 |

### Build scripts

| Command | Description |
| ------- | ----------- |
| `npm run build` | Production build all apps |
| `npm run build:crowd-vibe` | Build CrowdVibe |
| `npm run build:admin` | Build admin |
| `npm run build:portfolio` | Build portfolio |

### Database scripts

| Command | Description |
| ------- | ----------- |
| `npm run start:db` | Start PostgreSQL Docker container |
| `npm run db:sync` | Run migrations + generate Prisma client |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and re-seed |
| `npm run generate` | Generate Prisma client only |
| `npm run seed` | Seed with test data |

### Code Quality

| Command | Description |
| ------- | ----------- |
| `npm run lint` | ESLint all packages |
| `npm run format` | Prettier format all |
| `npm run check-types` | TypeScript check (per-app via Turbo) |
| `npm run e2e` | Playwright E2E tests |

## CrowdVibe — Multi-Tenant Architecture

CrowdVibe is the flagship product. Entertainers subscribe and get a fully branded public booking site under their own custom domain.

### How domain routing works

```text
djrandyuniverse.com  ──────┐
dj-randy.crowdvibe.io ─────┤──▶  middleware.ts (Edge)  ──▶  /site/dj-randy/...
                           │         ↓
                     DB lookup: tenant by customDomain / slug
```

The URL shown to visitors never changes — `djrandyuniverse.com` stays in the browser bar. The `middleware.ts` transparently rewrites the request at Vercel's edge.

### Tenant public site structure

```text
/site/[slug]/           ← Landing page (hero, services, mixes)
/site/[slug]/book       ← 5-step booking wizard (Paystack/Stripe payment)
/site/[slug]/gallery    ← Full media gallery + waveform players
/site/[slug]/events     ← Upcoming events / gigs
/site/[slug]/press      ← Digital EPK (Electronic Press Kit)
```

### Multi-type tenant sites

Tenants choose a site type on onboarding:

| Type | Template | Description |
| ---- | -------- | ----------- |
| `PERSONAL` | `PersonalSite` | DJ/MC/entertainer template (default) |
| `PORTFOLIO` | `PortfolioSite` | Professional portfolio with projects |
| `CORPORATE` | `CorporateSite` | Business/company site with contact form → Lead |
| `REDIRECT` | — | Middleware 301 redirects to `tenant.redirectUrl` |

## Database Schema

The full multi-tenant SaaS schema lives in [`packages/db/schema.prisma`](./packages/db/schema.prisma).

**Key models:** `Tenant`, `User`, `Booking`, `MediaAsset`, `Event`, `NewsletterSubscriber`, `Lead`, `Subscription`, `Project`

**Enums:** `Role`, `TenantPlan` (FREE/STARTER/PRO/ENTERPRISE), `TenantStatus`, `EventType`, `BookingStatus`, `ServiceType`, `MediaType`, `LeadStatus`, `SubscriptionStatus`

## Architecture Rules

1. Apps import only from `packages/*` — never from each other
2. All DB access goes through `packages/db` (import path: `'db'`)
3. Shared UI lives in `packages/ui` (import path: `'ui'`)
4. Shared logic (RBAC, validation, tenant helpers) lives in `packages/utils` (import path: `'utils/rbac'` etc.)
5. Always use workspace-pinned Prisma v7: `npm run --workspace=db generate` — never `npx prisma generate`
6. All API routes must export `export const dynamic = 'force-dynamic'` to prevent build-time DB access

## Deployment

| App | Platform | Reason |
| --- | -------- | ------ |
| crowd-vibe | Vercel | Edge middleware required for custom domain multi-tenancy |
| portfolio | Vercel | Free tier, near-static |
| karsh-core | Vercel | Free tier |
| admin | Railway | Internal tool, more cost-effective than Vercel Pro |
| PostgreSQL | Neon | Serverless Postgres with built-in connection pooling; Vercel-native integration |

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Steps |
| -------- | ------- | ----- |
| `crowd-vibe.yml` | Push to `apps/crowd-vibe/**` | Lint → Type check → Build |
| `admin.yml` | Push to `apps/admin/**` | Lint → Type check → Build |
| `portfolio.yml` | Push to `apps/portfolio/**` | Lint → Build → E2E |

## Packages

| Package | Purpose | Docs |
| ------- | ------- | ---- |
| [db](./packages/db/) | Prisma 7 schema, pg adapter client, migrations | [README](./packages/db/README.md) |
| [ui](./packages/ui/) | Button, Card, Badge, Modal, Table, Stat, Avatar, Input, Select | [README](./packages/ui/README.md) |
| [utils](./packages/utils/) | RBAC, Zod validation schemas, tenant query helpers | [README](./packages/utils/README.md) |

---

Maintained by [Kasope Abolade](https://github.com/kasopeabolade) · Karsh Core Solutions
