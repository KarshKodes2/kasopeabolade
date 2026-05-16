export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string | null;
  tenantId?: string | null;
  createdAt: Date;
}
