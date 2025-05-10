'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type VideoItem = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  season: number;
};

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Attack on Titan Final Sezon Resmi Fragmanı",
    description: "Attack on Titan'ın final sezonunun resmi fragmanı. İnsanlığın kaderini değiştirecek son savaş yaklaşıyor.",
    thumbnailUrl: "/images/videos/trailer-1.jpg",
    videoUrl: "https://www.youtube.com/embed/SlNpRThS9t8",
    duration: "2:25",
    season: 4
  },
  {
    id: 2,
    title: "Eren vs Reiner: Büyük Titan Savaşı",
    description: "Saldırı Titanı ile Zırhlı Titan arasındaki destansı mücadele. Shiganshina Bölgesi'ndeki savaştan önemli anlar.",
    thumbnailUrl: "/images/videos/trailer-2.jpg",
    videoUrl: "https://www.youtube.com/embed/frMmgiUEpQk",
    duration: "3:47",
    season: 3
  },
  {
    id: 3,
    title: "Levi vs Beast Titan: Efsanevi Dövüş",
    description: "İnsanlığın en güçlü askeri Levi'nin, Beast Titan'a karşı gösterdiği olağanüstü performans.",
    thumbnailUrl: "/images/videos/trailer-3.jpg",
    videoUrl: "https://www.youtube.com/embed/WjiCS5Zj1hM",
    duration: "4:12",
    season: 3
  },
  {
    id: 4,
    title: "Mikasa Ackerman: Savaş Yetenekleri Gösterisi",
    description: "Mikasa'nın eşsiz savaş yeteneklerini ve Ackerman gücünü sergilediği en etkileyici sahneler.",
    thumbnailUrl: "/images/videos/trailer-4.jpg",
    videoUrl: "https://www.youtube.com/embed/dlwFWDd0lHE",
    duration: "3:18",
    season: 2
  }
];

export default function VideoTrailerSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videoData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Video değiştiğinde oynatma durumunu sıfırla
    setIsPlaying(false);
  }, [activeVideo]);
  
  const handleVideoSelect = (video: VideoItem) => {
    setActiveVideo(video);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // YouTube iframesi ile iletişim
    if (videoRef.current && videoRef.current.contentWindow) {
      if (!isPlaying) {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0F1923] to-[#0A111A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/images/texture-bg.png')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Video <span className="text-red-500">Fragmanlar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Attack on Titan'ın en etkileyici fragmanları ve unutulmaz savaş sahneleri. Hikayenin kilit anlarına tanık olun.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Video Listesi */}
          <div className="md:col-span-1 order-2 md:order-1">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-5 bg-red-500 rounded-full mr-2 inline-block"></span>
              Öne Çıkan Videolar
            </h3>
            
            <div className="space-y-4">
              {videoData.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`
                    flex items-center bg-gray-900/60 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-300
                    ${activeVideo.id === video.id 
                      ? 'border-l-4 border-red-500 shadow-lg shadow-red-500/10' 
                      : 'border-l-4 border-transparent hover:border-gray-700'}
                  `}
                >
                  <div className="relative w-24 h-16 flex-shrink-0">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-white text-sm font-medium line-clamp-1">{video.title}</h4>
                    <p className="text-gray-400 text-xs mt-1">Sezon {video.season}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-gray-800 hover:bg-red-500 text-gray-300 hover:text-white py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center">
                <span>Tüm Videoları Göster</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Ana Video Oynatıcı */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
              <div className="aspect-video relative">
                {!isPlaying && (
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={activeVideo.thumbnailUrl}
                      alt={activeVideo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button 
                        onClick={handlePlayPause}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                
                <iframe
                  ref={videoRef}
                  src={`${activeVideo.videoUrl}?enablejsapi=1&controls=1&showinfo=0&rel=0&modestbranding=1`}
                  className={`absolute inset-0 w-full h-full ${!isPlaying ? 'opacity-0' : 'opacity-100'}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-5">
                <h3 className="text-white text-xl font-semibold mb-2">{activeVideo.title}</h3>
                <p className="text-gray-400 text-sm">{activeVideo.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-500 text-xs">Sezon {activeVideo.season}</span>
                  
                  <div className="flex gap-2">
                    <button className="bg-gray-800 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="bg-gray-800 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-gray-800 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 