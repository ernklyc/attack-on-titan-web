'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const featuredTabs = [
    {
      id: 'world',
      title: 'Dünya',
      description: 'Üç duvar arasında yaşayan insanlık, dışarıdaki dev titanlardan korunmak için yüzlerce yıldır bu duvarlara sığınıyor. Ancak duvarların ardında çok daha büyük sırlar ve gerçekler gizleniyor...',
      image: '/home_image/highlights.jpg',
      link: '/organizations',
      linkText: 'Duvarları Keşfet'
    },
    {
      id: 'scouts',
      title: 'Keşif Birliği',
      description: 'İnsanlığın en cesur savaşçıları, duvarların ötesindeki dünyayı keşfetmek ve titanlar hakkında bilgi toplamak için hayatlarını riske atan elit bir birlik. Kahramanlık ve fedakarlık hikayeleriyle tanınırlar.',
      image: '/home_image/characters.jpg',
      link: '/organizations',
      linkText: 'Organizasyonlar'
    },
    {
      id: 'enemies',
      title: 'Gizli Düşmanlar',
      description: 'İnsanlık, yıllarca sadece titanların tehdidi altında olduğunu sanıyordu. Ancak asıl düşmanlar, duvarların içinde gizli bir şekilde yaşayan ve tüm gerçekleri saklayan kişiler olabilir...',
      image: '/home_image/titans.jpg',
      link: '/characters',
      linkText: 'Karakterleri İncele'
    }
  ];
  
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

  useEffect(() => {
    // Auto rotate tabs every 8 seconds
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % featuredTabs.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredTabs.length]);

  return (
    <section ref={sectionRef} className="py-24 relative bg-aot-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="mb-4 inline-block px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm border border-[#FF4655]/20">
            <span className="text-sm font-medium text-white tracking-wide uppercase">Öne Çıkanlar</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-4">
            <span className="relative inline-block">
              Attack on Titan Evreni
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mt-6">
            Attack on Titan evreninin öne çıkan detaylarını ve hikayelerini keşfedin
          </p>
          
          <div className="h-px w-24 mx-auto bg-[#FF4655]/30 mt-10"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation - Enhanced */}
          <div 
            className={`flex justify-center mb-10 transition-all duration-1000 transform ${
              isInView ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="inline-flex rounded-xl p-1.5 border border-white/10 bg-black/20 backdrop-blur-md shadow-xl">
              {featuredTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content - Improved Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image - Enhanced Position */}
            <div 
              className={`lg:col-span-7 order-1 transition-all duration-1000 transform ${
                isInView ? 'translate-x-0 opacity-100 delay-500' : '-translate-x-12 opacity-0'
              }`}
            >
              <div className="relative">
                {featuredTabs.map((tab, index) => (
                  <div 
                    key={tab.id} 
                    className={`transition-all duration-700 ease-in-out ${
                      activeTab === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                    }`}
                  >
                    <div className="overflow-hidden relative rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 transform hover:scale-[1.02]">
                      <div className="aspect-w-16 aspect-h-9 relative h-[500px]">
                        <Image
                          src={tab.image}
                          alt={tab.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-28 h-28 border-b-2 border-r-2 border-[#FF4655]/30 rounded-br-3xl z-10"></div>
                        <div className="absolute -top-6 -left-6 w-28 h-28 border-t-2 border-l-2 border-[#FF4655]/30 rounded-tl-3xl z-10"></div>
                        
                        <div className="absolute bottom-8 left-8 z-20">
                          <div className="bg-black/50 backdrop-blur-md px-6 py-4 rounded-lg border border-white/10">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="h-1 w-10 bg-[#FF4655]"></div>
                              <span className="text-xs font-medium uppercase tracking-wider text-white/70">Featured</span>
                            </div>
                            <h4 className="text-white font-bold text-2xl">{tab.title}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Image Navigation Dots - Enhanced */}
              <div className="flex justify-center mt-8 space-x-3">
                {featuredTabs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`transition-all duration-300 rounded-full ${
                      activeTab === index 
                        ? 'bg-[#FF4655] w-10 h-2' 
                        : 'bg-white/30 hover:bg-white/50 w-2 h-2'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Content - Enhanced */}
            <div 
              className={`lg:col-span-5 order-2 transition-all duration-1000 transform ${
                isInView ? 'translate-x-0 opacity-100 delay-700' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/10 shadow-xl relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF4655]/5 rounded-full blur-3xl -z-10"></div>
                
                {featuredTabs.map((tab, index) => (
                  <div 
                    key={`content-${tab.id}`}
                    className={`transition-all duration-700 ${
                      activeTab === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 absolute inset-0'
                    }`}
                  >
                    {/* Icon with ring effect */}
                    <div className="relative mb-8">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238] rounded-full blur opacity-30 animate-pulse"></div>
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#131E2A] to-black border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {activeTab === 0 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                          {activeTab === 1 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          )}
                          {activeTab === 2 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          )}
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      {tab.title}
                      <div className="h-1 w-20 bg-[#FF4655] mt-4 mb-2"></div>
                    </h3>
                    
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                      {tab.description}
                    </p>
                    
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      <Link 
                        href={tab.link}
                        className="px-6 py-3.5 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 text-center md:text-left flex items-center justify-center md:justify-start"
                      >
                        <span>{tab.linkText}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                      
                      <Link 
                        href="/episodes"
                        className="px-6 py-3.5 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300 text-center md:text-left flex items-center justify-center md:justify-start"
                      >
                        <span>Tüm İçerikler</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Feature stats - Enhanced */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="rounded-xl p-4 text-center border border-white/10 backdrop-blur-sm bg-black/10 shadow-lg">
                  <div className="text-4xl font-bold text-white">3</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1.5 font-medium">Duvar</div>
                  <div className="h-1 w-8 bg-[#FF4655]/80 mx-auto mt-2"></div>
                </div>
                
                <div className="rounded-xl p-4 text-center border border-white/10 backdrop-blur-sm bg-black/10 shadow-lg">
                  <div className="text-4xl font-bold text-white">9</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1.5 font-medium">Titan</div>
                  <div className="h-1 w-8 bg-[#FF4655]/80 mx-auto mt-2"></div>
                </div>
                
                <div className="rounded-xl p-4 text-center border border-white/10 backdrop-blur-sm bg-black/10 shadow-lg">
                  <div className="text-4xl font-bold text-white">4</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1.5 font-medium">Sezon</div>
                  <div className="h-1 w-8 bg-[#FF4655]/80 mx-auto mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;