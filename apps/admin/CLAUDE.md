# Admin App - Claude Context

Internal admin dashboard for managing content, users, and bookings.

## Overview

| Property | Value |
|----------|-------|
| **App** | admin |
| **Path** | `apps/admin/` |
| **Port** | 3001 (dev) |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | NextAuth.js + GitHub OAuth |

## Features

- User management with RBAC
- Project CRUD operations
- Booking management
- Multi-tenant data isolation
- Session-based authentication

## User Roles

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full system access |
| ADMIN | Tenant admin |
| MEMBER | Standard access |
| GUEST | Read-only |

## Commands

```bash
# Development
npm run dev:admin

# Build
npm run build:admin

# Lint
npm run lint:admin
```

## Structure

```
apps/admin/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Dashboard
│   ├── globals.css      # Styles
│   └── api/             # API routes
│       ├── auth/        # NextAuth
│       ├── projects/    # Project CRUD
│       ├── bookings/    # Booking CRUD
│       └── users/       # User management
├── components/          # App components
├── lib/                 # Utilities
└── public/              # Static assets
```

## API Routes

| Route | Methods | Auth | Description |
|-------|---------|------|-------------|
| `/api/auth/*` | Various | Public | NextAuth endpoints |
| `/api/projects` | GET, POST | Admin+ | Project management |
| `/api/projects/[id]` | GET, PUT, DELETE | Admin+ | Single project |
| `/api/bookings` | GET, POST | Admin+ | Booking management |
| `/api/users` | GET, POST | Super Admin | User management |

## Dependencies

```typescript
// Database
import { prisma } from '@karsh/db';

// UI Components
import { Button, Card } from '@karsh/ui';

// RBAC
import { hasAccess, assertAccess } from '@karsh/utils/rbac';
```

## Authentication Pattern

```typescript
import { getServerSession } from 'next-auth';
import { assertAccess } from '@karsh/utils/rbac';

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  assertAccess(session.user.role, [Role.ADMIN, Role.SUPER_ADMIN]);

  // Continue with authorized logic
}
```

## Environment Variables

```env
DATABASE_URL=
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
