import type { ReactNode } from 'react';
import { SiteFooter } from '../../components/layout/site-footer';
import { SiteHeader } from '../../components/layout/site-header';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="site-skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content">{children}</div>
      <SiteFooter />
    </div>
  );
}
