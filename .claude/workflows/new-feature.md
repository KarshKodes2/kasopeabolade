# New Feature Workflow

This workflow guides the implementation of a new feature in the monorepo.

## Trigger

```
/workflow new-feature [app-name] [feature-name]

Example:
/workflow new-feature admin user-management
/workflow new-feature dj-karsh booking-calendar
```

## Workflow Steps

### Step 1: Architecture Review

Before writing any code, validate the approach.

```
/architect {app-name}
```

**Questions to Answer**:
1. Which app(s) will this feature affect?
2. Will this require database changes?
3. Are there shared components needed?
4. What packages will be modified?

**Output**: Architecture decision document

---

### Step 2: Database Changes (if needed)

If the feature requires database changes:

```
/db-manager schema add-model {ModelName}
/db-manager migrate create {migration-name}
```

**Checklist**:
- [ ] Schema changes defined
- [ ] Migration created and tested
- [ ] Seed data updated (if needed)
- [ ] Types regenerated

---

### Step 3: Shared Components (if needed)

If new UI components are required:

```
/ui-builder create {ComponentName}
```

**Checklist**:
- [ ] Component created in packages/ui
- [ ] TypeScript interfaces defined
- [ ] Tests written
- [ ] Exported from index.ts

---

### Step 4: Implementation

Implement the feature following these patterns:

#### API Routes (if needed)

```typescript
// apps/{app}/app/api/{feature}/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@karsh/db';
import { assertAccess } from '@karsh/utils/rbac';
import { z } from 'zod';

const schema = z.object({
  // Define validation schema
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    assertAccess(session.user.role, [Role.ADMIN]);

    const body = await request.json();
    const validated = schema.parse(body);

    const result = await prisma.model.create({
      data: validated,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

#### Page Component

```typescript
// apps/{app}/app/{feature}/page.tsx
import { Suspense } from 'react';
import { FeatureComponent } from './components/FeatureComponent';
import { Skeleton } from '@karsh/ui';

export default function FeaturePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Feature Title</h1>
      <Suspense fallback={<Skeleton />}>
        <FeatureComponent />
      </Suspense>
    </div>
  );
}
```

---

### Step 5: Testing

Generate and run tests:

```
/tester apps/{app}/app/{feature}
```

**Test Coverage Requirements**:
- [ ] API routes: 80%+ coverage
- [ ] Components: 80%+ coverage
- [ ] E2E: Critical paths covered

---

### Step 6: Security Review

Run security audit:

```
/security-auditor {app-name}
```

**Checklist**:
- [ ] Authentication enforced
- [ ] Authorization (RBAC) implemented
- [ ] Input validation present
- [ ] No security vulnerabilities

---

### Step 7: Code Review

Request code review:

```
/reviewer apps/{app}/app/{feature}
```

**Must pass**:
- [ ] TypeScript compliance
- [ ] Code quality standards
- [ ] Performance considerations
- [ ] Test coverage

---

### Step 8: Documentation

Generate documentation:

```
/doc-writer apps/{app} api
/doc-writer apps/{app} feature
```

**Deliverables**:
- [ ] API documentation
- [ ] Feature README
- [ ] Updated main README (if needed)

---

### Step 9: Deployment

Prepare for deployment:

```
/deployer {app-name} preview
```

**Pre-deployment Checks**:
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] Database migrations applied

---

## Feature Checklist Template

```markdown
## Feature: {feature-name}

### App: {app-name}

### Status: In Progress / Complete

---

### Architecture
- [ ] Architecture reviewed
- [ ] Dependencies identified
- [ ] Approach approved

### Database
- [ ] Schema changes (if any)
- [ ] Migration created
- [ ] Migration tested
- [ ] Seed data updated

### Implementation
- [ ] API routes created
- [ ] Page components created
- [ ] Shared components (if any)
- [ ] State management

### Testing
- [ ] Unit tests written
- [ ] Component tests written
- [ ] E2E tests written
- [ ] Coverage goals met

### Security
- [ ] Auth implemented
- [ ] RBAC implemented
- [ ] Input validation
- [ ] Security audit passed

### Documentation
- [ ] API documented
- [ ] Feature documented
- [ ] README updated

### Deployment
- [ ] Preview deployed
- [ ] Smoke tests passed
- [ ] Ready for production
```

---

## Example: Implementing User Management

```bash
# 1. Review architecture
/architect admin

# 2. Add user management schema (if new models needed)
/db-manager schema add-model UserProfile
/db-manager migrate create add_user_profile

# 3. Create shared components
/ui-builder create UserCard
/ui-builder create UserForm

# 4. Implement feature
# ... write code ...

# 5. Generate tests
/tester apps/admin/app/users

# 6. Security audit
/security-auditor admin

# 7. Code review
/reviewer apps/admin/app/users

# 8. Documentation
/doc-writer apps/admin api

# 9. Deploy preview
/deployer admin preview
```
