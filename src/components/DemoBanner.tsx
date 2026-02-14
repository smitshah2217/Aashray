import React from 'react';

const DemoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
        <span className="font-semibold">🎯 DEMO MODE:</span>
        <span>Real-time sync enabled • Owner actions instantly update Student view • Try toggling amenities or marking rent as paid!</span>
      </div>
    </div>
  );
};

export default DemoBanner;
