'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
};

type Props = {
  post: Post;
  onClose: () => void;
};

export function EditPostDialog({ post, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    tags: post.tags.join(', '),
    featured: post.featured,
    published: post.published,
  });

  useEffect(() => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      content: post.content ?? '',
      tags: post.tags.join(', '),
      featured: post.featured,
      published: post.published,
    });
  }, [post]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Post updated');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay animate-fade-in" />
        <Dialog.Content className="dialog-content animate-slide-up">
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold" style={{ color: 'var(--cv-text)' }}>
              Edit Post
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn-ghost" style={{ padding: '4px' }}><X size={16} /></button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Title *</label>
              <input required className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Slug *</label>
              <input required className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Excerpt</label>
              <textarea className="admin-input" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Content (MDX) *</label>
              <textarea required className="admin-input" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--cv-text-secondary)' }}>Tags</label>
              <input className="admin-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, typescript" />
            </div>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ accentColor: 'var(--cv-brand)' }} />
                Featured
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} style={{ accentColor: 'var(--cv-brand)' }} />
                Published
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button type="button" className="btn-secondary">Cancel</button>
              </Dialog.Close>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
