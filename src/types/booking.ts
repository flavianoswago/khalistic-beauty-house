export interface BookingDraft {
  serviceId: string;
  staffId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  notes?: string;
}

export interface BookingConfirmation {
  bookingReference: string;
  serviceId: string;
  serviceName: string;
  staffId?: string;
  staffName?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  startsAt: string;
  durationMinutes: number;
  priceKes: number;
  status: 'confirmed';
  isMock: true;
}

export interface AvailabilitySlot {
  date: string;
  time: string;
  available: boolean;
  staffId?: string;
}
