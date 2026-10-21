import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  outline: 'button--outline',
};

function classes(variant: ButtonVariant, className?: string) {
  return ['button', variantClass[variant], className].filter(Boolean).join(' ');
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={classes(variant, className)} type={type} {...props} />;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={classes(variant, className)} {...props} />;
}
