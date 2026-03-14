# Utilities Package

Shared utility functions and helpers for the monorepo applications.

## Overview

This package provides common utilities including:

- Role-Based Access Control (RBAC)
- Validation schemas (planned)
- Helper functions

## Tech Stack

- **Language**: TypeScript 5
- **Dependencies**: @prisma/client (for Role enum)

## Installation

This package is automatically available to all apps in the monorepo via npm workspaces.

## Utilities

### Role-Based Access Control (RBAC)

The RBAC module provides functions to check and enforce user permissions based on roles.

#### Available Roles

```typescript
enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}
```

#### Functions

##### hasAccess

Checks if a user role is included in the required roles.

```typescript
import { hasAccess } from '@karsh/utils/rbac';
import { Role } from '@prisma/client';

const userRole = Role.ADMIN;
const requiredRoles = [Role.SUPER_ADMIN, Role.ADMIN];

if (hasAccess(userRole, requiredRoles)) {
  // User has access
}
```

##### assertAccess

Throws an error if the user doesn't have the required role.

```typescript
import { assertAccess } from '@karsh/utils/rbac';
import { Role } from '@prisma/client';

function adminOnlyAction(userRole: Role) {
  assertAccess(userRole, [Role.SUPER_ADMIN, Role.ADMIN]);

  // Proceed with admin action
}
```

## Usage Examples

### Protecting API Routes

```typescript
import { assertAccess } from '@karsh/utils/rbac';
import { Role } from '@prisma/client';

export async function POST(request: Request) {
  const session = await getSession();

  // Only admins can create projects
  assertAccess(session.user.role, [Role.SUPER_ADMIN, Role.ADMIN]);

  // Create project logic
}
```

### Conditional UI Rendering

```typescript
import { hasAccess } from '@karsh/utils/rbac';
import { Role } from '@prisma/client';

function Dashboard({ userRole }: { userRole: Role }) {
  const canManageUsers = hasAccess(userRole, [Role.SUPER_ADMIN]);

  return (
    <div>
      <h1>Dashboard</h1>
      {canManageUsers && <UserManagement />}
    </div>
  );
}
```

### Role Hierarchy (Usage Pattern)

```typescript
const ROLE_HIERARCHY = {
  [Role.SUPER_ADMIN]: [Role.SUPER_ADMIN, Role.ADMIN, Role.MEMBER, Role.GUEST],
  [Role.ADMIN]: [Role.ADMIN, Role.MEMBER, Role.GUEST],
  [Role.MEMBER]: [Role.MEMBER, Role.GUEST],
  [Role.GUEST]: [Role.GUEST],
};

// Super admin can do everything
hasAccess(Role.SUPER_ADMIN, ROLE_HIERARCHY[Role.ADMIN]); // true

// Guest can only do guest things
hasAccess(Role.GUEST, ROLE_HIERARCHY[Role.ADMIN]); // false
```

## Project Structure

```text
packages/utils/
├── rbac.ts             # Role-based access control
├── validation.ts       # Validation schemas (planned)
└── index.ts            # Package exports
```

## Planned Utilities

### Validation Schemas

Zod schemas for validating API inputs:

```typescript
// Planned: packages/utils/validation.ts
import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
});

export const bookingSchema = z.object({
  eventDate: z.date(),
  clientName: z.string().min(1),
});
```

### Helper Functions

Common helper functions:

```typescript
// Planned utilities
export function slugify(text: string): string;
export function formatDate(date: Date, format?: string): string;
export function generateId(): string;
```

## Related

- [Root README](../../README.md)
- [Database Package](../db/README.md) - For Role enum
- [Admin Dashboard](../../apps/admin/README.md) - Primary RBAC consumer
