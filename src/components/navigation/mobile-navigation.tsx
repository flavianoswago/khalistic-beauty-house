'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from '../ui/button';
import { PUBLIC_NAV_LINKS } from './navigation-links';

export function MobileNavigation() {
  const pathname = usePathname();
  return <MobileNavigationMenu key={pathname} pathname={pathname} />;
}

function MobileNavigationMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        ref={toggleRef}
        type="button"
        className="mobile-navigation__toggle"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      <nav
        id="mobile-navigation-panel"
        className="mobile-navigation__panel"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        <ul className="mobile-navigation__list">
          {PUBLIC_NAV_LINKS.map(({ href, label }) => {
            const current = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="mobile-navigation__link"
                  aria-current={current ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ButtonLink href="/booking" className="mobile-navigation__book" onClick={() => setOpen(false)}>
          Book an appointment
        </ButtonLink>
      </nav>
    </div>
  );
}
