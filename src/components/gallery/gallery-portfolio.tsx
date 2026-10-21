'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '../../types/gallery';

export function GalleryCard({ image, onSelect }: { image: GalleryImage; onSelect: () => void }) {
  return <figure className="portfolio-card"><button type="button" className="portfolio-card__open" onClick={onSelect} aria-label={`View ${image.caption}, ${image.category} stock inspiration photo`}><span className="portfolio-card__media"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="portfolio-card__image" /><span className="portfolio-card__image-label">{image.imageLabel}</span><span className="portfolio-card__zoom" aria-hidden="true">View image <span>↗</span></span></span></button><figcaption className="portfolio-card__caption"><span><strong>{image.caption}</strong><small>{image.serviceName}</small></span><span className="portfolio-card__category">{image.category}</span></figcaption></figure>;
}

export function GalleryPortfolio({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const categories = ['All', ...Array.from(new Set(images.map((image) => image.category)))];
  const visibleImages = category === 'All' ? images : images.filter((image) => image.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return <>
    <div className="gallery-filter" aria-label="Filter gallery by category">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} className={category === item ? 'gallery-filter__button is-active' : 'gallery-filter__button'} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {visibleImages.length ? <div className="portfolio-grid">{visibleImages.map((image) => <GalleryCard image={image} key={image.id} onSelect={() => setSelected(image)} />)}</div> : <p className="gallery-empty">There are no sample images in this category yet.</p>}
    <dialog className="gallery-viewer" ref={dialogRef} aria-label={selected ? `${selected.caption} image viewer` : 'Gallery image viewer'} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) (event.currentTarget as HTMLDialogElement).close(); }}>
      {selected && <div className="gallery-viewer__content"><div className="gallery-viewer__image"><Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 800px) 94vw, 80vw" /></div><div className="gallery-viewer__details"><div><span>{selected.category} · {selected.imageLabel}</span><h2>{selected.caption}</h2><p>{selected.serviceName}</p></div><button className="gallery-viewer__close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></div></div>}
    </dialog>
  </>;
}
