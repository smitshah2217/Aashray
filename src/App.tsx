import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import RoommateSwipe from './pages/RoommateSwipe';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DemoBanner from './components/DemoBanner';

type Route = 'home' | 'login' | 'student' | 'owner' | 'roommate';
type UserRole = 'student' | 'owner' | 'roommate' | null;

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
    <AppProvider>
      <div className="min-h-screen">
        {/* Demo Banner - only show when logged in */}
        {userRole && <DemoBanner />}
        
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
                  <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                    {userRole === 'student' ? '🎓 Student' : userRole === 'owner' ? '🏢 Owner' : '👥 Roommate'}
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
    </AppProvider>
  );
}

export default App;
