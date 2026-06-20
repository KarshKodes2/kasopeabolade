'use client';

import { AccessDenied } from './AccessDenied';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';

type Props = {
  userRole: Role | undefined;
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RoleGate({ userRole, allowedRoles, children, fallback }: Props) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return fallback ? <>{fallback}</> : <AccessDenied />;
  }
  return <>{children}</>;
}
