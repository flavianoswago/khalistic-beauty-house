'use client';

import { Breadcrumbs } from '../ui/breadcrumbs';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '../../data/services';
import { staff } from '../../data/staff';
import { mockAvailability, mockUnavailableDates, createMockBookingConfirmation } from '../../data/mock-bookings';
import type { BookingDraft } from '../../types/booking';
import { AsyncState } from '../ui/async-state';
import { Container } from '../ui/container';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppHref } from '../../data/business';

const steps = ['Service', 'Professional', 'Date & time', 'Your details', 'Review'];
const money = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 });
const validPhone = (phone: string) => /^(?:\+254|254|0)\d{9}$/.test(phone.replace(/[\s()-]/g, ''));
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const prettyDate = (date: string) => new Intl.DateTimeFormat('en-KE', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

export function BookingJourney({ initialServiceId = '', initialStaffId = '' }: { initialServiceId?: string; initialStaffId?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services.some((item) => item.id === initialServiceId) ? initialServiceId : '');
  const [staffId, setStaffId] = useState(staff.some((person) => person.id === initialStaffId) ? initialStaffId : '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [simulateSubmissionError, setSimulateSubmissionError] = useState(false);

  const service = services.find((item) => item.id === serviceId);
  const professional = staff.find((item) => item.id === staffId);
  const whatsappHref = getWhatsAppHref('Hello, I would like help choosing a service or appointment time.');
  const availableSlots = useMemo(() => mockAvailability.filter((slot) => slot.available && (staffId ? slot.staffId === staffId : true)), [staffId]);
  const availableDates = useMemo(() => new Set(availableSlots.map((slot) => slot.date)), [availableSlots]);
  const selectedDaySlots = availableSlots.filter((slot) => slot.date === date);
  const matchedProfessional = staff.find((person) => person.id === selectedDaySlots.find((slot) => slot.time === time)?.staffId);

  function validateStep() {
    const nextErrors: Record<string, string> = {};
    if (step === 0 && !serviceId) nextErrors.service = 'Choose a service to continue.';
    if (step === 2 && (!date || !time)) nextErrors.appointment = 'Choose an available date and time.';
    if (step === 3) {
      if (customerName.trim().length < 2) nextErrors.customerName = 'Enter your full name.';
      if (!validPhone(customerPhone)) nextErrors.customerPhone = 'Enter a valid Kenyan phone number, such as 0712345678 or +254712345678.';
      if (!validEmail(customerEmail)) nextErrors.customerEmail = 'Enter a valid email address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep()) return;
    setSubmissionError('');
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function previousStep() {
    setSubmissionError('');
    setStep((current) => Math.max(current - 1, 0));
  }

  async function submitBooking() {
    if (!service || !date || !time || !customerName.trim() || !validPhone(customerPhone) || !validEmail(customerEmail)) {
      setSubmissionError('Some booking details are missing. Return to the earlier steps and check your selections.');
      return;
    }
    setSubmitting(true);
    setSubmissionError('');
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    try {
      if (simulateSubmissionError) {
        setSimulateSubmissionError(false);
        throw new Error('Preview requested a simulated temporary submission error.');
      }
      const assignedStaffId = staffId || mockAvailability.find((slot) => slot.date === date && slot.time === time && slot.available)?.staffId;
      const draft: BookingDraft = { serviceId, ...(assignedStaffId ? { staffId: assignedStaffId } : {}), customerName: customerName.trim(), customerPhone: customerPhone.trim(), customerEmail: customerEmail.trim(), date, time };
      const sampleConfirmation = createMockBookingConfirmation(draft);
      window.sessionStorage.setItem('khalistic-beauty-house-demo-booking', JSON.stringify(sampleConfirmation));
      router.push(`/booking/confirmation?ref=${encodeURIComponent(sampleConfirmation.bookingReference)}`);
    } catch {
      setSubmissionError('We could not prepare the sample confirmation in this browser session. Please review your selections and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="booking-page"><Container size="wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Booking' }]} /><div className="booking-header"><p className="booking-eyebrow">A frontend-only preview</p><h1>Book a little time for you</h1><p>Follow the steps to explore a sample appointment. Nothing is sent to a salon or saved to a booking system.</p>{whatsappHref && <a className="booking-whatsapp-help" href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>Questions? Message us on WhatsApp</span><span className="visually-hidden"> (opens in a new tab)</span></a>}</div><ol className="booking-stepper" aria-label="Booking steps">{steps.map((label, index) => <li key={label} className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} aria-current={index === step ? 'step' : undefined}><span>{index < step ? String.fromCharCode(10003) : index + 1}</span><small>{label}</small></li>)}</ol>
    <section className="booking-panel" aria-labelledby="booking-step-title"><div className="booking-panel__top"><span>Step {step + 1} of {steps.length}</span><span>Sample booking � KES</span></div>
      {step === 0 && <div className="booking-step-content"><h2 id="booking-step-title">Choose a service</h2><p className="booking-step-help">Prices and durations are illustrative.</p><div className="booking-service-options">{services.map((item) => <button type="button" key={item.id} className={`booking-option ${serviceId === item.id ? 'is-selected' : ''}`} aria-pressed={serviceId === item.id} onClick={() => { setServiceId(item.id); setErrors({}); }}><span className="booking-option__radio" aria-hidden="true">{serviceId === item.id ? String.fromCharCode(10003) : ''}</span><span className="booking-option__main"><strong>{item.name}</strong><small>{item.description}</small></span><span className="booking-option__meta"><strong>{money.format(item.price.amount)}</strong><small>{item.durationMinutes} min</small></span></button>)}</div>{errors.service && <p className="booking-field-error" role="alert">{errors.service}</p>}</div>}
      {step === 1 && <div className="booking-step-content"><h2 id="booking-step-title">Choose your professional</h2><p className="booking-step-help">Or choose Any Available Professional and see all sample times.</p><div className="booking-staff-options"><button type="button" className={`booking-staff-option booking-staff-option--any ${!staffId ? 'is-selected' : ''}`} aria-pressed={!staffId} onClick={() => { setStaffId(''); setDate(''); setTime(''); }}>{String.fromCharCode(10047)} <span><strong>Any Available Professional</strong><small>Show sample times across the whole team</small></span></button>{staff.map((person) => <button type="button" key={person.id} className={`booking-staff-option ${staffId === person.id ? 'is-selected' : ''}`} aria-pressed={staffId === person.id} onClick={() => { setStaffId(person.id); setDate(''); setTime(''); }}><span><strong>{person.name}</strong><small>{person.role} � {person.specialties.join(', ')}</small></span></button>)}</div></div>}
      {step === 2 && <div className="booking-step-content"><h2 id="booking-step-title">Choose a date and time</h2><p className="booking-step-help">Unavailable dates and times are disabled in this illustrative schedule.</p>{availableDates.size === 0 ? <div className="booking-empty" role="status"><strong>No sample times are available for this professional.</strong><span>Choose another professional or ask us about appointment options.</span>{whatsappHref && <a className="button button--outline" href={whatsappHref} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>}</div> : <div className="booking-date-grid">{Array.from(new Set(mockAvailability.map((slot) => slot.date))).map((day) => { const open = availableDates.has(day) && !mockUnavailableDates.includes(day); return <button type="button" key={day} disabled={!open} aria-pressed={date === day} className={`booking-date-option ${date === day ? 'is-selected' : ''}`} onClick={() => { setDate(day); setTime(''); setErrors({}); }}><strong>{new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' }).format(new Date(`${day}T12:00:00Z`))}</strong><span>{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${day}T12:00:00Z`))}</span>{!open && <small>Unavailable</small>}</button>; })}</div>}{date && <div className="booking-time-section"><h3>Available times � {prettyDate(date)}</h3>{selectedDaySlots.length ? <div className="booking-time-grid">{selectedDaySlots.map((slot) => <button type="button" key={`${slot.date}-${slot.time}`} aria-pressed={time === slot.time} className={`booking-time-option ${time === slot.time ? 'is-selected' : ''}`} onClick={() => { setTime(slot.time); setErrors({}); }}>{slot.time}</button>)}</div> : <p>No sample times for this date. Choose another day.</p>}</div>}{errors.appointment && <p className="booking-field-error" role="alert">{errors.appointment}</p>}</div>}
      {step === 3 && <div className="booking-step-content"><h2 id="booking-step-title">Your details</h2><p className="booking-step-help">These details remain in this page until you finish. The sample confirmation is kept only in this browser tab session.</p><div className="booking-form-grid"><label className="booking-field">Full name<input required minLength={2} autoComplete="name" value={customerName} aria-invalid={Boolean(errors.customerName)} aria-describedby={errors.customerName ? 'booking-name-error' : undefined} onChange={(event) => { const value = event.target.value; setCustomerName(value); if (value.trim().length >= 2) setErrors((current) => { const next = { ...current }; delete next.customerName; return next; }); }} />{errors.customerName && <small id="booking-name-error" className="booking-field-error">{errors.customerName}</small>}</label><label className="booking-field">Phone number<input type="tel" required autoComplete="tel" inputMode="tel" placeholder="0712 345 678" value={customerPhone} aria-invalid={Boolean(errors.customerPhone)} aria-describedby={errors.customerPhone ? 'booking-phone-error' : undefined} onChange={(event) => { const value = event.target.value; setCustomerPhone(value); if (validPhone(value)) setErrors((current) => { const next = { ...current }; delete next.customerPhone; return next; }); }} />{errors.customerPhone && <small id="booking-phone-error" className="booking-field-error">{errors.customerPhone}</small>}</label><label className="booking-field booking-field--full">Email address<input type="email" required autoComplete="email" placeholder="you@example.com" value={customerEmail} aria-invalid={Boolean(errors.customerEmail)} aria-describedby={errors.customerEmail ? 'booking-email-error' : undefined} onChange={(event) => { const value = event.target.value; setCustomerEmail(value); if (validEmail(value)) setErrors((current) => { const next = { ...current }; delete next.customerEmail; return next; }); }} />{errors.customerEmail && <small id="booking-email-error" className="booking-field-error">{errors.customerEmail}</small>}</label></div></div>}
      {step === 4 && <div className="booking-step-content"><h2 id="booking-step-title">Review your sample booking</h2><p className="booking-step-help">Check the details before generating a simulated confirmation.</p><div className="booking-review"><p><strong>Service</strong><span>{service?.name ?? 'Choose a service'} � {service ? money.format(service.price.amount) : '�'} � {service?.durationMinutes ?? '�'} min</span><button type="button" onClick={() => setStep(0)}>Change</button></p><p><strong>Professional</strong><span>{professional ? `${professional.name} � ${professional.role}` : `Any Available Professional � sample match: ${matchedProfessional?.name ?? 'team member'}`}</span><button type="button" onClick={() => setStep(1)}>Change</button></p><p><strong>Date and time</strong><span>{date ? `${prettyDate(date)} � ${time}` : 'Choose a date and time'}</span><button type="button" onClick={() => setStep(2)}>Change</button></p><p><strong>Customer</strong><span>{customerName} � {customerPhone} � {customerEmail}</span><button type="button" onClick={() => setStep(3)}>Change</button></p></div><p className="booking-demo-notice">Simulated only. This will not reserve a real appointment or send your details anywhere.</p><label className="booking-error-preview"><input type="checkbox" checked={simulateSubmissionError} onChange={(event) => setSimulateSubmissionError(event.target.checked)} /> Preview a simulated submission error</label>{submissionError && <div className="booking-submit-error"><AsyncState variant="error" title="Sample confirmation could not be prepared" description={submissionError} action={<button type="button" className="button button--outline" onClick={submitBooking}>Try again</button>} /></div>}</div>}
      <div className="booking-panel__actions">{step > 0 && <button type="button" className="button button--outline" onClick={previousStep} disabled={submitting}>Back</button>}{step < steps.length - 1 ? <button type="button" className="button button--primary" onClick={nextStep}>Continue</button> : <button type="button" className="button button--primary" onClick={submitBooking} aria-busy={submitting} disabled={submitting || !service || !date || !time || !validPhone(customerPhone) || !validEmail(customerEmail) || customerName.trim().length < 2}>{submitting ? 'Preparing sample confirmation�' : 'Confirm sample booking'}</button>}</div>
    </section><p className="booking-privacy-note">This is a frontend simulation. No real booking is created, no availability is live, and your details are not sent to any server. A completed sample is kept only in this tab session.</p></Container></main>;
}
