import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RoommateCard from '../components/RoommateCard';
import { RoommateProfile } from '../types';

const RoommateSwipe: React.FC = () => {
  const { roommateProfiles, matches, addMatch, theme } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  const remainingProfiles = roommateProfiles.filter(
    (profile) => !matches.some((match) => match.profileId === profile.id)
  );

  const currentProfile = remainingProfiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentProfile) {
      addMatch(currentProfile.id);
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'}`}>
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Find Your Roommate
          </h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Swipe right to connect • Swipe left to pass
          </p>
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Matches:</span>
            <span className="font-bold text-purple-600">{matches.length}</span>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] mb-8">
          {currentIndex >= remainingProfiles.length ? (
            <div className={`absolute inset-0 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-6xl mb-4">🎉</div>
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                All Caught Up!
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                You've seen all available roommate profiles
              </p>
              <button
                onClick={resetStack}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Review Again
              </button>
              {matches.length > 0 && (
                <div className="mt-8 w-full">
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Your Matches ({matches.length})
                  </h4>
                  <div className="space-y-2">
                    {matches.map((match) => {
                      const profile = roommateProfiles.find(
                        (p) => p.id === match.profileId
                      );
                      return profile ? (
                        <div
                          key={match.profileId}
                          className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                        >
                          <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 text-left">
                            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                              {profile.name}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {profile.course}
                            </div>
                          </div>
                          <span className="text-green-600 font-bold">
                            {profile.compatibility}%
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Stack of cards (show next 2 cards behind) */}
              {remainingProfiles
                .slice(currentIndex, currentIndex + 3)
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

        {/* Action Buttons */}
        {currentIndex < remainingProfiles.length && (
          <div className="flex items-center justify-center gap-6 animate-fadeIn">
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

      {/* Match Celebration */}
      {showMatch && currentProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className={`rounded-3xl p-8 max-w-md text-center animate-scaleIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              It's a Match!
            </h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              You and {currentProfile.name} are now connected
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src={currentProfile.image}
                alt={currentProfile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
              />
            </div>
            <div className="text-lg font-semibold text-green-600">
              {currentProfile.compatibility}% Compatible
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommateSwipe;
