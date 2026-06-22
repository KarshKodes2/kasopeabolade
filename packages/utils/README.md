# packages/utils

Shared utility functions for the Karsh Core Solutions monorepo. Covers role-based access control, Zod validation schemas for all API inputs, and tenant database helpers.

## Usage

```typescript
import { hasAccess, assertAccess } from 'utils/rbac';
import { BookingCreateSchema, LeadSchema } from 'utils/validation';
import { getTenantBySlug, getBookedDates } from 'utils/tenant';
```

## RBAC — `rbac.ts`

Role hierarchy: `SUPER_ADMIN` > `ADMIN` > `MEMBER` > `GUEST`.

### `hasAccess(userRole, allowedRoles)`

Returns `true` if the user's role is in the allowed set.

```typescript
import { hasAccess } from 'utils/rbac';
import { Role } from '@prisma/client';

if (hasAccess(session.user.role, [Role.SUPER_ADMIN, Role.ADMIN])) {
  // show admin UI
}
```

### `assertAccess(userRole, allowedRoles)`

Throws an `UnauthorizedError` if access is denied. Use in API routes.

```typescript
import { assertAccess } from 'utils/rbac';
import { Role } from '@prisma/client';

export async function POST() {
  const session = await auth();
  assertAccess(session.user.role, [Role.SUPER_ADMIN]);
  // proceed
}
```

## Validation — `validation.ts`

Zod schemas for every data input boundary. Import the schema, parse the request body, and get fully typed output.

### `BookingCreateSchema`

Validates the 5-step booking wizard submission.

Key fields: `tenantId`, `eventType`, `eventDate`, `clientName`, `clientEmail`, `clientPhone`, `venue`, `guestCount`, `services[]`, `paymentMethod`.

### `TenantOnboardingSchema`

Validates the CrowdVibe sign-up form.

Key fields: `name`, `slug` (lowercase, alphanumeric + hyphens only), `email`.

### `TenantSettingsSchema`

Validates tenant brand/profile settings updates.

Key fields: `name`, `bio`, `brandColor` (hex), `accentColor` (hex), `customDomain`, social link handles.

### `MediaUploadSchema`

Validates media asset metadata on upload.

Key fields: `title`, `type` (MediaType), `url`, `thumbnailUrl`, `duration`.

### `LeadSchema`

Validates Karsh Core contact form submissions.

Key fields: `contactName`, `email`, `companyName`, `projectType`, `budget`, `message`.

### Example usage in an API route

```typescript
import { BookingCreateSchema } from 'utils/validation';

export async function POST(req: Request) {
  const body = await req.json();
  const data = BookingCreateSchema.parse(body); // throws ZodError on invalid input
  await prisma.booking.create({ data });
}
```

## Tenant Helpers — `tenant.ts`

Database query helpers shared across CrowdVibe's middleware, API routes, and server components.

### `getTenantBySlug(slug)`

```typescript
const tenant = await getTenantBySlug('dj-randy');
```

### `getTenantByDomain(domain)`

Used by `middleware.ts` to resolve custom domains. Only returns `ACTIVE` tenants.

```typescript
const tenant = await getTenantByDomain('djrandyuniverse.com');
```

### `getTenantWithMedia(slug)`

Returns the tenant with their media assets (mixes, photos, videos) pre-joined. Used by the public tenant landing page.

```typescript
const tenant = await getTenantWithMedia('dj-randy');
// tenant.mediaAssets → sorted by featured desc, publishedAt desc
```

### `getBookedDates(tenantId)`

Returns an array of ISO date strings (`'YYYY-MM-DD'`) for dates with `CONFIRMED`, `DEPOSIT_PAID`, or `COMPLETED` bookings. Used by the booking wizard calendar to block already-booked dates.

```typescript
const blocked = await getBookedDates(tenant.id);
// ['2025-09-14', '2025-10-31', ...]
```

## Project Structure

```text
packages/utils/
├── rbac.ts          # hasAccess + assertAccess
├── validation.ts    # Zod schemas + TypeScript type exports
├── tenant.ts        # Tenant query helpers (getTenantBySlug, etc.)
├── index.ts         # Barrel export (all three modules)
└── package.json
```

## Related

- [Monorepo root](../../README.md)
- [Database schema](../db/README.md)
