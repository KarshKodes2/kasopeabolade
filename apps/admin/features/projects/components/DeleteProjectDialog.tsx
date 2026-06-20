'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Project = { id: string; title: string };
type Props = { project: Project; onClose: () => void };

export function DeleteProjectDialog({ project, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Project deleted');
      router.refresh();
      onClose();
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog.Root open onOpenChange={(o) => !o && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-overlay animate-fade-in" />
        <AlertDialog.Content className="dialog-content animate-slide-up" style={{ maxWidth: '400px' }}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <Trash2 size={20} color="#ef4444" />
          </div>
          <AlertDialog.Title className="mb-2 text-base font-semibold" style={{ color: 'var(--cv-text)' }}>Delete Project</AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
            Delete <strong style={{ color: 'var(--cv-text)' }}>"{project.title}"</strong>? This cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild><button className="btn-secondary">Cancel</button></AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="btn-danger" onClick={handleDelete} disabled={loading}>
                {loading && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
