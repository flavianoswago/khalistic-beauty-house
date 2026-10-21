import type { HTMLAttributes } from 'react';

export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={['site-divider', className].filter(Boolean).join(' ')} {...props} />;
}
