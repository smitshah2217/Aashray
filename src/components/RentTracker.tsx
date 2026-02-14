import React from 'react';
import { Tenant } from '../types';
import { formatCurrency, isRentOverdue } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface RentTrackerProps {
  tenants: Tenant[];
  onTogglePaid: (tenantId: string) => void;
}

const RentTracker: React.FC<RentTrackerProps> = ({ tenants, onTogglePaid }) => {
  const { theme } = useApp();
  const totalRent = tenants.reduce((sum, t) => sum + t.rentAmount, 0);
  const collectedRent = tenants
    .filter((t) => t.isPaid)
    .reduce((sum, t) => sum + t.rentAmount, 0);
  const pendingRent = totalRent - collectedRent;
  const collectionRate = Math.round((collectedRent / totalRent) * 100);

  return (
    <div className={`rounded-2xl p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold text-xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Rent Tracker</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-green-900/30' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
          <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            Collected
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
            {formatCurrency(collectedRent)}
          </div>
        </div>
        <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-gradient-to-br from-orange-50 to-orange-100'}`}>
          <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
            Pending
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
            {formatCurrency(pendingRent)}
          </div>
        </div>
        <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
          <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            Collection Rate
          </div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            {collectionRate}%
          </div>
        </div>
      </div>

      {/* Tenants List */}
      <div className="space-y-3">
        {tenants.map((tenant) => {
          const overdue = !tenant.isPaid && isRentOverdue(tenant.dueDate);

          return (
            <div
              key={tenant.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                tenant.isPaid
                  ? theme === 'dark' ? 'border-green-700 bg-green-900/30' : 'border-green-200 bg-green-50'
                  : overdue
                  ? theme === 'dark' ? 'border-red-700 bg-red-900/30 animate-pulse' : 'border-red-200 bg-red-50 animate-pulse'
                  : theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {tenant.name}
                    </h4>
                    {overdue && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-4 mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Room {tenant.roomNumber}</span>
                    <span>•</span>
                    <span className="font-semibold">
                      {formatCurrency(tenant.rentAmount)}
                    </span>
                    <span>•</span>
                    <span>Due: {new Date(tenant.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => onTogglePaid(tenant.id)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    tenant.isPaid
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {tenant.isPaid ? 'Paid ✓' : 'Mark as Paid'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentTracker;
