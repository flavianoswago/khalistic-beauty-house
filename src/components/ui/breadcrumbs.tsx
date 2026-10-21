import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={['breadcrumbs', className].filter(Boolean).join(' ')}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const current = index === items.length - 1 || !item.href;
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href!}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
