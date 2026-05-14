# CrowdVibe

> **Power the Crowd. Own the Vibe.**

CrowdVibe is a multi-tenant SaaS platform under **Karsh Core Solutions** that gives entertainers — DJs, MCs, hypemen, and event hosts — a fully branded digital presence: a public booking site, media hub, payment processing, and digital press kit, all under their own custom domain.

DJ Karsh owns and operates the platform. Artists like DJ Randy Universe subscribe and get `djrandyuniverse.com` powered by CrowdVibe infrastructure.

## Features

### Platform (SaaS marketing)

- Landing page with feature showcase and social proof
- 4-tier pricing: Free · Starter (₦15k/mo) · Pro (₦35k/mo) · Enterprise
- Tenant sign-up flow that creates both `Tenant` and `User` records atomically

### Public Tenant Sites (`/site/[slug]/`)

- Full branded landing page with Framer Motion hero animation (letter-by-letter name reveal)
- Services grid with event types and pricing
- Featured mixes section with Wavesurfer.js waveform audio players
- Cloudinary image gallery
- 5-step booking wizard with Paystack (₦) and Stripe (international) payment
- Digital EPK (electronic press kit) at `/press`
- Per-tenant CSS custom properties (`--cv-brand`, `--cv-accent`) from DB — full white-label
- JSON-LD structured data (LocalBusiness + MusicGroup) for SEO
- Per-tenant `generateMetadata` for OG tags

### Multi-Tenant Domain Routing

- `djrandyuniverse.com` → transparently served as `/site/dj-randy/` (URL never changes)
- `dj-randy.crowdvibe.io` → same behaviour via subdomain
- Powered by Next.js Edge Middleware — zero redirect, zero URL change for visitors

### Tenant Dashboard (`/dashboard/`)

- Overview stats: total / pending / confirmed bookings, current plan
- Bookings table with status colour coding and client details
- Media library: upload audio/video/photos to Cloudinary, toggle featured, type filtering
- Settings: brand colour picker, logo, bio, social links (Instagram/TikTok/YouTube/Audiomack/SoundCloud), custom domain
- Billing: current plan display, upgrade cards, Stripe Customer Portal link

### API Routes

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/bookings` | GET, POST | Tenant booking list + public booking creation |
| `/api/bookings/[id]` | GET, PATCH, DELETE | Booking management + status update |
| `/api/availability` | GET | Booked dates for calendar blocking in wizard |
| `/api/media` | GET, POST | Media asset list + Cloudinary upload |
| `/api/media/[id]` | PATCH, DELETE | Update featured/title, delete asset |
| `/api/payments/paystack` | POST | Initialise Paystack transaction for deposit |
| `/api/payments/stripe` | POST | Create Stripe PaymentIntent |
| `/api/webhooks/stripe` | POST | Subscription lifecycle events |
| `/api/billing/portal` | POST | Stripe billing portal redirect |
| `/api/tenants` | PATCH | Update tenant settings |
| `/api/tenants/by-domain` | GET | Custom domain → slug lookup (used by middleware) |
| `/api/auth/[...nextauth]` | ANY | NextAuth v5 handler |

## Tech Stack

| Concern | Library |
| ------- | ------- |
| Framework | Next.js 15 App Router |
| Auth | NextAuth v5 + `@auth/prisma-adapter` |
| Database | Prisma 6 via `packages/db` |
| Payments | Paystack SDK + Stripe SDK v17 |
| Media | Cloudinary v2 + next-cloudinary |
| Email | Resend v4 |
| Animation | Framer Motion 12 |
| Audio | Wavesurfer.js 7 (dynamic import, no SSR) |
| Forms | React Hook Form 7 + Zod 3 |
| Calendar | react-big-calendar |
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

# GitHub OAuth
GITHUB_ID=
GITHUB_SECRET=

# Paystack (Nigerian/African payments)
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...

# Stripe (international payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Cloudinary (media storage)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (transactional email)
RESEND_API_KEY=

# App URL (for sitemap, OG tags)
NEXT_PUBLIC_APP_URL=https://crowdvibe.io
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
│   │   ├── page.tsx          # Overview stats
│   │   ├── bookings/         # Booking management
│   │   ├── media/            # Media library
│   │   ├── settings/         # Brand + social settings
│   │   └── billing/          # Plan + Stripe portal
│   ├── site/[slug]/          # Public per-tenant sites
│   │   ├── layout.tsx        # Brand CSS vars + JSON-LD + metadata
│   │   ├── page.tsx          # Tenant landing page
│   │   └── book/page.tsx     # 5-step booking wizard
│   ├── api/                  # API routes (see table above)
│   ├── layout.tsx            # Root layout (fonts, global CSS)
│   ├── globals.css           # CrowdVibe design tokens
│   ├── sitemap.ts            # Dynamic sitemap (all active tenants)
│   └── robots.ts
├── components/
│   ├── booking/              # BookingWizard + 5 step components
│   ├── dashboard/            # TenantSettingsForm
│   ├── layout/               # SiteNav, SiteFooter
│   ├── media/                # WavesurferPlayer
│   └── site/                 # HeroSection, ServicesSection, FeaturedMixes, etc.
├── lib/
│   ├── auth.ts               # NextAuth v5 config + PrismaAdapter
│   ├── paystack.ts           # initiatePayment / verifyPayment
│   ├── stripe.ts             # Stripe singleton + createPaymentIntent
│   └── resend.ts             # sendBookingConfirmation / sendQuoteEmail
├── middleware.ts              # Edge routing: custom domains + subdomains
├── types/
│   └── next-auth.d.ts        # Session type augmentation (tenantId, role)
└── package.json
```

## Deployment

Deploy to **Vercel**. The Edge Middleware that handles custom domain routing (`djrandyuniverse.com → /site/dj-randy/`) requires Vercel's Edge Network — this is the only platform-specific dependency.

```bash
vercel --prod
```

Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — manages all CrowdVibe tenants
- [Database schema](../../packages/db/README.md)
- [UI components](../../packages/ui/README.md)
