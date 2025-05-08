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
    // IntersectionObserver ile section görünür olduğunda animasyonları tetikle
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
    <section ref={sectionRef} className="relative py-24 bg-[#0F1923] overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F1923] bg-opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A121A] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A121A] to-transparent"></div>
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#FF4655]/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-blue-900/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bölüm başlık */}
        <div className="text-center mb-16">
          <div className="reveal mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm text-xs font-medium text-white tracking-wide uppercase border border-[#FF4655]/20">
              Kronoloji
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 reveal reveal-delay-100">
            <span className="relative inline-block">
              Hikayenin Zaman Çizelgesi
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6 reveal reveal-delay-200">
            Attack on Titan evrenindeki önemli olaylar ve dönüm noktaları
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 border-l-2 border-white/10 h-full"></div>
            
            <div className="grid grid-cols-1 gap-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={`timeline-${index}`}
                  className={`relative ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} md:w-[calc(50%-50px)] ${isInView ? 'reveal' : ''} ${isInView ? `reveal-delay-${(index % 4) * 100 + 100}` : ''}`}
                >
                  <div 
                    className={`relative border border-white/10 rounded-xl bg-gradient-to-br from-[#131E2A]/90 to-[#0F1923]/90 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-[#FF4655]/5 hover:border-[#FF4655]/20 transition-all duration-300 cursor-pointer`}
                    onClick={() => setActiveEvent(index)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 bg-[#FF4655]/80 text-white text-sm font-bold px-3 py-1 rounded">
                        {event.year}
                      </div>
                      
                      {/* Timeline connector - Only for desktop */}
                      <div className="absolute top-1/2 transform -translate-y-1/2 hidden md:block">
                        <div 
                          className={`${index % 2 === 0 ? '-left-[50px]' : '-right-[50px]'} absolute w-[50px] border-t-2 border-white/10`}
                        ></div>
                        <div 
                          className={`${index % 2 === 0 ? '-left-[58px]' : '-right-[58px]'} absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#FF4655] rounded-full border-4 border-[#0F1923]`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm">
                        {event.description}
                      </p>
                      
                      <button 
                        className={`mt-4 text-[#FF4655] text-sm font-medium flex items-center ${activeEvent === index ? 'underline' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveEvent(index);
                        }}
                      >
                        <span>Detayları Gör</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom action */}
            <div className="mt-16 text-center reveal">
              <Link
                href="/episodes"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-lg hover:bg-[#FF4655]/10 hover:border-[#FF4655]/50 transition-all duration-300 font-medium"
              >
                Tüm Bölümleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Active Event Detailed View */}
      {activeEvent !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setActiveEvent(null)}
        >
          <div 
            className="bg-[#131E2A] border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full max-h-[80vh] shadow-2xl transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image
                src={activeEvent !== null ? timelineEvents[activeEvent].image : ''}
                alt={activeEvent !== null ? timelineEvents[activeEvent].title : ''}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131E2A] via-[#131E2A]/70 to-transparent"></div>
              
              <div className="absolute top-4 left-4 px-4 py-1 bg-[#FF4655] text-white text-sm font-bold rounded">
                YIL {activeEvent !== null ? timelineEvents[activeEvent].year : ''}
              </div>
              
              <button 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-[#FF4655] transition-colors duration-300"
                onClick={() => setActiveEvent(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {activeEvent !== null ? timelineEvents[activeEvent].title : ''}
              </h2>
              <p className="text-gray-300 mb-6">
                {activeEvent !== null ? timelineEvents[activeEvent].description : ''}
              </p>
              <div className="flex justify-between">
                <button 
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                  onClick={() => {
                    if (activeEvent !== null) {
                      setActiveEvent((activeEvent - 1 + timelineEvents.length) % timelineEvents.length);
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Önceki
                </button>
                
                <button 
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                  onClick={() => {
                    if (activeEvent !== null) {
                      setActiveEvent((activeEvent + 1) % timelineEvents.length);
                    }
                  }}
                >
                  Sonraki
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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