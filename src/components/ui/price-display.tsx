import type { ServicePrice } from '../../types/service';

export function PriceDisplay({ price }: { price?: ServicePrice }) {
  if (!price) {
    return <p className="price-display price-display--unset">Price on request</p>;
  }

  const formatted = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: price.currency,
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  }).format(price.amount);

  return (
    <p className="price-display">
      {price.startingAt ? <span className="price-display__prefix">Starting at </span> : null}
      <data className="price-display__amount" value={price.amount}>{formatted}</data>
    </p>
  );
}
