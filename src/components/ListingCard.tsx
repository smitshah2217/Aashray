import React, { useState, memo } from 'react';
import { Listing } from '../types';
import { calculateSafetyScore, formatCurrency } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import SafetyScoreRing from './SafetyScoreRing';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = memo(({ listing }) => {
  const { amenities, bookmarks, toggleBookmark } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const safetyScore = calculateSafetyScore(listing, amenities);
  const isBookmarked = bookmarks.includes(listing.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + listing.images.length) % listing.images.length
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
      {/* Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Carousel Controls */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ›
            </button>
          </>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {listing.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(listing.id);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <span className={`text-xl ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`}>
            {isBookmarked ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Safety Score Badge */}
        <div className="absolute top-3 left-3">
          <SafetyScoreRing safetyScore={safetyScore} size={60} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {listing.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span>📍</span>
          <span className="line-clamp-1">{listing.address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>🚶</span>
          <span>{listing.distance} km away</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenityId) => {
            const amenity = amenities.find((a) => a.id === amenityId);
            return amenity ? (
              <span
                key={amenityId}
                className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium"
              >
                {amenity.icon} {amenity.name}
              </span>
            ) : null;
          })}
          {listing.amenities.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Rent */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-800">
              {formatCurrency(listing.rent)}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

ListingCard.displayName = 'ListingCard';

export default ListingCard;
