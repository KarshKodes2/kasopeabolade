# packages/ui

Shared React component library for the Karsh Core Solutions monorepo. All apps import from this package to maintain visual consistency.

## Usage

```typescript
import { Button, Card, Badge, Modal, Table, Stat, Avatar, Input, Select } from 'ui';
```

## Components

### Button

```typescript
<Button variant="primary" onClick={fn}>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger" loading={isDeleting}>Delete</Button>
```

Variants: `primary` · `secondary` · `ghost` · `danger`. Supports `loading` boolean (shows spinner, disables interaction).

### Card

```typescript
<Card>Standard card with border and surface background</Card>
<Card variant="glass">Frosted glass effect for dark UIs</Card>
```

### Input

```typescript
<Input label="Email" type="email" error={errors.email?.message} />
<Input label="Search" icon={<SearchIcon />} />
```

Supports `label`, `error`, and `icon` slot.

### Select

```typescript
<Select label="Event type" options={EVENT_TYPES} value={val} onChange={setVal} />
```

### Badge

```typescript
<Badge status="confirmed">Confirmed</Badge>
<Badge status="pending">Pending</Badge>
<Badge status="cancelled">Cancelled</Badge>
<Badge status="paid">Paid</Badge>
```

Status variants map to semantic colours: `pending` (amber) · `confirmed` (green) · `cancelled` (red) · `paid` (blue).

### Modal

```typescript
<Modal open={isOpen} onClose={() => setOpen(false)} title="Delete project">
  Are you sure?
</Modal>
```

Renders via React portal. Closes on backdrop click and Escape key.

### Table

```typescript
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status' },
  ]}
  data={rows}
  loading={isLoading}
/>
```

Supports sortable column headers and loading skeleton state.

### Stat

```typescript
<Stat label="Total bookings" value={142} trend="+12%" trendUp />
<Stat label="Revenue" value="₦2.4M" />
```

Metric card with optional trend indicator.

### Avatar

```typescript
<Avatar src={user.image} name={user.name} size="md" />
```

Shows image if `src` is provided; falls back to initials from `name`. Sizes: `sm` · `md` · `lg`.

## Themes

Per-app CSS custom property files in `themes/`. Import the relevant file in the app's root layout.

| File | App | Brand colour |
| ---- | --- | ------------ |
| `themes/crowd-vibe.css` | `apps/crowd-vibe` | `#7C3AED` (purple) |
| `themes/admin.css` | `apps/admin` | `#3B82F6` (blue) |
| `themes/portfolio.css` | `apps/portfolio` | Existing dark theme |

## Utilities

```typescript
import { cn } from 'ui/utils/cn';

// Merges Tailwind classes, resolving conflicts correctly
cn('px-4 py-2', isActive && 'bg-brand', className)
```

`cn` wraps `clsx` + `tailwind-merge`.

## Project Structure

```text
packages/ui/
├── components/
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Select.tsx
│   ├── Stat.tsx
│   ├── Table.tsx
│   └── index.ts        # Barrel export
├── themes/
│   ├── crowd-vibe.css
│   ├── admin.css
│   └── portfolio.css
├── utils/
│   └── cn.ts           # clsx + tailwind-merge helper
├── index.ts            # Top-level barrel export
└── package.json
```

## Related

- [Monorepo root](../../README.md)
