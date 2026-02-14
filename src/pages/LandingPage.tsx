import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import TiltedCard from '../components/TiltedCard';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useApp();
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'}`}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob ${theme === 'dark' ? 'bg-white' : 'bg-amber-300'}`}></div>
        <div className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 ${theme === 'dark' ? 'bg-white' : 'bg-orange-300'}`}></div>
        <div className={`absolute -bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 ${theme === 'dark' ? 'bg-white' : 'bg-yellow-300'}`}></div>
      </div>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
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
      
      <div className="max-w-6xl w-full relative z-10">
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
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              For Students
            </h3>
            <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Safety-verified listings
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Smart filters & search
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time availability
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
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
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              For Owners
            </h3>
            <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Occupancy tracking
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Rent management
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Amenities control
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
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
              <div className="flex justify-center mb-2">
                <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Safety First</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Verified properties</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Real-time</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Instant updates</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Smart Match</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>AI-powered</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
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
