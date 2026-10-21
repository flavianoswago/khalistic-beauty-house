import type { Staff } from '../types/staff';

/** Invented team profiles with representative stock portraits for layout development. */
export const staff = [
  { id: 'amara-kimani', name: 'Amara Kimani', role: 'Lead Esthetician', biography: 'A fictional skincare specialist focused on calming, restorative facial rituals and thoughtful skin consultations.', imageSrc: '/images/team/amara-portrait.jpg', imageAlt: 'Representative stock portrait used for the fictional profile of Amara Kimani', imageLabel: 'Representative stock portrait', specialties: ['Facials', 'Skin consultation'] },
  { id: 'zuri-njeri', name: 'Zuri Njeri', role: 'Brow & Lash Artist', biography: 'A fictional brow and lash artist with an eye for soft, balanced definition and a gentle approach.', imageSrc: '/images/team/zuri-portrait.jpg', imageAlt: 'Representative stock portrait used for the fictional profile of Zuri Njeri', imageLabel: 'Representative stock portrait', specialties: ['Brow shaping', 'Lash lifts'] },
  { id: 'imani-otieno', name: 'Imani Otieno', role: 'Nail Technician', biography: 'A fictional nail artist who loves thoughtful details, tidy shaping, and clean finishes.', imageSrc: '/images/team/imani-portrait.jpg', imageAlt: 'Representative stock portrait used for the fictional profile of Imani Otieno', imageLabel: 'Representative stock portrait', specialties: ['Manicures', 'Gel polish'] },
] satisfies Staff[];
