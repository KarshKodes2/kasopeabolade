# Karsh Core App — Claude Context

Corporate website for Karsh Core Solutions. Captures inbound leads and sends them to the admin dashboard.

## Overview

| Property | Value |
| -------- | ----- |
| **App** | karsh-core |
| **Path** | `apps/karsh-core/` |
| **Port** | 3004 (dev) |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | None (public site) |

## Features

- Company overview (Hero, Stats, Services, CTA sections)
- Services detail page
- About page (company story + Kasope bio)
- Contact/consultation form → `Lead` model in DB + Resend email notification
- SEO: Open Graph, JSON-LD, sitemap, robots.txt

## Commands

```bash
npm run dev:karsh-core     # → http://localhost:3004
npm run build:karsh-core
```

## Structure

```text
apps/karsh-core/
├── app/
│   ├── layout.tsx          # Root layout + KCNav + KCFooter
│   ├── page.tsx            # Home page (KCHero, KCServices, KCStats, KCCTA)
│   ├── globals.css
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   └── api/leads/route.ts  # POST → prisma.lead.create + resend email
├── components/
│   ├── layout/
│   │   ├── KCNav.tsx       # 'use client' — has mouse event handlers
│   │   └── KCFooter.tsx    # 'use client' — has mouse event handlers
│   └── sections/
│       ├── KCHero.tsx
│       ├── KCServices.tsx
│       ├── KCStats.tsx
│       ├── KCCTA.tsx
│       ├── KCAbout.tsx
│       ├── KCServicesDetail.tsx
│       └── KCContactForm.tsx
└── package.json
```

## Pages

| Route | Description | Type |
| ----- | ----------- | ---- |
| `/` | Home — hero, services, stats, CTA | Static |
| `/services` | Full services detail | Static |
| `/about` | Company story + bio | Static |
| `/contact` | Consultation form | Dynamic |

## Lead Capture Pattern

```typescript
// app/api/leads/route.ts
export const dynamic = 'force-dynamic';
import { LeadSchema } from 'utils/validation';
import { prisma } from 'db';

export async function POST(req: Request) {
  const body = await req.json();
  const data = LeadSchema.parse(body);
  await prisma.lead.create({ data: { ...data, source: 'karsh-core' } });
  // send Resend email notification
}
```

## Dependencies

```typescript
// Database (write-only — lead capture)
import { prisma } from 'db';

// Validation
import { LeadSchema } from 'utils/validation';
```

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
RESEND_API_KEY=
```

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Database Package](../../packages/db/)
- [Admin Dashboard](../admin/) — where leads are managed
