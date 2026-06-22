# Portfolio

Kasope Abolade's public developer portfolio — showcasing projects, writing, resources, and professional background at `kasope.dev`.

Project content is managed via the Admin dashboard (Portfolio → Projects), which writes to the shared `Project` model in the database.

## Features

- **6-theme system** — Light, Dark, Forest, Ocean, Rose, Slate (persisted in localStorage via `ThemeProvider`)
- **Hero** — Particle canvas, parallax, letter-by-letter name animation (GSAP + Framer Motion)
- **Projects** — sourced from `Project` model via Prisma (falls back to static data if DB empty)
- **Blog** — post listing + individual post pages, sourced from `Post` model (`context=PORTFOLIO`)
- **Newsletter** — email subscription → `NewsletterSubscriber` (tenantId=null)
- **Resources** — curated developer resources (static data)
- **Contact** — form that writes a `Lead` record (`source='portfolio'`)
- **Search** — client-side search across projects, posts, and resources
- SEO-optimised: Open Graph tags, JSON-LD, sitemap, robots.txt
- Playwright E2E test suite

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Styling** — Tailwind CSS 4
- **Fonts** — DM Sans (body) + DM Serif Display (headings) via `next/font/google`
- **Animation** — Framer Motion 12 (UI) + GSAP 3 with ScrollTrigger (canvas/scroll)
- **Database** — Prisma 7 via `packages/db` (Project + Post + Lead models)
- **Language** — TypeScript 5 (strict)
- **Testing** — Playwright

## Getting Started

```bash
# From monorepo root
npm install
npm run start:db
npm run db:sync
npm run dev:portfolio   # → http://localhost:3002
```

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
```

## Project Structure

```text
apps/portfolio/
├── app/
│   ├── layout.tsx        # Root layout: DM Sans/DM Serif, ThemeProvider, Nav, Footer
│   ├── globals.css       # Design tokens + 6-theme CSS vars
│   ├── page.tsx          # Home — all sections composed
│   ├── loading.tsx       # Loading skeleton
│   ├── not-found.tsx     # Branded 404
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── blog/
│   │   ├── page.tsx      # Blog listing (DB posts, context=PORTFOLIO)
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx  # Contact form → Lead
│   ├── resources/page.tsx
│   └── search/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    # Theme switcher + mobile drawer
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── TechStack.tsx
│       ├── Timeline.tsx
│       ├── Projects.tsx
│       ├── AIEngineering.tsx
│       ├── Stats.tsx
│       ├── Blog.tsx      # Latest 3 posts preview
│       ├── Newsletter.tsx
│       └── Contact.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useGsapTimeline.ts
│   └── useParallax.ts
├── lib/
│   ├── data.ts           # Static data (personal, skills, experience, projects)
│   ├── projects.ts       # Server-side DB helper (falls back to static)
│   └── metadata.ts       # Shared OG metadata builder
├── tailwind.config.ts
└── package.json
```

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — all sections (hero → about → tech → timeline → projects → blog → contact) |
| `/blog` | All published posts (context=PORTFOLIO) |
| `/blog/[slug]` | Individual post |
| `/resources` | Curated developer resources (static) |
| `/contact` | Contact form → Lead record |
| `/search` | Client-side search across projects, posts, resources |

## Theme System

Six themes controlled via `ThemeProvider` (client component):

| Theme | Key |
| ----- | --- |
| Light | `light` |
| Dark | `dark` |
| Forest | `forest` |
| Ocean | `ocean` |
| Rose | `rose` |
| Slate | `slate` |

Each theme sets CSS custom properties (`--bg`, `--bg-secondary`, `--surface`, `--text-primary`, `--text-secondary`, `--accent`, `--border`) on `<html data-theme="...">`.

## Adding Projects

Projects are managed through the **Admin dashboard** at `apps/admin` → Portfolio → Projects. Changes write to the shared database and reflect immediately — no rebuild needed.

## Testing

E2E tests live in `/e2e/tests/`.

```bash
npm run e2e
```

## Deployment

Deploy to **Vercel** (free tier).

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — manage project and blog content
- [Database schema](../../packages/db/README.md)
