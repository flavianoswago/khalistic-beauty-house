import Link from 'next/link';
import { businessInformation } from '../../data/business';
import { MainNavigation } from '../navigation/main-navigation';
import { MobileNavigation } from '../navigation/mobile-navigation';
import { ButtonLink } from '../ui/button';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner site-container site-container--wide">
        <Link className="site-wordmark" href="/" aria-label={`${businessInformation.name} home`}>
          <span className="site-wordmark__name">{businessInformation.shortName}</span>
          <span className="site-wordmark__descriptor">Beauty House</span>
        </Link>
        <MainNavigation />
        <div className="site-header__actions">
          <ButtonLink href="/booking" className="site-header__book">Book an appointment</ButtonLink>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
