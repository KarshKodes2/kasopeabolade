import { test, expect } from '@playwright/test';

test('project API returns seeded data', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/projects');
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  const projectSlugs = data.map((p: any) => p.slug);
  expect(projectSlugs).toContain('nextjs-monorepo');
});
