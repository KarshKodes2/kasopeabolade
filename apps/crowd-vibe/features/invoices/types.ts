export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  tenantName: string;
  tenantEmail?: string;
  tenantLocation?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  venue: string;
  services: string[];
  basePrice: number;
  depositAmount: number;
  totalPrice: number;
  brandColor: string;
}
