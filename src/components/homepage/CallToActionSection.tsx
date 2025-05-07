'use client';

import React from 'react';
import Link from 'next/link';

const CallToActionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A121A] to-[#0F1923] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[#FF4655]/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#0A121A] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#131E2A]/80 to-[#0F1923]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FF4655]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FF4655]/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Attack on Titan evrenini keşfetmeye başla
            </h2>
            
            <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
              Karakterler, titanlar ve Attack on Titan'ın sırları hakkında her şeyi öğrenin. Evreni keşfetmeye hazır mısınız?
            </p>
            
            <Link 
              href="/characters"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF4655] to-[#FF2238] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">Şimdi Keşfet</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;