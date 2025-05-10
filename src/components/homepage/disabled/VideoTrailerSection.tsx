"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function VideoTrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Video kontrolleri
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  const handleCloseVideo = () => {
    setIsPlaying(false);
  };
  
  return (
    <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#0F1923]/10 via-[#1A242D]/5 to-[#0F1923]/10 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="mb-10 text-center backdrop-blur-xl bg-[#0F1923]/20 p-6 rounded-xl border border-white/10 shadow-lg max-w-3xl mx-auto hover:border-white/20 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#FF4655]">Final Sezon</span> Fragmanı
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Attack on Titan'ın final sezonunun fragmanını izleyin.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0F1923]/20 backdrop-blur-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:scale-[1.01] hover:border-white/20">
            {!isPlaying ? (
              <div className="relative aspect-video">
                <Image
                  src="/images/trailers/final-season-trailer.webp"
                  alt="Attack on Titan Fragman"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/90 via-[#0F1923]/50 to-[#0F1923]/30"></div>
                <div className="absolute inset-0 bg-[#0F1923]/10 backdrop-blur-md opacity-30 hover:opacity-20 transition-opacity duration-300"></div>
                
                {/* Play Button */}
                <button
                  onClick={handlePlayVideo}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FF4655]/30 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-[#FF4655]/50 transition-all duration-300 border border-[#FF4655]/30 hover:border-[#FF4655]/60 hover:scale-110"
                  aria-label="Play Video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Video Title Overlay */}
                <div className="absolute bottom-8 left-8">
                  <div className="bg-[#0F1923]/30 backdrop-blur-xl px-6 py-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-1 w-10 bg-[#FF4655]"></div>
                      <span className="text-xs font-medium uppercase tracking-wider text-white/70">Official Trailer</span>
                    </div>
                    <h4 className="text-white font-bold text-2xl">Attack on Titan Final Season</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/SlNpRThS9t8?autoplay=1"
                  title="Attack on Titan Final Season"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Close Button */}
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#0F1923]/30 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-[#FF4655]/20 transition-all duration-300 text-white"
                  aria-label="Close Video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="bg-[#0F1923]/20 backdrop-blur-xl rounded-lg px-5 py-3 flex items-center border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-medium">Yayınlanma: 2023</span>
            </div>
            
            <div className="bg-[#0F1923]/20 backdrop-blur-xl rounded-lg px-5 py-3 flex items-center border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="text-white text-sm font-medium">HD Kalite</span>
            </div>
            
            <div className="bg-[#0F1923]/20 backdrop-blur-xl rounded-lg px-5 py-3 flex items-center border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-medium">Subbed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}