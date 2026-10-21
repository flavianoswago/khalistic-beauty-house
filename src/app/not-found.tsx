import Link from 'next/link';
import { SiteFooter } from '../components/layout/site-footer';
import { SiteHeader } from '../components/layout/site-header';
import { ButtonLink } from '../components/ui/button';
import { Container } from '../components/ui/container';

export default function NotFound() {
  return <div className="site-shell"><a className="site-skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className="not-found-page"><Container size="reading"><p className="section-heading__eyebrow">A little detour</p><h1>We couldn’t find that page.</h1><p>The address may have changed, or the page may no longer be part of this sample site.</p><div className="not-found-page__actions"><ButtonLink href="/">Return to homepage</ButtonLink><Link href="/services">Explore services</Link><Link href="/booking">Start a sample booking</Link></div></Container></main><SiteFooter /></div>;
}
