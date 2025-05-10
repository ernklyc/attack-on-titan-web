'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type FeaturedItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
};

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: "Eren'in Titanı Son Sezonda Nasıl Evrildi?",
    description: "Final sezonunda Eren'in Saldırı Titanı'nın geçirdiği değişim ve gücünün sınırları hakkında detaylı bir analiz.",
    image: "/images/featured/featured-1.jpg",
    category: "Analiz",
    link: "/blog/erens-titan-evolution"
  },
  {
    id: 2,
    title: "Duvarların Arkasında Yatan Sır",
    description: "Duvarların gerçek amacı ve yapılış sebebi. İnsanlığın en büyük sırrının arkasındaki gerçekler.",
    image: "/images/featured/featured-2.jpg",
    category: "Teori",
    link: "/blog/wall-secret"
  },
  {
    id: 3,
    title: "Attack on Titan 2. Kısım Manga Koleksiyonu",
    description: "Sınırlı sayıda üretilen özel baskı manga koleksiyonu şimdi satışta! Orijinal çizimler ve yazarın notlarını içerir.",
    image: "/images/featured/featured-3.jpg",
    category: "Ürün",
    link: "/shop/manga-collection"
  },
  {
    id: 4,
    title: "Mangaka Hajime Isayama ile Özel Röportaj",
    description: "Attack on Titan'ın yaratıcısı Hajime Isayama ile serinin son bölümü ve finali hakkında özel bir söyleşi.",
    image: "/images/featured/featured-4.jpg",
    category: "Röportaj",
    link: "/blog/isayama-interview"
  }
];

export default function FeaturedSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-[#0F1923] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/texture-bg.png')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Öne <span className="text-red-500">Çıkanlar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Attack on Titan dünyasından en güncel içerikler, analizler ve ürünlere göz atın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="group bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-500 hover:scale-[1.02] flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-0 right-0 m-3">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  {item.description}
                </p>
                
                <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-800">
                  <span className="text-red-500 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                    Daha Fazla Oku
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Abonelik Formu */}
        <div className="mt-16 bg-gradient-to-r from-red-900/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-800/30">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Öne Çıkan İçeriklerden Haberdar Ol
              </h3>
              <p className="text-gray-300">
                En yeni Attack on Titan içeriklerini, fragmanları ve etkinlikleri kaçırmamak için bültenimize abone olun.
              </p>
            </div>
            
            <div className="md:w-1/2 md:pl-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                />
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-300">
                  Abone Ol
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                E-posta adresiniz bizimle güvende. Asla spam göndermeyiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 