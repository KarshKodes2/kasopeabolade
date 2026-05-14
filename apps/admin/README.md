# Admin Dashboard

Internal admin interface for managing projects, bookings, and users with role-based access control.

## Features

- Project management (CRUD operations)
- Booking management for events
- User management with RBAC
- GitHub OAuth authentication
- Multi-tenant support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Auth**: NextAuth.js with GitHub OAuth
- **Database**: Prisma + PostgreSQL
- **Language**: TypeScript 5

## Getting Started

### Prerequisites

Ensure the monorepo is set up:

```bash
# From root directory
npm install
npm run start:db
npm run db:sync
```

### Development

```bash
# From root directory
npm run dev:admin

# Or from this directory
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
# From root directory
npm run build:admin

# Or from this directory
npm run build
```

## Authentication

This app uses NextAuth.js with GitHub OAuth provider.

### Setup GitHub OAuth

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth App
3. Set Homepage URL to `http://localhost:3000`
4. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
5. Add credentials to `.env`:

```env
GITHUB_ID="your_client_id"
GITHUB_SECRET="your_client_secret"
NEXTAUTH_SECRET="your_secret_key"
```

## User Roles

| Role | Permissions |
|------|-------------|
| `SUPER_ADMIN` | Full access to all features and settings |
| `ADMIN` | Can manage content and users |
| `MEMBER` | Limited content management |
| `GUEST` | View only access |

## Project Structure

```text
apps/admin/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   └── api/            # API routes
├── public/             # Static assets
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Base URL for NextAuth |
| `NEXTAUTH_SECRET` | Secret for NextAuth sessions |
| `GITHUB_ID` | GitHub OAuth client ID |
| `GITHUB_SECRET` | GitHub OAuth client secret |

## Related

- [Root README](../../README.md)
- [Database Package](../../packages/db/README.md)
- [UI Components](../../packages/ui/README.md)
