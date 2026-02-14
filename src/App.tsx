import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import RoommateSwipe from './pages/RoommateSwipe';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

type Route = 'home' | 'login' | 'student' | 'owner' | 'roommate';
type UserRole = 'student' | 'owner' | 'roommate' | null;

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const { theme } = useApp();

  const handleLogin = (role: 'student' | 'owner' | 'roommate') => {
    setUserRole(role);
    if (role === 'student') setCurrentRoute('student');
    else if (role === 'owner') setCurrentRoute('owner');
    else if (role === 'roommate') setCurrentRoute('roommate');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentRoute('home');
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <LandingPage onNavigate={() => setCurrentRoute('login')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'student':
        return <StudentDashboard />;
      case 'owner':
        return <OwnerDashboard />;
      case 'roommate':
        return <RoommateSwipe />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation - only show when logged in */}
      {userRole && (
          <nav className={`shadow-md sticky top-0 z-40 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    AASHRAY
                  </span>
                  <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                    {userRole === 'student' ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        Student
                      </>
                    ) : userRole === 'owner' ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        Owner
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        Roommate
                      </>
                    )}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}

      {/* Page Content */}
      <main>{renderPage()}</main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
