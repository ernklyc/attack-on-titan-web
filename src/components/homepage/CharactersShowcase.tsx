'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CharactersShowcase() {
  // Ana karakterleri örnek verilerle tanımlıyorum
  const mainCharacters = [
    {
      id: 1 as number,
      name: 'Eren Yeager',
      role: 'Ana Kahraman / Titan Taşıyıcısı',
      image: '/images/characters/eren-yeager.webp',
      description: 'Kendini insanlığın özgürlüğüne adamış, kararlı ve öfkeli bir genç.',
      path: '/characters/eren-yeager',
      status: 'Alive',
      species: ['İnsan', 'Titan']
    },
    {
      id: 2 as number,
      name: 'Mikasa Ackerman',
      role: 'Savaşçı / Koruyucu',
      image: '/images/characters/mikasa-ackerman.webp',
      description: 'Olağanüstü savaş yeteneklerine sahip, Eren\'e karşı derin bir sevgi besleyen sadık bir koruyucu.',
      path: '/characters/mikasa-ackerman',
      status: 'Alive',
      species: ['İnsan', 'Ackerman']
    },
    {
      id: 3 as number,
      name: 'Armin Arlert',
      role: 'Stratejist / Titan Taşıyıcısı',
      image: '/images/characters/armin-arlert.webp',
      description: 'Zeki ve stratejik düşünme yeteneğine sahip, çatışmaları beyniyle çözmeye çalışan bir karakter.',
      path: '/characters/armin-arlert',
      status: 'Alive',
      species: ['İnsan', 'Titan']
    },
    {
      id: 4 as number,
      name: 'Levi Ackerman',
      role: 'Keşif Birliği Kaptanı',
      image: '/images/characters/levi-ackerman.webp',
      description: 'İnsanlığın en güçlü askeri olarak bilinen, disiplinli ve acımasız bir savaşçı.',
      path: '/characters/levi-ackerman',
      status: 'Alive',
      species: ['İnsan', 'Ackerman']
    },
  ];

  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null);  
  
  // Canlı durumu için stil sınıfları
  const statusClasses = {
    Alive: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/30',
    Deceased: 'bg-[#FF4655]/30 text-white border-[#FF4655]/30',
    Unknown: 'bg-gray-500/30 text-gray-300 border-gray-500/30'
  };
  
  // Hover durumundaki border renkleri
  const hoverBorderColors = {
    Alive: 'group-hover:border-emerald-500/50',
    Deceased: 'group-hover:border-[#FF4655]/50',
    Unknown: 'group-hover:border-gray-500/50'
  };
  
  // Altındaki hover çizgisi için renkler
  const hoverLineColors = {
    Alive: 'from-emerald-500/70 to-emerald-500',
    Deceased: 'from-[#FF4655]/70 to-[#FF4655]',
    Unknown: 'from-gray-500/70 to-gray-500'
  };
  
  // Hover durumundaki gölge renkleri
  const hoverShadowColors = {
    Alive: 'group-hover:shadow-emerald-500/20',
    Deceased: 'group-hover:shadow-[#FF4655]/20',
    Unknown: 'group-hover:shadow-gray-500/20'
  };
  
  return (
    <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#FF4655]">Ana</span> Karakterler
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Attack on Titan'ın hikayesini şekillendiren ve dünyayı değiştiren karakterleri keşfedin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mx-auto max-w-7xl">
          {mainCharacters.map((character) => (
            <div 
              key={character.id}
              className="group relative overflow-hidden cursor-pointer transition-all duration-500 h-full transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCharacter(character.id as number)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              {/* Ana kart konteyneri - Glass morphic tasarım */}
              <div className={`relative rounded-2xl overflow-hidden bg-[#1A242D]/60 backdrop-blur-lg border border-white/10 shadow-lg group-hover:shadow-xl ${
                character.status === 'Alive' ? hoverBorderColors.Alive : 
                character.status === 'Deceased' ? hoverBorderColors.Deceased : 
                hoverBorderColors.Unknown
              } ${
                character.status === 'Alive' ? hoverShadowColors.Alive : 
                character.status === 'Deceased' ? hoverShadowColors.Deceased : 
                hoverShadowColors.Unknown
              } transition-all duration-500 h-full`}>
                
                {/* Shine efekti - hover durumunda */}
                <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                
                {/* Görsel konteyneri */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-110 transition-all duration-700 ease-out"
                    style={{
                      objectPosition: 'center top'
                    }}
                  />
                  
                  {/* Arka plan gölge efekti - hover durumunda görünür, alttan yukarı doğru gölge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/70 group-hover:to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Hafif gradient overlay - her zaman görünür */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                </div>
                
                {/* Status durumu */}
                {character.status && (
                  <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                    character.status === 'Alive' ? statusClasses.Alive : 
                    character.status === 'Deceased' ? statusClasses.Deceased : 
                    statusClasses.Unknown
                  } transform transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                    {character.status}
                  </div>
                )}
                
                {/* Karakter türü (insan, titan vs.) */}
                {character.species && character.species.length > 0 && (
                  <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium bg-[#1A242D]/70 backdrop-blur-sm text-gray-300 border border-white/10 shadow-md">
                    {character.species[0]}
                  </div>
                )}
                
                {/* Karakter bilgileri - kartın en altında, hover durumunda yukarı kayacak */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transition-all duration-300 group-hover:translate-y-[-60px]">
                  {/* İsim ve Meslek Alanı - artırılmış okunabilirlik için drop-shadow */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF4655] transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {character.name}
                    </h3>
                    
                    <p className="text-sm text-gray-200 max-w-full truncate drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                      {character.role}
                    </p>
                  </div>
                </div>

                {/* Detaylı bilgi butonu - sadece hover durumunda görünür */}
                <Link href={character.path} className="absolute bottom-0 left-0 right-0 p-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <button 
                    type="button"
                    className="w-full py-2 bg-gradient-to-r from-[#FF4655]/80 to-[#FF4655] text-white rounded-md text-sm font-medium flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                    aria-label={`${character.name} hakkında detaylı bilgi`}
                  >
                    <span>Detaylı Bilgi</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>
              
              {/* Bottom shine effect - Karakterin durumuna göre renk değişiyor */}
              <div className={`absolute bottom-0 h-1 w-0 bg-gradient-to-r ${
                character.status === 'Alive' ? hoverLineColors.Alive : 
                character.status === 'Deceased' ? hoverLineColors.Deceased : 
                hoverLineColors.Unknown
              } group-hover:w-full transition-all duration-700 z-20`}></div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link 
            href="/characters"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#1A242D]/60 backdrop-blur-lg text-[#FF4655] font-medium rounded-md hover:bg-[#FF4655]/10 transition-all duration-300 border border-white/10 hover:border-[#FF4655]/30 shadow-character hover:shadow-[0_10px_40px_rgba(255,70,85,0.1)]"
          >
            Tüm Karakterleri Keşfet
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}