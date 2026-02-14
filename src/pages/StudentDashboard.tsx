import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import FilterSection from '../components/FilterSection';
import SkeletonLoader from '../components/SkeletonLoader';
import MapView from '../components/MapView';
import ListingModal from '../components/ListingModal';
import RentNotificationPanel from '../components/RentNotificationPanel';
import RoommateCard from '../components/RoommateCard';
import { FilterState, Listing } from '../types';
import { calculateSafetyScore, getSafetyTier } from '../utils/helpers';

const StudentDashboard: React.FC = () => {
  const { listings, amenities, rentNotifications, dismissNotification, theme, toggleTheme, roommateProfiles, matches, addMatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showRoommateSwipe, setShowRoommateSwipe] = useState(false);
  const [currentRoommateIndex, setCurrentRoommateIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    maxBudget: 25000,
    minSafetyTier: 'All',
    maxDistance: 15,
  });

  const remainingProfiles = roommateProfiles.filter(
    (profile) => !matches.some((match) => match.profileId === profile.id)
  );

  const currentProfile = remainingProfiles[currentRoommateIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentProfile) {
      addMatch(currentProfile.id);
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        setCurrentRoommateIndex((prev) => prev + 1);
      }, 2000);
    } else {
      setCurrentRoommateIndex((prev) => prev + 1);
    }
  };

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Budget filter
      if (listing.rent > filters.maxBudget) return false;

      // Distance filter
      if (listing.distance > filters.maxDistance) return false;

      // Safety tier filter
      if (filters.minSafetyTier !== 'All') {
        const safetyScore = calculateSafetyScore(listing, amenities);
        const tierOrder = { Basic: 0, Silver: 1, Gold: 2 };
        const minTierValue = tierOrder[filters.minSafetyTier];
        const listingTierValue = tierOrder[safetyScore.tier];
        if (listingTierValue < minTierValue) return false;
      }

      return true;
    });
  }, [listings, amenities, filters]);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'}`}>
      {/* Rent Notifications */}
      <RentNotificationPanel 
        notifications={rentNotifications} 
        onDismiss={dismissNotification}
      />

      {/* Listing Modal */}
      {selectedListing && (
        <ListingModal 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)}
        />
      )}

      {/* Roommate Swipe Modal */}
      {showRoommateSwipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Find Your Roommate</h2>
              <button
                onClick={() => {
                  setShowRoommateSwipe(false);
                  setCurrentRoommateIndex(0);
                }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="relative h-[600px]">
              {currentRoommateIndex >= remainingProfiles.length ? (
                <div className={`rounded-3xl shadow-2xl p-12 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>All Caught Up!</h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>You've seen all available roommate profiles</p>
                  <button
                    onClick={() => setCurrentRoommateIndex(0)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Review Again
                  </button>
                </div>
              ) : (
                <>
                  {remainingProfiles
                    .slice(currentRoommateIndex, currentRoommateIndex + 3)
                    .reverse()
                    .map((profile, index) => {
                      const reverseIndex = 2 - index;
                      return (
                        <RoommateCard
                          key={profile.id}
                          profile={profile}
                          onSwipe={reverseIndex === 2 ? handleSwipe : () => {}}
                          style={{
                            zIndex: reverseIndex,
                            transform: `scale(${1 - reverseIndex * 0.05}) translateY(${
                              reverseIndex * -10
                            }px)`,
                            opacity: reverseIndex === 2 ? 1 : 0.7,
                          }}
                        />
                      );
                    })}
                </>
              )}
            </div>

            {currentRoommateIndex < remainingProfiles.length && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:shadow-xl transition-all transform hover:scale-110"
                >
                  ❌
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center text-4xl hover:shadow-xl transition-all transform hover:scale-110"
                >
                  💚
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match Celebration */}
      {showMatch && currentProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className={`rounded-3xl p-8 max-w-md text-center animate-scaleIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>It's a Match!</h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>You and {currentProfile.name} are now connected</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src={currentProfile.image}
                alt={currentProfile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
              />
            </div>
            <div className="text-lg font-semibold text-green-600">{currentProfile.compatibility}% Compatible</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Find Your Safe Haven
              </h1>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Discover verified student housing with comprehensive safety ratings
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl font-semibold transition-all ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg`}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Roommate Finder Button */}
              <button
                onClick={() => setShowRoommateSwipe(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Find Roommate
              </button>
              
              {/* View Toggle */}
              <div className={`flex items-center gap-2 rounded-xl p-1 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  Map
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <FilterSection filters={filters} onFilterChange={setFilters} />

            {/* Stats Card */}
            <div className={`rounded-2xl p-6 shadow-md mt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Search Results
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Total Listings</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {filteredListings.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Available Beds</span>
                  <span className="font-bold text-green-600">
                    {filteredListings.reduce(
                      (sum, listing) =>
                        sum +
                        listing.rooms.reduce(
                          (roomSum, room) =>
                            roomSum +
                            room.beds.filter((bed) => !bed.isOccupied).length,
                          0
                        ),
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {viewMode === 'map' ? (
              <div className="animate-fadeIn">
                <MapView 
                  listings={filteredListings} 
                  onListingClick={setSelectedListing}
                />
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <SkeletonLoader />
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              <div className={`rounded-2xl p-12 text-center shadow-md animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-6xl mb-4">🏠</div>
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  No Listings Found
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      maxBudget: 25000,
                      minSafetyTier: 'All',
                      maxDistance: 15,
                    })
                  }
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedListing(listing)}
                  >
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
