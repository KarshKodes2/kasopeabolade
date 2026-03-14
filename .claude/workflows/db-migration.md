# Database Migration Workflow

This workflow ensures safe database migrations across environments.

## Trigger

```
/workflow db-migration [operation]

Examples:
/workflow db-migration create add-phone-to-user
/workflow db-migration deploy
/workflow db-migration rollback
```

## Migration Types

| Type | Risk | Description |
|------|------|-------------|
| **Additive** | Low | Adding new tables, columns, indexes |
| **Modifying** | Medium | Changing column types, constraints |
| **Destructive** | High | Dropping tables, columns, data |

## Workflow Steps

### Step 1: Plan the Migration

**Before creating any migration, answer**:

1. What schema changes are needed?
2. Is this additive, modifying, or destructive?
3. Will this require data migration?
4. Can this be deployed without downtime?

---

### Step 2: Create Migration (Development)

```bash
# Make schema changes in packages/db/schema.prisma
# Then generate migration

/db-manager migrate create {migration-name}

# Or manually:
cd packages/db
npx prisma migrate dev --name {migration-name}
```

**Migration Naming Convention**:
```
{action}_{entity}_{detail}

Examples:
- add_phone_to_user
- create_blog_post_table
- add_index_on_project_slug
- remove_deprecated_fields
```

---

### Step 3: Review Migration SQL

Check the generated SQL in:
```
packages/db/migrations/{timestamp}_{name}/migration.sql
```

**Review Checklist**:
- [ ] SQL is correct
- [ ] No unintended changes
- [ ] Indexes added where needed
- [ ] Foreign keys properly defined
- [ ] Default values set correctly

---

### Step 4: Test Migration Locally

```bash
# Apply migration to local database
npm run db:sync

# Verify with Prisma Studio
npm run db:studio

# Run application tests
npm run test

# Test affected features manually
npm run dev
```

---

### Step 5: Data Migration (if needed)

If data needs to be transformed:

```typescript
// packages/db/migrations/data/{timestamp}_migrate_data.ts
import { prisma } from '../lib/prisma';

async function migrateData() {
  console.log('Starting data migration...');

  // Example: Migrate phone numbers to new format
  const users = await prisma.user.findMany({
    where: { phone: { not: null } },
  });

  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phone: formatPhone(user.phone),
      },
    });
  }

  console.log(`Migrated ${users.length} users`);
}

migrateData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run data migration:
```bash
npx tsx packages/db/migrations/data/{timestamp}_migrate_data.ts
```

---

### Step 6: Deploy to Staging

```bash
# Set DATABASE_URL to staging database
export DATABASE_URL="postgresql://...staging..."

# Deploy migrations
npx prisma migrate deploy --schema packages/db/schema.prisma

# Verify
npx prisma studio --schema packages/db/schema.prisma
```

**Staging Verification**:
- [ ] Migration applied successfully
- [ ] No data loss
- [ ] Application works correctly
- [ ] Performance is acceptable

---

### Step 7: Deploy to Production

**Pre-Production Checklist**:
- [ ] Staging verified
- [ ] Backup created
- [ ] Rollback plan ready
- [ ] Maintenance window scheduled (if needed)

```bash
# Set DATABASE_URL to production database
export DATABASE_URL="postgresql://...production..."

# Create backup first!
pg_dump -Fc $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).dump

# Deploy migrations
npx prisma migrate deploy --schema packages/db/schema.prisma

# Verify
npx prisma studio --schema packages/db/schema.prisma
```

---

### Step 8: Post-Deployment Verification

```bash
# Check migration status
npx prisma migrate status --schema packages/db/schema.prisma

# Run smoke tests
npm run e2e

# Monitor application logs
# Check error rates
# Verify performance
```

---

## Rollback Procedures

### Schema Rollback (if possible)

Create a reverse migration:

```bash
/db-manager migrate create rollback_{original_migration}
```

### Data Restore (worst case)

```bash
# Restore from backup
pg_restore -d $DATABASE_URL backup.dump
```

---

## Migration Safety Rules

### DO

- Always backup before production migrations
- Test migrations in development and staging first
- Use transactions for data migrations
- Add indexes for new foreign keys
- Set sensible defaults for new required fields

### DON'T

- Never edit applied migration files
- Never run `migrate reset` in production
- Never drop columns with data without backup
- Never change column types without data verification
- Never deploy migrations during peak hours

---

## Migration Checklist

```markdown
## Migration: {migration-name}

### Type: Additive / Modifying / Destructive

### Changes
- [ ] {describe change 1}
- [ ] {describe change 2}

### Pre-Migration
- [ ] Schema changes reviewed
- [ ] Migration SQL reviewed
- [ ] Data migration planned (if needed)
- [ ] Rollback plan documented

### Development
- [ ] Migration created
- [ ] Migration applied locally
- [ ] Tests passing
- [ ] Manual verification

### Staging
- [ ] Migration deployed
- [ ] Data verified
- [ ] Application tested
- [ ] Performance verified

### Production
- [ ] Backup created
- [ ] Migration deployed
- [ ] Smoke tests passed
- [ ] Monitoring verified

### Post-Migration
- [ ] Documentation updated
- [ ] Team notified
- [ ] Backup cleaned up (after verification period)
```

---

## Common Migration Patterns

### Adding a Required Field

```sql
-- Step 1: Add as nullable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- Step 2: Populate data
UPDATE "User" SET "phone" = 'unknown' WHERE "phone" IS NULL;

-- Step 3: Make required
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
```

### Renaming a Column

```sql
-- Prisma handles this with @map
ALTER TABLE "User" RENAME COLUMN "name" TO "fullName";
```

### Adding an Index

```sql
-- Create index concurrently to avoid locking
CREATE INDEX CONCURRENTLY "User_email_idx" ON "User"("email");
```

---

## Commands Quick Reference

```bash
# Create migration
npm run db:sync

# Apply migrations
npx prisma migrate deploy

# Check status
npx prisma migrate status

# Reset database (DEV ONLY)
npm run db:reset

# Open Studio
npm run db:studio

# Generate client
npm run generate
```
