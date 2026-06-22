# Commit Standards

This document defines the commit message standards for the Kasope Abolade monorepo.

## Commit Message Format

```
{scope}: ({type}:) {description}

[optional body]

[optional footer]
```

### Examples

```
admin: (feat:) implement analytics charts for bookings and leads
crowd-vibe: (fix:) resolve booking wizard step validation
db: (chore:) add migration for event and newsletter models
ui: (refactor:) simplify Button component props
```

## Scopes

Use the app or package name as the scope:

| Scope | Description |
|-------|-------------|
| `admin` | Changes to apps/admin |
| `portfolio` | Changes to apps/portfolio |
| `crowd-vibe` | Changes to apps/crowd-vibe |
| `karsh-core` | Changes to apps/karsh-core |
| `db` | Changes to packages/db |
| `ui` | Changes to packages/ui |
| `utils` | Changes to packages/utils |
| `root` | Changes to root config files |
| `ci` | Changes to CI/CD workflows |
| `docs` | Documentation changes |

For changes spanning multiple packages:

```
crowd-vibe,db: (feat:) add events model and events dashboard
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add google calendar sync` |
| `fix` | Bug fix | `fix: resolve null pointer in auth` |
| `chore` | Maintenance | `chore: upgrade prisma to v7` |
| `docs` | Documentation | `docs: update README` |
| `style` | Code style | `style: format with prettier` |
| `refactor` | Restructuring | `refactor: extract validation logic` |
| `test` | Testing | `test: add unit tests for RBAC` |
| `perf` | Performance | `perf: optimize image loading` |
| `build` | Build system | `build: update turbo config` |
| `ci` | CI/CD | `ci: add staging workflow` |

## Description Guidelines

### Do

- Use imperative mood: "add", "fix", "update" (not "added", "fixes")
- Keep under 72 characters
- Be specific about what changed
- Start with lowercase

### Don't

- Don't end with a period
- Don't use vague terms like "update stuff"
- Don't include issue numbers in the title (use footer)

## Body (Optional)

Use the body for explaining why the change was made or listing breaking changes.

```
db: (chore:) upgrade Prisma to v7 with lazy PrismaClient singleton

- Added prisma.config.ts (defineConfig) to handle datasource URL for CLI
- Removed url from schema.prisma datasource block (Prisma 7 requirement)
- Switched singletons to lazy Proxy pattern — defers new PrismaClient()
  until first use, preventing build-time failures without DATABASE_URL
- Added export const dynamic = 'force-dynamic' to all API routes
```

## Footer (Optional)

```
crowd-vibe: (feat:) implement multi-type tenant sites

BREAKING CHANGE: Tenants now require a siteType field.

Closes #42
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Automated Commit Format

When Claude generates commits, they should follow:

```
{scope}: ({type}:) {description}

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Quick Reference

```
Good commits:
✓ admin: (feat:) add analytics charts for bookings and leads
✓ crowd-vibe: (fix:) resolve booking wizard eventType mismatch
✓ db: (chore:) upgrade Prisma to v7 with pg adapter
✓ portfolio,admin: (feat:) add blog post management

Bad commits:
✗ updated stuff
✗ fix bug
✗ WIP
✗ admin: Added new feature   (use imperative: "add" not "added")
✗ ADMIN: (FEAT:) ADD FEATURE  (use lowercase)
✗ dj-karsh: anything          (app no longer exists — use crowd-vibe)
```
