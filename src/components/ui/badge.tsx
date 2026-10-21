import type { HTMLAttributes, ReactNode } from 'react';

type BadgeTone = 'rose' | 'neutral' | 'gold';

export function Badge({
  tone = 'neutral',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={['badge', `badge--${tone}`, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  );
}
