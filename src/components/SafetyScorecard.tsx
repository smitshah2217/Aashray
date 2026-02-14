import React from 'react';
import { Listing, Amenity } from '../types';
import { calculateSafetyScore } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface SafetyScorecardProps {
  listing: Listing;
  amenities: Amenity[];
}

const SafetyScorecard: React.FC<SafetyScorecardProps> = ({ listing, amenities }) => {
  const { theme } = useApp();
  const safetyScore = calculateSafetyScore(listing, amenities);
  const baseScore = 50;

  const activeAmenities = listing.amenities
    .map(id => amenities.find(a => a.id === id && a.enabled))
    .filter(Boolean) as Amenity[];

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Safety Scorecard</h3>

      {/* Overall Score */}
      <div className={`rounded-xl p-6 mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Overall Safety Score</div>
            <div className={`text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{safetyScore.score}</div>
          </div>
          <div className={`px-6 py-3 rounded-xl font-bold text-white text-lg bg-gradient-to-r ${
            safetyScore.tier === 'Gold' ? 'from-yellow-400 to-yellow-600' :
            safetyScore.tier === 'Silver' ? 'from-gray-400 to-gray-600' :
            'from-orange-400 to-orange-600'
          }`}>
            {safetyScore.tier} Tier
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4">
        <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Score Breakdown</h4>
        
        {/* Base Score */}
        <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Base Score</span>
          </div>
          <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>+{baseScore}</span>
        </div>

        {/* Active Amenities */}
        {activeAmenities.map((amenity) => (
          <div key={amenity.id} className={`flex items-center justify-between p-3 rounded-xl border-2 ${theme === 'dark' ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{amenity.icon}</span>
              <div>
                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{amenity.name}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-gray-600'}`}>Active</div>
              </div>
            </div>
            <span className="font-bold text-green-600">+{amenity.safetyPoints}</span>
          </div>
        ))}

        {/* Inactive Amenities */}
        {listing.amenities
          .map(id => amenities.find(a => a.id === id && !a.enabled))
          .filter(Boolean)
          .map((amenity) => (
            <div key={amenity!.id} className={`flex items-center justify-between p-3 rounded-xl opacity-50 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{amenity!.icon}</span>
                <div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{amenity!.name}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Inactive</div>
                </div>
              </div>
              <span className={`font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>+0</span>
            </div>
          ))}
      </div>

      {/* Safety Tips */}
      <div className={`mt-6 p-4 rounded-xl border ${theme === 'dark' ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>Safety Tip</h4>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              {safetyScore.tier === 'Gold' 
                ? 'This property has excellent safety features. All major security systems are in place.'
                : safetyScore.tier === 'Silver'
                ? 'This property has good safety features. Consider checking if additional security measures are available.'
                : 'This property has basic safety features. We recommend verifying additional security arrangements before booking.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default SafetyScorecard;
