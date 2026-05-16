export interface TenantEvent {
  id: string;
  tenantId: string;
  title: string;
  description?: string | null;
  venue: string;
  city?: string | null;
  eventDate: Date;
  startTime: string;
  endTime?: string | null;
  ticketUrl?: string | null;
  imageUrl?: string | null;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  description?: string;
  venue: string;
  city?: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  ticketUrl?: string;
  imageUrl?: string;
  published?: boolean;
  featured?: boolean;
}
