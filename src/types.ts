export type VehicleType = 'citadine' | 'routiere' | 'suv' | 'utilitaire_sportive' | 'remise_a_neuf';

export type Category = 'interieur' | 'exterieur' | 'pack_integral';

export interface VehicleOption {
  id: VehicleType;
  label: string;
  examples: string;
  multiplier?: number;
}

export interface Formula {
  id: string;
  category: Category;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  duration: string;
  prices: Record<VehicleType, number | 'sur Devis'>;
  features: string[];
  isPopular?: boolean;
}

export interface AddonOption {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration?: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface InterventionCity {
  name: string;
  zipCode: string;
  fee: number;
  freeLimitNote?: string;
  distanceKm: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  formulaUsed: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface BookingState {
  vehicleType: VehicleType;
  category: Category;
  formulaId: string;
  selectedAddonIds: string[];
  cityName: string;
  customAddress: string;
  isWorkplace: boolean;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  vehicleModelDetails: string;
  comments: string;
}
