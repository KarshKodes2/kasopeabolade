# Kasope Abolade Monorepo

A full-stack Next.js monorepo powering multiple personal brand and business applications with shared infrastructure.

## Architecture

```
kasopeabolade/
├── apps/
│   ├── admin/          # Internal dashboard for content management
│   ├── portfolio/      # Public portfolio and blog site
│   ├── dj-karsh/       # DJ Karsh entertainment booking platform
│   └── karsh-core/     # Karsh Core Solutions corporate site
├── packages/
│   ├── db/             # Prisma schema, migrations, database client
│   ├── ui/             # Shared UI component library
│   ├── utils/          # Shared utilities (RBAC, validation)
│   └── config/         # Shared ESLint, Prettier, Tailwind configs
├── scripts/            # Database and setup scripts
└── e2e/                # Playwright end-to-end tests
```

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL 15, Prisma 6 |
| **Auth** | NextAuth.js (GitHub OAuth) |
| **Build** | Turbo 2.5, npm workspaces |
| **Language** | TypeScript 5 (strict mode) |
| **Testing** | Playwright |
| **Container** | Docker Compose |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 8.5+
- Docker (for PostgreSQL)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kasopeabolade

# Install dependencies (creates .env from .env.example)
npm install

# Start PostgreSQL container
npm run start:db

# Generate Prisma client and sync database
npm run db:sync

# Seed the database with test data
npm run seed

# Start all apps in development mode
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/karsh"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_secret"
```

## Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run dev:admin` | Start admin app only |
| `npm run dev:portfolio` | Start portfolio app only |
| `npm run dev:dj-karsh` | Start dj-karsh app only |
| `npm run dev:karsh-core` | Start karsh-core app only |

### Build

| Command | Description |
|---------|-------------|
| `npm run build` | Build all apps for production |
| `npm run build:admin` | Build admin app only |
| `npm run build:portfolio` | Build portfolio app only |
| `npm run build:dj-karsh` | Build dj-karsh app only |
| `npm run build:karsh-core` | Build karsh-core app only |

### Database

| Command | Description |
|---------|-------------|
| `npm run start:db` | Start PostgreSQL Docker container |
| `npm run db:sync` | Run migrations and generate Prisma client |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and re-seed |
| `npm run seed` | Seed database with test data |
| `npm run generate` | Generate Prisma client |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Lint all packages with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run check-types` | Run TypeScript type checking |

### Testing

| Command | Description |
|---------|-------------|
| `npm run e2e` | Run Playwright E2E tests |

## Apps

| App | Description | Documentation |
|-----|-------------|---------------|
| **admin** | Internal dashboard for managing projects, bookings, and users | [README](./apps/admin/README.md) |
| **portfolio** | Public-facing portfolio showcasing projects and blog | [README](./apps/portfolio/README.md) |
| **dj-karsh** | DJ Karsh entertainment booking and portfolio platform | [README](./apps/dj-karsh/README.md) |
| **karsh-core** | Karsh Core Solutions corporate website | [README](./apps/karsh-core/README.md) |

## Packages

| Package | Description | Documentation |
|---------|-------------|---------------|
| **db** | Prisma schema, migrations, and database utilities | [README](./packages/db/README.md) |
| **ui** | Shared React UI components | [README](./packages/ui/README.md) |
| **utils** | Shared utilities including RBAC | [README](./packages/utils/README.md) |
| **config** | Shared ESLint, Prettier, and Tailwind configurations | — |

## Database Schema

The database supports multi-tenancy with the following models:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────<│    User     │────<│   Project   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           │
                    ┌──────┴──────┐
                    │             │
              ┌─────┴─────┐ ┌─────┴─────┐
              │  Booking  │ │  Account  │
              └───────────┘ └───────────┘
```

### Models

- **User** - Users with roles (SUPER_ADMIN, ADMIN, MEMBER, GUEST)
- **Project** - Portfolio projects with tenant isolation
- **Booking** - Event bookings for DJ services
- **Tenant** - Multi-tenancy support
- **Account/Session/VerificationToken** - NextAuth authentication

## Project Structure

```
├── apps/
│   ├── admin/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── public/           # Static assets
│   │   └── package.json
│   ├── portfolio/
│   │   ├── app/
│   │   ├── public/
│   │   └── package.json
│   ├── dj-karsh/
│   │   ├── app/
│   │   ├── public/
│   │   └── package.json
│   └── karsh-core/
│       ├── app/
│       ├── public/
│       └── package.json
├── packages/
│   ├── db/
│   │   ├── schema.prisma     # Database schema
│   │   ├── migrations/       # Prisma migrations
│   │   ├── lib/prisma.ts     # Prisma client singleton
│   │   └── seed.ts           # Database seeding
│   ├── ui/
│   │   └── components/       # Shared UI components
│   ├── utils/
│   │   └── rbac.ts           # Role-based access control
│   └── config/
│       ├── eslint/
│       ├── prettier/
│       └── tailwind/
├── scripts/
│   ├── db-start.sh           # PostgreSQL container script
│   └── postinstall.js        # Post-install setup
├── e2e/
│   └── tests/                # Playwright test files
├── .github/
│   └── workflows/            # CI/CD pipelines
├── docker-compose.yml
├── turbo.json
├── tsconfig.base.json
└── package.json
```

## CI/CD

GitHub Actions workflows are configured for:

| Workflow | Trigger | Actions |
|----------|---------|---------|
| `dj-karsh.yml` | Push to `apps/dj-karsh/**` | Lint, Build |
| `portfolio.yml` | Push to `apps/portfolio/**` | Lint, Build |

## Development Guidelines

### Adding a New App

1. Create a new directory in `apps/`
2. Initialize with Next.js 15
3. Add to workspace in root `package.json`
4. Configure Turbo tasks in `turbo.json`
5. Add dev/build scripts to root `package.json`

### Adding a New Package

1. Create a new directory in `packages/`
2. Add `package.json` with name matching directory
3. Export modules via `index.ts`
4. Import in apps using `@karsh/<package-name>`

### Code Style

- ESLint with TypeScript rules
- Prettier for formatting
- Strict TypeScript mode enabled

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run check-types`
4. Submit a pull request

## Credits

Maintained by [@kasopeabolade](https://github.com/kasopeabolade)

## License

Private - All rights reserved.
