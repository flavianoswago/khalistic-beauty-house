import type { GalleryCategory, GalleryImage } from '../types/gallery';

/** Stock inspiration photos, clearly distinguished from salon client results. */
export const galleryCategories: GalleryCategory[] = ['Braids', 'Hairstyles', 'Nails', 'Makeup', 'Interiors', 'Skincare'];

export const galleryImages = [
  { id: 'braids', src: '/images/services/hair-braiding.jpg', alt: 'Two women braiding hair in a salon; stock inspiration photo, not a Khalistic client result', caption: 'Braided beauty', category: 'Braids', serviceName: 'Protective braids', imageLabel: 'Stock inspiration photo' },
  { id: 'hairstyles', src: '/images/services/hair-styling.jpg', alt: 'Natural textured hair styled in twists; stock inspiration photo, not a Khalistic client result', caption: 'Natural texture', category: 'Hairstyles', serviceName: 'Natural hair styling', imageLabel: 'Stock inspiration photo' },
  { id: 'nails', src: '/images/services/nail-service.jpg', alt: 'Client receiving a manicure; stock inspiration photo, not a Khalistic client result', caption: 'A rosy finish', category: 'Nails', serviceName: 'Manicure', imageLabel: 'Stock inspiration photo' },
  { id: 'makeup', src: '/images/services/makeup-application.jpg', alt: 'Makeup professional applying eye makeup; stock inspiration photo, not a Khalistic client result', caption: 'Soft glam', category: 'Makeup', serviceName: 'Makeup artistry', imageLabel: 'Stock inspiration photo' },
  { id: 'interior', src: '/images/story/salon-interior.jpg', alt: 'Bright salon interior with styling chair, mirror, and leafy plant; studio reference photo', caption: 'A welcoming space', category: 'Interiors', serviceName: 'Studio reference', imageLabel: 'Studio reference photo' },
  { id: 'skincare', src: '/images/services/facial-treatment.jpg', alt: 'Client receiving a facial mask treatment; stock inspiration photo, not a Khalistic client result', caption: 'A moment to reset', category: 'Skincare', serviceName: 'Facial care', imageLabel: 'Stock inspiration photo' },
] satisfies GalleryImage[];
