import { prisma } from 'db';
import { PostsPageClient } from '../../../../features/posts/components/PostsPageClient';

export const metadata = { title: 'Portfolio Blog' };

export default async function PortfolioBlogPage() {
  const posts = await prisma.post.findMany({
    where: { context: 'PORTFOLIO' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Portfolio Blog</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} — Kasope's personal dev blog
        </p>
      </div>
      <PostsPageClient posts={posts} context="PORTFOLIO" />
    </div>
  );
}
