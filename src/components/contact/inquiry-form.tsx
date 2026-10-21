'use client';

import { useState, type FormEvent } from 'react';
import { AsyncState } from '../ui/async-state';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type InquiryFields = { name: string; email: string; subject: string; message: string };
const emptyFields: InquiryFields = { name: '', email: '', subject: '', message: '' };

export function InquiryForm() {
  const [fields, setFields] = useState<InquiryFields>(emptyFields);
  const [errors, setErrors] = useState<Partial<InquiryFields>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [simulateError, setSimulateError] = useState(false);

  function updateField(field: keyof InquiryFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'idle') setStatus('idle');
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<InquiryFields> = {};
    if (fields.name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!emailPattern.test(fields.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (fields.subject.trim().length < 3) nextErrors.subject = 'Enter a short subject.';
    if (fields.message.trim().length < 10) nextErrors.message = 'Please write at least 10 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    if (simulateError) {
      setSimulateError(false);
      setStatus('error');
      return;
    }
    setStatus('success');
  }

  return <section className="inquiry-section" aria-labelledby="inquiry-title"><div className="inquiry-intro"><p className="contact-eyebrow">Questions or ideas?</p><h2 id="inquiry-title">Send us a note</h2><p>This form is a frontend preview. It does not send or save messages.</p></div>{status === 'success' && <AsyncState variant="success" title="Sample message received" description="Thanks for trying the form. Your message was not delivered to the salon or stored anywhere." />}{status === 'error' && <AsyncState variant="error" title={Object.keys(errors).length ? 'Please check the form' : 'Sample message was not delivered'} description={Object.keys(errors).length ? 'Correct the highlighted fields, then submit again.' : 'This simulated error did not send or save your message. You can try again.'} />}{status === 'sending' && <AsyncState variant="loading" title="Previewing submission" description="No message is being sent to a server." />}<form className="inquiry-form" noValidate onSubmit={submitInquiry}><label className="contact-field">Name<input name="name" autoComplete="name" value={fields.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} onChange={(event) => updateField('name', event.target.value)} />{errors.name && <small id="contact-name-error">{errors.name}</small>}</label><label className="contact-field">Email<input name="email" type="email" autoComplete="email" value={fields.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} onChange={(event) => updateField('email', event.target.value)} />{errors.email && <small id="contact-email-error">{errors.email}</small>}</label><label className="contact-field contact-field--full">Subject<input name="subject" value={fields.subject} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} onChange={(event) => updateField('subject', event.target.value)} />{errors.subject && <small id="contact-subject-error">{errors.subject}</small>}</label><label className="contact-field contact-field--full">Message<textarea name="message" rows={5} value={fields.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} onChange={(event) => updateField('message', event.target.value)} />{errors.message && <small id="contact-message-error">{errors.message}</small>}</label><div className="inquiry-form__footer"><label className="inquiry-error-preview"><input type="checkbox" checked={simulateError} onChange={(event) => setSimulateError(event.target.checked)} /> Preview simulated error</label><button className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting preview…' : 'Submit sample inquiry'}</button></div></form></section>;
}
