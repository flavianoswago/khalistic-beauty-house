import type { BusinessInformation } from '../types/business';

/** Owner-provided contact and location details; service policies remain subject to confirmation. */
export const businessInformation: BusinessInformation = {
  name: 'The Khalistic Beauty House',
  shortName: 'The Khalistic',
  description: 'A welcoming, multi-service beauty house for hair, skin, nails and makeup, with a personal, considered approach to every visit.',
  currency: 'KES',
  timeZone: 'Africa/Nairobi',
  isMock: true,
  address: {
    label: 'Migori\u2013Sirare Road \u00B7 Postal Code: 40414',
    city: 'Sirare, Migori County',
    country: 'Kenya',
  },
  contact: {
    phone: '0792812566',
    email: 'flavianoswago2@gmail.com',
  },
  openingHours: [
    { day: 'Monday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Tuesday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Wednesday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Thursday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Friday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Saturday', opensAt: '06:00', closesAt: '21:00', closed: false },
    { day: 'Sunday', opensAt: '06:00', closesAt: '21:00', closed: false },
  ],
};

/** Build a WhatsApp URL from the owner-provided Kenyan mobile number. */
export function getWhatsAppHref(message = 'Hello, I would like to enquire about your salon services and appointments.') {
  const digits = businessInformation.contact.phone.replace(/\D/g, '');
  const internationalNumber = digits.startsWith('0') ? '254' + digits.slice(1) : digits.startsWith('254') ? digits : '';
  if (!/^254\d{9}$/.test(internationalNumber)) return undefined;
  return 'https://wa.me/' + internationalNumber + '?text=' + encodeURIComponent(message);
}
