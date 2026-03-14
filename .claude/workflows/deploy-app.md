# App Deployment Workflow

This workflow guides deploying a single app from the monorepo.

## Trigger

```
/workflow deploy-app [app-name] [environment]

Examples:
/workflow deploy-app admin production
/workflow deploy-app portfolio staging
/workflow deploy-app dj-karsh preview
```

## Environments

| Environment | Purpose | Auto-Deploy |
|-------------|---------|-------------|
| **Preview** | PR previews, testing | On PR |
| **Staging** | Pre-production testing | On merge to main |
| **Production** | Live environment | Manual trigger |

## Workflow Steps

### Step 1: Pre-Deployment Validation

Run all checks:

```
/deployer {app-name} --preflight
```

**Automated Checks**:
```bash
# TypeScript
npm run check-types

# Linting
npm run lint:{app-name}

# Tests
npm run test --filter={app-name}

# Build
npm run build:{app-name}

# Security
npm audit
```

**Required Results**:
- [ ] TypeScript: No errors
- [ ] ESLint: No errors (warnings OK)
- [ ] Tests: All passing
- [ ] Build: Successful
- [ ] Security: No critical vulnerabilities

---

### Step 2: Environment Variables

Verify all required environment variables are set:

#### apps/admin

```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

#### apps/portfolio

```env
DATABASE_URL=
```

#### apps/dj-karsh

```env
DATABASE_URL=
CLOUDINARY_URL=
```

#### apps/karsh-core

```env
DATABASE_URL=
```

**Verification**:
```bash
# Check Vercel env vars
vercel env ls --cwd apps/{app-name}

# Check Railway env vars
railway variables --service {app-name}
```

---

### Step 3: Database Migrations

Ensure database is up to date:

```bash
# Check migration status
npx prisma migrate status --schema packages/db/schema.prisma

# If migrations pending, deploy them first
npx prisma migrate deploy --schema packages/db/schema.prisma
```

---

### Step 4: Deploy to Platform

#### Vercel Deployment

```bash
# Preview deployment
vercel --cwd apps/{app-name}

# Production deployment
vercel --cwd apps/{app-name} --prod
```

#### Railway Deployment

```bash
# Deploy service
railway up --service {app-name}

# Check deployment status
railway status --service {app-name}
```

#### Docker Deployment

```bash
# Build image
docker build -t kasopeabolade/{app-name}:latest -f apps/{app-name}/Dockerfile .

# Push to registry
docker push kasopeabolade/{app-name}:latest

# Deploy (depends on your infrastructure)
docker compose up -d {app-name}
```

---

### Step 5: Post-Deployment Verification

```
/deployer {app-name} --verify
```

**Health Checks**:
```bash
# Check health endpoint
curl -f https://{app-url}/api/health

# Check database connectivity
curl -f https://{app-url}/api/health/db

# Check authentication (admin)
curl -f https://{app-url}/api/auth/session
```

**Smoke Tests**:
- [ ] Homepage loads
- [ ] Authentication works (if applicable)
- [ ] API endpoints respond
- [ ] Database queries work
- [ ] External integrations work

---

### Step 6: Monitor

After deployment, monitor for:

1. **Error rates** - Check for new errors
2. **Performance** - Verify response times
3. **Resources** - CPU, memory usage
4. **Logs** - Check for warnings/errors

**Monitoring Commands**:
```bash
# Vercel logs
vercel logs --cwd apps/{app-name}

# Railway logs
railway logs --service {app-name}

# Docker logs
docker logs {container-name} -f
```

---

### Step 7: Rollback (if needed)

If issues are discovered:

#### Vercel Rollback

```bash
# List deployments
vercel ls --cwd apps/{app-name}

# Rollback to previous
vercel rollback {deployment-id} --cwd apps/{app-name}
```

#### Railway Rollback

```bash
# List deployments
railway deployments --service {app-name}

# Rollback
railway rollback --service {app-name}
```

#### Docker Rollback

```bash
# Use previous image tag
docker compose up -d {app-name}:{previous-tag}
```

---

## Deployment Checklist

```markdown
## Deployment: {app-name} to {environment}

### Date: {date}
### Deployer: {name}

---

### Pre-Deployment

- [ ] Code review approved
- [ ] Tests passing
- [ ] Build successful
- [ ] No security vulnerabilities
- [ ] Environment variables verified
- [ ] Database migrations applied

### Deployment

- [ ] Deployment initiated
- [ ] Deployment completed
- [ ] Health checks passing
- [ ] Smoke tests passing

### Post-Deployment

- [ ] Monitoring verified
- [ ] No new errors
- [ ] Performance acceptable
- [ ] Stakeholders notified

### Rollback Plan

- Previous deployment ID: {id}
- Rollback command: {command}
- Database rollback: {instructions}
```

---

## Platform-Specific Configurations

### Vercel (`apps/{app}/vercel.json`)

```json
{
  "framework": "nextjs",
  "buildCommand": "cd ../.. && npm run build:{app}",
  "installCommand": "cd ../.. && npm install",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

### Railway (`railway.toml`)

```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build:{app}"

[deploy]
startCommand = "npm run start --filter={app}"
healthcheckPath = "/api/health"
healthcheckTimeout = 30

[variables]
NODE_ENV = "production"
```

### Docker (`apps/{app}/Dockerfile`)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY apps/{app}/package*.json ./apps/{app}/
RUN npm ci --workspace=apps/{app}

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:{app}

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/apps/{app}/.next/standalone ./
COPY --from=builder /app/apps/{app}/.next/static ./apps/{app}/.next/static
COPY --from=builder /app/apps/{app}/public ./apps/{app}/public

EXPOSE 3000
CMD ["node", "apps/{app}/server.js"]
```

---

## Quick Commands

```bash
# Deploy admin to production
/workflow deploy-app admin production

# Deploy portfolio preview
/workflow deploy-app portfolio preview

# Verify deployment
/deployer {app} --verify

# Rollback
/deployer {app} --rollback
```
