import React, { useState } from 'react';
import { Listing } from '../types';
import { calculateSafetyScore, formatCurrency } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import SafetyScorecard from './SafetyScorecard';

interface ListingModalProps {
  listing: Listing;
  onClose: () => void;
}

const ListingModal: React.FC<ListingModalProps> = ({ listing, onClose }) => {
  const { amenities, bookmarks, toggleBookmark, raiseQuery, theme } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [queryData, setQueryData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    message: '',
  });
  const safetyScore = calculateSafetyScore(listing, amenities);
  const isBookmarked = bookmarks.includes(listing.id);

  const totalBeds = listing.rooms.reduce((sum, room) => sum + room.beds.length, 0);
  const availableBeds = listing.rooms.reduce(
    (sum, room) => sum + room.beds.filter(bed => !bed.isOccupied).length,
    0
  );

  const handleRaiseQuery = (e: React.FormEvent) => {
    e.preventDefault();
    raiseQuery({
      listingId: listing.id,
      listingTitle: listing.title,
      ...queryData,
    });
    setShowQueryForm(false);
    setQueryData({ studentName: '', studentEmail: '', studentPhone: '', message: '' });
    alert('Query sent to owner successfully!');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-600 font-semibold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className={`rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header with Close Button */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{listing.title}</h2>
          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            ✕
          </button>
        </div>

        {/* Virtual Tour Slider */}
        <div className="relative h-96">
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {listing.images.length}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(listing.id)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <span className={`text-2xl ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`}>
              {isBookmarked ? '❤️' : '🤍'}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{listing.title}</h2>
            {renderStars(listing.rating)}
          </div>
          {/* Location & Distance */}
          <div className={`flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="text-xl">📍</span>
            <span>{listing.address}</span>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <span>{listing.distance} km away</span>
          </div>

          {/* Description */}
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{listing.description}</p>

          {/* Safety Score Section */}
          <div className="mb-6">
            <SafetyScorecard listing={listing} amenities={amenities} />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Availability</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{availableBeds} Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{totalBeds - availableBeds} Occupied</span>
              </div>
            </div>
          </div>

          {/* Owner Details */}
          <div className={`mb-6 rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              <span>👤</span> Owner Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`font-semibold w-24 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Name:</span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>{listing.ownerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold w-24 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Phone:</span>
                <a href={`tel:${listing.ownerPhone}`} className="text-blue-600 hover:underline">{listing.ownerPhone}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold w-24 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Email:</span>
                <a href={`mailto:${listing.ownerEmail}`} className="text-blue-600 hover:underline">{listing.ownerEmail}</a>
              </div>
            </div>
          </div>

          {/* Rent & Actions */}
          <div className={`flex items-center justify-between pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div>
              <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Rent</div>
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{formatCurrency(listing.rent)}</div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowQueryForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Raise Query
              </button>
              <button 
                onClick={() => alert('Booking request sent to owner!')}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Query Form Modal */}
      {showQueryForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full p-8 animate-scaleIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Raise Query</h3>
              <button
                onClick={() => setShowQueryForm(false)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleRaiseQuery} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Your Name</label>
                <input
                  type="text"
                  required
                  value={queryData.studentName}
                  onChange={(e) => setQueryData({ ...queryData, studentName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:border-amber-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  required
                  value={queryData.studentEmail}
                  onChange={(e) => setQueryData({ ...queryData, studentEmail: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:border-amber-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Phone</label>
                <input
                  type="tel"
                  required
                  value={queryData.studentPhone}
                  onChange={(e) => setQueryData({ ...queryData, studentPhone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:border-amber-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Message</label>
                <textarea
                  required
                  value={queryData.message}
                  onChange={(e) => setQueryData({ ...queryData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:border-amber-500 focus:outline-none h-32 resize-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                  placeholder="Ask about availability, amenities, etc."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Send Query
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingModal;
