import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
