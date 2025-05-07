'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const VideoTrailerSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-32 bg-[#0F1923] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A121A] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A121A] to-transparent"></div>
        <div className="absolute -top-20 right-0 w-96 h-96 bg-[#FF4655]/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute -bottom-32 left-20 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full filter blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm mb-4 border border-[#FF4655]/20">
            <span className="text-xs font-medium text-white tracking-wide uppercase">Resmi Fragman</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            <span className="relative inline-block">
              Animenin Dünyasına Hoş Geldiniz
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6 mb-12">
            Attack on Titan'ın resmi fragmanını izleyin ve bu epik hikayeye dalın.
          </p>
        </div>
        
        {/* Video Trailer Card */}
        <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image 
              src="/home_image/highlights.jpg"
              alt="Attack on Titan Season 4 Trailer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/30 via-transparent to-[#0F1923]/70"></div>
            
            {/* Play Button */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF4655] to-[#FF2238] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-3 py-1 bg-[#FF4655]/60 text-white text-xs font-semibold rounded-md">
                  Final Sezon
                </span>
                <h4 className="text-2xl font-bold mt-2 drop-shadow-lg">
                  Attack on Titan: Final Season
                </h4>
              </div>
              
              <div className="absolute bottom-6 right-6 text-white flex items-center space-x-1">
                <span className="text-sm font-medium">2:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-6xl aspect-w-16 aspect-h-9">
            <div className="absolute top-4 right-4">
              <button 
                className="w-10 h-10 bg-[#FF4655] rounded-full flex items-center justify-center text-white"
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
              className="w-full h-full"
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