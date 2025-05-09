'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-aot-dark">
      {/* Arka plan efekti */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: 'url(/images/backgrounds/titan-bg.webp)',
            filter: 'blur(3px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0F1923]/85 to-[#0F1923]" />
      </div>

      {/* Dekoratif parçacıklar */}
      <div className={`absolute top-1/4 left-1/5 w-72 h-72 particle particle-red transition-opacity duration-2000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 particle particle-blue transition-opacity duration-2000 delay-300 ${isLoaded ? 'opacity-60' : 'opacity-0'}`}></div>
      <div className={`absolute top-1/3 right-1/3 w-48 h-48 particle particle-white transition-opacity duration-2000 delay-500 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Sol içerik */}
          <div className="w-full lg:w-1/2 max-w-2xl">
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                <span className="block relative">
                  Attack <span className="text-[#FF4655]">on Titan</span>
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#FF4655]"></div>
                </span>
                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl opacity-90">Özgürlük Arayışı</span>
              </h1>
              
              <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-xl">
                İnsanlığın son kalesi duvarların ardında süren yaşam, devasa Titanların tehdidiyle karşı karşıya. Özgürlük mücadelesi başlıyor.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link 
                  href="/characters" 
                  className="px-8 py-3 bg-gradient-to-r from-[#FF4655] to-[#FF2238] text-white font-medium rounded-md hover:shadow-lg hover:shadow-[#FF4655]/30 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Karakterleri Keşfet
                </Link>
                
                <Link 
                  href="/titans" 
                  className="px-8 py-3 bg-transparent border-2 border-[#FF4655] text-[#FF4655] font-medium rounded-md hover:bg-[#FF4655]/10 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Titanlar Hakkında
                </Link>
              </div>
              
              {/* İstatistikler */}
              <div className="mt-16 grid grid-cols-3 gap-6">
                <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <div className="text-3xl md:text-4xl font-bold text-white">4</div>
                  <div className="text-sm text-gray-400 mt-1">Sezon</div>
                </div>
                
                <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <div className="text-3xl md:text-4xl font-bold text-white">86+</div>
                  <div className="text-sm text-gray-400 mt-1">Bölüm</div>
                </div>
                
                <div className={`transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <div className="text-3xl md:text-4xl font-bold text-white">9+</div>
                  <div className="text-sm text-gray-400 mt-1">Titan Türü</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ görsel */}
          <div className="w-full lg:w-1/2 relative">
            <div 
              className={`relative z-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                filter: 'drop-shadow(0 25px 25px rgba(15, 25, 35, 0.5))'
              }}
            >
              <div className="aspect-[3/4] w-full max-w-lg mx-auto relative">
                <Image
                  src="/home_image/characters.jpg"
                  alt="Attack on Titan Karakterleri"
                  fill
                  priority
                  className="rounded-md object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
            </div>
            
            {/* Görsel etrafındaki dekoratif elementler */}
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t-2 border-l-2 border-[#FF4655] opacity-30"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-2 border-r-2 border-[#FF4655] opacity-30"></div>
            
            <div className="absolute top-1/4 -right-6 w-12 h-12 rounded-full bg-blue-500/10 filter blur-md"></div>
            <div className="absolute bottom-1/4 -left-6 w-16 h-16 rounded-full bg-[#FF4655]/10 filter blur-md"></div>
          </div>
        </div>
      </div>
      
      {/* Aşağı ok */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className={`w-0.5 h-16 bg-gradient-to-b from-white/0 to-white/30 transition-opacity duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`mt-2 animate-bounce transition-opacity duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;