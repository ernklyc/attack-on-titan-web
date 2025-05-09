'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsUpdatesSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const newsItems = [
    {
      id: 1,
      title: "Attack on Titan Final Season Part 3 - Özel Bölüm Duyurusu",
      date: "8 Mayıs 2025",
      category: "Anime",
      image: "/home_image/episodes.jpg",
      excerpt: "Final sezonun son bölümlerine dair özel bir içerik yayınlandı. Tüm detaylar için tıklayın."
    },
    {
      id: 2,
      title: "Attack on Titan Karakterlerine Ait Yeni Figürler Satışa Çıktı",
      date: "1 Mayıs 2025",
      category: "Merchandise",
      image: "/home_image/characters.jpg",
      excerpt: "Eren, Mikasa ve Levi'nin yüksek kaliteli figürleri satışa çıktı. Koleksiyonunuza ekleyin!"
    },
    {
      id: 3,
      title: "Attack on Titan Dünyasında Geçen Yeni Oyun Duyuruldu",
      date: "25 Nisan 2025",
      category: "Oyun",
      image: "/home_image/titans.jpg",
      excerpt: "Attack on Titan evreninde geçen açık dünya rol yapma oyunu 2026'da çıkacak."
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

  return (
    <section ref={sectionRef} className="py-24 relative bg-aot-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className={`transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="mb-6 inline-block px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm border border-[#FF4655]/20">
                <span className="text-sm font-medium text-white tracking-wide uppercase">
                  Son Gelişmeler
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-6">
                <span className="relative inline-block">
                  En Güncel Haberler ve Duyurular
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
                </span>
              </h2>
              
              <p className="text-gray-300 max-w-2xl text-lg md:text-xl mt-8">
                Attack on Titan dünyasından en yeni gelişmeleri takip edin
              </p>
            </div>
            
            <Link 
              href="#" 
              className={`mt-6 md:mt-20 inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 transform ${isInView ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'}`}
            >
              <span className="font-medium">Tüm Haberler</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="h-px w-24 bg-[#FF4655]/30 mt-10 mb-16"></div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[#FF4655]/10 hover:shadow-2xl group ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Category Badge - Enhanced */}
                <div className="absolute top-5 right-5">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white text-xs font-medium rounded shadow-lg">
                    {item.category}
                  </span>
                </div>
                
                {/* Date - Enhanced */}
                <div className="absolute bottom-5 left-5 flex items-center text-white/80 text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
              
              <div className="p-7 bg-black/30">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FF4655] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.title}
                </h3>
                
                <div className="h-0.5 w-12 bg-[#FF4655]/40 mb-4 group-hover:w-24 transition-all duration-500"></div>
                
                <p className="text-gray-300 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                  {item.excerpt}
                </p>
                
                <Link 
                  href="#" 
                  className="inline-flex items-center text-[#FF4655] font-medium text-sm group-hover:underline"
                >
                  Devamını Oku
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className={`mt-16 p-8 rounded-xl border border-white/10 backdrop-blur-sm bg-black/20 max-w-5xl mx-auto shadow-xl transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-12 opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h4 className="text-2xl font-bold text-white mb-2">En Son Haberler İçin Abone Olun</h4>
              <p className="text-gray-300">Attack on Titan dünyasındaki gelişmelerden haberdar olun</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="flex-grow md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white focus:outline-none focus:border-[#FF4655]"
              />
              <button className="bg-gradient-to-r from-[#FF4655] to-[#FF2238] px-5 py-3 text-white font-medium rounded-r-lg hover:shadow-lg hover:shadow-[#FF4655]/20 transition-all duration-300">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;