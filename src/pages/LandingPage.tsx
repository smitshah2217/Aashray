import React from 'react';
import { useApp } from '../context/AppContext';
import TiltedCard from '../components/TiltedCard';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useApp();
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
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
          <p className={`text-2xl mb-4 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Safe Student Housing Discovery & Management
          </p>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Find verified accommodation with comprehensive safety ratings, connect with compatible roommates, and manage properties efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Student Card */}
          <TiltedCard
            altText="For Students"
            captionText="For Students"
            containerHeight="auto"
            containerWidth="100%"
            imageHeight="auto"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1.02}
            showMobileWarning={false}
            showTooltip={false}
          >
          <div 
            className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            style={{ animationDelay: '100ms' }}
            onClick={() => onNavigate()}
          >
            <div className="text-6xl mb-4">🎓</div>
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              For Students
            </h3>
            <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
          </TiltedCard>

          {/* Roommate Card */}
          {/* <div 
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
          </div> */}

          {/* Owner Card */}
          <TiltedCard
            altText="For Owners"
            captionText="For Owners"
            containerHeight="auto"
            containerWidth="100%"
            imageHeight="auto"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1.02}
            showMobileWarning={false}
            showTooltip={false}
          >
          <div 
            className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            style={{ animationDelay: '300ms' }}
            onClick={() => onNavigate()}
          >
            <div className="text-6xl mb-4">🏢</div>
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              For Owners
            </h3>
            <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
          </TiltedCard>
        </div>

        {/* Features Grid */}
        <div className={`rounded-3xl p-8 shadow-lg animate-fadeIn ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} style={{ animationDelay: '400ms' }}>
          <h3 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Why Choose AASHRAY?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Safety First</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Verified properties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Real-time</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Instant updates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Smart Match</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>AI-powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Analytics</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Data-driven</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
