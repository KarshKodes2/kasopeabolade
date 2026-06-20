'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  FileText,
  Users,
  Calendar,
  Briefcase,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
} from 'lucide-react';
import { clsx } from 'clsx';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type NavSection = {
  section: string;
  items: NavItem[];
};

const NAV: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { href: '/dashboard', label: 'Command Center', icon: <LayoutDashboard size={16} /> },
      { href: '/dashboard/analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
    ],
  },
  {
    section: 'Portfolio',
    items: [
      { href: '/dashboard/portfolio/projects', label: 'Projects', icon: <FolderOpen size={16} /> },
      { href: '/dashboard/portfolio/blog', label: 'Blog Posts', icon: <FileText size={16} /> },
    ],
  },
  {
    section: 'CrowdVibe',
    items: [
      { href: '/dashboard/crowdvibe/tenants', label: 'Tenants', icon: <Globe size={16} /> },
      { href: '/dashboard/crowdvibe/bookings', label: 'Bookings', icon: <Calendar size={16} /> },
      { href: '/dashboard/crowdvibe/blog', label: 'Blog Posts', icon: <FileText size={16} /> },
    ],
  },
  {
    section: 'Karsh Core',
    items: [
      { href: '/dashboard/karsh-core/leads', label: 'Leads', icon: <Briefcase size={16} /> },
      { href: '/dashboard/karsh-core/blog', label: 'Blog Posts', icon: <FileText size={16} /> },
    ],
  },
  {
    section: 'System',
    items: [
      { href: '/dashboard/team', label: 'Team', icon: <Users size={16} /> },
      { href: '/dashboard/settings', label: 'Settings', icon: <Settings size={16} /> },
    ],
  },
];

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export function AdminSidebar({ collapsed, onToggle }: Props) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="admin-sidebar"
      style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4"
        style={{ height: 'var(--topbar-height)', borderBottom: '1px solid var(--cv-border)' }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: 'var(--cv-brand)', boxShadow: '0 0 12px var(--cv-glow)' }}
        >
          <Zap size={14} color="white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              style={{ overflow: 'hidden' }}
            >
              <p className="text-sm font-bold" style={{ color: 'var(--cv-text)', whiteSpace: 'nowrap' }}>
                Karsh Core
              </p>
              <p className="text-xs" style={{ color: 'var(--cv-text-muted)', whiteSpace: 'nowrap' }}>
                Admin
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 overflow-y-auto p-3" style={{ height: 'calc(100vh - var(--topbar-height) - 56px)' }}>
        {NAV.map((group) => (
          <div key={group.section} className="mb-2">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="mb-1 px-3 text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--cv-text-muted)' }}
                >
                  {group.section}
                </motion.p>
              )}
            </AnimatePresence>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={clsx('nav-link', { active: isActive(item.href) })}
                style={{ justifyContent: collapsed ? 'center' : undefined, padding: collapsed ? '8px' : undefined }}
              >
                <span className="nav-icon shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.12 }}
                      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3" style={{ borderTop: '1px solid var(--cv-border)' }}>
        <button
          onClick={onToggle}
          className="btn-ghost w-full"
          style={{ justifyContent: 'center', padding: '8px' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
