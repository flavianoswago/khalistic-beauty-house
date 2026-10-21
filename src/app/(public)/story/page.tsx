import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '../../../components/ui/breadcrumbs';
import { ButtonLink } from '../../../components/ui/button';
import { Container } from '../../../components/ui/container';
import { SectionHeading } from '../../../components/ui/section-heading';
import { businessInformation } from '../../../data/business';

export const metadata: Metadata = {
  title: 'About The Khalistic Beauty House',
  description: 'Discover the mission, values and intended guest experience at The Khalistic Beauty House.',
  openGraph: {
    title: 'About The Khalistic Beauty House',
    description: 'A multi-service beauty house for hair, skin, nails and makeup.',
    images: [{ url: '/images/story/salon-interior.jpg', alt: 'Bright salon interior with styling chair, mirror and leafy plant' }],
  },
};

export default function StoryPage() {
  return (
    <main className="story-page">
      <section className="story-intro">
        <Container size="wide">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <SectionHeading as="h1" eyebrow="About the beauty house" title="Where beauty feels like home." description={businessInformation.description} />
          <p className="story-disclosure">Editable sample brand story and service standards. The owner should confirm or revise these details before launch.</p>
        </Container>
      </section>

      <section className="story-feature">
        <Container size="wide">
          <div className="story-feature__grid">
            <div className="story-feature__image">
              <Image src="/images/story/salon-interior.jpg" alt="Bright salon interior with styling chair, mirror and leafy plant" fill sizes="(max-width: 800px) 100vw, 50vw" />
              <span>Salon interior reference</span>
            </div>
            <div className="story-feature__copy">
              <p className="story-eyebrow">Our story · sample copy</p>
              <h2>One beauty house, many ways to feel like yourself.</h2>
              <p>The Khalistic Beauty House is envisioned as a neighbourhood destination bringing hair styling and protective braids, skincare, brows and lashes, nail care, and occasion makeup together in one place.</p>
              <p>Our proposed mission is to make personal care feel welcoming and straightforward: listen to what each guest wants, explain suitable options, and make it easier to plan a visit with clear service information.</p>
              <p>This is an editable concept story, not a verified account of the business’s founding or day-to-day operations.</p>
              <ButtonLink href="/services">Explore Services</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="story-values">
        <Container size="wide">
          <SectionHeading eyebrow="The experience we aim to offer" title="Care that starts with listening." description="These sample values describe the intended customer experience; confirm that they reflect the team’s actual approach." />
          <div className="story-values__grid">
            <article><span>01</span><h3>Personal, considered service</h3><p>Start by sharing the result you have in mind, any preferences or sensitivities, and questions about the service. The team can then confirm what is suitable before proceeding.</p></article>
            <article><span>02</span><h3>Clear expectations</h3><p>Review what a service includes, its estimated duration and sample price before choosing. Confirm the final scope, price and timing with the salon before the appointment.</p></article>
            <article><span>03</span><h3>Warm and respectful care</h3><p>Our proposed standard is to communicate clearly, respect each guest’s choices and explain any changes before continuing.</p></article>
          </div>
        </Container>
      </section>

      <section className="story-treatment">
        <Container size="wide">
          <div className="story-treatment__image">
            <Image src="/images/services/facial-treatment.jpg" alt="Stock inspiration photo of a client receiving a facial mask treatment" fill sizes="(max-width: 800px) 100vw, 42vw" />
            <span>Stock inspiration photo</span>
          </div>
          <div>
            <p className="story-eyebrow">Service and hygiene standards · confirm before publishing</p>
            <h2>Comfort, cleanliness and thoughtful preparation.</h2>
            <p>The following is a suggested service standard, not a confirmed description of current salon procedures: prepare the work area between guests, clean and disinfect reusable tools according to product guidance, use fresh single-use items where appropriate, and ask about relevant sensitivities before a service.</p>
            <p>Please confirm the studio’s actual cleaning routine, products and service procedures with the owner. No certification or specialist facility is claimed here.</p>
            <ButtonLink href="/contact" variant="outline">Ask the studio</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="story-values">
        <Container size="wide">
          <SectionHeading eyebrow="Planning your visit" title="A booking preview, then direct confirmation." description="The online flow is a frontend demonstration and does not reserve a real appointment." />
          <div className="story-values__grid">
            <article><span>01</span><h3>Choose a service</h3><p>Browse the menu, then check illustrative prices and estimated durations with the salon.</p></article>
            <article><span>02</span><h3>Contact to confirm</h3><p>Use the published phone or email to confirm availability, final price, appointment time and the studio address.</p></article>
            <article><span>03</span><h3>Changes and cancellations</h3><p>No cancellation window or fee has been confirmed. If plans change, contact the salon as soon as possible and ask the team to confirm its current policy.</p></article>
          </div>
          <div className="home-hero__actions"><ButtonLink href="/booking">Book an Appointment</ButtonLink><ButtonLink href="/gallery" variant="outline">View Our Work</ButtonLink></div>
          <p className="story-disclosure">The gallery contains stock inspiration and a salon interior reference, not verified Khalistic customer results.</p>
        </Container>
      </section>
    </main>
  );
}
