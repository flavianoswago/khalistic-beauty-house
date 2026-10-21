import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample Booking Confirmation',
  description: 'View a simulated booking confirmation for The Khalistic Beauty House. No real appointment is created or sent.',
  openGraph: {
    title: 'Sample Booking Confirmation',
    description: 'View a simulated booking confirmation for The Khalistic Beauty House. No real appointment is created or sent.',
    images: [{ url: '/images/services/facial-treatment.jpg', alt: 'Stock photo of a relaxing facial treatment' }],
  },
};
import { BookingConfirmationView } from '../../../../components/booking/booking-confirmation-view';

export default async function BookingConfirmationPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return <BookingConfirmationView reference={ref} />;
}
