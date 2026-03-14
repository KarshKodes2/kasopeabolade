# Database Package

Centralized Prisma schema, migrations, and database utilities for the monorepo.

## Overview

This package provides:

- Prisma schema and migrations
- Singleton Prisma client with query logging
- Multi-tenant middleware for data isolation
- Database seeding utilities

## Tech Stack

- **ORM**: Prisma 6.11
- **Database**: PostgreSQL 15
- **Runtime**: tsx for TypeScript execution

## Installation

This package is automatically installed as part of the monorepo setup:

```bash
# From root directory
npm install
npm run start:db
npm run db:sync
```

## Database Schema

### Enums

```sql
Role: SUPER_ADMIN | ADMIN | MEMBER | GUEST
```

### Models

#### User

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| name | TEXT | User's display name |
| email | TEXT | Unique email address |
| image | TEXT | Profile image URL |
| role | Role | User role (default: GUEST) |
| tenantId | TEXT | Foreign key to Tenant |
| createdAt | TIMESTAMP | Creation timestamp |

#### Project

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| title | TEXT | Project title |
| slug | TEXT | URL-friendly slug (unique) |
| description | TEXT | Project description |
| featuredImg | TEXT | Featured image URL |
| createdById | TEXT | Foreign key to User |
| tenantId | TEXT | Foreign key to Tenant |
| createdAt | TIMESTAMP | Creation timestamp |
| updatedAt | TIMESTAMP | Last update timestamp |

#### Booking

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| eventDate | TIMESTAMP | Date of the event |
| clientName | TEXT | Client's name |
| status | TEXT | Booking status (default: pending) |
| userId | TEXT | Foreign key to User |
| createdAt | TIMESTAMP | Creation timestamp |

#### Tenant

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| name | TEXT | Tenant name (unique) |

#### NextAuth Models

- **Account** - OAuth provider information
- **Session** - User sessions
- **VerificationToken** - Email verification tokens

## Usage

### Import Prisma Client

```typescript
import { prisma } from 'db/lib/prisma';

// Query examples
const users = await prisma.user.findMany();
const project = await prisma.project.create({
  data: {
    title: 'My Project',
    slug: 'my-project',
    description: 'A new project',
  },
});
```

### Multi-Tenant Queries

The Prisma client includes middleware for tenant isolation on Project and Booking models:

```typescript
// The middleware automatically filters by tenantId
// when configured with the current user's session
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run seed` | Seed database with test data |
| `npm run reset` | Reset database and re-seed |
| `npm run generate` | Generate Prisma client |
| `npm run sync` | Run migrations and generate client |
| `npm run migrate` | Deploy migrations |
| `npm run studio` | Open Prisma Studio GUI |

## Running from Root

```bash
npm run db:sync      # Run migrations and generate client
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database and re-seed
npm run seed         # Seed database
npm run generate     # Generate Prisma client
```

## Project Structure

```text
packages/db/
├── lib/
│   └── prisma.ts       # Prisma client singleton
├── migrations/
│   ├── 20250712182950_init/
│   │   └── migration.sql
│   └── 20250714064112_make_tenant_name_unique/
│       └── migration.sql
├── index.ts            # Package exports
├── prisma-env.ts       # Environment loader
├── seed.ts             # Database seeding
└── package.json
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/karsh"
```

## Migrations

### Creating a New Migration

```bash
# From packages/db directory
npx prisma migrate dev --name your_migration_name
```

### Applying Migrations

```bash
# From root directory
npm run db:sync
```

## Related

- [Root README](../../README.md)
- [Admin Dashboard](../../apps/admin/README.md)
- [Docker Compose](../../docker-compose.yml)
