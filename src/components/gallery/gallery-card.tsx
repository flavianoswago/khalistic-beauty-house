import Image from 'next/image';
import type { GalleryImage } from '../../types/gallery';
import { Badge } from '../ui/badge';

export function GalleryCard({ image }: { image: GalleryImage }) {
  return (
    <figure className="gallery-card">
      <div className="gallery-card__media">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="gallery-card__image"
        />
      </div>
      <figcaption className="gallery-card__caption">
        <span className="gallery-card__title">{image.caption}</span><span className="gallery-card__image-label">{image.imageLabel}</span>
        {image.serviceName ? <Badge tone="neutral">{image.serviceName}</Badge> : null}
      </figcaption>
    </figure>
  );
}

