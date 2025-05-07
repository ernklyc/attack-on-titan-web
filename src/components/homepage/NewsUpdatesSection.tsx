'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsUpdatesSection = () => {
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

  return (
    <section className="py-20 bg-[#0F1923] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A121A] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div>
            <div className="mb-4 inline-block">
              <span className="px-4 py-1 border border-[#FF4655]/30 text-[#FF4655] rounded-full text-sm font-medium tracking-wider uppercase bg-[#0F1923]/50 backdrop-blur-sm">
                Son Gelişmeler
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              <span className="relative inline-block">
                En Güncel Haberler ve Duyurular
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
              </span>
            </h2>
          </div>
          
          <Link href="#" className="mt-4 md:mt-0 inline-flex items-center text-[#FF4655] hover:text-white transition-colors group">
            <span>Tüm Haberler</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-gradient-to-br from-[#131E2A] to-[#0F1923] rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[#FF4655]/10 hover:shadow-2xl group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/50 to-transparent"></div>
                
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#FF4655]/70 text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <div className="absolute bottom-4 left-4 flex items-center text-white/70 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF4655] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-6 line-clamp-2">
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
      </div>
    </section>
  );
};

export default NewsUpdatesSection;