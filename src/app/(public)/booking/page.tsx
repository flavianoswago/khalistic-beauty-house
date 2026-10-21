import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Preview The Khalistic Beauty House frontend-only appointment journey. Sample booking details are not sent or stored by a salon.',
  openGraph: {
    title: 'Book an Appointment',
    description: 'Preview The Khalistic Beauty House frontend-only appointment journey. Sample booking details are not sent or stored by a salon.',
    images: [{ url: '/images/services/facial-treatment.jpg', alt: 'Stock photo of a relaxing facial treatment' }],
  },
};
import { BookingJourney } from '../../../components/booking/booking-journey';

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ service?: string; staff?: string }> }) {
  const { service, staff } = await searchParams;
  return <BookingJourney initialServiceId={service} initialStaffId={staff} />;
}
