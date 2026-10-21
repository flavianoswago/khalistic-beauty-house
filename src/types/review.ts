export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  serviceName: string;
  /** Always true for this demo dataset; never represents a real customer. */
  isFictional: true;
  disclosure: 'Fictional sample review';
}
