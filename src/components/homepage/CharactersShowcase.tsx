'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CharactersShowcase = () => {
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const characters = [
    {
      id: 1,
      name: "Eren Yeager",
      role: "Ana Karakter",
      description: "İnsanlığın umudunu taşıyan, özgürlüğü için sonuna kadar savaşan ve Saldırı Titanı'nın gücüne sahip olan karakter.",
      quote: "Bu dünyada yaşamak istiyorsanız savaşmanız gerekir!",
      image: "/home_image/characters.jpg",
      color: "#FF4655"
    },
    {
      id: 2,
      name: "Mikasa Ackerman",
      role: "Koruyucu Savaşçı",
      description: "Üstün dövüş yetenekleriyle rakipsiz bir savaşçı. Eren'i korumak için her şeyi yapabilecek güçlü bir karakter.",
      quote: "Dünya acımasız, ama aynı zamanda güzel.",
      image: "/home_image/episodes.jpg",
      color: "#3B82F6"
    },
    {
      id: 3,
      name: "Armin Arlert",
      role: "Stratejist",
      description: "Keskin zekası, stratejik düşünce yeteneği ve analitik yaklaşımıyla grubun beyin takımı.",
      quote: "Dünyayı değiştiremeyenler hiçbir şeyi değiştiremez.",
      image: "/home_image/titans.jpg",
      color: "#10B981"
    },
    {
      id: 4,
      name: "Levi Ackerman",
      role: "İnsanlığın En Güçlü Askeri",
      description: "Eşsiz savaş yetenekleri ve taktiksel zekasıyla, insanlığın en güçlü askeri olarak bilinen efsanevi bir karakter.",
      quote: "Pişman olmamak için her kararımı kendim veririm.",
      image: "/home_image/highlights.jpg",
      color: "#6366F1"
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

    // Karakter otomatik değiştirme
    const interval = setInterval(() => {
      setActiveCharacter((prev) => (prev + 1) % characters.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#0A121A] overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0F1923] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0F1923] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section başlık */}
        <div className="text-center mb-16">
          <div className="reveal mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm text-xs font-medium text-white tracking-wide uppercase border border-[#FF4655]/20">
              Karakterler
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 reveal reveal-delay-100">
            <span className="relative inline-block">
              Hikayenin Kahramanları
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6 reveal reveal-delay-200">
            Attack on Titan'ın unutulmaz karakterlerini ve onların hikayelerini keşfedin
          </p>
        </div>

        {/* Karakter Vitrin */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Karakter Görseli */}
            <div className={`relative ${isInView ? 'reveal reveal-delay-300' : ''}`}>
              <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
                {characters.map((character, index) => (
                  <div
                    key={`char-img-${character.id}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeCharacter === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0A121A] via-[${character.color}]/10 to-transparent opacity-80`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A121A] to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Karakter isim göstergesi - Alt */}
              <div className="hidden md:block absolute -bottom-10 -left-10 -right-10">
                {characters.map((character, index) => (
                  <div
                    key={`char-name-large-${character.id}`}
                    className={`transition-all duration-1000 ease-in-out absolute inset-0 ${
                      activeCharacter === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                    style={{ transformOrigin: 'left center' }}
                  >
                    <h2 className="text-[140px] md:text-[180px] font-extrabold text-white opacity-10 whitespace-nowrap overflow-hidden">
                      {character.name.toUpperCase()}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sağ taraf - Karakter Detayları */}
            <div className="lg:pl-6">
              <div className="relative">
                {characters.map((character, index) => (
                  <div
                    key={`char-details-${character.id}`}
                    className={`transition-all duration-1000 ease-in-out ${
                      activeCharacter === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 absolute inset-0'
                    }`}
                  >
                    <div className={`reveal reveal-delay-400 inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4`} style={{ backgroundColor: character.color }}>
                      {character.role}
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-4 reveal reveal-delay-500">
                      {character.name}
                      <div className="h-1 w-12 mt-2" style={{ backgroundColor: character.color }}></div>
                    </h3>
                    
                    <div className="flex items-start mb-6 reveal reveal-delay-600">
                      <svg className="w-8 h-8 text-white/30 mr-4 mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
                      </svg>
                      <blockquote className="text-xl text-white/80 italic">
                        "{character.quote}"
                      </blockquote>
                    </div>
                    
                    <p className="text-gray-300 mb-8 reveal reveal-delay-700">
                      {character.description}
                    </p>
                    
                    <Link 
                      href="/characters" 
                      className="reveal reveal-delay-800 px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:border-[#FF4655] hover:bg-[#FF4655]/10 transition-all duration-300 inline-flex items-center group"
                    >
                      <span>Karakterleri Keşfet</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Karakter İndikatör Noktaları */}
              <div className="flex space-x-3 mt-10 reveal">
                {characters.map((character, idx) => (
                  <button
                    key={`char-indicator-${character.id}`}
                    onClick={() => setActiveCharacter(idx)}
                    className={`transition-all duration-300 flex flex-col items-center group`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        activeCharacter === idx ? `border-[${character.color}] scale-110` : 'border-white/20'
                      }`}
                    >
                      <Image
                        src={character.image}
                        alt={character.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className={`text-xs mt-1 transition-all duration-300 ${
                      activeCharacter === idx ? 'text-white' : 'text-white/50'
                    }`}>
                      {character.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharactersShowcase;