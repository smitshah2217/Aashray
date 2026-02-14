import React from 'react';
import { useApp } from '../context/AppContext';

const SkeletonLoader: React.FC = () => {
  const { theme } = useApp();
  
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`h-48 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
      <div className="p-5">
        <div className={`h-6 rounded mb-3 w-3/4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-4 rounded mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className={`h-4 rounded mb-4 w-1/2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        <div className="flex gap-2 mb-4">
          <div className={`h-6 rounded-full w-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-6 rounded-full w-20 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
        <div className={`h-10 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
      </div>
    </div>
  );
};


export default SkeletonLoader;
