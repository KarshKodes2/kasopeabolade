# Karsh Core Solutions

Corporate website for **Karsh Core Solutions** — a technology consulting and solutions company. Serves as the public face of the business and captures inbound leads via a contact/consultation form.

Leads captured here appear in the Admin dashboard under **Karsh Core → Leads**, where they move through a CRM pipeline (NEW → CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON/LOST).

## Features

- Company overview and services showcase
- Technology consulting and product offerings
- Case studies section
- Blog / insights
- Contact + consultation form — writes `Lead` records to the shared database
- SEO-optimised with Open Graph tags, JSON-LD, sitemap, robots.txt

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Styling** — Tailwind CSS 4
- **Database** — Prisma 6 via `packages/db` (Lead model)
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

# Optional: email notifications on new lead
RESEND_API_KEY=
```

## Lead Flow

```text
Visitor fills consultation form
        ↓
POST /api/leads  →  prisma.lead.create({ status: 'NEW' })
        ↓
Lead appears in Admin → Karsh Core → Leads
        ↓
Status updated manually: CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON / LOST
```

## Project Structure

```text
apps/karsh-core/
├── app/
│   ├── layout.tsx        # Root layout + global metadata
│   ├── page.tsx          # Home — company overview
│   ├── globals.css       # Global styles
│   ├── services/         # Services offered
│   ├── products/         # Products showcase (CrowdVibe featured)
│   ├── blog/             # Insights and tech blog
│   ├── case-studies/     # Client work
│   └── contact/          # Consultation form → Lead capture
├── public/
└── package.json
```

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — company overview and value proposition |
| `/services` | Technology consulting, product development, etc. |
| `/products` | Products built by Karsh Core (incl. CrowdVibe) |
| `/blog` | Tech blog and insights |
| `/blog/[slug]` | Individual post |
| `/case-studies` | Client work and outcomes |
| `/contact` | Consultation form (writes Lead to DB) |

## Deployment

Deploy to **Vercel** (free tier — near-static, no edge routing needed).

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — view and manage captured leads
- [Database schema](../../packages/db/README.md)
