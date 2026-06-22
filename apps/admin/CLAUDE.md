# Admin App — Claude Context

Super-admin dashboard for managing all products in the Karsh Core Solutions monorepo.

## Overview

| Property | Value |
| -------- | ----- |
| **App** | admin |
| **Path** | `apps/admin/` |
| **Port** | 3001 (dev) |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | NextAuth.js v5 + GitHub OAuth (SUPER_ADMIN gate) |

## Features

- Global KPI overview (tenants, bookings, leads, projects)
- Recharts analytics (monthly bookings, lead funnel, plan distribution)
- CrowdVibe tenant management (plan, status, site type)
- CrowdVibe booking management (cross-tenant, status updates)
- Portfolio project CRUD + blog management
- Karsh Core lead CRM pipeline
- ADMIN team member management (invite, deactivate)
- Dialog-driven CRUD — no separate `/new` or `/edit` pages

## User Roles

| Role | Permissions |
| ---- | ----------- |
| SUPER_ADMIN | Full system access — only role that can sign in |
| ADMIN | Scoped sections assigned by SUPER_ADMIN |
| MEMBER | Standard CrowdVibe tenant user (not this app) |
| GUEST | Read-only (not this app) |

## Commands

```bash
npm run dev:admin      # → http://localhost:3001
npm run build:admin
npm run lint:admin
```

## Structure

```text
apps/admin/
├── app/
│   ├── (auth)/signin/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx           # Sidebar + TopBar + role guard
│   │   ├── page.tsx             # KPI overview
│   │   ├── analytics/page.tsx
│   │   ├── team/page.tsx
│   │   ├── portfolio/projects/page.tsx
│   │   ├── portfolio/blog/page.tsx
│   │   ├── karsh-core/leads/page.tsx
│   │   ├── karsh-core/blog/page.tsx
│   │   ├── crowdvibe/tenants/page.tsx
│   │   ├── crowdvibe/bookings/page.tsx
│   │   └── crowdvibe/blog/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── projects/[id]/route.ts
│       ├── posts/[id]/route.ts
│       ├── crowdvibe/tenants/[id]/route.ts
│       ├── crowdvibe/bookings/[id]/route.ts
│       ├── karsh-core/leads/[id]/route.ts
│       └── team/route.ts
├── features/            # Dialog components per entity
├── shared/              # AdminSidebar, AdminTopBar, DataTable, FilterBar
└── lib/auth.ts
```

## API Routes

| Route | Methods | Auth | Description |
| ----- | ------- | ---- | ----------- |
| `/api/auth/*` | Various | Public | NextAuth endpoints |
| `/api/projects` | POST | SUPER_ADMIN | Create project |
| `/api/projects/[id]` | PUT, DELETE | SUPER_ADMIN | Update/delete project |
| `/api/posts` | POST | SUPER_ADMIN | Create blog post |
| `/api/posts/[id]` | PUT, DELETE | SUPER_ADMIN | Update/delete post |
| `/api/crowdvibe/tenants/[id]` | PUT | SUPER_ADMIN | Update plan/status/siteType |
| `/api/crowdvibe/bookings/[id]` | PUT | SUPER_ADMIN | Update booking status |
| `/api/karsh-core/leads/[id]` | PUT | SUPER_ADMIN | Update lead status |
| `/api/team` | POST | SUPER_ADMIN | Invite ADMIN |
| `/api/team/[id]` | PUT, DELETE | SUPER_ADMIN | Edit/deactivate admin |

## Dependencies

```typescript
// Database
import { prisma } from 'db';

// UI Components
import { Button, Card, Badge, Table, Stat } from 'ui';

// RBAC
import { hasAccess, assertAccess } from 'utils/rbac';
```

## Authentication Pattern

```typescript
import { auth } from '@/lib/auth';
import { assertAccess } from 'utils/rbac';
import { Role } from 'db';

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  assertAccess(session.user.role, [Role.SUPER_ADMIN]);
  // proceed
}
```

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Database Package](../../packages/db/)
- [UI Components](../../packages/ui/)
- [Utils Package](../../packages/utils/)
