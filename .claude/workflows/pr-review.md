# Pull Request Review Workflow

This workflow provides a comprehensive PR review process.

## Trigger

```
/workflow pr-review [pr-number|branch-name]

Examples:
/workflow pr-review 42
/workflow pr-review feature/user-management
```

## Review Steps

### Step 1: Architecture Review

First, validate the changes don't violate architecture principles.

```
/architect all
```

**Check**:
- [ ] No cross-app imports
- [ ] Proper use of shared packages
- [ ] Database access via packages/db only
- [ ] No circular dependencies

---

### Step 2: Security Audit

Run security checks on changed files.

```
/security-auditor all
```

**Check**:
- [ ] Authentication on protected routes
- [ ] Authorization (RBAC) implemented
- [ ] Input validation present
- [ ] No hardcoded secrets
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities

---

### Step 3: Code Review

Detailed code review.

```
/reviewer {changed-files}
```

**Review Criteria**:

| Category | Weight | Criteria |
|----------|--------|----------|
| TypeScript | 20% | Strict compliance, no `any` |
| Code Quality | 20% | Clean, readable, maintainable |
| React/Next.js | 15% | Best practices, hooks usage |
| Performance | 15% | No N+1, proper memoization |
| Security | 15% | Auth, validation, RBAC |
| Testing | 15% | Coverage, edge cases |

---

### Step 4: Test Coverage

Verify tests exist and pass.

```
/tester {changed-files}
```

**Requirements**:
- [ ] New code has tests
- [ ] Existing tests still pass
- [ ] Coverage meets threshold (80%)
- [ ] E2E tests for critical paths

---

### Step 5: Documentation

Check documentation is updated.

```
/doc-writer {changed-areas}
```

**Check**:
- [ ] README updated (if needed)
- [ ] API documentation (if changed)
- [ ] Code comments for complex logic
- [ ] CHANGELOG entry (if significant)

---

## Review Output Format

```markdown
## Pull Request Review

### PR: #{pr-number}
### Branch: {branch-name}
### Author: {author}

---

### Summary

{2-3 sentence summary of the changes}

---

### Review Decision: [APPROVE | REQUEST_CHANGES | REJECT]

---

### Architecture (Score: X/100)

| Check | Status | Notes |
|-------|--------|-------|
| Package boundaries | PASS/FAIL | {notes} |
| Shared package usage | PASS/FAIL | {notes} |
| Database access | PASS/FAIL | {notes} |
| Circular dependencies | PASS/FAIL | {notes} |

---

### Security (Score: X/100)

| Check | Status | Notes |
|-------|--------|-------|
| Authentication | PASS/FAIL | {notes} |
| Authorization | PASS/FAIL | {notes} |
| Input validation | PASS/FAIL | {notes} |
| Secrets | PASS/FAIL | {notes} |
| OWASP Top 10 | PASS/FAIL | {notes} |

---

### Code Quality (Score: X/100)

| Category | Status | Issues |
|----------|--------|--------|
| TypeScript | PASS/FAIL | {issues} |
| React Best Practices | PASS/FAIL | {issues} |
| Performance | PASS/FAIL | {issues} |
| Error Handling | PASS/FAIL | {issues} |

---

### Test Coverage

| Package | Before | After | Delta |
|---------|--------|-------|-------|
| apps/admin | 75% | 82% | +7% |
| packages/utils | 90% | 92% | +2% |

**New Tests**: {count}
**Modified Tests**: {count}

---

### Files Changed

| File | Changes | Issues |
|------|---------|--------|
| apps/admin/page.tsx | +50/-10 | 1 minor |
| packages/db/schema.prisma | +20/-0 | None |

---

### Issues Found

#### Must Fix (Blocking)

1. **[Security]** `apps/admin/api/users/route.ts:45`
   - Missing authentication check
   - **Fix**: Add `getServerSession()` check

2. **[TypeScript]** `packages/utils/validation.ts:23`
   - Using `any` type
   - **Fix**: Define proper interface

#### Should Fix (Non-blocking)

1. **[Performance]** `apps/portfolio/components/ProjectList.tsx:15`
   - Missing useMemo for sorted list
   - **Suggestion**: Add memoization

2. **[Code Quality]** `apps/admin/lib/api.ts:88`
   - Console.log in production code
   - **Suggestion**: Remove or use logger

#### Nice to Have

1. **[Documentation]** `packages/db/schema.prisma`
   - New model lacks documentation
   - **Suggestion**: Add comments

---

### Positive Observations

- Clean TypeScript implementation
- Good error handling in API routes
- Comprehensive test coverage
- Well-structured components

---

### Recommendations

1. {recommendation 1}
2. {recommendation 2}
3. {recommendation 3}
```

---

## Review Checklist

### Before Starting

- [ ] Understand the PR purpose
- [ ] Review linked issues/tickets
- [ ] Check PR description

### During Review

- [ ] Architecture validation
- [ ] Security audit
- [ ] Code review
- [ ] Test verification
- [ ] Documentation check

### After Review

- [ ] Provide clear feedback
- [ ] Mark blocking vs non-blocking issues
- [ ] Suggest improvements
- [ ] Set review decision

---

## Review Guidelines

### Be Constructive

```markdown
# Bad
"This code is wrong."

# Good
"This approach could cause performance issues because X.
Consider using Y instead, which handles Z more efficiently."
```

### Explain Why

```markdown
# Bad
"Add useMemo here."

# Good
"Add useMemo here to prevent recalculating the sorted list on every render.
Currently, this runs on every state change, even when the list hasn't changed."
```

### Acknowledge Good Work

```markdown
"Good use of TypeScript generics here - makes the component much more reusable."

"Nice error handling pattern - catching specific errors and providing helpful messages."
```

### Prioritize Feedback

```markdown
## Must Fix (Blocking)
Security/correctness issues that must be resolved.

## Should Fix (Non-blocking)
Best practices that should be addressed but won't break anything.

## Nice to Have
Suggestions for improvement that are optional.
```

---

## Quick Commands

```bash
# Full PR review
/workflow pr-review 42

# Just architecture review
/architect all

# Just security review
/security-auditor all

# Just code review
/reviewer {files}

# Just test check
/tester {files}
```
