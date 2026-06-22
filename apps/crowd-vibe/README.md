# CrowdVibe

> **Power the Crowd. Own the Vibe.**

CrowdVibe is a multi-tenant SaaS platform under **Karsh Core Solutions** that gives entertainers — DJs, MCs, hypemen, and event hosts — a fully branded digital presence: a public booking site, media hub, payment processing, and digital press kit, all under their own custom domain.

DJ Karsh owns and operates the platform. Artists like DJ Randy Universe subscribe and get `djrandyuniverse.com` powered by CrowdVibe infrastructure.

## Features

### Platform (SaaS marketing)

- Story-driven landing page with feature showcase and social proof
- 4-tier pricing: Free · Starter (₦15k/mo) · Pro (₦35k/mo) · Enterprise
- Tenant sign-up flow (onboarding wizard) that creates both `Tenant` and `User` records atomically
- Onboarding includes site type selection: Personal / Portfolio / Corporate / Redirect

### Public Tenant Sites (`/site/[slug]/`)

Three site templates rendered based on `tenant.siteType`:

**PERSONAL** (default — DJ/MC/entertainer):

- Full branded landing page with Framer Motion hero animation (letter-by-letter name reveal)
- Services grid with event types and pricing
- Featured mixes section with Wavesurfer.js waveform audio players
- Cloudinary image gallery
- 5-step booking wizard with Paystack (₦) and Stripe (international) payment
- Digital EPK (electronic press kit) at `/press`
- Upcoming events at `/events`
- Per-tenant CSS custom properties (`--cv-brand`, `--cv-accent`) from DB — full white-label
- JSON-LD structured data (LocalBusiness + MusicGroup) for SEO
- Per-tenant `generateMetadata` for OG tags

**PORTFOLIO**: Professional portfolio with projects, skills, timeline, contact CTA

**CORPORATE**: Business site with services, about, contact form → saves `Lead` to DB

**REDIRECT**: Middleware issues a 301 to `tenant.redirectUrl` — visitor never hits the app

### Multi-Tenant Domain Routing

- `djrandyuniverse.com` → transparently served as `/site/dj-randy/` (URL never changes)
- `dj-randy.crowdvibe.io` → same behaviour via subdomain
- Powered by Next.js Edge Middleware — zero redirect, zero URL change for visitors

### Tenant Dashboard (`/dashboard/`)

- **Overview** — KPI stats: total / pending / confirmed bookings, current plan
- **Bookings** — table with status colour coding, client details, invoice generation
- **Media** — upload audio/video/photos to Cloudinary, toggle featured, type filtering, Wavesurfer.js preview
- **Events** — create and publish upcoming gigs for the public events page
- **Settings** — brand colour picker, logo, bio, social links, custom domain
- **Billing** — current plan, upgrade cards, Stripe Customer Portal link

### Google Calendar Integration

Confirmed bookings can be synced to the tenant's Google Calendar via OAuth flow at `/api/auth/google-calendar`.

### Invoices

PDF invoices generated server-side via `@react-pdf/renderer` and stored as Cloudinary assets linked to the booking.

### API Routes

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/bookings` | GET, POST | Tenant booking list + public booking creation |
| `/api/bookings/[id]` | GET, PATCH, DELETE | Booking management + status update |
| `/api/availability` | GET | Booked dates for calendar blocking in wizard |
| `/api/media` | GET, POST | Media asset list + Cloudinary upload |
| `/api/media/[id]` | PATCH, DELETE | Update featured/title, delete asset |
| `/api/events` | GET, POST | Events list + creation |
| `/api/events/[id]` | PATCH, DELETE | Update/delete event |
| `/api/newsletter/subscribe` | POST | Subscribe to tenant newsletter |
| `/api/onboarding` | POST | Create tenant + user atomically |
| `/api/payments/paystack` | POST | Initialise Paystack transaction for deposit |
| `/api/payments/stripe` | POST | Create Stripe PaymentIntent |
| `/api/billing/portal` | POST | Stripe billing portal redirect |
| `/api/billing/checkout` | POST | Stripe checkout session |
| `/api/tenants` | PATCH | Update tenant settings |
| `/api/tenants/by-domain` | GET | Custom domain → slug lookup (used by middleware) |
| `/api/auth/google-calendar` | GET | Initiate Google OAuth for calendar sync |
| `/api/auth/google-calendar/callback` | GET | Handle Google OAuth callback |
| `/api/webhooks/stripe` | POST | Subscription lifecycle events |

## Tech Stack

| Concern | Library |
| ------- | ------- |
| Framework | Next.js 15 App Router |
| Auth | NextAuth v5 + `@auth/prisma-adapter` |
| Database | Prisma 7 via `packages/db` |
| Payments | Paystack SDK + Stripe SDK v17 |
| Media | Cloudinary v2 + next-cloudinary |
| Email | Resend v4 (lazy Proxy singleton) |
| Animation | Framer Motion 12 |
| Audio | Wavesurfer.js 7 (dynamic import, no SSR) |
| Forms | React Hook Form 7 + Zod 4 |
| PDF | `@react-pdf/renderer` (invoice generation) |
| Calendar | Google Calendar API (OAuth sync) |
| State | Zustand 5 (booking wizard) |
| Styling | Tailwind CSS 4 |

## Getting Started

```bash
# From monorepo root
npm install
npm run start:db
npm run db:sync
npm run dev:crowd-vibe   # → http://localhost:3003
```

## Environment Variables

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

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Project Structure

```text
apps/crowd-vibe/
├── app/
│   ├── (platform)/           # SaaS marketing pages (public)
│   │   ├── page.tsx          # Landing page
│   │   └── pricing/page.tsx  # Pricing tiers
│   ├── (auth)/               # Sign in / sign up
│   ├── (dashboard)/          # Protected tenant dashboard
│   │   ├── layout.tsx        # Sidebar shell + auth guard
│   │   ├── dashboard/page.tsx # Overview KPI stats
│   │   ├── bookings/page.tsx
│   │   ├── media/page.tsx
│   │   ├── events/page.tsx
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── site/[slug]/          # Public per-tenant sites
│   │   ├── layout.tsx        # Brand CSS vars + JSON-LD + metadata
│   │   ├── page.tsx          # Template router (Personal/Portfolio/Corporate)
│   │   ├── book/page.tsx     # 5-step booking wizard
│   │   ├── gallery/page.tsx
│   │   ├── events/page.tsx
│   │   └── press/page.tsx    # Digital EPK
│   ├── api/                  # All API routes (see table above)
│   ├── layout.tsx            # Root layout (fonts, global CSS)
│   ├── globals.css           # CrowdVibe design tokens
│   ├── sitemap.ts            # Dynamic sitemap (all active tenants)
│   └── robots.ts
├── features/
│   ├── bookings/
│   │   ├── components/
│   │   │   ├── BookingTable.tsx
│   │   │   └── steps/        # ContactStep, DetailsStep, EventTypeStep, ...
│   │   └── types.ts
│   ├── events/
│   │   └── components/EventForm.tsx
│   ├── invoices/
│   │   ├── api.ts            # generateInvoicePdf
│   │   └── InvoiceDocument.tsx
│   └── tenants/
│       ├── components/
│       │   ├── TenantSettingsForm.tsx
│       │   └── site/
│       │       ├── personal/   # PersonalSite template
│       │       ├── portfolio/  # PortfolioSite template
│       │       └── corporate/  # CorporateSite template
│       └── site/               # HeroSection, ServicesSection, FeaturedMixes, ...
├── shared/
│   └── lib/
│       ├── auth.ts            # NextAuth v5 config + PrismaAdapter
│       ├── stripe.ts          # Lazy Proxy singleton
│       ├── resend.ts          # Lazy Proxy singleton + email helpers
│       └── prisma.ts          # Re-export from 'db'
├── middleware.ts              # Edge routing: custom domains + subdomains
└── package.json
```

## Deployment

Deploy to **Vercel**. The Edge Middleware that handles custom domain routing requires Vercel's Edge Network — this is the only platform-specific dependency.

```bash
vercel --prod
```

Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — manages all CrowdVibe tenants
- [Database schema](../../packages/db/README.md)
- [UI components](../../packages/ui/README.md)
