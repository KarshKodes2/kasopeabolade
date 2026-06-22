# Karsh Core Solutions

Corporate website for **Karsh Core Solutions** — a technology consulting and solutions company. Serves as the public face of the business and captures inbound leads via a contact/consultation form.

Leads captured here appear in the Admin dashboard under **Karsh Core → Leads**, where they move through a CRM pipeline (NEW → CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON/LOST).

## Features

- Company overview and value proposition (Hero, Stats, CTA sections)
- Technology consulting and product offerings (Services page)
- About page — company story and Kasope's professional bio
- Contact + consultation form — writes `Lead` records to the shared database
- Resend email notification to `aboladekasope@gmail.com` on every new lead
- SEO-optimised with Open Graph tags, JSON-LD, sitemap, robots.txt

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Styling** — Tailwind CSS 4
- **Database** — Prisma 7 via `packages/db` (Lead model, write-only)
- **Email** — Resend (lead notification emails)
- **Language** — TypeScript 5 (strict)

## Getting Started

```bash
# From monorepo root
npm install
npm run dev:karsh-core   # → http://localhost:3004
```

## Environment Variables

```env
# Shared database URL (leads are stored here)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh

# Email notifications on new lead
RESEND_API_KEY=
```

## Lead Flow

```text
Visitor fills consultation form
        ↓
POST /api/leads  →  LeadSchema.parse(body)
        ↓
prisma.lead.create({ status: 'NEW', source: 'karsh-core' })
        ↓
resend.emails.send({ to: 'aboladekasope@gmail.com', ... })
        ↓
Lead appears in Admin → Karsh Core → Leads
        ↓
Status updated manually: CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON / LOST
```

## Project Structure

```text
apps/karsh-core/
├── app/
│   ├── layout.tsx          # Root layout + global metadata + KCNav + KCFooter
│   ├── page.tsx            # Home — KCHero, KCServices, KCStats, KCCTA
│   ├── globals.css         # Corporate design tokens
│   ├── about/page.tsx      # KCAbout — company story + Kasope bio
│   ├── services/page.tsx   # KCServicesDetail — full services list
│   ├── contact/page.tsx    # KCContactForm — consultation form
│   └── api/
│       └── leads/route.ts  # POST → Lead + Resend notification
├── components/
│   ├── layout/
│   │   ├── KCNav.tsx       # Navigation (client component)
│   │   └── KCFooter.tsx    # Footer (client component)
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

| Route | Description |
| ----- | ----------- |
| `/` | Home — hero, services overview, stats, CTA |
| `/services` | Full technology consulting service detail |
| `/about` | Company story and Kasope's professional background |
| `/contact` | Consultation form (writes Lead to DB + sends email) |

## Deployment

Deploy to **Vercel** (free tier — near-static, no edge routing needed).

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — view and manage captured leads
- [Database schema](../../packages/db/README.md)
