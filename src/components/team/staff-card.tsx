import Image from 'next/image';
import { Badge } from '../ui/badge';
import { ButtonLink } from '../ui/button';
import type { StaffProfile } from '../../types/staff';

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

export function StaffCard({ profile, selectHref }: { profile: StaffProfile; selectHref?: string }) {
  return (
    <article className="staff-card">
      <div className="staff-card__portrait">
        {profile.imageSrc ? <Image src={profile.imageSrc} alt={profile.imageAlt ?? profile.name} fill sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw" className="staff-card__image" /> : <span className="staff-card__initials" aria-hidden="true">{initials(profile.name)}</span>}
        {profile.imageSrc && profile.imageLabel ? <span className="staff-card__image-label">{profile.imageLabel}</span> : null}
      </div>
      <div className="staff-card__body">
        <p className="staff-card__role">{profile.role}</p>
        <h3 className="staff-card__name">{profile.name}</h3>
        {profile.biography ? <p className="staff-card__bio">{profile.biography}</p> : null}
        {profile.specialties.length ? <ul className="staff-card__specialties" aria-label={`${profile.name}'s specialties`}>{profile.specialties.map((specialty) => <li key={specialty}><Badge>{specialty}</Badge></li>)}</ul> : null}
        {selectHref ? <ButtonLink href={selectHref} variant="outline" className="staff-card__select">Select this professional <span aria-hidden="true">?</span></ButtonLink> : null}
      </div>
    </article>
  );
}
