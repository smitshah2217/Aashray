import React from 'react';
import { useApp } from '../context/AppContext';
import OccupancyGrid from '../components/OccupancyGrid';
import RentTracker from '../components/RentTracker';
import AmenitiesControl from '../components/AmenitiesControl';
import QueriesPanel from '../components/QueriesPanel';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

const OwnerDashboard: React.FC = () => {
  const { listings, amenities, tenants, toggleAmenity, toggleRentPaid, theme, toggleTheme, queries, respondToQuery } = useApp();
  const { toasts, showToast, removeToast } = useToast();

  const handleToggleRentPaid = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId);
    if (tenant) {
      toggleRentPaid(tenantId);
      if (!tenant.isPaid) {
        showToast(`Payment received from ${tenant.name}`, 'success');
      } else {
        showToast(`Payment status updated for ${tenant.name}`, 'info');
      }
    }
  };

  const handleToggleAmenity = (amenityId: string) => {
    toggleAmenity(amenityId);
    const amenity = amenities.find((a) => a.id === amenityId);
    if (amenity) {
      showToast(
        `${amenity.name} ${amenity.enabled ? 'disabled' : 'enabled'}. Safety scores updated across all listings!`,
        amenity.enabled ? 'warning' : 'success'
      );
    }
  };

  const handleRespondToQuery = (queryId: string) => {
    respondToQuery(queryId);
    showToast('Query marked as responded', 'success');
  };

  const handleAddProperty = () => {
    showToast('Add Property feature coming soon!', 'info');
  };

  const allRooms = listings.flatMap((listing) => listing.rooms);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Owner Dashboard
            </h1>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Manage your properties, track rent, and control amenities
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleAddProperty}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
              + Add Property
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold opacity-90">Total Listings</div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="text-4xl font-bold">{listings.length}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn hover:shadow-xl transition-shadow" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold opacity-90">Total Beds</div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div className="text-4xl font-bold">{allRooms.reduce((sum, room) => sum + room.beds.length, 0)}</div>
          </div>
          <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn hover:shadow-xl transition-shadow" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold opacity-90">Occupied Beds</div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="text-4xl font-bold">
              {allRooms.reduce((sum, room) => sum + room.beds.filter((bed) => bed.isOccupied).length, 0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn hover:shadow-xl transition-shadow" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold opacity-90">Pending Rent</div>
              <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-4xl font-bold">{tenants.filter((t) => !t.isPaid).length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
              <OccupancyGrid rooms={allRooms} />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '500ms' }}>
              <RentTracker tenants={tenants} onTogglePaid={handleToggleRentPaid} />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '600ms' }}>
              <QueriesPanel queries={queries} onRespond={handleRespondToQuery} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="animate-fadeIn" style={{ animationDelay: '600ms' }}>
              <AmenitiesControl amenities={amenities} onToggle={handleToggleAmenity} />
            </div>

            <div className={`rounded-2xl p-6 shadow-md mt-6 animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} style={{ animationDelay: '700ms' }}>
              <h3 className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Active Amenities</span>
                  <span className="font-bold text-green-600">
                    {amenities.filter((a) => a.enabled).length} / {amenities.length}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Rent Collection</span>
                  <span className="font-bold text-blue-600">
                    {Math.round((tenants.filter((t) => t.isPaid).length / tenants.length) * 100)}%
                  </span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Occupancy Rate</span>
                  <span className="font-bold text-purple-600">
                    {Math.round(
                      (allRooms.reduce((sum, room) => sum + room.beds.filter((bed) => bed.isOccupied).length, 0) /
                        allRooms.reduce((sum, room) => sum + room.beds.length, 0)) *
                        100
                    )}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
