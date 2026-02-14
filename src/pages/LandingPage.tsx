import React from 'react';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
              A
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              AASHRAY
            </h1>
          </div>
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            Safe Student Housing Discovery & Management
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find verified accommodation with comprehensive safety ratings, connect with compatible roommates, and manage properties efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Student Card */}
          <div 
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-fadeIn"
            style={{ animationDelay: '100ms' }}
            onClick={() => onNavigate()}
          >
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              For Students
            </h3>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Safety-verified listings
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Smart filters & search
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Real-time availability
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Bookmark favorites
              </li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Explore Housing
            </button>
          </div>

          {/* Roommate Card */}
          <div 
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-fadeIn"
            style={{ animationDelay: '200ms' }}
            onClick={() => onNavigate()}
          >
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Find Roommates
            </h3>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Swipe-based matching
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Compatibility scores
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Detailed profiles
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Instant connections
              </li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Start Swiping
            </button>
          </div>

          {/* Owner Card */}
          <div 
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-fadeIn"
            style={{ animationDelay: '300ms' }}
            onClick={() => onNavigate()}
          >
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              For Owners
            </h3>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Occupancy tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Rent management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Amenities control
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Analytics dashboard
              </li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Manage Properties
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-3xl p-8 shadow-lg animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose AASHRAY?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <div className="font-semibold text-gray-800">Safety First</div>
              <div className="text-sm text-gray-600">Verified properties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="font-semibold text-gray-800">Real-time</div>
              <div className="text-sm text-gray-600">Instant updates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-semibold text-gray-800">Smart Match</div>
              <div className="text-sm text-gray-600">AI-powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="font-semibold text-gray-800">Analytics</div>
              <div className="text-sm text-gray-600">Data-driven</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
