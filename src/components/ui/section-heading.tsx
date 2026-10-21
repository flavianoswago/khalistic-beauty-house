import type { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3';

export function SectionHeading({ title, description, eyebrow, as = 'h2', align = 'left', className, titleId }: {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  as?: HeadingLevel;
  align?: 'left' | 'center';
  className?: string;
  titleId?: string;
}) {
  const Heading = as;
  return (
    <header className={['section-heading', `section-heading--${align}`, className].filter(Boolean).join(' ')}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <Heading id={titleId} className="section-heading__title">{title}</Heading>
      {description ? <div className="section-heading__description">{description}</div> : null}
    </header>
  );
}
