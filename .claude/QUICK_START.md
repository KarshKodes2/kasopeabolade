# Quick Start Guide

Welcome to the Kasope Abolade monorepo! This guide will help you get started quickly with Claude Code.

## Available Slash Commands

### Core Development

| Command | Description | Usage |
|---------|-------------|-------|
| `/architect` | Validate monorepo architecture | `/architect admin` |
| `/reviewer` | Code review for PRs | `/reviewer apps/admin` |
| `/tester` | Generate tests | `/tester packages/utils` |
| `/cleanup` | Remove dead code | `/cleanup all` |

### Database

| Command | Description | Usage |
|---------|-------------|-------|
| `/db-manager` | Database operations | `/db-manager migrate create add-field` |

### UI Development

| Command | Description | Usage |
|---------|-------------|-------|
| `/ui-builder` | Create UI components | `/ui-builder create Button` |

### Security & Quality

| Command | Description | Usage |
|---------|-------------|-------|
| `/security-auditor` | Security audit | `/security-auditor all` |
| `/performance` | Performance analysis | `/performance portfolio` |

### Documentation

| Command | Description | Usage |
|---------|-------------|-------|
| `/doc-writer` | Generate docs | `/doc-writer apps/admin api` |

### Deployment

| Command | Description | Usage |
|---------|-------------|-------|
| `/deployer` | Deploy apps | `/deployer admin production` |

---

## Workflows

| Workflow | Description | Usage |
|----------|-------------|-------|
| `new-feature` | Implement new feature | `/workflow new-feature admin user-mgmt` |
| `db-migration` | Safe database migration | `/workflow db-migration create add-user-phone` |
| `deploy-app` | Deploy single app | `/workflow deploy-app portfolio production` |
| `pr-review` | Complete PR review | `/workflow pr-review 42` |

---

## Project Structure

```
kasopeabolade/
├── apps/
│   ├── admin/          # Internal dashboard
│   ├── portfolio/      # Public portfolio
│   ├── dj-karsh/       # DJ booking platform
│   └── karsh-core/     # Corporate site
├── packages/
│   ├── db/             # Database (Prisma)
│   ├── ui/             # Shared components
│   └── utils/          # Shared utilities
└── .claude/            # Claude configuration
```

---

## Getting Started

### 1. Setup Environment

```bash
# Install dependencies
npm install

# Start database
npm run start:db

# Sync database
npm run db:sync

# Seed data
npm run seed
```

### 2. Start Development

```bash
# Start all apps
npm run dev

# Start specific app
npm run dev:admin
npm run dev:portfolio
npm run dev:dj-karsh
npm run dev:karsh-core
```

### 3. Run Tests

```bash
# Run all tests
npm run test

# Run E2E tests
npm run e2e
```

---

## Common Tasks

### Add a New Feature

```
/workflow new-feature admin user-management
```

### Create a Database Migration

```
/db-manager migrate create add-user-profile
```

### Deploy an App

```
/deployer admin production
```

### Run Security Audit

```
/security-auditor all
```

### Generate Documentation

```
/doc-writer apps/admin api
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/karsh"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
```

---

## Quick Reference

### Package Imports

```typescript
// Database
import { prisma } from '@karsh/db';

// UI Components
import { Button, Card } from '@karsh/ui';

// Utilities
import { hasAccess, assertAccess } from '@karsh/utils/rbac';
```

### App Ports

| App | Port |
|-----|------|
| karsh-core | 3000 |
| admin | 3001 |
| portfolio | 3002 |
| dj-karsh | 3003 |

---

## Need Help?

- Check `.claude/commands/` for detailed agent documentation
- Check `.claude/workflows/` for workflow guides
- Check `.claude/project-context.md` for architecture details
- Run `/doc-writer` to generate documentation
