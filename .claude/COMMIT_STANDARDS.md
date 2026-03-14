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
admin: (feat:) implement user management dashboard
portfolio: (fix:) resolve image loading issue on projects page
db: (chore:) add migration for user phone field
ui: (refactor:) simplify Button component props
```

## Scopes

Use the app or package name as the scope:

| Scope | Description |
|-------|-------------|
| `admin` | Changes to apps/admin |
| `portfolio` | Changes to apps/portfolio |
| `dj-karsh` | Changes to apps/dj-karsh |
| `karsh-core` | Changes to apps/karsh-core |
| `db` | Changes to packages/db |
| `ui` | Changes to packages/ui |
| `utils` | Changes to packages/utils |
| `config` | Changes to packages/config |
| `root` | Changes to root config files |
| `ci` | Changes to CI/CD workflows |
| `docs` | Documentation changes |

For changes spanning multiple packages:
```
admin,db: (feat:) add user profile with phone field
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add dark mode toggle` |
| `fix` | Bug fix | `fix: resolve null pointer in auth` |
| `chore` | Maintenance | `chore: update dependencies` |
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

Use the body for:
- Explaining **why** the change was made
- Providing context for complex changes
- Listing breaking changes

```
admin: (refactor:) restructure authentication flow

The previous auth flow had multiple entry points which made it
difficult to maintain. This refactor consolidates all auth logic
into a single module with clear boundaries.

Changes:
- Move auth utils to shared lib
- Consolidate session handling
- Add proper TypeScript types
```

## Footer (Optional)

Use the footer for:
- Issue references
- Breaking changes
- Co-authors

```
admin: (feat:) implement SSO integration

BREAKING CHANGE: The login endpoint now requires a redirect_uri parameter.

Closes #42
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Breaking Changes

For breaking changes, add `BREAKING CHANGE:` in the footer:

```
db: (feat:) change user role enum values

BREAKING CHANGE: Role enum values have changed:
- OPERATOR -> MEMBER
- VIEWER -> GUEST

Run migration to update existing data.
```

## Multi-Package Changes

When a change spans multiple packages:

```
admin,db: (feat:) add user profile feature

- Add UserProfile model to database schema
- Create user profile API endpoints
- Add profile management UI
```

## Automated Commit Format

When Claude generates commits, they should follow:

```
{scope}: ({type}:) {description}

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Pre-Commit Hooks

The repository uses pre-commit hooks to:
1. Run linting
2. Run type checking
3. Validate commit message format

```bash
# .husky/commit-msg
#!/bin/sh
npx commitlint --edit $1
```

## Commitlint Configuration

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [
      'admin', 'portfolio', 'dj-karsh', 'karsh-core',
      'db', 'ui', 'utils', 'config',
      'root', 'ci', 'docs'
    ]],
    'type-enum': [2, 'always', [
      'feat', 'fix', 'chore', 'docs', 'style',
      'refactor', 'test', 'perf', 'build', 'ci'
    ]],
  },
};
```

## Quick Reference

```
Good commits:
✓ admin: (feat:) add user search functionality
✓ db: (fix:) resolve migration conflict
✓ ui: (refactor:) simplify Card component
✓ portfolio,admin: (feat:) add shared header component

Bad commits:
✗ updated stuff
✗ fix bug
✗ WIP
✗ admin: Added new feature (use imperative: "add" not "added")
✗ ADMIN: (FEAT:) ADD FEATURE (use lowercase)
```
