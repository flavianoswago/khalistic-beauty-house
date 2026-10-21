export interface Staff {
  id: string;
  name: string;
  role: string;
  biography: string;
  imageSrc?: string;
  imageAlt?: string;
  imageLabel?: string;
  specialties: string[];
}

/** Legacy-friendly alias used by the staff card API. */
export type StaffProfile = Staff;