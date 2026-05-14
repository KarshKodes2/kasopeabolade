# Portfolio

Kasope Abolade's public developer portfolio — showcasing projects, writing, and professional background at `kasope.dev`.

Project content is managed via the Admin dashboard (Portfolio → Projects), which writes to the shared `Project` model in the database.

## Features

- Project showcase — sourced from the shared `Project` model via Prisma
- Blog / writing
- About and contact pages
- SEO-optimised: Open Graph tags, JSON-LD, sitemap, robots.txt
- Playwright E2E test suite

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Styling** — Tailwind CSS 4
- **Database** — Prisma 6 via `packages/db` (Project model, read-only)
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
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Home — featured projects
│   ├── globals.css
│   ├── projects/         # All projects listing
│   ├── blog/             # Blog posts
│   └── about/            # About page
├── public/
└── package.json
```

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — featured projects and intro |
| `/projects` | All projects |
| `/projects/[slug]` | Individual project detail |
| `/blog` | Writing and posts |
| `/blog/[slug]` | Individual post |
| `/about` | Background and contact |

## Adding Projects

Projects are managed through the **Admin dashboard** at `apps/admin` → Portfolio → Projects. Changes write to the shared database and reflect on this site immediately (no rebuild needed — server components fetch at request time).

## Testing

E2E tests live in `/e2e/tests/`.

```bash
# From monorepo root
npm run e2e
```

## Deployment

Deploy to **Vercel** (free tier).

## Related

- [Monorepo root](../../README.md)
- [Admin dashboard](../admin/README.md) — manage project content
- [Database schema](../../packages/db/README.md)
