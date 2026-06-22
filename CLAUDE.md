# Claude Code Configuration

This is the Kasope Abolade monorepo — a full-stack Next.js monorepo powering multiple products under Karsh Core Solutions.

## Project Overview

| Property | Value |
|----------|-------|
| **Type** | Monorepo |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL 15 + Prisma 7 + pg driver adapter |
| **Auth** | NextAuth.js v5 (GitHub OAuth + email magic link) |
| **Build** | Turbo 2.5 + npm workspaces |
| **Payments** | Paystack (₦) + Stripe (international) |
| **Media** | Cloudinary |
| **Email** | Resend |

## Apps

| App | Path | Port | Purpose |
| --- | ---- | ---- | ------- |
| admin | `apps/admin/` | 3001 | Super-admin dashboard — manages ALL apps (CrowdVibe, Portfolio, Karsh Core) |
| portfolio | `apps/portfolio/` | 3002 | Kasope's public developer portfolio |
| crowd-vibe | `apps/crowd-vibe/` | 3003 | CrowdVibe multi-tenant SaaS — entertainment booking platform |
| karsh-core | `apps/karsh-core/` | 3004 | Karsh Core Solutions corporate site + lead capture |

## Packages

| Package | Path | Purpose |
|---------|------|---------|
| db | `packages/db/` | Prisma 7 schema + client, `@prisma/adapter-pg` driver, `prisma.config.ts` |
| ui | `packages/ui/` | Shared UI components (Button, Card, Badge, Modal, Table, Stat, Avatar) |
| utils | `packages/utils/` | RBAC helpers, Zod validation schemas, tenant query helpers |

## CrowdVibe Architecture

CrowdVibe is a multi-tenant SaaS where entertainers (DJs, MCs, event hosts) subscribe to get a branded public booking site.

```text
apps/crowd-vibe/app/
├── (platform)/             — SaaS marketing site (crowdvibe.io)
├── (auth)/                 — Sign in / sign up
├── (dashboard)/            — Protected tenant dashboard
│   ├── bookings/
│   ├── media/
│   ├── settings/
│   └── billing/
├── site/[slug]/            — Public per-tenant sites
│   ├── book/               — 5-step booking wizard
│   ├── gallery/
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
```

**Multi-tenant domain routing:** Visitors to `djrandyuniverse.com` are transparently served the tenant's site via Next.js edge middleware — the URL never changes. Subdomains like `dj-randy.crowdvibe.io` work the same way.

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
4. **Shared Components**: Use `packages/ui` for reusable UI
5. **Utilities**: Use `packages/utils` for shared logic (RBAC, validation, tenant helpers)
6. **Prisma**: Always use workspace-pinned v7 (`npm run --workspace=db generate`). Never `npx prisma` — fetches whatever latest is. Datasource URL lives in `packages/db/prisma.config.ts` (CLI tools) and `DATABASE_URL` env var (runtime via `@prisma/adapter-pg`).

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

Example: crowd-vibe: (feat:) add booking wizard
Example: admin: (feat:) add tenant management
Example: db: (chore:) add saas-schema migration
```

See `.claude/COMMIT_STANDARDS.md` for details.

## Deployment

| App | Platform | Notes |
| --- | -------- | ----- |
| crowd-vibe | Vercel | Required for Edge middleware custom domain routing |
| portfolio | Vercel | Free tier |
| karsh-core | Vercel | Free tier |
| admin | Railway | Internal tool, cheaper on Railway |
| PostgreSQL | Neon or Railway | Neon integrates natively with Vercel |
