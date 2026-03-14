#!/bin/bash

echo "🚧 Setting up monorepo files..."

# Admin/Web/Portfolio READMEs
mkdir -p apps/admin apps/web apps/portfolio
cat > apps/admin/README.md <<EOF
# Admin Dashboard

Internal admin for managing projects, bookings, users.

## Stack

- Next.js 15
- NextAuth
- Prisma + PostgreSQL
- Tailwind CSS

## Dev

\`\`\`bash
npm run dev
\`\`\`
EOF

cat > apps/web/README.md <<EOF
# DJ Web Frontend

3D portfolio + entertainment booking site for DJ Karsh.

## Stack

- Next.js 15
- Tailwind CSS
- Planned: R3F, Drei, Framer Motion

## Dev

\`\`\`bash
npm run dev
\`\`\`
EOF

cat > apps/portfolio/README.md <<EOF
# Portfolio Site

Minimal public portfolio for projects and blogs.

## Stack

- Next.js 15
- Tailwind CSS

## Dev

\`\`\`bash
npm run dev
\`\`\`
EOF

# GitHub Actions
mkdir -p .github/workflows
cat > .github/workflows/admin.yml <<EOF
name: Admin CI
on:
  push:
    paths: ['apps/admin/**']
  pull_request:
    paths: ['apps/admin/**']
jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/admin
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run build
EOF

# GitHub templates
mkdir -p .github/ISSUE_TEMPLATE
cat > .github/ISSUE_TEMPLATE/bug_report.md <<EOF
---
name: Bug Report
about: Report a bug or crash
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: [e.g. macOS, Windows]
- Browser
- Node version
EOF

cat > .github/PULL_REQUEST_TEMPLATE.md <<EOF
## 📝 Description
Brief summary of what your PR does.

## ✅ Checklist
- [ ] Code is clean and self-documented
- [ ] Tests added/updated
- [ ] Related issue linked
EOF

# Prettier config
cat > .prettierrc <<EOF
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
EOF

# ESLint config
cat > .eslintrc.js <<EOF
module.exports = {
  root: true,
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
EOF

# Tailwind config
cat > tailwind.config.ts <<EOF
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./apps/**/*.{ts,tsx}', './packages/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
EOF

# TS Config
cat > tsconfig.base.json <<EOF
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./packages/*"]
    }
  },
  "exclude": ["node_modules"],
  "include": ["apps", "packages"]
}
EOF

# UI Components
mkdir -p packages/ui/components
cat > packages/ui/components/Button.tsx <<EOF
import React from 'react';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ children, variant = 'primary', className, ...props }: Props) => {
  return (
    <button
      className={classNames(
        'px-4 py-2 rounded text-white font-semibold',
        variant === 'primary' && 'bg-blue-600 hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-500 hover:bg-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
EOF

# Shared Configs
mkdir -p packages/config/{eslint,prettier,tailwind}
echo "module.exports = require('../../.eslintrc.js');" > packages/config/eslint/index.js
cp .prettierrc packages/config/prettier/index.json
cp tailwind.config.ts packages/config/tailwind/tailwind.config.ts

echo "✅ Monorepo base files created successfully."
