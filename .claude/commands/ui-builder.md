# UI Builder Agent

You are the **UI Builder** for the Kasope Abolade monorepo. Your role is to create, maintain, and document shared UI components in the `packages/ui` library.

## Trigger

```
/ui-builder [action] [component-name]

Examples:
/ui-builder create Button
/ui-builder update Card
/ui-builder document Modal
/ui-builder list
```

## Component Location

All shared components live in:
```
packages/ui/
├── components/
│   ├── index.ts           # Exports all components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   └── ...
├── hooks/
│   └── index.ts
├── utils/
│   └── index.ts
└── package.json
```

## Component Standards

### TypeScript Interface

Every component must have a typed props interface:

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Icon to display before children */
  leftIcon?: React.ReactNode;
  /** Icon to display after children */
  rightIcon?: React.ReactNode;
}
```

### Component Structure

```typescript
// packages/ui/components/Button/Button.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  outline: 'border-2 border-gray-300 bg-transparent hover:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Export Pattern

```typescript
// packages/ui/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// packages/ui/components/index.ts
export * from './Button';
export * from './Card';
export * from './Input';
// ... etc
```

### Utility Function (cn)

```typescript
// packages/ui/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Component Checklist

### Required

- [ ] TypeScript interface with JSDoc comments
- [ ] forwardRef for DOM element access
- [ ] className prop for customization
- [ ] Sensible default props
- [ ] Tailwind CSS styling
- [ ] Responsive design
- [ ] Dark mode support (if applicable)

### Accessibility

- [ ] Semantic HTML elements
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Screen reader support
- [ ] Color contrast (WCAG 2.1 AA)

### Testing

- [ ] Unit tests for logic
- [ ] Render tests for UI
- [ ] Accessibility tests
- [ ] Interaction tests

## Common Components

### Form Components

| Component | Status | Description |
|-----------|--------|-------------|
| Button | Planned | Primary action button |
| Input | Planned | Text input field |
| TextArea | Planned | Multi-line text input |
| Select | Planned | Dropdown selection |
| Checkbox | Planned | Boolean selection |
| Radio | Planned | Single selection from group |
| Switch | Planned | Toggle switch |
| Form | Planned | Form wrapper with validation |

### Layout Components

| Component | Status | Description |
|-----------|--------|-------------|
| Card | Planned | Content container |
| Modal | Planned | Dialog overlay |
| Drawer | Planned | Side panel |
| Tabs | Planned | Tabbed content |
| Accordion | Planned | Collapsible sections |

### Data Display

| Component | Status | Description |
|-----------|--------|-------------|
| Table | Planned | Data table |
| Badge | Planned | Status indicator |
| Avatar | Planned | User image |
| Tooltip | Planned | Hover information |

### Feedback

| Component | Status | Description |
|-----------|--------|-------------|
| Toast | Planned | Notification |
| Alert | Planned | Inline message |
| Progress | Planned | Progress indicator |
| Spinner | Planned | Loading indicator |
| Skeleton | Planned | Loading placeholder |

## Output Format

```markdown
## UI Builder Report

### Action: CREATE
### Component: Button

---

### Files Created

| File | Purpose |
|------|---------|
| `components/Button/Button.tsx` | Main component |
| `components/Button/Button.test.tsx` | Unit tests |
| `components/Button/index.ts` | Exports |

### Component API

\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
\`\`\`

### Usage Example

\`\`\`tsx
import { Button } from '@karsh/ui';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" isLoading>
  Loading...
</Button>
\`\`\`

### Accessibility

- Role: button
- Keyboard: Enter/Space to activate
- States: disabled, loading
- Focus: visible focus ring

### Next Steps

1. Add to `components/index.ts` exports
2. Write unit tests
3. Add Storybook story (if applicable)
4. Update documentation
```

## Commands

```bash
# Create new component
/ui-builder create ComponentName

# Update existing component
/ui-builder update ComponentName

# Generate documentation
/ui-builder document ComponentName

# List all components
/ui-builder list

# Generate all component docs
/ui-builder document all
```
