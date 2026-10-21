import { services } from './services';
import { staff } from './staff';
import type { AvailabilitySlot, BookingConfirmation, BookingDraft } from '../types/booking';

const SLOT_TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'] as const;

/** Generate an illustrative demo schedule relative to today, skipping Sundays and blocking several dates. */
export function getMockAvailability(daysAhead = 14, now = new Date()): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  for (let offset = 1; offset <= daysAhead; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    if (date.getDay() === 0) continue;
    const dateKey = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    const daySlots = date.getDay() === 6 ? SLOT_TIMES.slice(0, 5) : SLOT_TIMES;
    const isUnavailableDate = [3, 8, 12].includes(offset);
    daySlots.forEach((time, index) => {
      const assignedStaff = staff[(offset + index) % staff.length];
      slots.push({ date: dateKey, time, staffId: assignedStaff.id, available: !isUnavailableDate && (offset + index) % 5 !== 0 });
    });
  }
  return slots;
}

/** Build a local-only sample confirmation; no booking is sent to a server. */
export function createMockBookingConfirmation(draft: BookingDraft): BookingConfirmation {
  const service = services.find((item) => item.id === draft.serviceId);
  if (!service) throw new Error(`Unknown service id: ${draft.serviceId}`);
  const selectedStaff = staff.find((item) => item.id === draft.staffId);
  const startsAt = new Date(`${draft.date}T${draft.time}:00+03:00`);
  if (Number.isNaN(startsAt.getTime())) throw new Error('Booking date and time must be valid.');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0');

  return {
    bookingReference: `DEMO-${draft.date.replace(/-/g, '')}-${draft.time.replace(':', '')}-${suffix}`,
    serviceId: service.id,
    serviceName: service.name,
    ...(selectedStaff ? { staffId: selectedStaff.id, staffName: selectedStaff.name } : {}),
    customerName: draft.customerName,
    customerEmail: draft.customerEmail,
    customerPhone: draft.customerPhone,
    date: draft.date,
    time: draft.time,
    startsAt: startsAt.toISOString(),
    durationMinutes: service.durationMinutes,
    priceKes: service.price.amount,
    status: 'confirmed',
    isMock: true,
  };
}

export const mockAvailability = getMockAvailability();
export const mockUnavailableDates = [...new Set(mockAvailability.map((slot) => slot.date))].filter((date) => mockAvailability.filter((slot) => slot.date === date).every((slot) => !slot.available));
