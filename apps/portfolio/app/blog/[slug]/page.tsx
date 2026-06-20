import { notFound } from 'next/navigation'
import { prisma } from 'db'
import { BlogPost } from '@/components/sections/BlogPost'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { context: 'PORTFOLIO', published: true },
    select: { slug: true },
  })
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findFirst({
    where: { slug, context: 'PORTFOLIO', published: true },
    select: { title: true, excerpt: true },
  })
  if (!post) return {}
  return { title: post.title, description: post.excerpt ?? '' }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findFirst({
    where: { slug, context: 'PORTFOLIO', published: true },
  })
  if (!post) notFound()

  return <BlogPost post={post} />
}
