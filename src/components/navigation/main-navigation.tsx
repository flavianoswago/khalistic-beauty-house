'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PUBLIC_NAV_LINKS } from './navigation-links';

export function MainNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="main-navigation">
      <ul className="main-navigation__list">
        {PUBLIC_NAV_LINKS.map(({ href, label }) => {
          const current = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link className="main-navigation__link" href={href} aria-current={current ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
