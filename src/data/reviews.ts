import type { Review } from '../types/review';

/** These are fictional design samples, not testimonials from actual customers. */
export const reviews = [
  { id: 'sample-review-1', author: 'Sample guest A', rating: 5, text: 'Fictional sample: the treatment felt calming and the studio details were lovely.', serviceName: 'Signature Glow Facial', isFictional: true, disclosure: 'Fictional sample review' },
  { id: 'sample-review-2', author: 'Sample guest B', rating: 4, text: 'Fictional sample: I enjoyed the careful brow consultation and natural-looking finish.', serviceName: 'Brow Shape & Tint', isFictional: true, disclosure: 'Fictional sample review' },
  { id: 'sample-review-3', author: 'Sample guest C', rating: 5, text: 'Fictional sample: a relaxing manicure with a neat, glossy result.', serviceName: 'Classic Manicure', isFictional: true, disclosure: 'Fictional sample review' },
] satisfies Review[];
