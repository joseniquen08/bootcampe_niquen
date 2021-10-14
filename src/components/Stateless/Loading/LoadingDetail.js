import React from 'react';

const LoadingDetail = () => {
  return (
    <div className="w-full max-w-3xl py-16 mx-auto">
      <div className="w-full p-10 border border-gray-300 animate-pulse rounded-3xl shadow grid grid-cols-3 grid-rows-[auto,auto,1fr] gap-x-8">
        <div className="flex col-span-2 space-x-4">
          <div className="flex-1 py-1 pr-8 space-y-5 border-r border-gray-200">
            <div className="space-y-2">
              <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
              <div className="w-2/4 h-6 bg-gray-400 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded"></div>
              <div className="h-4 bg-gray-400 rounded"></div>
              <div className="h-4 bg-gray-400 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-2/6 h-4 bg-gray-400 rounded"></div>
              <div className="w-3/6 h-4 bg-gray-400 rounded"></div>
              <div className="w-3/6 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between col-span-1 space-y-4">
          <div className="space-y-2">
            <div className="w-5/6 h-5 bg-gray-400 rounded"></div>
            <div className="h-5 bg-gray-400 rounded"></div>
            <div className="w-1/2 h-5 bg-gray-400 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-row gap-x-2">
              <div className="w-5/6 bg-gray-400 rounded h-7"></div>
              <div className="w-1/6 bg-gray-400 rounded h-7"></div>
            </div>
            <div className="h-8 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingDetail;
