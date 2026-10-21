export type CurrencyCode = 'KES';

export interface ServicePrice {
  amount: number;
  currency: CurrencyCode;
  startingAt?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  price: ServicePrice;
  featured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageKind?: 'stock-photo' | 'illustration';
}

/** Lightweight shape accepted by reusable service cards. */
export type ServiceSummary = Pick<Service, 'id' | 'name' | 'description'> &
  Partial<Pick<Service, 'category' | 'durationMinutes' | 'price' | 'imageSrc' | 'imageAlt' | 'imageKind'>>;


