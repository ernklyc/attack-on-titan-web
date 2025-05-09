'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesSection = () => {
  return (
    <section className="py-24 relative bg-aot-dark">
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Characters Card - Large */}
          <div className="md:w-1/2">
            <Link 
              href="/characters" 
              className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[#FF4655]/10 hover:shadow-2xl h-full block"
            >
              <div className="relative h-[400px] overflow-hidden">
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
          </div>

          {/* 2x2 Grid for Other Categories */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              {/* Titans Card */}
              <Link 
                href="/titans" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-blue-500/10 hover:shadow-2xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/titans.jpg" 
                    alt="Titans" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                      Yaratıklar
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Titanlar
                  </h3>
                  
                  <div className="h-1 w-10 bg-blue-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                  
                  <p className="text-gray-300 text-sm">
                    Devasa titanların güçleri ve özelliklerini keşfedin.
                  </p>
                </div>
              </Link>

              {/* Episodes Card */}
              <Link 
                href="/episodes" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-green-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-green-500/10 hover:shadow-2xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/episodes.jpg" 
                    alt="Episodes" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                      Anime
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    Bölümler
                  </h3>
                  
                  <div className="h-1 w-10 bg-green-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                  
                  <p className="text-gray-300 text-sm">
                    Tüm sezonların bölüm özetleri ve kilit olaylar.
                  </p>
                </div>
              </Link>

              {/* Locations Card */}
              <Link 
                href="/locations" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-yellow-500/10 hover:shadow-2xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/locations.jpg" 
                    alt="Locations" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-yellow-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                      Dünya
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    Lokasyonlar
                  </h3>
                  
                  <div className="h-1 w-10 bg-yellow-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                  
                  <p className="text-gray-300 text-sm">
                    Hikayenin geçtiği önemli mekanlar hakkında bilgiler.
                  </p>
                </div>
              </Link>

              {/* Organizations Card */}
              <Link 
                href="/organizations" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-purple-500/10 hover:shadow-2xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/organizations.png" 
                    alt="Organizations" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-500/50 px-3 py-1 rounded-full text-xs text-white font-medium">
                      Gruplar
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Organizasyonlar
                  </h3>
                  
                  <div className="h-1 w-10 bg-purple-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                  
                  <p className="text-gray-300 text-sm">
                    Askeri birliklerin yapısı ve diğer organizasyonlar.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;