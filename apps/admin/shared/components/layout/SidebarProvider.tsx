'use client';

import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

type Props = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function SidebarProvider({ children, user }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved) setCollapsed(saved === 'true');
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('admin-sidebar-collapsed', String(next));
      return next;
    });
  }

  return (
    <>
      <AdminSidebar collapsed={collapsed} onToggle={toggle} />
      <AdminTopBar collapsed={collapsed} user={user} />
      <main
        className="admin-main"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </>
  );
}
