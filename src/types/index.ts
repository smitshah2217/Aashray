export interface Amenity {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  safetyPoints: number;
}

export interface Bed {
  id: string;
  bedNumber: number;
  isOccupied: boolean;
  tenantName?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  beds: Bed[];
}

export interface Tenant {
  id: string;
  name: string;
  roomNumber: string;
  rentAmount: number;
  isPaid: boolean;
  dueDate: string;
}

export interface Listing {
  id: string;
  title: string;
  images: string[];
  address: string;
  distance: number;
  rent: number;
  amenities: string[];
  latitude: number;
  longitude: number;
  description: string;
  rooms: Room[];
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  rating: number;
}

export type SafetyTier = 'Gold' | 'Silver' | 'Basic';

export interface SafetyScore {
  score: number;
  tier: SafetyTier;
}

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  course: string;
  year: number;
  image: string;
  habits: string[];
  studyStyle: 'Morning Person' | 'Night Owl' | 'Flexible';
  cleanliness: number;
  socialLevel: number;
  compatibility: number;
  bio: string;
}

export interface Match {
  profileId: string;
  timestamp: Date;
}

export interface RaiseQueryRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'responded';
}

export interface AppState {
  listings: Listing[];
  amenities: Amenity[];
  tenants: Tenant[];
  roommateProfiles: RoommateProfile[];
  matches: Match[];
  bookmarks: string[];
  theme: 'light' | 'dark';
  queries: RaiseQueryRequest[];
}

export interface FilterState {
  maxBudget: number;
  minSafetyTier: SafetyTier | 'All';
  maxDistance: number;
}
