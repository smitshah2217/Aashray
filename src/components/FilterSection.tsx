import React from 'react';
import { FilterState, SafetyTier } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Filters</h3>

      {/* Budget Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Maximum Budget: ₹{filters.maxBudget.toLocaleString()}
        </label>
        <input
          type="range"
          min="5000"
          max="25000"
          step="1000"
          value={filters.maxBudget}
          onChange={(e) =>
            onFilterChange({ ...filters, maxBudget: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹5,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Safety Tier Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Minimum Safety Tier
        </label>
        <div className="flex gap-2">
          {(['All', 'Basic', 'Silver', 'Gold'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  minSafetyTier: tier as SafetyTier | 'All',
                })
              }
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filters.minSafetyTier === tier
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Maximum Distance: {filters.maxDistance} km
        </label>
        <input
          type="range"
          min="1"
          max="15"
          step="0.5"
          value={filters.maxDistance}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              maxDistance: parseFloat(e.target.value),
            })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 km</span>
          <span>15 km</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
