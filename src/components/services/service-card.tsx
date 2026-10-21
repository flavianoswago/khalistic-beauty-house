import Image from 'next/image';
import Link from 'next/link';
import type { ServiceSummary } from '../../types/service';
import { ArrowRight } from 'lucide-react';
import { SiteIcon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { PriceDisplay } from '../ui/price-display';

function durationLabel(minutes?: number) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours && rest) return `${hours} hr ${rest} min`;
  if (hours) return `${hours} hr`;
  return `${rest} min`;
}

export function ServiceCard({
  service,
  href,
  imageSrc,
  imageAlt,
  actionLabel = 'View details',
  showImage = true,
}: {
  service: ServiceSummary;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  actionLabel?: string;
  showImage?: boolean;
}) {
  const duration = durationLabel(service.durationMinutes);
  const cardImage = showImage ? imageSrc ?? service.imageSrc : undefined;
  const cardImageAlt = imageAlt ?? service.imageAlt ?? '';
  return (
    <article className="service-card">
      {cardImage ? (
        <div className="service-card__image-wrap">
          <Image src={cardImage} alt={cardImageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="service-card__image" />
          {service.imageKind === 'illustration' ? <span className="service-card__image-note">Illustrative artwork</span> : null}
          {service.imageKind === 'stock-photo' ? <span className="service-card__image-note">Stock photo</span> : null}
        </div>
      ) : null}
      <div className="service-card__body">
        <div className="service-card__meta">
          {service.category ? <Badge tone="rose">{service.category}</Badge> : null}
          {duration ? <span className="service-card__duration">{duration}</span> : null}
        </div>
        <h3 className="service-card__title">{service.name}</h3>
        <p className="service-card__description">{service.description}</p>
        <div className="service-card__footer">
          <PriceDisplay price={service.price} />
          {href ? <Link className="service-card__link" href={href}>{actionLabel} <SiteIcon icon={ArrowRight} size={16} /></Link> : null}
        </div>
      </div>
    </article>
  );
}


