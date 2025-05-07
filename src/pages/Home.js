import React from 'react';
import '../styles/Home.css';
import Link from 'next/link'; // Replaced react-router-dom with next/link

function Home() {
  return (
    <div className="home bg-[#0F1923] min-h-screen text-white">
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/backgrounds/titan-bg.webp" 
            alt="Attack on Titan hero background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923] via-transparent to-[#0F1923]"></div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10 mt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">
              <span className="text-[#FF4655]">Attack</span> on Titan
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              Keşfet, derinleşen gizem içindeki devlerin dünyasına dal ve insanlığın son kalesi içindeki karakterlerin hikayesini öğren.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/characters"
                className="px-8 py-3 bg-[#FF4655] text-white font-medium rounded-md hover:bg-[#ff2238] transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Karakterleri Keşfet
              </Link>
              
              <Link 
                href="/titans"
                className="px-8 py-3 bg-transparent border-2 border-white/50 text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300 transform hover:scale-105"
              >
                Titanlar
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-gray-300 text-sm mb-1">Kaydır</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section py-20 bg-[#0F1923] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-md mb-4">
              <span className="text-xs font-medium text-white tracking-wide uppercase">Öne Çıkanlar</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
              <span className="relative">
                Attack on Titan
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6">
              Attack on Titan evreninin öne çıkan karakterlerini ve hikayelerini keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white mb-4">Duvarların Sırrı</h3>
              <p className="text-gray-300 mb-6">
                Üç duvar arasında yaşayan insanlık, dışarıdaki dev titanlardan korunmak için yüzlerce yıldır bu duvarlara sığınıyor. Ancak duvarların ardında çok daha büyük sırlar ve gerçekler gizleniyor...
              </p>
              <Link 
                href="/organizations"
                className="px-6 py-2 bg-[#FF4655]/90 text-white font-medium rounded-md hover:bg-[#FF4655] transition-colors duration-300 inline-flex items-center"
              >
                <span>Daha Fazla</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
            <div className="order-1 md:order-2 glass-card rounded-xl overflow-hidden relative">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="/home_image/highlights.jpg"
                  alt="Duvarların Sırrı"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/50 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-20 bg-[#0F1923]/80 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kategoriler</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Attack on Titan dünyasını farklı açılardan keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Characters Card */}
            <Link 
              href="/characters" 
              className="block group bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/home_image/characters.jpg" 
                  alt="Characters" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] to-transparent"></div>
              </div>
              <div className="p-5">
                <span className="bg-[#FF4655]/70 px-2 py-1 rounded-full text-xs text-white font-medium">
                  Ana Kategori
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-[#FF4655] transition-colors">
                  Karakterler
                </h3>
                <div className="h-0.5 w-12 bg-[#FF4655] mb-2 group-hover:w-20 transition-all duration-500"></div>
                <p className="text-gray-300 text-sm">
                  Ana karakterlerin hikayeleri ve aralarındaki ilişkiler
                </p>
              </div>
            </Link>

            {/* Titans Card */}
            <Link 
              href="/titans" 
              className="block group bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/home_image/titans.jpg" 
                  alt="Titans" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] to-transparent"></div>
              </div>
              <div className="p-5">
                <span className="bg-blue-500/40 px-2 py-1 rounded-full text-xs text-blue-200 font-medium">
                  Yaratıklar
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-blue-400 transition-colors">
                  Titanlar
                </h3>
                <div className="h-0.5 w-12 bg-blue-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                <p className="text-gray-300 text-sm">
                  Devasa titanların güçleri ve özellikleri
                </p>
              </div>
            </Link>

            {/* Episodes Card */}
            <Link 
              href="/episodes" 
              className="block group bg-[#0F1923] rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-green-500/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/home_image/episodes.jpg" 
                  alt="Episodes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] to-transparent"></div>
              </div>
              <div className="p-5">
                <span className="bg-green-500/40 px-2 py-1 rounded-full text-xs text-green-200 font-medium">
                  Anime
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-green-400 transition-colors">
                  Bölümler
                </h3>
                <div className="h-0.5 w-12 bg-green-500 mb-2 group-hover:w-20 transition-all duration-500"></div>
                <p className="text-gray-300 text-sm">
                  Sezonların bölüm detayları
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/characters"
              className="inline-flex items-center bg-gradient-to-r from-[#FF4655]/20 to-[#FF2238]/20 hover:from-[#FF4655]/30 hover:to-[#FF2238]/30 px-8 py-4 rounded-xl backdrop-blur-md border border-white/10 hover:border-[#FF4655]/40 shadow-lg transition-all duration-300"
            >
              <span className="text-lg text-white hover:text-[#FF4655] font-medium transition-colors mr-2">
                Tüm kategorileri keşfet
              </span>
              <div className="bg-[#FF4655] rounded-full p-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-16 bg-gradient-to-b from-transparent to-[#0F1923]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Attack on Titan evrenini keşfetmeye başla
            </h2>
            <p className="text-gray-300 mb-8">
              Karakterler, titanlar ve Attack on Titan'ın sırları hakkında her şeyi öğrenin.
            </p>
            <Link 
              href="/characters"
              className="px-8 py-3 bg-[#FF4655] text-white font-medium rounded-md hover:bg-[#ff2238] transition-colors duration-300 transform hover:scale-105 shadow-lg"
            >
              Şimdi Keşfet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;