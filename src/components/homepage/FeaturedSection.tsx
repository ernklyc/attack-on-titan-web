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
    <section ref={sectionRef} className="py-24 bg-[#0F1923] relative">
      {/* Decorative background elements with better styling */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FF4655]/10 to-transparent rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-[150px] animate-pulse-slow-delay"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm mb-4 border border-[#FF4655]/20">
            <span className="text-xs font-medium text-white tracking-wide uppercase">Öne Çıkanlar</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            <span className="relative inline-block">
              Attack on Titan Evreni
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6">
            Attack on Titan evreninin öne çıkan detaylarını ve hikayelerini keşfedin.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div 
            className={`flex justify-center mb-8 transition-all duration-1000 transform ${
              isInView ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="inline-flex bg-[#131E2A]/50 backdrop-blur-sm rounded-full p-1 border border-white/10">
              {featuredTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-[#FF4655] text-white shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Content */}
            <div 
              className={`lg:col-span-2 order-2 lg:order-1 transition-all duration-1000 transform ${
                isInView ? 'translate-x-0 opacity-100 delay-500' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="bg-[#0F1923]/30 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all shadow-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF4655]/20 mb-6 border border-[#FF4655]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group">
                  {featuredTabs[activeTab].title}
                  <div className="h-1 w-16 bg-[#FF4655] mt-2 group-hover:w-24 transition-all duration-500"></div>
                </h3>
                
                <p className="text-gray-300 mb-8 text-base sm:text-lg">
                  {featuredTabs[activeTab].description}
                </p>
                
                <Link 
                  href={featuredTabs[activeTab].link}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF4655]/70 to-[#FF2238]/70 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 inline-flex items-center group"
                >
                  <span>{featuredTabs[activeTab].linkText}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              {/* Feature stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-[#131E2A]/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-[#FF4655]">3</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Duvar</div>
                </div>
                
                <div className="bg-[#131E2A]/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-[#FF4655]">9</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Titan</div>
                </div>
                
                <div className="bg-[#131E2A]/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                  <div className="text-3xl font-bold text-[#FF4655]">4</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Sezon</div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div 
              className={`lg:col-span-3 order-1 lg:order-2 transition-all duration-1000 transform ${
                isInView ? 'translate-x-0 opacity-100 delay-700' : '-translate-x-12 opacity-0'
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
                    <div className="glass-card rounded-xl overflow-hidden relative shadow-2xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:scale-[1.02]">
                      <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                        <Image
                          src={tab.image}
                          alt={tab.title}
                          fill
                          className="object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/50 to-transparent rounded-xl"></div>
                        
                        {/* Animated particles overlay */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="particle-1"></div>
                          <div className="particle-2"></div>
                          <div className="particle-3"></div>
                        </div>
                        
                        <div className="absolute bottom-6 left-6">
                          <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg">
                            <h4 className="text-white font-bold text-lg">{tab.title}</h4>
                            <div className="h-0.5 w-1/4 bg-[#FF4655] mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Image Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-3">
                {featuredTabs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTab === index 
                        ? 'bg-[#FF4655] w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;