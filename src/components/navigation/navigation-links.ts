export const PUBLIC_NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/story', label: 'The studio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_NAV_LINKS = [
  ...PUBLIC_NAV_LINKS,
  { href: '/team', label: 'Our team' },
] as const;
