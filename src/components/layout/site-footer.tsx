import Link from 'next/link';
import { Clock3, Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { businessInformation } from '../../data/business';
import { ButtonLink } from '../ui/button';
import styles from './site-footer.module.css';

const exploreLinks = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/gallery', label: 'Beauty Gallery' },
  { href: '/booking', label: 'Book an Appointment' },
  { href: '/contact', label: 'Contact Us' },
];

function formatTime(value: string | null) {
  if (!value) return null;
  const [hour, minute] = value.split(':').map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
}

export function SiteFooter() {
  const phoneHref = businessInformation.contact.phone.replace(/\s/g, '');
  const phoneDigits = phoneHref.replace(/\D/g, '');
  const whatsappNumber = phoneDigits.startsWith('0') ? `254${phoneDigits.slice(1)}` : phoneDigits;
  const whatsappHref = `https://wa.me/${whatsappNumber}`;
  const hours = businessInformation.openingHours;
  const firstHours = hours[0];
  const dailySchedule = firstHours?.opensAt && firstHours.closesAt
    && hours.every((entry) => entry.opensAt === firstHours.opensAt && entry.closesAt === firstHours.closesAt && !entry.closed)
    ? `Daily · ${formatTime(firstHours.opensAt)}–${formatTime(firstHours.closesAt)}`
    : null;

  return (
    <footer className={styles.footer}>
      <div className={styles.topRule} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.mainGrid}>
          <section className={styles.brand} aria-labelledby="footer-brand-title">
            <Link href="/" className={styles.wordmark} aria-label="Khalistic Beauty Lounge home">
              <span className={styles.brandIcon} aria-hidden="true"><Sparkles size={21} /></span>
              <span id="footer-brand-title">KHALISTIC <strong>BEAUTY LOUNGE</strong></span>
            </Link>
            <p className={styles.tagline}>Your beauty. Your confidence. Your glow.</p>
            <p className={styles.description}>Discover your beauty with professional salon services, personalised care, and moments of pure relaxation.</p>
            <ButtonLink href="/booking" variant="secondary" className={styles.bookingButton}>Book Your Beauty Session <span aria-hidden="true">↗</span></ButtonLink>
          </section>
          <nav className={styles.explore} aria-labelledby="footer-explore-title">
            <h2 id="footer-explore-title">Explore</h2>
            <ul>{exploreLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>
          <section className={styles.contact} aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Get in Touch</h2>
            <ul>
              <li><MapPin aria-hidden="true" /><span><strong>Location</strong><small>{businessInformation.address.city}, {businessInformation.address.country}</small><small>{businessInformation.address.label}</small></span></li>
              <li><Phone aria-hidden="true" /><span><strong>Phone</strong><a href={`tel:${phoneHref}`}>{businessInformation.contact.phone}</a></span></li>
              <li><Mail aria-hidden="true" /><span><strong>Email</strong><a href={`mailto:${businessInformation.contact.email}`}>{businessInformation.contact.email}</a></span></li>
              <li><Clock3 aria-hidden="true" /><span><strong>Opening hours</strong>{dailySchedule ? <small>{dailySchedule}</small> : hours.map((entry) => <small key={entry.day}>{entry.day}: {entry.closed ? 'Closed' : `${formatTime(entry.opensAt)}–${formatTime(entry.closesAt)}`}</small>)}</span></li>
            </ul>
          </section>
        </div>
        <div className={styles.extras}>
          <section className={styles.newsletter} aria-labelledby="footer-newsletter-title">
            <h2 id="footer-newsletter-title">A Little Beauty in Your Inbox</h2>
            <p>Get beauty inspiration, salon updates, and exclusive offers.</p>
            <span className={styles.comingSoon}>Newsletter sign-up is not configured yet.</span>
          </section>
          <section className={styles.social} aria-labelledby="footer-social-title">
            <h2 id="footer-social-title">Connect with us</h2>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Message Khalistic Beauty Lounge on WhatsApp at ${businessInformation.contact.phone}`}><MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span></a>
          </section>
        </div>
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Khalistic Beauty Lounge. All rights reserved.</p>
          <p>Made with love for your beauty.</p>
        </div>
      </div>
    </footer>
  );
}
