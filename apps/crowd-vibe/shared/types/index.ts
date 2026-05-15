export interface ApiError {
  message: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';
