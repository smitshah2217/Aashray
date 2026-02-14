import React from 'react';
import { Listing } from '../types';
import { calculateSafetyScore } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface MapViewProps {
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
}

const MapView: React.FC<MapViewProps> = ({ listings, onListingClick }) => {
  const { amenities } = useApp();

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden shadow-lg">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Map Markers */}
      <div className="relative w-full h-full p-8">
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
                <div className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm transition-all group-hover:scale-125 bg-gradient-to-br ${
                  safetyScore.tier === 'Gold' ? 'from-yellow-400 to-yellow-600' :
                  safetyScore.tier === 'Silver' ? 'from-gray-400 to-gray-600' :
                  'from-orange-400 to-orange-600'
                }`}>
                  {safetyScore.score}
                </div>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${
                  safetyScore.tier === 'Gold' ? 'border-t-yellow-600' :
                  safetyScore.tier === 'Silver' ? 'border-t-gray-600' :
                  'border-t-orange-600'
                }`} />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-10">
                <div className="bg-white rounded-xl shadow-xl p-4 min-w-[250px]">
                  <h4 className="font-bold text-gray-800 mb-1">{listing.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">📍 {listing.distance} km away</p>
                  <p className="text-lg font-bold text-amber-600">₹{listing.rent.toLocaleString()}/mo</p>
                  <div className="mt-2 text-xs text-gray-500">Click to view details</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Safety Tiers</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600" />
            <span className="text-gray-700">Gold (85+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
            <span className="text-gray-700">Silver (70-84)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
            <span className="text-gray-700">Basic (&lt;70)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
