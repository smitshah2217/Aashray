import React, { useState } from 'react';
import { RoommateProfile } from '../types';
import { useApp } from '../context/AppContext';

interface RoommateCardProps {
  profile: RoommateProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ profile, onSwipe, style }) => {
  const { theme } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragX) > 100) {
      onSwipe(dragX > 0 ? 'right' : 'left');
    }
    setDragX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragX) > 100) {
      onSwipe(dragX > 0 ? 'right' : 'left');
    }
    setDragX(0);
  };

  const rotation = dragX / 20;
  const opacity = 1 - Math.abs(dragX) / 400;

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Profile Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-lg font-bold text-green-600">
              {profile.compatibility}% Match
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 flex-1 overflow-auto">
          <h3 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {profile.name}, {profile.age}
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {profile.course} • Year {profile.year}
          </p>

          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{profile.bio}</p>

          {/* Habits */}
          <div className="mb-4">
            <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Habits & Lifestyle</h4>
            <div className="flex flex-wrap gap-2">
              {profile.habits.map((habit, index) => {
                // Determine habit icon and color
                const getHabitStyle = (habit: string) => {
                  if (habit.includes('Early')) return { icon: '🌅', color: 'from-yellow-50 to-orange-50 text-orange-700' };
                  if (habit.includes('Night')) return { icon: '🌙', color: 'from-indigo-50 to-purple-50 text-purple-700' };
                  if (habit.includes('Clean') || habit.includes('Organized')) return { icon: '✨', color: 'from-green-50 to-emerald-50 text-green-700' };
                  if (habit.includes('Party') || habit.includes('Social')) return { icon: '🎉', color: 'from-pink-50 to-rose-50 text-pink-700' };
                  if (habit.includes('Fitness') || habit.includes('Sports')) return { icon: '💪', color: 'from-blue-50 to-cyan-50 text-blue-700' };
                  if (habit.includes('Quiet')) return { icon: '🤫', color: 'from-gray-50 to-slate-50 text-gray-700' };
                  return { icon: '⭐', color: 'from-amber-50 to-orange-50 text-amber-700' };
                };
                const style = getHabitStyle(habit);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gradient-to-r ${style.color} rounded-full text-sm font-medium flex items-center gap-1`}
                  >
                    <span>{style.icon}</span>
                    {habit}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Study Style */}
          <div className="mb-4">
            <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Study Style
            </h4>
            <span className={`inline-block px-4 py-2 rounded-xl font-medium ${
              profile.studyStyle === 'Morning Person' ? 'bg-yellow-50 text-yellow-700' :
              profile.studyStyle === 'Night Owl' ? 'bg-indigo-50 text-indigo-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {profile.studyStyle === 'Morning Person' && '🌅 '}
              {profile.studyStyle === 'Night Owl' && '🌙 '}
              {profile.studyStyle === 'Flexible' && '⚡ '}
              {profile.studyStyle}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Cleanliness
              </h4>
              <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${profile.cleanliness}%` }}
                />
              </div>
            </div>
            <div>
              <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Social Level
              </h4>
              <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                  style={{ width: `${profile.socialLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Indicators */}
        {dragX !== 0 && (
          <>
            {dragX > 0 && (
              <div className="absolute top-20 left-8 text-6xl transform rotate-12 opacity-70">
                💚
              </div>
            )}
            {dragX < 0 && (
              <div className="absolute top-20 right-8 text-6xl transform -rotate-12 opacity-70">
                ❌
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RoommateCard;
