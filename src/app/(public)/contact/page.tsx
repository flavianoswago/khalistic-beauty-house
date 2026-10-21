import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Opening Hours',
  description: 'Contact The Khalistic Beauty House in Sirare-Migori. Open daily 6:00 AM–9:00 PM; street address to be confirmed.',
  openGraph: {
    title: 'Contact & Opening Hours',
    description: 'Contact The Khalistic Beauty House in Sirare-Migori. Open daily 6:00 AM–9:00 PM; street address to be confirmed.',
    images: [{ url: '/images/story/salon-interior.jpg', alt: 'Bright salon interior with styling chair, mirror and leafy plant' }],
  },
};
import { Breadcrumbs } from '../../../components/ui/breadcrumbs';
import { InquiryForm } from '../../../components/contact/inquiry-form';
import { Container } from '../../../components/ui/container';
import { SectionHeading } from '../../../components/ui/section-heading';
import { businessInformation, getWhatsAppHref } from '../../../data/business';

const formatHours = (opensAt: string | null, closesAt: string | null, closed: boolean) => closed ? 'Closed' : opensAt && closesAt ? opensAt + ' – ' + closesAt : 'Hours to be confirmed';

export default function ContactPage() {
  const whatsappHref = getWhatsAppHref('Hello The Khalistic Beauty House, I have a question.');
  return <main className="contact-page"><Container size="wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /><SectionHeading as="h1" eyebrow="Come say hello" title="We�ll save you a seat." description="Call or email using the owner-provided details below. The studio is in Sirare-Migori and is open daily from 6:00 AM to 9:00 PM. The street address is to be confirmed." /><div className="contact-layout"><div className="contact-info-column"><section className="contact-details" aria-labelledby="contact-details-title"><h2 id="contact-details-title">Find and reach us</h2><address><strong>{businessInformation.name}</strong><span>{businessInformation.address.label}</span><span>{businessInformation.address.city}, {businessInformation.address.country}</span><a href={`tel:${businessInformation.contact.phone.replace(/\s/g, '')}`}>Call {businessInformation.contact.phone} <small>call</small></a><a href={`mailto:${businessInformation.contact.email}`}>Email {businessInformation.contact.email} <small>email</small></a>{whatsappHref && <a className="contact-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us <span>(opens WhatsApp)</span><span className="visually-hidden"> opens WhatsApp in a new tab</span></a>}</address></section><section className="contact-hours" aria-labelledby="contact-hours-title"><h2 id="contact-hours-title">Opening hours <span>Daily</span></h2><dl>{businessInformation.openingHours.map((hours) => <div key={hours.day}><dt>{hours.day}</dt><dd>{formatHours(hours.opensAt, hours.closesAt, hours.closed)}</dd></div>)}</dl></section><section className="contact-directions"><h2>Getting here</h2><p>The studio address and directions have not been confirmed. Replace these placeholders with the verified location before launch. For an appointment change or cancellation, call or email as soon as possible. No notice period or fee has been set; confirm the salon&apos;s policy directly.</p></section></div><div className="contact-visual-column"><div className="contact-map-placeholder" role="img" aria-label="Decorative map placeholder showing a placeholder location, not a real map"><span className="contact-map-placeholder__road contact-map-placeholder__road--one"/><span className="contact-map-placeholder__road contact-map-placeholder__road--two"/><span className="contact-map-placeholder__park">Sample park</span><span className="contact-map-placeholder__pin" aria-hidden="true">?</span><strong>Map preview</strong><small>Street address to be confirmed</small></div><p className="contact-map-note">Map illustration only. It does not show the real address or provide directions.</p></div></div><InquiryForm /><p className="contact-social-note">No social media profiles are configured for this sample business.</p><p className="contact-demo-notice">Street address and change or cancellation terms are awaiting confirmation; opening hours are daily 6:00 AM–9:00 PM. WhatsApp opens an external app; the inquiry form does not send or store messages.</p></Container></main>;
}
