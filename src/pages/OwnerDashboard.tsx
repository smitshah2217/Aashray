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

  // Aggregate all rooms from all listings
  const allRooms = listings.flatMap((listing) => listing.rooms);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50'}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Owner Dashboard
              </h1>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Manage your properties, track rent, and control amenities
              </p>
            </div>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl font-semibold transition-all ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow-md hover:shadow-lg`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn">
            <div className="text-sm font-semibold mb-1 opacity-90">
              Total Listings
            </div>
            <div className="text-4xl font-bold">{listings.length}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <div className="text-sm font-semibold mb-1 opacity-90">
              Total Beds
            </div>
            <div className="text-4xl font-bold">
              {allRooms.reduce((sum, room) => sum + room.beds.length, 0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="text-sm font-semibold mb-1 opacity-90">
              Occupied Beds
            </div>
            <div className="text-4xl font-bold">
              {allRooms.reduce(
                (sum, room) =>
                  sum + room.beds.filter((bed) => bed.isOccupied).length,
                0
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <div className="text-sm font-semibold mb-1 opacity-90">
              Pending Rent
            </div>
            <div className="text-4xl font-bold">
              {tenants.filter((t) => !t.isPaid).length}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
              <OccupancyGrid rooms={allRooms} />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '500ms' }}>
              <RentTracker
                tenants={tenants}
                onTogglePaid={handleToggleRentPaid}
              />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '600ms' }}>
              <QueriesPanel queries={queries} onRespond={handleRespondToQuery} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="animate-fadeIn" style={{ animationDelay: '600ms' }}>
              <AmenitiesControl
                amenities={amenities}
                onToggle={handleToggleAmenity}
              />
            </div>

            {/* Quick Stats */}
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
                      (allRooms.reduce(
                        (sum, room) =>
                          sum + room.beds.filter((bed) => bed.isOccupied).length,
                        0
                      ) /
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
