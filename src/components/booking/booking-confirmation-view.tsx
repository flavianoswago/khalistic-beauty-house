'use client';

import { Breadcrumbs } from '../ui/breadcrumbs';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BookingConfirmation } from '../../types/booking';
import { businessInformation } from '../../data/business';
import { AsyncState } from '../ui/async-state';
import { Container } from '../ui/container';

const STORAGE_KEY = 'khalistic-beauty-house-demo-booking';
const referencePattern = /^DEMO-\d{8}-\d{4}-[A-Z0-9]{4}$/;
const money = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 });
const formatDate = (date: string) => new Intl.DateTimeFormat('en-KE', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

function isBookingConfirmation(value: unknown): value is BookingConfirmation {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<BookingConfirmation>;
  return candidate.isMock === true && typeof candidate.bookingReference === 'string' && typeof candidate.customerName === 'string' && typeof candidate.serviceName === 'string' && typeof candidate.date === 'string' && typeof candidate.time === 'string';
}

export function BookingConfirmationView({ reference = '' }: { reference?: string }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'invalid'>('loading');
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const finish = (nextStatus: 'ready' | 'missing' | 'invalid', nextBooking: BookingConfirmation | null = null) => {
        setBooking(nextBooking);
        setStatus(nextStatus);
      };
      if (!reference) { finish('missing'); return; }
      if (!referencePattern.test(reference)) { finish('invalid'); return; }
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (!raw) { finish('missing'); return; }
        const parsed: unknown = JSON.parse(raw);
        if (!isBookingConfirmation(parsed) || parsed.bookingReference !== reference) { finish('invalid'); return; }
        finish('ready', parsed);
      } catch {
        finish('missing');
      }
    });
    return () => { cancelled = true; };
  }, [reference]);

  if (status === 'loading') return <main className="booking-confirmation-page"><Container size="content"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }, { label: 'Confirmation' }]} /><AsyncState variant="loading" title="Loading sample confirmation" description="Checking the booking summary stored in this browser tab." /></Container></main>;
  if (status !== 'ready' || !booking) return <main className="booking-confirmation-page"><Container size="content"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }, { label: 'Confirmation' }]} /><AsyncState variant="error" title={status === 'invalid' ? 'This sample reference is not valid' : 'Sample booking details are unavailable'} description="Confirmation details only remain in the browser tab that completed the sample booking. Start a new demo booking to create another reference." action={<Link className="button button--primary" href="/booking">Start a sample booking</Link>} /><Link className="confirmation-home-link" href="/">Return to homepage</Link></Container></main>;

  return <main className="booking-confirmation-page"><Container size="content"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }, { label: 'Confirmation' }]} /><div className="confirmation-heading"><p className="booking-eyebrow">Booking confirmation � simulation</p><h1>Your sample appointment is ready</h1><p>This is a frontend-only confirmation. No real appointment was created, stored by the salon, or sent as a notification.</p></div><section className="confirmation-card" aria-labelledby="confirmation-summary-title"><div className="confirmation-card__top"><div><p className="booking-eyebrow">Sample reference</p><h2 id="confirmation-summary-title">{booking.bookingReference}</h2></div><span className="confirmation-status">Sample confirmed</span></div><dl className="confirmation-summary"><div><dt>Customer</dt><dd>{booking.customerName}</dd></div><div><dt>Service</dt><dd>{booking.serviceName}</dd></div><div><dt>Appointment</dt><dd>{formatDate(booking.date)} � {booking.time}</dd></div><div><dt>Professional</dt><dd>{booking.staffName ?? 'Any available professional'}</dd></div><div><dt>Estimated price</dt><dd>{money.format(booking.priceKes)} <small>Illustrative</small></dd></div><div><dt>Status</dt><dd>Simulated only � not booked</dd></div></dl><button type="button" className="button button--outline confirmation-details-toggle" aria-expanded={detailsOpen} aria-controls="confirmation-extra-details" onClick={() => setDetailsOpen((open) => !open)}>{detailsOpen ? 'Hide booking details' : 'View booking details'}</button>{detailsOpen && <div className="confirmation-extra" id="confirmation-extra-details"><p><strong>Duration</strong><span>{booking.durationMinutes} minutes</span></p><p><strong>Customer email</strong><span>{booking.customerEmail}</span></p><p><strong>Customer phone</strong><span>{booking.customerPhone}</span></p><p><strong>Reference status</strong><span>Available in this browser tab only</span></p></div>}</section><section className="confirmation-contact"><h2>Need to change something?</h2><p>This is only a sample booking and its reference cannot be used to change a real appointment. For direct contact, call or email the details below.</p><div><span>Phone: {businessInformation.contact.phone}</span><span>Email: {businessInformation.contact.email}</span></div></section><div className="confirmation-actions"><Link className="button button--primary" href="/">Return to homepage</Link><Link className="button button--outline" href="/booking">Start another sample booking</Link></div><p className="booking-privacy-note">This sample confirmation is stored only in this browser tab�s session storage so this page can display its details. It is not sent to a backend and is cleared when the tab session ends.</p></Container></main>;
}
