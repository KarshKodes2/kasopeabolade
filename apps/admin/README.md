# Admin — Central Command Dashboard

The super-admin dashboard for the entire Karsh Core Solutions monorepo. A single place to manage all four products: CrowdVibe tenants, portfolio projects, Karsh Core leads, and platform-wide configuration.

Access is restricted to `SUPER_ADMIN` role — GitHub OAuth sign-in gate enforced in `lib/auth.ts`.

## Sections

### CrowdVibe

Manage the SaaS platform from the operator perspective.

- **Tenants** — all subscribers with plan, status, booking count; actions: suspend, change plan
- **Bookings** — all bookings cross-tenant in one table (client, event type, date, status)

### Portfolio

Manage the content shown on `kasope.dev`.

- **Projects** — full CRUD on `Project` records (title, description, tags, featured image, live/draft toggle)

### Karsh Core

Manage inbound leads from `karshcoresolutions.com`.

- **Leads** — CRM pipeline table (NEW → CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON/LOST) with status colour coding

### Overview

Global stats pulled across all apps: active tenants, open leads, upcoming bookings, total projects.

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Auth** — NextAuth v5 + `@auth/prisma-adapter` (GitHub OAuth, SUPER_ADMIN gate)
- **Database** — Prisma 6 via `packages/db`
- **Charts** — Recharts
- **Styling** — Tailwind CSS 4

## Getting Started

```bash
# From monorepo root
npm install
npm run dev:admin   # → http://localhost:3001
```

## Environment Variables

```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

# Same database as packages/db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
```

## User Roles

| Role | Access |
| ---- | ------ |
| `SUPER_ADMIN` | Full access — only role permitted to sign in |
| `ADMIN` | Tenant-level admin (CrowdVibe dashboard, not this app) |
| `MEMBER` | Standard tenant user |
| `GUEST` | Read-only |

## Project Structure

```text
apps/admin/
├── app/
│   ├── (auth)/
│   │   └── signin/page.tsx          # GitHub OAuth sign-in
│   ├── (dashboard)/
│   │   ├── layout.tsx               # Sidebar + auth guard
│   │   ├── page.tsx                 # Global overview stats
│   │   ├── crowdvibe/
│   │   │   ├── tenants/page.tsx     # All CrowdVibe tenants
│   │   │   └── bookings/page.tsx    # All bookings cross-tenant
│   │   ├── portfolio/
│   │   │   └── projects/page.tsx    # Portfolio project management
│   │   └── karsh-core/
│   │       └── leads/page.tsx       # Lead pipeline CRM
│   ├── api/
│   │   └── auth/[...nextauth]/      # NextAuth handler
│   ├── layout.tsx
│   ├── page.tsx                     # Redirects → /dashboard
│   └── globals.css
├── lib/
│   └── auth.ts                      # NextAuth config + SUPER_ADMIN gate
└── package.json
```

## Deployment

Deploy to **Railway** — it's an internal tool and Railway is more cost-effective than Vercel Pro for always-on server-rendered apps without edge routing requirements.

## Related

- [Monorepo root](../../README.md)
- [CrowdVibe](../crowd-vibe/README.md) — the platform this dashboard manages
- [Database schema](../../packages/db/README.md)
