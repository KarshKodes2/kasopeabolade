import { prisma } from 'db';
import { PostsPageClient } from '../../../../features/posts/components/PostsPageClient';

export const metadata = { title: 'Karsh Core Blog' };

export default async function KarshCoreBlogPage() {
  const posts = await prisma.post.findMany({
    where: { context: 'KARSH_CORE' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Karsh Core Blog</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} — company insights & updates
        </p>
      </div>
      <PostsPageClient posts={posts} context="KARSH_CORE" />
    </div>
  );
}
