# UI Component Library

Shared React UI components for the monorepo applications.

## Overview

This package provides reusable UI components that maintain consistency across all apps in the monorepo.

## Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Build**: TypeScript compiler

## Installation

This package is automatically available to all apps in the monorepo via npm workspaces.

## Usage

### Import Components

```typescript
import { Button, Input, Card } from '@karsh/ui';

// Use in your components
function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Available Components

### Planned Components

- **Button** - Primary, secondary, and outline variants
- **Input** - Text input with validation states
- **Card** - Container component with shadow and padding
- **Modal** - Dialog component for overlays
- **Form** - Form wrapper with validation
- **Table** - Data table with sorting and pagination

## Project Structure

```text
packages/ui/
├── components/
│   └── index.ts        # Component exports
├── package.json
└── tsconfig.json
```

## Creating New Components

1. Create component file in `components/`
2. Export from `components/index.ts`
3. Build the package

### Example Component

```typescript
// components/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-gray-300 hover:border-gray-400',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build TypeScript to JavaScript |

## Styling

Components use Tailwind CSS classes. The Tailwind configuration is shared from `packages/config/tailwind/`.

## Related

- [Root README](../../README.md)
- [Tailwind Config](../config/tailwind/)
