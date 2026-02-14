import React from 'react';
import { Amenity } from '../types';

interface AmenitiesControlProps {
  amenities: Amenity[];
  onToggle: (amenityId: string) => void;
}

const AmenitiesControl: React.FC<AmenitiesControlProps> = ({
  amenities,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="font-bold text-xl text-gray-800 mb-6">
        Amenities Control Panel
      </h3>

      <div className="space-y-4">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{amenity.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-800">{amenity.name}</h4>
                <p className="text-sm text-gray-500">
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
          <span className="text-2xl">💡</span>
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
