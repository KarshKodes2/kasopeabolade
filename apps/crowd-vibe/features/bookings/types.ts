export type EventType = 'WEDDING' | 'BIRTHDAY' | 'CORPORATE' | 'CLUB_NIGHT' | 'FESTIVAL' | 'OTHER';
export type BookingStatus = 'PENDING' | 'QUOTE_SENT' | 'CONFIRMED' | 'DEPOSIT_PAID' | 'COMPLETED' | 'CANCELLED';
export type ServiceType = 'DJ' | 'MC_HOST' | 'LIGHTING' | 'SOUND_SYSTEM' | 'PHOTO_BOOTH';

export interface BookingFormData {
  eventType: EventType;
  eventDate: string;
  startTime: string;
  venue: string;
  venueAddress?: string;
  guestCount?: number;
  services: ServiceType[];
  specialRequests?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod?: 'paystack' | 'stripe';
}

export interface Booking {
  id: string;
  tenantId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: EventType;
  eventDate: string;
  startTime: string;
  venue: string;
  venueAddress?: string | null;
  guestCount?: number | null;
  services: ServiceType[];
  specialRequests?: string | null;
  basePrice?: number | null;
  totalPrice?: number | null;
  depositAmount?: number | null;
  depositPaid: boolean;
  status: BookingStatus;
  adminNotes?: string | null;
  createdAt: string;
}
