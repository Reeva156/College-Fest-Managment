import React from 'react';

export default function Logo({ size = 'md', showTagline = true }) {
  const iconSizes = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      
      <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-2xl bg-gradient-to-tr from-[#B6001B] via-[#E60023] to-[#FF2E4D] flex items-center justify-center text-white font-black shadow-md group-hover:scale-105 group-hover:shadow-pin transition-all duration-300 ring-2 ring-white/50 overflow-hidden`}>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        <svg
          className="w-5 h-5 text-white drop-shadow-sm"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      
      <div className="text-left">
        <div className={`font-black tracking-tight leading-none text-zinc-900 group-hover:text-[#E60023] transition-colors flex items-center gap-1 ${textSizes[size] || textSizes.md}`}>
          <span>AURA</span>
          <span className="text-[11px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#E60023] text-white tracking-wider">
            '26
          </span>
        </div>
        {showTagline && (
          <span className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-0.5">
            Campus Fest
          </span>
        )}
      </div>
    </div>
  );
}
