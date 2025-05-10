'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesSection = () => {
  return (
    <section className="py-12 relative">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium text-[#FF4655] tracking-widest uppercase bg-[#FF4655]/10 px-4 py-1 rounded-full">Keşfet</span>
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
              className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[#FF4655]/10 hover:shadow-2xl h-full block bg-[#1A242D]/40 backdrop-blur-lg"
            >
              <div className="relative h-[400px] overflow-hidden">
                <Image 
                  src="/home_image/characters.jpg" 
                  alt="Characters" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#FF4655]/70 px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm">
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
              
              {/* Bottom shine effect */}
              <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] group-hover:w-full transition-all duration-700 z-20"></div>
            </Link>
          </div>

          {/* 2x2 Grid for Other Categories */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              {/* Titans Card */}
              <Link 
                href="/titans" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-blue-500/10 hover:shadow-2xl bg-[#1A242D]/40 backdrop-blur-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/titans.jpg" 
                    alt="Titans" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-500/50 px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm">
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
                
                {/* Bottom shine effect */}
                <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-blue-500/70 to-blue-500 group-hover:w-full transition-all duration-700 z-20"></div>
              </Link>

              {/* Episodes Card */}
              <Link 
                href="/episodes" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-green-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-green-500/10 hover:shadow-2xl bg-[#1A242D]/40 backdrop-blur-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/episodes.jpg" 
                    alt="Episodes" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-500/50 px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm">
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
                
                {/* Bottom shine effect */}
                <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-green-500/70 to-green-500 group-hover:w-full transition-all duration-700 z-20"></div>
              </Link>

              {/* Locations Card */}
              <Link 
                href="/locations" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-yellow-500/10 hover:shadow-2xl bg-[#1A242D]/40 backdrop-blur-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/locations.jpg" 
                    alt="Locations" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-yellow-500/50 px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm">
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
                
                {/* Bottom shine effect */}
                <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-yellow-500/70 to-yellow-500 group-hover:w-full transition-all duration-700 z-20"></div>
              </Link>

              {/* Organizations Card */}
              <Link 
                href="/organizations" 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-purple-500/10 hover:shadow-2xl bg-[#1A242D]/40 backdrop-blur-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src="/home_image/organizations.png" 
                    alt="Organizations" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-500/50 px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm">
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
                    Askeri birimler ve önemli gruplar hakkında bilgiler.
                  </p>
                </div>
                
                {/* Bottom shine effect */}
                <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-purple-500/70 to-purple-500 group-hover:w-full transition-all duration-700 z-20"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;