import React from 'react';
import { Amenity } from '../types';
import { useApp } from '../context/AppContext';

interface AmenitiesControlProps {
  amenities: Amenity[];
  onToggle: (amenityId: string) => void;
}

const AmenitiesControl: React.FC<AmenitiesControlProps> = ({
  amenities,
  onToggle,
}) => {
  const { theme } = useApp();
  
  return (
    <div className={`rounded-2xl p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold text-xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Amenities Control Panel
      </h3>

      <div className="space-y-4">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: amenity.icon }} />
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{amenity.name}</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  +{amenity.safetyPoints} safety points
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => onToggle(amenity.id)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                amenity.enabled
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                  amenity.enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
          </svg>
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">
              Impact on Safety Score
            </h4>
            <p className="text-sm text-amber-700">
              Toggling amenities will automatically update the safety scores for all
              listings. Students will see the updated scores in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesControl;
