import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Inbox, LoaderCircle } from 'lucide-react';

type AsyncStateVariant = 'loading' | 'error' | 'empty' | 'success';
const stateIcon = {
  loading: LoaderCircle,
  error: AlertCircle,
  empty: Inbox,
  success: CheckCircle2,
} satisfies Record<AsyncStateVariant, typeof LoaderCircle>;

export function AsyncState({
  variant,
  title,
  description,
  action,
}: {
  variant: AsyncStateVariant;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  const Icon = stateIcon[variant];
  return (
    <section
      className={`async-state async-state--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-busy={variant === 'loading' || undefined}
    >
      <Icon className="async-state__icon" aria-hidden="true" size={24} />
      <h2 className="async-state__title">{title}</h2>
      {description ? <p className="async-state__description">{description}</p> : null}
      {action ? <div className="async-state__action">{action}</div> : null}
    </section>
  );
}
