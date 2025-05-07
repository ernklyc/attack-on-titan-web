'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroBackgrounds = [
    {
      src: "/images/backgrounds/titan-bg.webp",
      title: "Attack on Titan",
      subtitle: "Keşfet, derinleşen gizem içindeki devlerin dünyasına dal ve insanlığın son kalesi içindeki karakterlerin hikayesini öğren."
    },
    {
      src: "/home_image/characters.jpg",
      title: "Karakterler",
      subtitle: "Eren Yeager, Mikasa Ackerman ve diğerlerinin özgürlük ve hayatta kalma mücadelesini keşfedin."
    },
    {
      src: "/home_image/titans.jpg",
      title: "Titanlar",
      subtitle: "İnsanlığı tehdit eden devasa titanların sırlarını ve güçlerini öğrenin."
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-rotate background slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Backgrounds with transitions */}
      {heroBackgrounds.map((bg, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={bg.src}
            alt={`Attack on Titan Background ${index + 1}`}
            fill
            priority
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/80 via-transparent to-[#0F1923]/80"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-0 sm:mt-10 md:mt-20">
        <div className={`max-w-3xl mx-auto md:mx-0 text-center md:text-left transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="mb-4 inline-block">
            <span className="px-4 py-1 border border-[#FF4655]/30 text-[#FF4655] rounded-full text-sm font-medium tracking-wider uppercase bg-[#0F1923]/50 backdrop-blur-sm">
              #1 Anime Serisi
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
            <span className="text-[#FF4655] inline-block transform hover:scale-105 transition-transform duration-500">{heroBackgrounds[currentSlide].title.split(' ')[0] || 'Attack'}</span>{' '}
            <span className="inline-block transform hover:scale-105 transition-transform duration-500">{heroBackgrounds[currentSlide].title.split(' ')[1] || 'on Titan'}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl md:mx-0 mx-auto">
            {heroBackgrounds[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <Link 
              href="/characters"
              className="px-8 py-4 bg-gradient-to-r from-[#FF4655] to-[#FF2238] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(255,70,85,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
            >
              <span className="flex items-center">
                Karakterleri Keşfet
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/titans"
              className="px-8 py-4 bg-[#0F1923]/50 backdrop-blur-sm border-2 border-white/30 text-white font-medium rounded-lg hover:border-[#FF4655]/50 hover:bg-[#FF4655]/10 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span className="flex items-center">
                Titanları İncele
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Slide indicators */}
          <div className="mt-10 flex justify-center md:justify-start space-x-3">
            {heroBackgrounds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-[#FF4655] w-12' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/3 right-10 xl:right-32 hidden md:block z-10">
        <div className="relative w-32 h-32 xl:w-40 xl:h-40 rounded-full border-2 border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4655]/10 to-transparent rounded-full"></div>
          <Link href="/titans" className="text-white text-xl font-bold">
            9 <span className="block text-sm text-[#FF4655]">TITAN</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-40 left-10 xl:left-32 hidden md:block z-10">
        <div className="relative w-24 h-24 xl:w-32 xl:h-32 rounded-full border-2 border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4655]/10 to-transparent rounded-full"></div>
          <Link href="/episodes" className="text-white text-lg font-bold">
            4 <span className="block text-sm text-[#FF4655]">SEZON</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator with animation */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}>
          <span className="text-gray-300 text-sm mb-2 tracking-wider font-medium">KEŞFET</span>
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-center justify-center relative">
            <span className="absolute w-1.5 h-1.5 bg-white rounded-full animate-scrollDown top-2"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;