import React from 'react';

const LoadingFavorites = () => {
  return (
    <div className="w-full py-2 mx-auto">
      <div className="w-full p-4 border border-gray-300 shadow rounded-3xl">
        <div className="flex animate-pulse">
          <div className="flex-1 py-1 space-y-6">
            <div className="space-y-2">
              <div className="h-5 bg-gray-400 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-400 rounded"></div>
              <div className="h-6 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingFavorites;