export type GalleryCategory = 'Braids' | 'Hairstyles' | 'Nails' | 'Makeup' | 'Interiors' | 'Skincare';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  serviceName?: string;
  imageLabel: string;
}
