import React from 'react';
import { Listing, Amenity } from '../types';
import { calculateSafetyScore } from '../utils/helpers';

interface SafetyScorecardProps {
  listing: Listing;
  amenities: Amenity[];
}

const SafetyScorecard: React.FC<SafetyScorecardProps> = ({ listing, amenities }) => {
  const safetyScore = calculateSafetyScore(listing, amenities);
  const baseScore = 50;

  const activeAmenities = listing.amenities
    .map(id => amenities.find(a => a.id === id && a.enabled))
    .filter(Boolean) as Amenity[];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Safety Scorecard</h3>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Overall Safety Score</div>
            <div className="text-5xl font-bold text-gray-800">{safetyScore.score}</div>
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
        <h4 className="font-semibold text-gray-700">Score Breakdown</h4>
        
        {/* Base Score */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="font-medium text-gray-800">Base Score</span>
          </div>
          <span className="font-bold text-gray-800">+{baseScore}</span>
        </div>

        {/* Active Amenities */}
        {activeAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: amenity.icon }} />
              <div>
                <div className="font-medium text-gray-800">{amenity.name}</div>
                <div className="text-xs text-gray-600">Active</div>
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
            <div key={amenity!.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-50">
              <div className="flex items-center gap-3">
                <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: amenity!.icon }} />
                <div>
                  <div className="font-medium text-gray-800">{amenity!.name}</div>
                  <div className="text-xs text-gray-600">Inactive</div>
                </div>
              </div>
              <span className="font-bold text-gray-400">+0</span>
            </div>
          ))}
      </div>

      {/* Safety Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
          </svg>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Safety Tip</h4>
            <p className="text-sm text-blue-700">
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
