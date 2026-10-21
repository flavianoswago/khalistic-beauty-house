import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beauty Services & Sample Prices',
  description: 'Browse The Khalistic Beauty House sample service menu, with illustrative prices in Kenyan shillings and estimated appointment durations.',
  openGraph: {
    title: 'Beauty Services & Sample Prices',
    description: 'Browse The Khalistic Beauty House sample service menu, with illustrative prices in Kenyan shillings and estimated appointment durations.',
    images: [{ url: '/images/services/facial-treatment.jpg', alt: 'Stock photo of a facial treatment' }],
  },
};
import { Breadcrumbs } from '../../../components/ui/breadcrumbs';
import Image from 'next/image';
import { serviceCategories, services } from '../../../data/services';
import { ServiceCard } from '../../../components/services/service-card';
import { AsyncState } from '../../../components/ui/async-state';
import { Container } from '../../../components/ui/container';
import { SectionHeading } from '../../../components/ui/section-heading';

function categoryId(category: string) {
  return `service-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export default function ServicesPage() {
  return (
    <main className="destination-page services-page">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
        <div className="services-page__hero">
          <SectionHeading as="h1" eyebrow="The service menu" title="Find your feel-good ritual" titleId="services-title" description="From a little refresh to a full reset, explore the treatments we�ve thoughtfully put together for your next moment of self-care." />
          <div className="services-page__price-note"><span aria-hidden="true">KES</span><p>Prices are illustrative Kenyan shilling estimates. Treatment durations are estimates too; please confirm current details before booking.</p></div>
        </div>

        <nav className="services-category-nav" aria-label="Service categories">
          <span className="services-category-nav__label">Browse by category</span>
          <ul>{serviceCategories.map((category) => <li key={category}><a href={`#${categoryId(category)}`}>{category}<span>{services.filter((service) => service.category === category).length}</span></a></li>)}</ul>
        </nav>

        <div className="services-category-list">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter((service) => service.category === category);
            return (
              <section className="services-category" id={categoryId(category)} aria-labelledby={`${categoryId(category)}-title`} key={category}>
                <div className="services-category__heading"><div><p className="services-category__eyebrow">Our menu</p><h2 id={`${categoryId(category)}-title`}>{category}</h2></div><span>{categoryServices.length} {categoryServices.length === 1 ? 'treatment' : 'treatments'}</span></div>
                {categoryServices.length ? (
                  <div className="services-category__grid">
                    {categoryServices.map((service) => <ServiceCard key={service.id} service={service} actionLabel="Book this service" href={`/booking?service=${encodeURIComponent(service.id)}`} />)}
                  </div>
                ) : (
                  <AsyncState variant="empty" title={`No services currently listed in ${category}`} description="Please check back soon or browse another category." />
                )}
              </section>
            );
          })}
        </div>

        <aside className="services-page__closing">
          <div className="services-page__closing-image"><Image src="/images/services/facial-treatment.jpg" alt="A stock image of a spa facial treatment" fill sizes="(max-width: 640px) 100vw, 30vw" /></div>
          <div><p className="services-category__eyebrow">Not sure where to start?</p><h2>Let�s find the right ritual for you.</h2><p>Choose a treatment that feels good for today. You can ask questions before confirming any appointment.</p><Link href="/#visit">See sample contact details <span aria-hidden="true">?</span></Link></div>
        </aside>
      </Container>
    </main>
  );
}



