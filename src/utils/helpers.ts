import { Listing, Amenity, SafetyScore, SafetyTier } from '../types';

export const calculateSafetyScore = (
  listing: Listing,
  amenities: Amenity[]
): SafetyScore => {
  let score = 50; // Base score

  listing.amenities.forEach((amenityId) => {
    const amenity = amenities.find((a) => a.id === amenityId && a.enabled);
    if (amenity) {
      score += amenity.safetyPoints;
    }
  });

  const tier = getSafetyTier(score);
  return { score, tier };
};

export const getSafetyTier = (score: number): SafetyTier => {
  if (score >= 85) return 'Gold';
  if (score >= 70) return 'Silver';
  return 'Basic';
};

export const getTierColor = (tier: SafetyTier): string => {
  switch (tier) {
    case 'Gold':
      return '#FFD700';
    case 'Silver':
      return '#C0C0C0';
    case 'Basic':
      return '#CD7F32';
  }
};

export const getTierGradient = (tier: SafetyTier): string => {
  switch (tier) {
    case 'Gold':
      return 'from-yellow-400 via-yellow-500 to-yellow-600';
    case 'Silver':
      return 'from-gray-300 via-gray-400 to-gray-500';
    case 'Basic':
      return 'from-orange-400 via-orange-500 to-orange-600';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateOccupancyPercentage = (
  totalBeds: number,
  occupiedBeds: number
): number => {
  if (totalBeds === 0) return 0;
  return Math.round((occupiedBeds / totalBeds) * 100);
};

export const isRentOverdue = (dueDate: string): boolean => {
  const due = new Date(dueDate);
  const today = new Date();
  return today > due;
};
