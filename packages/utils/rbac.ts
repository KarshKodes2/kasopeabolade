import { Role } from '@prisma/client';

export function hasAccess(userRole: Role, required: Role[]): boolean {
  return required.includes(userRole);
}

export function assertAccess(userRole: Role, required: Role[]) {
  if (!hasAccess(userRole, required)) {
    throw new Error('Access denied');
  }
}
