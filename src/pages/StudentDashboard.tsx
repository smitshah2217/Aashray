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
import { calculateSafetyScore } from '../utils/helpers';

const StudentDashboard: React.FC = () => {
  const { listings, amenities, rentNotifications, dismissNotification, theme, toggleTheme, roommateProfiles, matches, addMatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showRoommateSwipe, setShowRoommateSwipe] = useState(false);
  const [currentRoommateIndex, setCurrentRoommateIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    age: 21,
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Campus Street, University City',
    course: 'Computer Science',
    year: 3,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Third-year CS student looking for a quiet place to focus on studies and projects.',
    preferences: ['Night Owl', 'Clean & Organized', 'Coffee Lover', 'Quiet Environment', 'Fitness Enthusiast'],
    cleanliness: 90,
    socialLevel: 60,
  });

  const availablePreferences = ['Night Owl', 'Early Bird', 'Clean & Organized', 'Coffee Lover', 'Tea Lover', 'Quiet Environment', 'Social Butterfly', 'Fitness Enthusiast', 'Foodie', 'Music Lover', 'Pet Lover'];

  const togglePreference = (pref: string) => {
    setProfile(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };
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
      }, 1500);
    } else {
      setShowSkip(true);
      setTimeout(() => {
        setShowSkip(false);
        setCurrentRoommateIndex((prev) => prev + 1);
      }, 800);
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
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden my-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className="px-4 py-2 bg-white/90 rounded-full flex items-center gap-2 hover:bg-white transition-colors font-semibold text-sm"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    setIsEditing(false);
                  }}
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="absolute -bottom-16 left-8">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              {isEditing ? (
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className={`text-3xl font-bold flex-1 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                  />
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    className={`text-3xl font-bold w-20 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                  />
                </div>
              ) : (
                <h2 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {profile.name}, {profile.age}
                </h2>
              )}
              {isEditing ? (
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    value={profile.course}
                    onChange={(e) => setProfile({...profile, course: e.target.value})}
                    className={`flex-1 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                  />
                  <input
                    type="number"
                    value={profile.year}
                    onChange={(e) => setProfile({...profile, year: parseInt(e.target.value)})}
                    className={`w-20 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                  />
                </div>
              ) : (
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {profile.course} • Year {profile.year}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className={`text-sm flex-1 px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        />
                      ) : (
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className={`text-sm flex-1 px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        />
                      ) : (
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          className={`text-sm flex-1 px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        />
                      ) : (
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.address}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={4}
                      className={`text-sm w-full px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    />
                  ) : (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.bio}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Preferences & Lifestyle {isEditing && <span className="text-xs font-normal">(Click to toggle)</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? availablePreferences : profile.preferences).map((pref, index) => {
                    const getStyle = (pref: string) => {
                      if (pref.includes('Night')) return { icon: '🌙', color: 'from-indigo-50 to-purple-50 text-purple-700' };
                      if (pref.includes('Early')) return { icon: '🌅', color: 'from-yellow-50 to-orange-50 text-orange-700' };
                      if (pref.includes('Clean')) return { icon: '✨', color: 'from-green-50 to-emerald-50 text-green-700' };
                      if (pref.includes('Coffee')) return { icon: '☕', color: 'from-amber-50 to-orange-50 text-amber-700' };
                      if (pref.includes('Tea')) return { icon: '🍵', color: 'from-green-50 to-teal-50 text-teal-700' };
                      if (pref.includes('Quiet')) return { icon: '🤫', color: 'from-gray-50 to-slate-50 text-gray-700' };
                      if (pref.includes('Social')) return { icon: '🎉', color: 'from-pink-50 to-rose-50 text-pink-700' };
                      if (pref.includes('Fitness')) return { icon: '💪', color: 'from-blue-50 to-cyan-50 text-blue-700' };
                      if (pref.includes('Foodie')) return { icon: '🍕', color: 'from-red-50 to-orange-50 text-red-700' };
                      if (pref.includes('Music')) return { icon: '🎵', color: 'from-purple-50 to-pink-50 text-purple-700' };
                      if (pref.includes('Pet')) return { icon: '🐾', color: 'from-amber-50 to-yellow-50 text-amber-700' };
                      return { icon: '⭐', color: 'from-pink-50 to-rose-50 text-pink-700' };
                    };
                    const style = getStyle(pref);
                    const isSelected = profile.preferences.includes(pref);
                    return (
                      <button
                        key={index}
                        onClick={() => isEditing && togglePreference(pref)}
                        disabled={!isEditing}
                        className={`px-3 py-1 bg-gradient-to-r ${style.color} rounded-full text-sm font-medium flex items-center gap-1 transition-all ${
                          isEditing ? 'cursor-pointer hover:scale-105' : ''
                        } ${isEditing && !isSelected ? 'opacity-40' : 'opacity-100'}`}
                      >
                        <span>{style.icon}</span>
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Cleanliness</h4>
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.cleanliness}%</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={profile.cleanliness}
                      onChange={(e) => setProfile({...profile, cleanliness: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  ) : (
                    <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                        style={{ width: `${profile.cleanliness}%` }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Social Level</h4>
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{profile.socialLevel}%</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={profile.socialLevel}
                      onChange={(e) => setProfile({...profile, socialLevel: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  ) : (
                    <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
                        style={{ width: `${profile.socialLevel}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Find Your Roommate</h2>
              <button
                onClick={() => {
                  setShowRoommateSwipe(false);
                  setCurrentRoommateIndex(0);
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="relative h-[500px]">
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
                <RoommateCard
                  key={currentProfile?.id}
                  profile={currentProfile}
                  onSwipe={handleSwipe}
                />
              )}
            </div>

            {currentRoommateIndex < remainingProfiles.length && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-110 text-red-500"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-110 text-white"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skip Feedback */}
      {showSkip && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn pointer-events-none">
          <div className="bg-white rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Match Celebration */}
      {showMatch && currentProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className={`rounded-3xl p-8 max-w-md text-center animate-scaleIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className={`text-2xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Find Your Safe Haven
              </h1>
              <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover verified student housing with comprehensive safety ratings
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Profile Button */}
              <button
                onClick={() => setShowProfile(true)}
                className={`p-2 md:p-3 rounded-xl font-semibold transition-all ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg`}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 md:p-3 rounded-xl font-semibold transition-all ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg`}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Roommate Finder Button */}
              <button
                onClick={() => setShowRoommateSwipe(true)}
                className="px-3 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="hidden sm:inline">Find Roommate</span>
              </button>
              
              {/* View Toggle */}
              <div className={`flex items-center gap-1 rounded-xl p-1 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 md:px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 md:px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Map</span>
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
