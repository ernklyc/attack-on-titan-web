'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SpotlightSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const spotlightItems = [
    {
      id: 'story',
      title: 'Benzersiz Bir Hikaye',
      description: 'İnsanlığın karanlık bir gelecekte dev yaratıklarla mücadelesi ve duvarların ardındaki gizli gerçeklerin keşfi.',
      image: '/home_image/highlights.jpg',
      stats: [
        { value: '8.5', label: 'IMDB' },
        { value: '93%', label: 'Rotten Tomatoes' },
        { value: '9.1', label: 'MyAnimeList' }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'action',
      title: 'Nefes Kesen Aksiyonlar',
      description: '3D Manevra Ekipmanı ile havada süzülen savaşçılar ve devasa Titanlar ile yapılan epik mücadeleler.',
      image: '/home_image/titans.jpg',
      stats: [
        { value: '50+', label: 'Öldürülen Titan' },
        { value: '30+', label: 'Aksiyon Sahnesi' },
        { value: '15', label: 'Epik Savaş' }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'characters',
      title: 'Unutulmaz Karakterler',
      description: 'Derin hikayeleri, karmaşık motivasyonları ve etkileyici gelişimleri ile akılda kalan karakterler.',
      image: '/home_image/characters.jpg',
      stats: [
        { value: '20+', label: 'Ana Karakter' },
        { value: '5', label: 'Ana Titan' },
        { value: '3', label: 'Askeri Birlik' }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Tab otomatik değiştirme
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % spotlightItems.length);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-aot-dark overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-[#FF4655]/5 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-1/4 h-screen bg-gradient-to-r from-blue-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section başlık */}
          <div className="text-center mb-16">
            <div className="reveal mb-4">
              <span className="px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm text-xs font-medium text-white tracking-wide uppercase border border-[#FF4655]/20">
                Benzersiz Bir Deneyim
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 reveal reveal-delay-100">
              <span className="relative inline-block">
                Attack on Titan'ı Özel Yapan
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
              </span>
            </h2>
            
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6 reveal reveal-delay-200">
              Devasa duvarların ardında yaşayan insanlık ve karanlık sırlarla dolu bir dünya
            </p>
          </div>

          {/* Tab navigasyonu */}
          <div className="flex justify-center mb-12 reveal reveal-delay-300">
            <div className="inline-flex bg-[#131E2A]/80 rounded-full p-1 border border-white/5">
              {spotlightItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                    activeTab === index 
                      ? 'bg-[#FF4655] text-white shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* İçerik alanı */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Sol taraf - Görsel */}
            <div className="lg:col-span-7 reveal reveal-delay-400">
              <div className="relative">
                {spotlightItems.map((item, index) => (
                  <div 
                    key={`content-${item.id}`} 
                    className={`transition-all duration-1000 ease-in-out ${
                      activeTab === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                    }`}
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 sm:aspect-h-7">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-xl"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1923]/70 via-transparent to-transparent rounded-xl"></div>
                      </div>
                      
                      {/* İstatistikler */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          {item.stats.map((stat, idx) => (
                            <div 
                              key={`stat-${idx}`} 
                              className="bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10"
                            >
                              <div className="text-xl font-bold text-[#FF4655]">{stat.value}</div>
                              <div className="text-xs text-white/70">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sağ taraf - Açıklama */}
            <div className="lg:col-span-5 reveal reveal-delay-500">
              {spotlightItems.map((item, index) => (
                <div 
                  key={`desc-${item.id}`}
                  className={`transition-all duration-700 ${
                    activeTab === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FF4655]/20 mb-6">
                    <div className="text-[#FF4655]">
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {item.title}
                    <div className="h-1 w-16 bg-[#FF4655] mt-3"></div>
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-8">
                    {item.description}
                  </p>
                  
                  <Link 
                    href={`/${item.id === 'characters' ? 'characters' : item.id === 'action' ? 'episodes' : 'organizations'}`}
                    className="px-6 py-3 bg-gradient-to-r from-[#131E2A]/90 to-[#0F1923]/90 text-white font-medium rounded-lg border border-white/10 hover:border-[#FF4655]/30 transition-all duration-300 inline-flex items-center group"
                  >
                    <span>Daha Fazla Keşfet</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* İndikatör noktaları */}
          <div className="flex justify-center mt-12 space-x-3 reveal">
            {spotlightItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeTab === idx 
                    ? 'bg-[#FF4655] w-8 h-2' 
                    : 'bg-white/30 hover:bg-white/50 w-2 h-2'
                }`}
                aria-label={`Tab ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;