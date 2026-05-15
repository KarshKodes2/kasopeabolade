import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import { InvoiceDocument } from './components/InvoiceDocument';
import type { InvoiceData } from './types';

export async function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  const element = createElement(InvoiceDocument, { data });
  return renderToBuffer(element) as Promise<Buffer>;
}

export function buildInvoiceData(booking: {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: Date;
  startTime: string;
  venue: string;
  services: string[];
  basePrice: number | null;
  depositAmount: number | null;
  totalPrice: number | null;
}, tenant: {
  name: string;
  location: string | null;
  brandColor: string | null;
}): InvoiceData {
  const invoiceNumber = `INV-${booking.id.slice(-8).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
  const eventDate = new Date(booking.eventDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return {
    invoiceNumber,
    issueDate,
    tenantName: tenant.name,
    tenantLocation: tenant.location ?? undefined,
    clientName: booking.clientName,
    clientEmail: booking.clientEmail,
    clientPhone: booking.clientPhone,
    eventType: booking.eventType,
    eventDate,
    startTime: booking.startTime,
    venue: booking.venue,
    services: booking.services,
    basePrice: booking.basePrice ?? 0,
    depositAmount: booking.depositAmount ?? 0,
    totalPrice: booking.totalPrice ?? booking.basePrice ?? 0,
    brandColor: tenant.brandColor ?? '#7C3AED',
  };
}
