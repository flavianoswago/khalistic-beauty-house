import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khalistic-beauty-house.example'),
  title: {
    default: 'The Khalistic Beauty House',
    template: '%s | The Khalistic Beauty House',
  },
  description: 'The Khalistic Beauty House: Where Beauty Feels Like Home. Discover hair, skin, nail and makeup services in one welcoming destination.',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'The Khalistic Beauty House',
    title: 'The Khalistic Beauty House',
    description: 'Where Beauty Feels Like Home. Discover hair, skin, nail and makeup services under one roof.',
    images: [{ url: '/images/story/salon-interior.jpg', alt: 'Bright salon interior with styling chair, mirror and leafy plant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Khalistic Beauty House',
    description: 'Where Beauty Feels Like Home. Discover hair, skin, nail and makeup services under one roof.',
    images: ['/images/story/salon-interior.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
