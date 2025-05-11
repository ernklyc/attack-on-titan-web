'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsUpdatesSection = () => {
  // Haber makaleleri için örnek veriler
  const newsItems = [
    {
      id: 1,
      title: "Attack on Titan Final Season Part 3 - Özel Bölüm Duyurusu",
      date: "8 Mayıs 2025",
      category: "Anime",
      image: "/home_image/episodes.jpg",
      excerpt: "Final sezonun son bölümlerine dair özel bir içerik yayınlandı. Tüm detaylar için tıklayın.",
      color: "text-[#FF4655]",
      bgColor: "bg-[#FF4655]/50",
      borderColor: "hover:border-[#FF4655]/30",
      shadowColor: "hover:shadow-[#FF4655]/10",
      lineColor: "bg-[#FF4655]",
      hoverColor: "group-hover:text-[#FF4655]"
    },
    {
      id: 2,
      title: "Attack on Titan Karakterlerine Ait Yeni Figürler Satışa Çıktı",
      date: "1 Mayıs 2025",
      category: "Merchandise",
      image: "/home_image/characters.jpg",
      excerpt: "Eren, Mikasa ve Levi'nin yüksek kaliteli figürleri satışa çıktı. Koleksiyonunuza ekleyin!",
      color: "text-blue-400",
      bgColor: "bg-blue-500/50",
      borderColor: "hover:border-blue-500/30",
      shadowColor: "hover:shadow-blue-500/10",
      lineColor: "bg-blue-500",
      hoverColor: "group-hover:text-blue-400"
    },
    {
      id: 3,
      title: "Attack on Titan Dünyasında Geçen Yeni Oyun Duyuruldu",
      date: "25 Nisan 2025",
      category: "Oyun",
      image: "/home_image/titans.jpg",
      excerpt: "Attack on Titan evreninde geçen açık dünya rol yapma oyunu 2026'da çıkacak.",
      color: "text-green-400",
      bgColor: "bg-green-500/50",
      borderColor: "hover:border-green-500/30",
      shadowColor: "hover:shadow-green-500/10",
      lineColor: "bg-green-500",
      hoverColor: "group-hover:text-green-400"
    },
    {
      id: 4,
      title: "Attack on Titan Manga Koleksiyonu Özel Baskı",
      date: "15 Nisan 2025",
      category: "Manga",
      image: "/home_image/locations.jpg",
      excerpt: "Tüm mangayı içeren özel baskı koleksiyonu sınırlı sayıda satışa sunuldu.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/50",
      borderColor: "hover:border-yellow-500/30",
      shadowColor: "hover:shadow-yellow-500/10",
      lineColor: "bg-yellow-500",
      hoverColor: "group-hover:text-yellow-400"
    }
  ];

  return (
    <section className="py-12 relative">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium text-[#FF4655] tracking-widest uppercase bg-[#FF4655]/10 px-4 py-1 rounded-full">Güncel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Haberler & Güncellemeler</h2>
          <div className="h-1 w-24 bg-[#FF4655] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Attack on Titan dünyasından en yeni gelişmeleri takip edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href="#"
              className={`group relative rounded-xl overflow-hidden shadow-xl border border-white/10 ${item.borderColor} transition-all duration-500 transform hover:-translate-y-2 ${item.shadowColor} hover:shadow-2xl bg-[#1A242D]/20 backdrop-blur-lg`}
            >
              <div className="relative h-40 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${item.bgColor} px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                
                <h3 className={`text-lg font-bold text-white mb-2 ${item.hoverColor} transition-colors line-clamp-2`}>
                  {item.title}
                </h3>
                
                <div className={`h-1 w-10 ${item.lineColor} mb-3 group-hover:w-20 transition-all duration-500`}></div>
                
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center mt-4">
                  <div className={`flex items-center ${item.color} text-sm font-medium`}>
                    <span>Devamını Oku</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Bottom shine effect */}
              <div className={`absolute bottom-0 h-1 w-0 bg-gradient-to-r from-${item.lineColor}/70 to-${item.lineColor} group-hover:w-full transition-all duration-700 z-20`}></div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="#"
            className="inline-flex items-center px-6 py-3 bg-[#1A242D]/30 backdrop-blur-xl text-white font-medium rounded-md hover:bg-[#FF4655]/10 transition-all duration-300 border border-white/10 hover:border-[#FF4655]/30"
          >
            <span>Tüm Haberleri Görüntüle</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;