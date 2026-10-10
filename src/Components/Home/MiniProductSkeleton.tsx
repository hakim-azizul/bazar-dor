import React from "react";

const MiniProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full animate-pulse flex flex-col justify-between min-h-[140px]">

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl shrink-0"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          <div className="h-3 bg-gray-100 rounded-md w-1/3"></div>
        </div>
      </div>

      <div className="border-t border-gray-50 my-4 w-full"></div>

      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-100 rounded-md w-16"></div>
          <div className="h-5 bg-gray-200 rounded-md w-24"></div>
        </div>
        <div className="h-7 w-16 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MiniProductSkeleton;