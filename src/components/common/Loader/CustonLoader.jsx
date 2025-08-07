import React from "react";


const CustomLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1F1C2C] via-[#928DAB] to-[#1F1C2C] text-white">
      {/* 3D Cube Loader */}
      <div className="relative w-24 h-24 cube-container animate-float-slow">
        <div className="cube animate-cube-spin"></div>
      </div>

      {/* Glowing Pulse Rings */}
      <div className="relative mt-8 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-[#FF6B6B] absolute animate-ping"></div>
        <div className="w-16 h-16 rounded-full border-4 border-[#6BCB77] absolute animate-ping delay-200"></div>
        <div className="w-8 h-8 rounded-full bg-[#FFD93D] shadow-lg animate-pulse z-10"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-10 text-lg font-semibold tracking-widest animate-fadein text-center">
        Hang tight... Magic is happening ✨
      </p>
    </div>
  );
};

export default CustomLoader;
