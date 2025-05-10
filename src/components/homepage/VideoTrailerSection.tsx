"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function VideoTrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  return (    
    <section className="bg-aot-dark py-16 md:py-24 min-h-screen flex flex-col justify-center relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#FF4655]">Resmi</span> Fragman
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Attack on Titan'ın en etkileyici anlarını izleyin ve hikayenin derinliklerine dalın.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-800/50">
            {!isPlaying ? (
              <div className="relative aspect-video">
                <Image
                  src="/images/trailers/final-season-trailer.webp"
                  alt="Attack on Titan Fragman"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1018]/80 to-black/30"></div>
                  <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group focus:outline-none"
                  aria-label="Videoyu oynat"
                >
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-[#FF4655]/80 text-white backdrop-blur-sm shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF4655]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="absolute mt-24 text-white text-lg font-medium text-shadow">Fragmanı İzle</span>
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-black">
                <iframe
                  src="https://www.youtube.com/embed/MUCN-JwUvbY?autoplay=1"
                  title="Attack on Titan Final Season Trailer"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <div className="bg-[#0A1018] rounded-md px-4 py-2 flex items-center border border-gray-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm">Yayınlanma: 2023</span>
            </div>
            
            <div className="bg-[#0A1018] rounded-md px-4 py-2 flex items-center border border-gray-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="text-white text-sm">HD Kalite</span>
            </div>
            
            <div className="bg-[#0A1018] rounded-md px-4 py-2 flex items-center border border-gray-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF4655] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm">Son Sezon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}