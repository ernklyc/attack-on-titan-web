'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0F1923] to-[#0A121A] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0F1923] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0A121A] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium text-[#FF4655] tracking-widest uppercase">Keşfet</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Kategoriler</h2>
          <div className="h-1 w-24 bg-[#FF4655] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Attack on Titan dünyasını farklı açılardan keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Characters Card - Enhanced */}
          <Link 
            href="/characters" 
            className="group relative bg-gradient-to-br from-[#131E2A] to-[#0F1923] rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[#FF4655]/10 hover:shadow-2xl"
          >
            <div className="relative h-60 overflow-hidden">
              <Image 
                src="/home_image/characters.jpg" 
                alt="Characters" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#FF4655]/70 px-3 py-1 rounded-full text-xs text-white font-medium">
                  Ana Kategori
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FF4655] transition-colors">
                Karakterler
              </h3>
              
              <div className="h-1 w-12 bg-[#FF4655] mb-4 group-hover:w-24 transition-all duration-500"></div>
              
              <p className="text-gray-300 text-sm">
                Ana karakterlerin hikayeleri ve aralarındaki ilişkiler hakkında detaylı bilgiler edinebilirsiniz.
              </p>
            </div>
          </Link>

          {/* Titans Card - Enhanced */}
          <Link 
            href="/titans" 
            className="group relative bg-gradient-to-br from-[#131E2A] to-[#0F1923] rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-blue-500/10 hover:shadow-2xl"
          >
            <div className="relative h-60 overflow-hidden">
              <Image 
                src="/home_image/titans.jpg" 
                alt="Titans" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                  Yaratıklar
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Titanlar
              </h3>
              
              <div className="h-1 w-12 bg-blue-500 mb-4 group-hover:w-24 transition-all duration-500"></div>
              
              <p className="text-gray-300 text-sm">
                Devasa titanların güçleri, yetenekleri ve özelliklerini keşfedin.
              </p>
            </div>
          </Link>

          {/* Episodes Card - Enhanced */}
          <Link 
            href="/episodes" 
            className="group relative bg-gradient-to-br from-[#131E2A] to-[#0F1923] rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-green-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-green-500/10 hover:shadow-2xl"
          >
            <div className="relative h-60 overflow-hidden">
              <Image 
                src="/home_image/episodes.jpg" 
                alt="Episodes" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                  Anime
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                Bölümler
              </h3>
              
              <div className="h-1 w-12 bg-green-500 mb-4 group-hover:w-24 transition-all duration-500"></div>
              
              <p className="text-gray-300 text-sm">
                Tüm sezonların bölüm özetleri ve kilit olaylara dair detaylar.
              </p>
            </div>
          </Link>
        </div>

        {/* Copyright text */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm italic">© 2024 Attack on Titan</p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;