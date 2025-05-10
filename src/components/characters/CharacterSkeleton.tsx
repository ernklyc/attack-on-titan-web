import React from 'react';

export default function CharacterSkeleton() {
  return (
    <div className="relative transition-all duration-500 h-full">
      {/* Glass morphic tasarım için iskelet */}
      <div className="animate-pulse relative rounded-2xl overflow-hidden bg-[#0F1923]/30 backdrop-blur-xl border border-white/5 shadow-lg transition-all duration-500 h-full">
        
        {/* Shine efekti için iskelet */}
        <div className="absolute top-0 -right-40 w-40 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm transform -skew-x-12 animate-shimmer"></div>
        
        {/* Görsel konteyneri iskelet */}
        <div className="relative w-full aspect-[4/5] bg-[#0F1923]/40">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/80 via-[#0F1923]/20 to-transparent"></div>
        </div>
        
        {/* Status durumu için iskelet */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0F1923]/40 backdrop-blur-xl w-16 h-6 border border-white/5"></div>
        
        {/* Karakter türü için iskelet */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F1923]/40 backdrop-blur-xl w-20 h-6 border border-white/5"></div>
        
        {/* Karakter bilgileri için iskelet */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* İsim Alanı */}
          <div className="space-y-2 p-2 bg-[#0F1923]/20 backdrop-blur-lg rounded-lg border border-white/5">
            <div className="h-6 w-3/4 rounded bg-[#0F1923]/60"></div>
            <div className="h-4 w-1/2 rounded bg-[#0F1923]/60"></div>
          </div>
          
          {/* İnteraktif detay alanı */}
          <div className="mt-3 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 rounded bg-[#0F1923]/40"></div>
              <div className="h-7 w-7 rounded-full bg-[#0F1923]/40 flex items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gerekli animasyon keyframes'i globals.css'de olmalı:
// @keyframes shimmer {
//   0% { transform: translateX(-100%) skew(-12deg); }
//   100% { transform: translateX(200%) skew(-12deg); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }