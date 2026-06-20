import { prisma } from 'db';
import { PostsPageClient } from '../../../../features/posts/components/PostsPageClient';

export const metadata = { title: 'CrowdVibe Tenant Blog' };

export default async function CrowdVibeBlogPage() {
  const posts = await prisma.post.findMany({
    where: { context: 'TENANT' },
    include: { tenant: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Tenant Blog Posts</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} across all CrowdVibe tenants
        </p>
      </div>
      <PostsPageClient posts={posts} context="TENANT" showTenant />
    </div>
  );
}
