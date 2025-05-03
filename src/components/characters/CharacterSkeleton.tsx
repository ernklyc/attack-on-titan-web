import React from 'react';

const CharacterSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-800/80 rounded-xl overflow-hidden shadow-lg h-[380px]">
      {/* Image area skeleton */}
      <div className="h-56 bg-gray-700/50"></div>
      
      {/* Content area skeleton */}
      <div className="p-5 flex flex-col h-[148px]">
        {/* Name skeleton */}
        <div className="h-7 bg-gray-700/70 rounded-md w-3/4 mb-3"></div>
        
        {/* Species skeleton */}
        <div className="h-5 bg-gray-700/50 rounded-md w-1/2 mb-3"></div>
        
        {/* Alias skeleton */}
        <div className="h-4 bg-gray-700/30 rounded-md w-4/5 mb-auto"></div>
        
        {/* Button skeleton */}
        <div className="mt-auto h-10 bg-red-900/30 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default CharacterSkeleton;