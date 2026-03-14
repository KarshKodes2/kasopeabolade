# Project Context

This document provides comprehensive context about the Kasope Abolade monorepo for Claude agents.

## Project Overview

**Name**: Kasope Abolade Monorepo
**Type**: Full-stack Next.js monorepo
**Purpose**: Multiple personal brand and business applications

## Architecture

### Monorepo Structure

```
kasopeabolade/
├── apps/                    # Application frontends
│   ├── admin/              # Internal admin dashboard
│   ├── portfolio/          # Public portfolio site
│   ├── dj-karsh/           # DJ entertainment platform
│   └── karsh-core/         # Corporate website
├── packages/               # Shared packages
│   ├── db/                 # Prisma database package
│   ├── ui/                 # Shared UI components
│   └── utils/              # Shared utilities
├── scripts/                # Build and setup scripts
├── e2e/                    # Playwright E2E tests
└── .claude/                # Claude agent configuration
```

### Package Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                        apps/*                           │
│  ┌─────────┬─────────┬───────────┬────────────┐        │
│  │  admin  │portfolio│  dj-karsh │ karsh-core │        │
│  └────┬────┴────┬────┴─────┬─────┴──────┬─────┘        │
│       │         │          │            │              │
│       └─────────┴──────────┴────────────┘              │
│                         │                              │
│              ┌──────────┼──────────┐                   │
│              ▼          ▼          ▼                   │
│         ┌────────┐ ┌────────┐ ┌────────┐               │
│         │   db   │ │   ui   │ │  utils │               │
│         └────────┘ └────────┘ └────────┘               │
│                    packages/*                          │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

| Technology | Version | Usage |
|------------|---------|-------|
| Next.js | 15.3.5 | App Router framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.4.0 | Type safety |
| Tailwind CSS | 4.1.11 | Styling |

### Backend

| Technology | Version | Usage |
|------------|---------|-------|
| Next.js API Routes | 15.3.5 | API endpoints |
| NextAuth.js | Latest | Authentication |
| Prisma | 6.11.1 | ORM |
| PostgreSQL | 15 | Database |

### Build Tools

| Technology | Version | Usage |
|------------|---------|-------|
| Turbo | 2.5.4 | Monorepo orchestration |
| npm workspaces | 8.5.0 | Package management |
| tsx | 4.20.3 | TypeScript execution |

### Testing

| Technology | Version | Usage |
|------------|---------|-------|
| Vitest | Latest | Unit tests |
| Playwright | 1.54.1 | E2E tests |
| React Testing Library | Latest | Component tests |

### Code Quality

| Technology | Version | Usage |
|------------|---------|-------|
| ESLint | 9.31.0 | Linting |
| Prettier | 3.6.2 | Formatting |
| TypeScript strict | true | Type checking |

## Apps Overview

### apps/admin

**Purpose**: Internal dashboard for managing content, users, and bookings.

**Features**:
- User management with RBAC
- Project CRUD operations
- Booking management
- Multi-tenant support

**Auth**: NextAuth.js with GitHub OAuth

**URL**: http://localhost:3001 (dev)

### apps/portfolio

**Purpose**: Public-facing portfolio showcasing projects and blog.

**Features**:
- Project showcase
- Markdown blog
- SEO optimization
- Contact form

**URL**: http://localhost:3002 (dev)

### apps/dj-karsh

**Purpose**: Entertainment booking platform for DJ Karsh.

**Features**:
- Event booking system
- Media gallery
- 3D interactive homepage (planned)
- Blog and news

**Tech**: React Three Fiber (planned), Framer Motion (planned)

**URL**: http://localhost:3003 (dev)

### apps/karsh-core

**Purpose**: Corporate website for Karsh Core Solutions.

**Features**:
- Products and services
- Tech blog
- Contact forms
- Company information

**URL**: http://localhost:3000 (dev)

## Packages Overview

### packages/db

**Purpose**: Centralized database package with Prisma.

**Contents**:
- `schema.prisma` - Database schema
- `lib/prisma.ts` - Singleton Prisma client
- `migrations/` - Database migrations
- `seed.ts` - Seed data

**Models**:
- User (with RBAC roles)
- Project
- Booking
- Tenant (multi-tenancy)
- Account, Session, VerificationToken (NextAuth)

### packages/ui

**Purpose**: Shared React UI components.

**Structure**:
```
packages/ui/
├── components/
│   └── index.ts
├── hooks/
├── utils/
│   └── cn.ts
└── package.json
```

### packages/utils

**Purpose**: Shared utility functions.

**Contents**:
- `rbac.ts` - Role-based access control
- `validation.ts` (planned) - Zod schemas

## Database Schema

### User Roles

```typescript
enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN', // Full system access
  ADMIN = 'ADMIN',             // Tenant admin
  MEMBER = 'MEMBER',           // Standard user
  GUEST = 'GUEST',             // Read-only
}
```

### Multi-Tenancy

The database supports multi-tenancy:
- `Tenant` model for organizations
- `tenantId` on User and Project
- Middleware for tenant isolation

### Relationships

```
Tenant 1──────────N User
User   1──────────N Project
User   1──────────N Booking
User   1──────────N Account
User   1──────────N Session
```

## Authentication Flow

```
┌─────────┐     ┌──────────────┐     ┌──────────┐
│  User   │────▶│   NextAuth   │────▶│  GitHub  │
└─────────┘     └──────────────┘     └──────────┘
                       │
                       ▼
                ┌──────────────┐
                │   Session    │
                │   (DB/JWT)   │
                └──────────────┘
                       │
                       ▼
                ┌──────────────┐
                │    RBAC      │
                │   Check      │
                └──────────────┘
```

## API Conventions

### Route Structure

```
apps/{app}/app/api/
├── auth/                    # NextAuth routes
│   └── [...nextauth]/
├── projects/                # Resource routes
│   ├── route.ts            # GET (list), POST (create)
│   └── [id]/
│       └── route.ts        # GET, PUT, DELETE
└── health/
    └── route.ts            # Health check
```

### Response Format

```typescript
// Success
{
  data: T | T[],
  meta?: {
    total: number,
    limit: number,
    offset: number,
  }
}

// Error
{
  error: {
    code: string,
    message: string,
    details?: object,
  }
}
```

### Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Error |

## Code Conventions

### File Naming

```
# Components
ComponentName.tsx
ComponentName.test.tsx

# Utilities
utilityName.ts
utilityName.test.ts

# API Routes
route.ts
route.test.ts
```

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react';
import { NextResponse } from 'next/server';

// 2. External packages
import { z } from 'zod';

// 3. Internal packages
import { prisma } from '@karsh/db';
import { Button } from '@karsh/ui';
import { hasAccess } from '@karsh/utils/rbac';

// 4. Relative imports
import { LocalComponent } from './LocalComponent';
```

### TypeScript Patterns

```typescript
// Use interfaces for objects
interface UserProps {
  name: string;
  email: string;
}

// Use type for unions/primitives
type Role = 'ADMIN' | 'MEMBER' | 'GUEST';

// Avoid any, use unknown
function parseInput(input: unknown): UserProps {
  // validate and cast
}

// Use generics for reusable types
function useData<T>(fetcher: () => Promise<T>): T | null {
  // ...
}
```

## Deployment

### Platforms

| Platform | Usage |
|----------|-------|
| Vercel | Next.js apps |
| Railway | Database + apps |
| Docker | Self-hosted |

### Environment Tiers

| Tier | Purpose | Deploy |
|------|---------|--------|
| Preview | PR testing | Auto on PR |
| Staging | Pre-prod | Auto on main |
| Production | Live | Manual |

## CI/CD

### GitHub Actions

- `dj-karsh.yml` - Lint/build dj-karsh
- `portfolio.yml` - Lint/build portfolio

### Pipeline

```
Push ─▶ Lint ─▶ Type Check ─▶ Test ─▶ Build ─▶ Deploy
```

## Security

### Authentication

- NextAuth.js with GitHub OAuth
- Session stored in database
- CSRF protection enabled

### Authorization

- RBAC via `@karsh/utils/rbac`
- Role checks on API routes
- Tenant isolation middleware

### Secrets

- Environment variables for secrets
- `.env` in `.gitignore`
- Vercel/Railway encrypted vars

## Performance

### Build Optimization

- Turbo for caching
- Turbopack for dev server
- Tree shaking enabled

### Runtime Optimization

- Server Components by default
- Image optimization via next/image
- Code splitting automatic

### Database Optimization

- Prisma select for partial results
- Pagination for lists
- Indexes on foreign keys
