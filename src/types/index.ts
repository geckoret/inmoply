export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  images: string[];
  is_verified: boolean;
  seller_type: 'private' | 'agency';
  agency_id?: string;
  created_at: string;
  features: string[];
};

export type UserProfile = {
  id: string;
  full_name: string;
  avatar_url?: string;
  user_type: 'individual' | 'agency';
};
