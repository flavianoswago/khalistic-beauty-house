import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

type SiteIconProps = {
  icon: LucideIcon;
  size?: 16 | 18 | 20 | 24;
  className?: string;
} & Omit<ComponentProps<LucideIcon>, 'size' | 'className'>;

/** Consistent thin-line icon sizing for navigation, actions and status UI. */
export function SiteIcon({ icon: Icon, size = 18, className, ...props }: SiteIconProps) {
  return <Icon className={['site-icon', className].filter(Boolean).join(' ')} size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" {...props} />;
}
