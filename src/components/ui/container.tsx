import type { ComponentProps, ElementType, ReactNode } from 'react';

type ContainerSize = 'content' | 'wide' | 'reading';

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'content',
  className,
  children,
  ...props
}: {
  as?: T;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<T>, 'as' | 'size' | 'className' | 'children'>) {
  const Element = as ?? 'div';
  const sizeClass = size === 'content' ? '' : `site-container--${size}`;
  return (
    <Element className={['site-container', sizeClass, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Element>
  );
}
