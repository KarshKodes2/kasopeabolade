# Claude Code Configuration

This is the Kasope Abolade monorepo - a full-stack Next.js monorepo with multiple apps and shared packages.

## Project Overview

| Property | Value |
|----------|-------|
| **Type** | Monorepo |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL 15 + Prisma 6 |
| **Auth** | NextAuth.js (GitHub OAuth) |
| **Build** | Turbo 2.5 + npm workspaces |

## Apps

| App | Path | Purpose |
|-----|------|---------|
| admin | `apps/admin/` | Internal dashboard |
| portfolio | `apps/portfolio/` | Public portfolio |
| dj-karsh | `apps/dj-karsh/` | DJ booking platform |
| karsh-core | `apps/karsh-core/` | Corporate site |

## Packages

| Package | Path | Purpose |
|---------|------|---------|
| db | `packages/db/` | Prisma schema + client |
| ui | `packages/ui/` | Shared UI components |
| utils | `packages/utils/` | Shared utilities (RBAC) |

## Quick Commands

```bash
# Development
npm run dev              # Start all apps
npm run dev:admin        # Start admin only
npm run dev:portfolio    # Start portfolio only

# Database
npm run start:db         # Start PostgreSQL
npm run db:sync          # Run migrations
npm run db:studio        # Open Prisma Studio

# Build & Test
npm run build            # Build all
npm run lint             # Lint all
npm run e2e              # E2E tests
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
5. **Utilities**: Use `packages/utils` for shared logic

## Environment Variables

Required in `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

## File Locations

- **Claude Config**: `.claude/`
- **Workflows**: `.github/workflows/`
- **Database**: `packages/db/`
- **Tests**: `e2e/tests/`
- **Scripts**: `scripts/`

## Commit Convention

```
{scope}: ({type}:) {description}

Example: admin: (feat:) add user management
```

See `.claude/COMMIT_STANDARDS.md` for details.
