# Admin — Central Command Dashboard

The super-admin dashboard for the entire Karsh Core Solutions monorepo. A single place to manage all four products: CrowdVibe tenants, portfolio projects, Karsh Core leads, and platform-wide analytics.

Access is restricted to `SUPER_ADMIN` role — GitHub OAuth sign-in gate enforced in `lib/auth.ts`.

## Sections

### Overview

Global KPI cards pulled across all apps: active tenants, open leads, upcoming bookings, total projects.

### Analytics

Recharts visualisations:

- Monthly bookings bar chart (last 6 months)
- Lead funnel by status (horizontal bar)
- Tenant plan distribution (pie chart)

### CrowdVibe

Manage the SaaS platform from the operator perspective.

- **Tenants** — all subscribers with plan, status, booking count; actions: suspend, change plan, change site type
- **Bookings** — all bookings cross-tenant in one table (client, event type, date, status); actions: update status

### Portfolio

Manage the content shown on `kasope.dev`.

- **Projects** — full CRUD on `Project` records (title, description, tags, featured image, live/draft toggle)
- **Blog** — manage `Post` records with `context=PORTFOLIO`

### Karsh Core

Manage inbound leads from `karshcoresolutions.com`.

- **Leads** — CRM pipeline (NEW → CONTACTED → PROPOSAL_SENT → NEGOTIATION → WON/LOST) with status colour coding
- **Blog** — manage `Post` records with `context=KARSH_CORE`

### Team

Invite and manage ADMIN team members. Only SUPER_ADMIN can access.

## Tech Stack

- **Framework** — Next.js 15 App Router
- **Auth** — NextAuth v5 + `@auth/prisma-adapter` (GitHub OAuth, SUPER_ADMIN gate)
- **Database** — Prisma 7 via `packages/db`
- **Charts** — Recharts
- **UI** — Tailwind CSS 4 + `packages/ui` components
- **Dialogs** — Dialog-driven CRUD (Add/Edit/Delete per entity, no separate /new pages)
- **Data fetching** — TanStack Query for client mutations + cache invalidation

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
| `ADMIN` | Scoped sections only (managed by SUPER_ADMIN) |
| `MEMBER` | Standard CrowdVibe tenant user (not admin app) |
| `GUEST` | Read-only (not admin app) |

## Project Structure

```text
apps/admin/
├── app/
│   ├── (auth)/
│   │   └── signin/page.tsx              # GitHub OAuth sign-in
│   ├── (dashboard)/
│   │   ├── layout.tsx                   # Sidebar + TopBar + auth guard
│   │   ├── page.tsx                     # Global overview KPI cards
│   │   ├── analytics/page.tsx           # Recharts charts
│   │   ├── team/page.tsx                # ADMIN team management
│   │   ├── settings/page.tsx
│   │   ├── portfolio/
│   │   │   ├── projects/page.tsx        # Project CRUD
│   │   │   └── blog/page.tsx            # Posts (context=PORTFOLIO)
│   │   ├── karsh-core/
│   │   │   ├── leads/page.tsx           # Lead CRM pipeline
│   │   │   └── blog/page.tsx            # Posts (context=KARSH_CORE)
│   │   └── crowdvibe/
│   │       ├── tenants/page.tsx         # All CrowdVibe tenants
│   │       ├── bookings/page.tsx        # All bookings cross-tenant
│   │       └── blog/page.tsx            # Posts (context=TENANT)
│   ├── api/
│   │   ├── auth/[...nextauth]/          # NextAuth handler
│   │   ├── projects/route.ts            # POST
│   │   ├── projects/[id]/route.ts       # PUT, DELETE
│   │   ├── posts/route.ts               # POST
│   │   ├── posts/[id]/route.ts          # PUT, DELETE
│   │   ├── crowdvibe/tenants/[id]/route.ts   # PUT (plan/status/siteType)
│   │   ├── crowdvibe/bookings/[id]/route.ts  # PUT (status)
│   │   ├── karsh-core/leads/[id]/route.ts    # PUT (status)
│   │   └── team/route.ts                # POST (invite)
│   ├── layout.tsx
│   ├── page.tsx                         # Redirects → /dashboard
│   └── globals.css
├── features/
│   ├── projects/components/             # AddProjectDialog, EditProjectDialog, DeleteProjectDialog
│   ├── posts/components/                # AddPostDialog, EditPostDialog, DeletePostDialog
│   ├── tenants/components/              # ViewTenantDialog, EditTenantDialog, SuspendTenantDialog
│   ├── bookings/components/             # ViewBookingDialog, UpdateBookingStatusDialog
│   ├── leads/components/                # ViewLeadDialog, UpdateLeadStatusDialog
│   └── team/components/                 # AddAdminDialog, EditAdminDialog, DeactivateAdminDialog
├── shared/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx         # Collapsible, role-aware nav
│   │   │   └── AdminTopBar.tsx          # User menu
│   │   ├── access-control/
│   │   │   ├── RoleGate.tsx
│   │   │   └── AccessDenied.tsx
│   │   └── common/
│   │       ├── DataTable.tsx            # Generic typed table
│   │       ├── FilterBar.tsx            # Search + status filter
│   │       ├── AppPagination.tsx
│   │       └── StatusBadge.tsx
│   └── hooks/useDebounce.ts
├── lib/
│   └── auth.ts                          # NextAuth config + SUPER_ADMIN gate
└── package.json
```

## Deployment

Deploy to **Railway** — it's an internal tool and Railway is more cost-effective than Vercel Pro for always-on server-rendered apps without edge routing requirements.

## Related

- [Monorepo root](../../README.md)
- [CrowdVibe](../crowd-vibe/README.md) — the platform this dashboard manages
- [Database schema](../../packages/db/README.md)
