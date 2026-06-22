# Quick Start Guide

Welcome to the Kasope Abolade monorepo. This guide covers available slash commands, workflows, and common tasks for Claude Code.

## Available Slash Commands

### Core Development

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/architect` | Validate monorepo architecture | `/architect crowd-vibe` |
| `/reviewer` | Code review for PRs | `/reviewer apps/admin` |
| `/tester` | Generate tests | `/tester packages/utils` |
| `/cleanup` | Remove dead code | `/cleanup all` |

### Database

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/db-manager` | Database operations | `/db-manager migrate create add-field` |

### UI Development

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/ui-builder` | Create UI components | `/ui-builder create Button` |

### Security & Quality

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/security-auditor` | Security audit | `/security-auditor all` |
| `/performance` | Performance analysis | `/performance portfolio` |

### Documentation

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/doc-writer` | Generate docs | `/doc-writer apps/admin api` |

### Deployment

| Command | Description | Usage |
| ------- | ----------- | ----- |
| `/deployer` | Deploy apps | `/deployer admin production` |

---

## Workflows

| Workflow | Description | Usage |
| -------- | ----------- | ----- |
| `new-feature` | Implement new feature | `/workflow new-feature crowd-vibe google-calendar` |
| `db-migration` | Safe database migration | `/workflow db-migration create add-user-phone` |
| `deploy-app` | Deploy single app | `/workflow deploy-app portfolio production` |
| `pr-review` | Complete PR review | `/workflow pr-review 42` |

---

## Project Structure

```text
kasopeabolade/
├── apps/
│   ├── admin/          # Super-admin dashboard (port 3001)
│   ├── portfolio/      # Public portfolio (port 3002)
│   ├── crowd-vibe/     # Multi-tenant SaaS platform (port 3003)
│   └── karsh-core/     # Corporate site (port 3004)
├── packages/
│   ├── db/             # Prisma 7 + pg adapter
│   ├── ui/             # Shared components
│   └── utils/          # RBAC, validation, tenant helpers
└── .claude/            # Claude configuration
```

---

## Getting Started

### 1. Setup Environment

```bash
npm install
npm run start:db
npm run db:sync
npm run seed
```

### 2. Start Development

```bash
npm run dev               # All apps
npm run dev:admin         # Admin only     → localhost:3001
npm run dev:portfolio     # Portfolio only → localhost:3002
npm run dev:crowd-vibe    # CrowdVibe only → localhost:3003
npm run dev:karsh-core    # Karsh Core only → localhost:3004
```

### 3. Run Tests

```bash
npm run e2e
npm run check-types
npm run lint
```

---

## Common Tasks

### Add a New Feature

```text
/workflow new-feature crowd-vibe analytics-dashboard
```

### Create a Database Migration

```text
/db-manager migrate create add-google-calendar-fields
```

### Deploy an App

```text
/deployer crowd-vibe production
```

### Run Security Audit

```text
/security-auditor all
```

---

## Environment Variables

Each app has its own `.env.local`. Shared DB URL goes in `packages/db/.env`:

```env
# packages/db/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh

# apps/crowd-vibe/.env.local
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=your-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
STRIPE_SECRET_KEY=sk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
CLOUDINARY_CLOUD_NAME=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://crowdvibe.io

# apps/admin/.env.local
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret
DATABASE_URL=  # same as packages/db/.env
```

---

## Quick Reference

### Package Imports

```typescript
// Database (workspace name: 'db')
import { prisma } from 'db';

// UI Components (workspace name: 'ui')
import { Button, Card, Badge, Table, Stat } from 'ui';

// Utilities (workspace name: 'utils')
import { hasAccess, assertAccess } from 'utils/rbac';
import { BookingCreateSchema, LeadSchema } from 'utils/validation';
import { getTenantBySlug, getBookedDates } from 'utils/tenant';
```

### App Ports

| App | Port |
| --- | ---- |
| admin | 3001 |
| portfolio | 3002 |
| crowd-vibe | 3003 |
| karsh-core | 3004 |

### API Route Template

All API routes must start with `force-dynamic`:

```typescript
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'db';

export async function GET(req: NextRequest) {
  // handler
}
```

---

## Need Help?

- Check `.claude/commands/` for detailed agent documentation
- Check `.claude/workflows/` for workflow guides
- Check `.claude/project-context.md` for full architecture details
