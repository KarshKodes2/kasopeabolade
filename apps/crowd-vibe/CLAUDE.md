# CrowdVibe — Claude Context

Multi-tenant SaaS entertainment booking platform under Karsh Core Solutions.

## Overview

| Property | Value |
| -------- | ----- |
| **App** | crowd-vibe |
| **Path** | `apps/crowd-vibe/` |
| **Port** | 3003 (dev) |
| **URL** | crowdvibe.io |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | NextAuth v5 + GitHub OAuth |

## Architecture

CrowdVibe is multi-tenant: each entertainer (DJ, MC, event host) who subscribes gets a fully branded public booking site at their own custom domain, powered by Vercel Edge Middleware.

```text
Request: djrandyuniverse.com
  → middleware.ts (Edge): domain lookup → rewrite to /site/dj-randy/
  → app/site/[slug]/page.tsx: render PersonalSite / PortfolioSite / CorporateSite
```

## Site Types

Tenants choose a site type during onboarding:

| Type | Template | Notes |
| ---- | -------- | ----- |
| `PERSONAL` | `PersonalSite` | DJ/MC/entertainer (default) |
| `PORTFOLIO` | `PortfolioSite` | Professional portfolio |
| `CORPORATE` | `CorporateSite` | Business site; contact form → Lead |
| `REDIRECT` | — | Middleware 301 to `tenant.redirectUrl` |

## Features

- Multi-tenant domain routing (custom domains + subdomains)
- 5-step booking wizard with Paystack (₦) + Stripe (international)
- Tenant dashboard: bookings, media library, events, settings, billing, analytics
- Google Calendar integration (sync confirmed bookings)
- Cloudinary media uploads with Wavesurfer.js waveform players
- Digital EPK (`/press`) + events page (`/events`) + gallery
- Newsletter subscriber management
- PDF invoice generation via `@react-pdf/renderer`
- Stripe Customer Portal for subscription management
- Per-tenant CSS variables (`--cv-brand`, `--cv-accent`) — full white-label

## Commands

```bash
npm run dev:crowd-vibe    # → http://localhost:3003
npm run build:crowd-vibe
npm run lint:crowd-vibe
```

## Structure

```text
apps/crowd-vibe/
├── app/
│   ├── (platform)/                  # SaaS marketing (public)
│   │   ├── page.tsx                 # Landing page
│   │   └── pricing/page.tsx
│   ├── (auth)/                      # Sign in / sign up
│   ├── (dashboard)/                 # Protected tenant dashboard
│   │   ├── layout.tsx               # Sidebar + auth guard
│   │   ├── dashboard/page.tsx       # KPI overview
│   │   ├── bookings/page.tsx
│   │   ├── media/page.tsx
│   │   ├── events/page.tsx
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── site/[slug]/                 # Public per-tenant sites
│   │   ├── layout.tsx               # Brand CSS vars + metadata
│   │   ├── page.tsx                 # Template router (PERSONAL/PORTFOLIO/CORPORATE)
│   │   ├── book/page.tsx            # 5-step booking wizard
│   │   ├── gallery/page.tsx
│   │   ├── events/page.tsx
│   │   └── press/page.tsx
│   ├── api/
│   │   ├── bookings/route.ts
│   │   ├── bookings/[id]/route.ts
│   │   ├── availability/route.ts
│   │   ├── media/route.ts
│   │   ├── media/[id]/route.ts
│   │   ├── events/route.ts
│   │   ├── events/[id]/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── newsletter/subscribe/route.ts
│   │   ├── onboarding/route.ts
│   │   ├── payments/paystack/route.ts
│   │   ├── payments/stripe/route.ts
│   │   ├── billing/portal/route.ts
│   │   ├── billing/checkout/route.ts
│   │   ├── tenants/route.ts
│   │   ├── tenants/by-domain/route.ts
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── auth/google-calendar/route.ts
│   │   ├── auth/google-calendar/callback/route.ts
│   │   └── webhooks/stripe/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css                  # CrowdVibe design tokens
├── features/
│   ├── bookings/
│   │   ├── components/
│   │   │   ├── BookingTable.tsx
│   │   │   └── steps/               # ContactStep, DetailsStep, EventTypeStep, ...
│   │   └── types.ts
│   ├── events/
│   │   └── components/EventForm.tsx
│   ├── invoices/
│   │   ├── api.ts                   # generateInvoicePdf (react-pdf)
│   │   └── InvoiceDocument.tsx
│   └── tenants/
│       ├── components/
│       │   ├── TenantSettingsForm.tsx
│       │   └── site/
│       │       ├── personal/        # PersonalSite template
│       │       ├── portfolio/       # PortfolioSite template
│       │       └── corporate/       # CorporateSite template
│       └── site/
│           ├── HeroSection.tsx
│           ├── ServicesSection.tsx
│           ├── FeaturedMixes.tsx
│           └── ...
├── shared/
│   └── lib/
│       ├── auth.ts                  # NextAuth v5 config
│       ├── stripe.ts                # Lazy Proxy singleton
│       ├── resend.ts                # Lazy Proxy singleton
│       └── prisma.ts                # Thin re-export from 'db'
├── middleware.ts                    # Edge: custom domains + subdomains → /site/[slug]/
└── package.json
```

## Important Patterns

All API routes must include `export const dynamic = 'force-dynamic'` (prevents build-time DB access).

Stripe and Resend use lazy Proxy singletons — they are not initialised at module load time, only on first call. This prevents build failures when API keys are not set.

## Dependencies

```typescript
// Database
import { prisma } from 'db';

// UI Components
import { Button, Card, Badge } from 'ui';

// Validation
import { BookingCreateSchema, TenantSettingsSchema } from 'utils/validation';
```

## API Routes

| Route | Methods | Description |
| ----- | ------- | ----------- |
| `/api/bookings` | GET, POST | Booking list + public creation |
| `/api/bookings/[id]` | GET, PATCH, DELETE | Single booking management |
| `/api/availability` | GET | Booked dates for calendar blocking |
| `/api/media` | GET, POST | Media list + Cloudinary upload |
| `/api/media/[id]` | PATCH, DELETE | Update/delete media asset |
| `/api/events` | GET, POST | Events list + creation |
| `/api/events/[id]` | PATCH, DELETE | Update/delete event |
| `/api/newsletter/subscribe` | POST | Subscribe to tenant newsletter |
| `/api/onboarding` | POST | Create tenant + user atomically |
| `/api/payments/paystack` | POST | Initialise Paystack transaction |
| `/api/payments/stripe` | POST | Create Stripe PaymentIntent |
| `/api/billing/portal` | POST | Stripe billing portal redirect |
| `/api/billing/checkout` | POST | Stripe checkout session |
| `/api/tenants` | PATCH | Update tenant settings |
| `/api/tenants/by-domain` | GET | Domain → slug lookup (middleware) |
| `/api/auth/google-calendar` | GET | Initiate Google OAuth for calendar |
| `/api/webhooks/stripe` | POST | Stripe subscription lifecycle |

## Environment Variables

```env
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://crowdvibe.io
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Admin Dashboard](../admin/) — manages all CrowdVibe tenants
- [Database Package](../../packages/db/)
