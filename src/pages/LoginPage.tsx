import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (role: 'student' | 'owner' | 'roommate') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dummyUsers = [
    { email: 'student@aashray.com', password: 'student123', role: 'student' as const, name: 'Student User' },
    { email: 'owner@aashray.com', password: 'owner123', role: 'owner' as const, name: 'Property Owner' },
    { email: 'roommate@aashray.com', password: 'roommate123', role: 'roommate' as const, name: 'Roommate Seeker' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user.role);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleQuickLogin = (role: 'student' | 'owner' | 'roommate') => {
  const user = dummyUsers.find(u => u.role === role);
  if (user) {
    setEmail(user.email);
    setPassword(user.password);
    setError('');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl">
              A
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              AASHRAY
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Safe Student Housing Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Continue</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>

        {/* Quick Login Options */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Quick Login (Demo)</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => handleQuickLogin('student')}
              className="w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl hover:border-amber-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎓</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Student</div>
                  <div className="text-xs text-gray-600">student@aashray.com / student123</div>
                </div>
                <div className="text-amber-600">→</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('owner')}
              className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🏢</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Property Owner</div>
                  <div className="text-xs text-gray-600">owner@aashray.com / owner123</div>
                </div>
                <div className="text-blue-600">→</div>
              </div>
            </button>

            {/* <button
              onClick={() => handleQuickLogin('roommate')}
              className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">👥</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Roommate Seeker</div>
                  <div className="text-xs text-gray-600">roommate@aashray.com / roommate123</div>
                </div>
                <div className="text-purple-600">→</div>
              </div>
            </button> */}
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 text-center text-sm text-gray-600 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <p>💡 Use Quick Login for instant access or enter credentials above</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
