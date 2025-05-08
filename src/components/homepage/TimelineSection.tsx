'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<number | null>(0);
  const [isInView, setIsInView] = useState(false);
  
  const timelineEvents = [
    {
      year: "845",
      title: "Maria Duvarının Düşüşü",
      description: "Colossal Titan Maria duvarını yıkar ve insanlık tarihindeki en büyük titan saldırısı başlar.",
      image: "/home_image/titans.jpg"
    },
    {
      year: "850",
      title: "Trost Bölgesi Saldırısı",
      description: "Eren ilk kez Titan formuna dönüşür ve Trost Bölgesini Titanların işgalinden kurtarır.",
      image: "/home_image/characters.jpg"
    },
    {
      year: "850",
      title: "Kadın Titan Operasyonu",
      description: "Keşif Birliği 57. sefer görevi sırasında Kadın Titan ile karşılaşır ve büyük kayıplar verir.",
      image: "/home_image/episodes.jpg"
    },
    {
      year: "850",
      title: "Utgard Kalesi Savunması",
      description: "Keşif Birliği üyeleri Utgard Kalesinde Titanlar tarafından kuşatılır ve büyük bir mücadele verir.",
      image: "/home_image/titans.jpg"
    },
    {
      year: "850",
      title: "Historia'nın Gerçek Kimliği",
      description: "Historia Reiss'in kraliyet ailesinin gerçek varisi olduğu ortaya çıkar ve tahtın gerçek sahibi olduğu anlaşılır.",
      image: "/home_image/highlights.jpg"
    },
    {
      year: "851",
      title: "Denize Ulaşma",
      description: "Keşif Birliği ilk kez duvarların dışındaki denize ulaşır ve yeni bir dönemin başlangıcını yapar.",
      image: "/home_image/episodes.jpg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bölüm başlık - Enhanced */}
        <div className="text-center mb-20">
          <div className="reveal mb-4">
            <span className="px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm text-sm font-medium text-white tracking-wide uppercase border border-[#FF4655]/20">
              Kronoloji
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-4 reveal reveal-delay-100">
            <span className="relative inline-block">
              Hikayenin Zaman Çizelgesi
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mt-6 reveal reveal-delay-200">
            Attack on Titan evrenindeki önemli olaylar ve dönüm noktaları
          </p>
          
          <div className="h-px w-24 mx-auto bg-[#FF4655]/30 mt-10"></div>
        </div>

        {/* Timeline - Enhanced */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Timeline center line with pulsing dots */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
              <div className="w-px h-full bg-gradient-to-b from-[#FF4655]/30 via-white/20 to-[#FF4655]/30"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#FF4655]/20">
                  <div className="w-2 h-2 rounded-full bg-[#FF4655] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#FF4655]/20">
                  <div className="w-2 h-2 rounded-full bg-[#FF4655] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-14">
              {timelineEvents.map((event, index) => (
                <div 
                  key={`timeline-${index}`}
                  className={`relative ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} md:w-[calc(50%-40px)] ${isInView ? 'reveal' : ''} ${isInView ? `reveal-delay-${(index % 6) * 100 + 100}` : ''}`}
                >
                  <div 
                    className={`relative border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-[#FF4655]/5 hover:border-[#FF4655]/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer group`}
                    onClick={() => setActiveEvent(index)}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      
                      {/* Year Badge - Enhanced */}
                      <div className="absolute top-4 right-4 bg-[#FF4655] text-white text-sm font-bold px-4 py-1.5 rounded shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                        {event.year}
                      </div>
                      
                      {/* Timeline connector - Improved for desktop */}
                      <div className="absolute top-1/2 transform -translate-y-1/2 hidden md:block">
                        <div 
                          className={`${index % 2 === 0 ? '-left-[40px]' : '-right-[40px]'} absolute w-[40px] h-px bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-transparent to-[#FF4655]/50`}
                        ></div>
                        <div 
                          className={`${index % 2 === 0 ? '-left-[46px]' : '-right-[46px]'} absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#FF4655] bg-black group-hover:bg-[#FF4655] transition-colors duration-300`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-black/30">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF4655] transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm">
                        {event.description}
                      </p>
                      
                      <button 
                        className={`mt-5 text-[#FF4655] text-sm font-medium flex items-center ${activeEvent === index ? 'underline' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveEvent(index);
                        }}
                      >
                        <span>Detayları Gör</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom action - Enhanced */}
            <div className="mt-20 text-center reveal">
              <Link
                href="/episodes"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 font-medium"
              >
                Tüm Bölümleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Active Event Detailed View - Enhanced */}
      {activeEvent !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveEvent(null)}
        >
          <div 
            className="bg-black/80 border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full max-h-[80vh] shadow-2xl transform transition-all duration-300 hover:border-[#FF4655]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80">
              <Image
                src={activeEvent !== null ? timelineEvents[activeEvent].image : ''}
                alt={activeEvent !== null ? timelineEvents[activeEvent].title : ''}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#FF4655] text-white text-sm font-bold rounded shadow-lg">
                YIL {activeEvent !== null ? timelineEvents[activeEvent].year : ''}
              </div>
              
              <button 
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-[#FF4655] transition-colors duration-300"
                onClick={() => setActiveEvent(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {activeEvent !== null ? timelineEvents[activeEvent].title : ''}
                </h2>
                <div className="h-1 w-20 bg-[#FF4655]"></div>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-300 text-lg mb-8">
                {activeEvent !== null ? timelineEvents[activeEvent].description : ''}
              </p>
              <div className="flex justify-between">
                <button 
                  className="text-white/70 hover:text-[#FF4655] transition-colors flex items-center group"
                  onClick={() => {
                    if (activeEvent !== null) {
                      setActiveEvent((activeEvent - 1 + timelineEvents.length) % timelineEvents.length);
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Önceki Olay
                </button>
                
                <button 
                  className="text-white/70 hover:text-[#FF4655] transition-colors flex items-center group"
                  onClick={() => {
                    if (activeEvent !== null) {
                      setActiveEvent((activeEvent + 1) % timelineEvents.length);
                    }
                  }}
                >
                  Sonraki Olay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimelineSection;