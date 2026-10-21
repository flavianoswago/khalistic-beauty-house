import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : undefined)
  ?? (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
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
