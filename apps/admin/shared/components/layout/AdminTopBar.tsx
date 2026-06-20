'use client';

import { signOut } from 'next-auth/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bell, LogOut, User, ChevronDown } from 'lucide-react';
import Image from 'next/image';

type Props = {
  collapsed: boolean;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function AdminTopBar({ collapsed, user }: Props) {
  return (
    <header
      className="admin-topbar"
      style={{ left: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
    >
      <div className="flex h-full items-center justify-between px-5">
        <div />

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            className="btn-ghost relative"
            style={{ padding: '6px', borderRadius: '8px' }}
            title="Notifications"
          >
            <Bell size={16} />
            <span
              className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--cv-brand)' }}
            />
          </button>

          {/* User menu */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                style={{ border: '1px solid var(--cv-border)' }}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? 'User'}
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: 'var(--cv-brand)' }}
                  >
                    {user.name?.[0] ?? 'A'}
                  </div>
                )}
                <span className="hidden text-sm font-medium sm:block" style={{ color: 'var(--cv-text)' }}>
                  {user.name ?? user.email}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--cv-text-muted)' }} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="dropdown-content animate-fade-in"
                align="end"
                sideOffset={6}
              >
                <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--cv-border)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--cv-text)' }}>
                    {user.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--cv-text-muted)' }}>
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <DropdownMenu.Item asChild>
                    <button className="dropdown-item w-full" onClick={() => {}}>
                      <User size={13} />
                      Profile
                    </button>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <button
                      className="dropdown-item danger w-full"
                      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    >
                      <LogOut size={13} />
                      Sign out
                    </button>
                  </DropdownMenu.Item>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
