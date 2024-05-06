import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 w-96">
        <div className="skeleton h-72 w-full"></div>
        <div className="skeleton h-4 w-72"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
