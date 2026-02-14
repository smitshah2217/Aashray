import React from 'react';
import { FilterState, SafetyTier } from '../types';
import { useApp } from '../context/AppContext';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
}) => {
  const { theme } = useApp();

  return (
    <div className={`rounded-2xl p-6 shadow-md mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Filters</h3>

      {/* Budget Slider */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
          style={{
            background: `linear-gradient(to right, #f59e0b ${((filters.maxBudget - 5000) / (25000 - 5000)) * 100}%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} ${((filters.maxBudget - 5000) / (25000 - 5000)) * 100}%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        />
        <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>₹5,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Safety Tier Filter */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${filters.minSafetyTier === tier
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
          style={{
            background: `linear-gradient(to right, #f59e0b ${((filters.maxDistance - 1) / (15 - 1)) * 100}%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} ${((filters.maxDistance - 1) / (15 - 1)) * 100}%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        />

        <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>1 km</span>
          <span>15 km</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection