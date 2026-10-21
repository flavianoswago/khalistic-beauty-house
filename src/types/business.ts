export interface OpeningHours {
  day: string;
  opensAt: string | null;
  closesAt: string | null;
  closed: boolean;
}

export interface BusinessInformation {
  name: string;
  shortName: string;
  description: string;
  currency: 'KES';
  timeZone: string;
  /** This is a concept business profile; the owner supplied its phone and email. */
  isMock: true;
  address: {
    label: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  openingHours: OpeningHours[];
}
