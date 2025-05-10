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
    <section ref={sectionRef} className="py-24 relative bg-gradient-to-b from-[#0F1923]/10 via-[#1A242D]/5 to-[#0F1923]/10 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className={`transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="mb-6 inline-block px-6 py-2 bg-[#FF4655]/20 rounded-full backdrop-blur-xl border border-[#FF4655]/20">
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
              
              <p className="text-gray-300 max-w-2xl text-lg md:text-xl mt-8 bg-[#0F1923]/20 backdrop-blur-xl p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
                Attack on Titan dünyasından en yeni gelişmeleri takip edin
              </p>
            </div>
            
            <div className={`mt-10 md:mt-0 transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-12 opacity-0'}`}>
              <Link href="#" className="inline-flex items-center justify-center px-6 py-3 bg-[#0F1923]/20 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white font-medium rounded-lg hover:bg-[#1A242D]/20 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>Tüm Haberleri Görüntüle</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-[#0F1923]/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/90 via-[#0F1923]/50 to-[#0F1923]/20"></div>
                
                <div className="absolute top-4 left-4 bg-[#FF4655]/20 backdrop-blur-xl px-3 py-1 rounded-md border border-[#FF4655]/20 text-white text-sm font-medium">
                  {item.category}
                </div>
                
                <div className="absolute top-4 right-4 bg-[#0F1923]/30 backdrop-blur-xl px-3 py-1 rounded-md border border-white/10 text-white text-xs">
                  {item.date}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 hover:text-[#FF4655] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-sm">
                  {item.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <Link 
                    href="#" 
                    className="inline-flex items-center text-[#FF4655] hover:text-white transition-colors bg-[#0F1923]/30 hover:bg-[#FF4655]/20 px-4 py-2 rounded-md backdrop-blur-xl border border-[#FF4655]/20 hover:border-[#FF4655]/40 group"
                  >
                    <span>Devamını Oku</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  
                  <div className="w-8 h-8 bg-[#0F1923]/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;