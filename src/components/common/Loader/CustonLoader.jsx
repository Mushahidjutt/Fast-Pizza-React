import React from "react";

const CustomLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
      {/* M Shape Loader */}
      <div className="flex items-end space-x-1 h-8">
        <div className="w-1.5 h-full bg-white animate-bounce"></div>
        <div className="w-1.5 h-6 bg-white animate-bounce [animation-delay:0.15s]"></div>
        <div className="w-1.5 h-full bg-white animate-bounce [animation-delay:0.3s]"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default CustomLoader;
