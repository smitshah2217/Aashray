import React, { useState, memo } from 'react';
import { Listing } from '../types';
import { calculateSafetyScore, formatCurrency } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import SafetyScoreRing from './SafetyScoreRing';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = memo(({ listing }) => {
  const { amenities, bookmarks, toggleBookmark, theme } = useApp();
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
    <div className={`rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
          <svg className={`w-6 h-6 ${isBookmarked ? 'fill-red-500' : 'fill-none stroke-gray-400'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Safety Score Badge */}
        <div className="absolute top-3 left-3">
          <SafetyScoreRing safetyScore={safetyScore} size={60} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {listing.title}
        </h3>


        <div className={`flex items-center gap-2 text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="line-clamp-1">{listing.address}</span>
        </div>

         <div className={`flex items-center gap-2 text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
          </svg>

          <span>{listing.distance} km away</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenityId) => {
            const amenity = amenities.find((a) => a.id === amenityId);
            return amenity ? (
              <span
                key={amenityId}
                className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <span dangerouslySetInnerHTML={{ __html: amenity.icon }} />
                {amenity.name}
              </span>
            ) : null;
          })}
          {listing.amenities.length > 3 && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Rent */}
        <div className={`flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
          <div>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {formatCurrency(listing.rent)}
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
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
