# Claude Code Configuration

This is the Kasope Abolade monorepo — a full-stack Next.js monorepo powering multiple products under Karsh Core Solutions.

## Project Overview

| Property | Value |
|----------|-------|
| **Type** | Monorepo |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL 15 + Prisma 6 |
| **Auth** | NextAuth.js v5 (GitHub OAuth + email magic link) |
| **Build** | Turbo 2.5 + npm workspaces |
| **Payments** | Paystack (₦) + Stripe (international) |
| **Media** | Cloudinary |
| **Email** | Resend |
| **Server state** | TanStack Query (React Query v5) |
| **Animations** | Framer Motion (primary) + GSAP (heavy canvas/loader only) |
| **Blog/MDX** | next-mdx-remote (Post content stored in DB as MDX string) |
| **Toasts** | Sonner |
| **Admin UI** | shadcn/ui (Dialog, AlertDialog, DropdownMenu, Tabs on top of packages/ui) |

## Apps

| App | Path | Port | Purpose |
| --- | ---- | ---- | ------- |
| admin | `apps/admin/` | 3001 | Super-admin dashboard — manages ALL apps (CrowdVibe, Portfolio, Karsh Core) |
| portfolio | `apps/portfolio/` | 3002 | Kasope's public developer portfolio |
| crowd-vibe | `apps/crowd-vibe/` | 3003 | CrowdVibe — digital presence SaaS (Portfolio / Personal / Corporate sites) |
| karsh-core | `apps/karsh-core/` | 3004 | Karsh Core Solutions corporate site + lead capture |

## Packages

| Package | Path | Import | Purpose |
|---------|------|--------|---------|
| db | `packages/db/` | `db` | Prisma 6 schema + client (multi-tenant SaaS schema) |
| ui | `packages/ui/` | `ui` | Shared UI components (Button, Card, Badge, Modal, Table, Stat, Avatar) |
| utils | `packages/utils/` | `utils` | RBAC helpers, Zod validation schemas, tenant query helpers |

> **Import paths use the workspace name, not a scoped package name.**
> Correct: `import { prisma } from 'db'`
> Wrong: `import { prisma } from '@karsh/db'`

## CrowdVibe Platform

CrowdVibe is a multi-tenant SaaS where users create one or more web properties:

| Site Type | Template | Use case |
|-----------|----------|----------|
| `PERSONAL` | Artiste/creative template | DJs, musicians, artists, lifestyle creators |
| `PORTFOLIO` | Developer portfolio template | Professionals showcasing work and experience |
| `CORPORATE` | Business/agency template | Companies and established businesses |
| `REDIRECT` | 301 redirect | External site — CrowdVibe manages the domain |

```text
apps/crowd-vibe/app/
├── (platform)/             — SaaS marketing site (crowdvibe.io) — tells the CrowdVibe story
├── (auth)/                 — Sign in / sign up
├── (dashboard)/            — Protected tenant dashboard
│   ├── bookings/
│   ├── events/
│   ├── media/
│   ├── analytics/
│   ├── settings/
│   └── billing/
├── site/[slug]/            — Public per-tenant sites (template chosen by siteType)
│   ├── book/               — 5-step booking wizard
│   ├── gallery/
│   ├── blog/[postSlug]/    — Tenant blog posts
│   └── press/              — Digital EPK
└── api/
    ├── bookings/
    ├── media/
    ├── availability/
    ├── payments/paystack/
    ├── payments/stripe/
    ├── tenants/
    └── webhooks/stripe/
middleware.ts               — Rewrites custom domains + subdomains → /site/[slug]/...
                            — 301 redirect if tenant.siteType === REDIRECT
```

**Multi-tenant domain routing:** Visitors to `djrandyuniverse.com` are transparently served the tenant's site via Next.js edge middleware — the URL never changes. Subdomains like `dj-randy.crowdvibe.io` work the same way.

## Post Routing (Blog Content)

The `Post` model uses `PostContext` to determine which app renders the post:

| `context` | `tenantId` | Rendered by |
|-----------|-----------|-------------|
| `PORTFOLIO` | `null` | `apps/portfolio/app/blog/[slug]` |
| `KARSH_CORE` | `null` | `apps/karsh-core/app/blog/[slug]` |
| `TENANT` | tenant ID | `apps/crowd-vibe/app/site/[slug]/blog/[postSlug]` |

Any CrowdVibe tenant (PERSONAL, PORTFOLIO, or CORPORATE type) can have a blog — all use `context=TENANT`.

## Admin Architecture

The admin uses a feature-based structure modelled on enterprise dashboard patterns:

```text
apps/admin/
├── app/(dashboard)/
│   ├── portfolio/projects/     — Project CRUD
│   ├── portfolio/blog/         — Posts (context=PORTFOLIO)
│   ├── karsh-core/leads/       — Lead management
│   ├── karsh-core/blog/        — Posts (context=KARSH_CORE)
│   ├── crowdvibe/tenants/      — Tenant management
│   ├── crowdvibe/bookings/     — Booking management
│   ├── crowdvibe/blog/         — Tenant posts (context=TENANT)
│   ├── team/                   — Admin team members
│   └── analytics/              — Recharts dashboard
├── features/[domain]/
│   ├── components/             — Add/Edit/Delete/View dialogs
│   └── hooks/                  — TanStack Query hooks
└── shared/
    ├── components/layout/      — AdminSidebar, AdminTopBar
    ├── components/access-control/ — RoleGate, AccessDenied
    └── components/common/      — DataTable, FilterBar, AppPagination, StatusBadge
```

CRUD pattern: dialog modals only (no `/new` or `/edit` pages). Form pattern: Zod schema + React Hook Form + shadcn/ui Form components.

## Access Control (RBAC)

| Role | Scope |
|------|-------|
| `SUPER_ADMIN` | Everything — all apps, all data, manage team |
| `ADMIN` | Scoped sections only (assigned per section) |
| `MEMBER` | CrowdVibe tenant owner — their own site only |
| `GUEST` | CrowdVibe tenant member — limited read/edit within tenant |

Guard pattern: `RoleGate` wraps dashboard layout routes; `hasAccess()` from `packages/utils/rbac.ts` guards all API routes.

## Animation Rules

| Animation type | Library |
|---------------|---------|
| Scroll reveals, fade/slide/scale, stagger, hover, layout transitions, page transitions, form feedback | **Framer Motion** (`motion/react`) — default for everything |
| Canvas particle systems, agent network graphs, background meshes, custom splash/loader screens, curtain navigation transitions | **GSAP** — only when Framer Motion cannot handle it performantly |

Never mix both libraries on the same element. Animation timing: UI micro-interactions ≤ 200ms, section reveals 500–700ms. Always use easing curves (`ease-out`, `easeInOut`) — never `linear`. Apply the 12 principles of animation: staging, slow in/out, follow-through (stagger), secondary action, appeal.

## Quick Commands

```bash
# Development
npm run dev                 # Start all apps
npm run dev:admin           # Start admin only (port 3001)
npm run dev:portfolio       # Start portfolio only (port 3002)
npm run dev:crowd-vibe      # Start CrowdVibe only (port 3003)
npm run dev:karsh-core      # Start Karsh Core only (port 3004)

# Database
npm run start:db            # Start PostgreSQL
npm run db:sync             # Run Prisma migrations
npm run db:studio           # Open Prisma Studio
npm run --workspace=packages/db generate   # Regenerate Prisma client after schema changes

# Build & Test
npm run build               # Build all
npm run lint                # Lint all
npm run e2e                 # E2E tests
```

## Claude Agents

Available slash commands (see `.claude/` for details):

| Command | Description |
|---------|-------------|
| `/architect` | Validate architecture |
| `/reviewer` | Code review |
| `/tester` | Generate tests |
| `/security-auditor` | Security audit |
| `/deployer` | Deployment |
| `/db-manager` | Database operations |
| `/ui-builder` | Create UI components |
| `/cleanup` | Code cleanup |
| `/doc-writer` | Documentation |
| `/performance` | Performance analysis |

## Workflows

| Workflow | Description |
|----------|-------------|
| `/workflow new-feature` | Implement new feature |
| `/workflow db-migration` | Database migration |
| `/workflow deploy-app` | Deploy single app |
| `/workflow pr-review` | PR review process |

## Architecture Rules

1. **Package Imports**: Apps can only import from `packages/*`
2. **No Cross-App Imports**: Apps cannot import from other apps
3. **Database Access**: All DB operations go through `packages/db`
4. **Shared Components**: Use `packages/ui` for reusable UI; extend with shadcn/ui in admin only
5. **Utilities**: Use `packages/utils` for shared logic (RBAC, validation, tenant helpers)
6. **Prisma**: Always use workspace-pinned v6 (`npm run --workspace=packages/db generate`), never `npx prisma` which fetches latest
7. **Animations**: Framer Motion by default. GSAP only for canvas/loader/curtain animations
8. **Single breakpoint (portfolio)**: Portfolio app uses only `max-width: 768px` — no sm/md/lg/xl Tailwind breakpoints
9. **Admin CRUD**: Always use dialog modals. Never create separate `/new` or `/[id]/edit` pages

## Environment Variables

Each app has its own `.env.local`. Shared DB url goes in `packages/db/.env`.

```env
# packages/db/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh

# apps/crowd-vibe/.env.local
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

# apps/admin/.env.local
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=
DATABASE_URL=  (same as db package)

# apps/portfolio/.env.local
NEXTAUTH_URL=http://localhost:3002
DATABASE_URL=  (same as db package)

# apps/karsh-core/.env.local
NEXTAUTH_URL=http://localhost:3004
DATABASE_URL=  (same as db package)
RESEND_API_KEY=
```

## File Locations

- **Claude Config**: `.claude/`
- **Workflows**: `.github/workflows/`
- **Database**: `packages/db/`
- **Tests**: `e2e/tests/`
- **Scripts**: `scripts/`

## Commit Convention

```text
{scope}: ({type}:) {description}

Scopes: admin, crowd-vibe, portfolio, karsh-core, db, ui, utils, root
Types:  feat, fix, chore, docs, refactor, style, test

Examples:
  crowd-vibe: (feat:) add PORTFOLIO site type template
  admin: (feat:) add project CRUD dialogs
  db: (chore:) add Post model and SiteType enum
  portfolio: (feat:) add 6-theme system and blog section
```

See `.claude/COMMIT_STANDARDS.md` for details.

Branch strategy: `main` is production. Feature branches: `feat/{scope}/{short-description}`. Open a PR to merge into `main`.

## Deployment

| App | Platform | Notes |
| --- | -------- | ----- |
| crowd-vibe | Vercel | Required for Edge middleware custom domain routing |
| portfolio | Vercel | Free tier |
| karsh-core | Vercel | Free tier |
| admin | Railway | Internal tool, cheaper on Railway |
| PostgreSQL | Neon or Railway | Neon integrates natively with Vercel |

**$0 thresholds to watch:** Neon (0.5 GB free), Resend (3k emails/mo free), Cloudinary (25 GB free). Stripe/Paystack are pay-per-transaction only.
