import React from 'react';
import { Listing } from '../types';
import { calculateSafetyScore } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface MapViewProps {
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
}

const MapView: React.FC<MapViewProps> = ({ listings, onListingClick }) => {
  const { amenities, theme } = useApp();

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
      {/* Real Map Background using OpenStreetMap */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.11%2C72.88%2C19.15&layer=mapnik&marker=19.13%2C72.85"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        title="Map View"
      />
      
      {/* Overlay for markers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full p-8 pointer-events-auto">
        {listings.map((listing, index) => {
          const safetyScore = calculateSafetyScore(listing, amenities);
          const position = {
            left: `${15 + (index * 18) % 70}%`,
            top: `${20 + (index * 25) % 60}%`,
          };

          return (
            <div
              key={listing.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={position}
              onClick={() => onListingClick(listing)}
            >
              {/* Marker Pin */}
              <div className="relative">
                {/* SVG Location Pin */}
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-2xl transition-all group-hover:scale-125"
                >
                  {/* Pin Shadow */}
                  <ellipse cx="12" cy="22" rx="3" ry="1" fill="black" opacity="0.3" />
                  
                  {/* Pin Body */}
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill={safetyScore.tier === 'Gold' ? '#EAB308' : safetyScore.tier === 'Silver' ? '#6B7280' : '#F97316'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  
                  {/* Inner Circle Background */}
                  <circle
                    cx="12"
                    cy="9"
                    r="4"
                    fill="white"
                  />
                  
                  {/* Score Text */}
                  <text
                    x="12"
                    y="11"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill={safetyScore.tier === 'Gold' ? '#EAB308' : safetyScore.tier === 'Silver' ? '#6B7280' : '#F97316'}
                  >
                    {safetyScore.score}
                  </text>
                </svg>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-10">
                <div className={`rounded-xl shadow-xl p-4 min-w-[250px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{listing.title}</h4>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>📍 {listing.distance} km away</p>
                  <p className="text-lg font-bold text-amber-600">₹{listing.rent.toLocaleString()}/mo</p>
                  <div className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Click to view details</div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Legend */}
      <div className={`absolute bottom-4 left-4 backdrop-blur-sm rounded-xl p-4 shadow-lg ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}`}>
        <h4 className={`font-semibold mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Safety Tiers</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Gold (85+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Silver (70-84)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Basic (&lt;70)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
