'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const VideoTrailerSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className={`mb-4 inline-block px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm border border-[#FF4655]/20 transition-all duration-1000 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <span className="text-sm font-medium text-white tracking-wide uppercase">Resmi Fragman</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mt-6 mb-4 transition-all duration-1000 delay-100 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <span className="relative inline-block">
              Animenin Dünyasına Hoş Geldiniz
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className={`text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mt-6 mb-12 transition-all duration-1000 delay-200 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            Attack on Titan'ın resmi fragmanını izleyin ve bu epik hikayeye dalın.
          </p>
          
          <div className="h-px w-24 mx-auto bg-[#FF4655]/30 mt-10 mb-16"></div>
        </div>
        
        {/* Video Trailer Card - Enhanced */}
        <div className={`relative mx-auto max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 group transition-all duration-1000 delay-300 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-28 h-28 border-b-2 border-r-2 border-[#FF4655]/30 rounded-br-3xl z-10"></div>
          <div className="absolute -top-6 -left-6 w-28 h-28 border-t-2 border-l-2 border-[#FF4655]/30 rounded-tl-3xl z-10"></div>
          
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image 
              src="/home_image/highlights.jpg"
              alt="Attack on Titan Season 4 Trailer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60"></div>
            
            {/* Play Button - Enhanced */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative w-24 h-24 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full bg-[#FF4655]/20 animate-ping opacity-75"></div>
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF4655] to-[#FF2238] rounded-full flex items-center justify-center shadow-lg shadow-[#FF4655]/30">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-8 text-white z-10">
                <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white text-sm font-semibold rounded-md shadow-lg">
                  Final Sezon
                </span>
                <h4 className="text-3xl font-bold mt-3 drop-shadow-lg group-hover:text-[#FF4655] transition-colors">
                  Attack on Titan: Final Season
                </h4>
                <div className="h-1 w-16 bg-white/50 mt-3 group-hover:bg-[#FF4655] transition-colors"></div>
              </div>
              
              <div className="absolute bottom-8 right-8 text-white z-10 flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-4 h-4 text-[#FF4655]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-medium">2:45</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Watch Now Button */}
        <div className={`text-center mt-10 transition-all duration-1000 delay-500 transform ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-transparent border border-white/20 rounded-lg text-white hover:bg-[#FF4655]/10 hover:border-[#FF4655] transition-all duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 text-[#FF4655]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">Fragmanı İzle</span>
          </button>
        </div>
      </div>
      
      {/* Video Modal - Enhanced */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-6xl aspect-w-16 aspect-h-9">
            <div className="absolute -top-12 right-0 flex items-center mb-4">
              <span className="mr-4 text-white/70 text-sm">Attack on Titan Final Season</span>
              <button 
                className="w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FF4655] transition-colors duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <iframe
              src="https://www.youtube.com/embed/SlNpRThS9t8?autoplay=1"
              title="Attack on Titan Season 4 Trailer"
              className="w-full h-full border-0 rounded-xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoTrailerSection;