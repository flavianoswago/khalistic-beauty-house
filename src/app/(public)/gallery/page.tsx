import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beauty Gallery',
  description: 'Explore the concept gallery for The Khalistic Beauty House of illustrative beauty, hair, nails, makeup and interior artwork.',
  openGraph: {
    title: 'Beauty Gallery',
    description: 'Explore the concept gallery for The Khalistic Beauty House of illustrative beauty, hair, nails, makeup and interior artwork.',
    images: [{ url: '/images/gallery/hairstyles-concept.svg', alt: 'Illustrative hairstyle concept artwork' }],
  },
};
import { Breadcrumbs } from '../../../components/ui/breadcrumbs';
import { galleryImages } from '../../../data/gallery';
import { GalleryPortfolio } from '../../../components/gallery/gallery-portfolio';
import { Container } from '../../../components/ui/container';
import { SectionHeading } from '../../../components/ui/section-heading';

export default function GalleryPage() {
  return <main className="gallery-page"><Container size="wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} /><SectionHeading as="h1" eyebrow="The gallery � concept collection" title="Small details, lovely moments" description="Explore the beauty moods imagined for The Khalistic Beauty House. These original illustrations are placeholders, not photographs of real client work or a real studio." /><p className="gallery-page__notice">Illustrative concept art � replace with approved studio photography before launch.</p><GalleryPortfolio images={galleryImages} /></Container></main>;
}
