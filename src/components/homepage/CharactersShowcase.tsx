'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CharactersShowcase() {
  // Ana karakterleri örnek verilerle tanımlıyorum
  const mainCharacters = [
    {
      id: 1,
      name: 'Eren Yeager',
      role: 'Ana Kahraman / Titan Taşıyıcısı',
      image: '/images/characters/eren-yeager.webp',
      description: 'Kendini insanlığın özgürlüğüne adamış, kararlı ve öfkeli bir genç.',
      path: '/characters/eren-yeager',
    },
    {
      id: 2,
      name: 'Mikasa Ackerman',
      role: 'Savaşçı / Koruyucu',
      image: '/images/characters/mikasa-ackerman.webp',
      description: 'Olağanüstü savaş yeteneklerine sahip, Eren\'e karşı derin bir sevgi besleyen sadık bir koruyucu.',
      path: '/characters/mikasa-ackerman',
    },
    {
      id: 3,
      name: 'Armin Arlert',
      role: 'Stratejist / Titan Taşıyıcısı',
      image: '/images/characters/armin-arlert.webp',
      description: 'Zeki ve stratejik düşünme yeteneğine sahip, çatışmaları beyniyle çözmeye çalışan bir karakter.',
      path: '/characters/armin-arlert',
    },
    {
      id: 4,
      name: 'Levi Ackerman',
      role: 'Keşif Birliği Kaptanı',
      image: '/images/characters/levi-ackerman.webp',
      description: 'İnsanlığın en güçlü askeri olarak bilinen, disiplinli ve acımasız bir savaşçı.',
      path: '/characters/levi-ackerman',
    },
  ];

  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null);

  return (
    <section className="bg-[#10171F] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#FF4655]">Ana</span> Karakterler
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Attack on Titan'ın hikayesini şekillendiren ve dünyayı değiştiren karakterleri keşfedin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {mainCharacters.map((character) => (
            <Link 
              href={character.path} 
              key={character.id}
              className="group block"
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              <div className="bg-[#0A1018] border border-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-[#FF4655]/10 hover:border-[#FF4655]/20 hover:translate-y-[-5px] h-full">
                {/* Karakter görseli */}
                <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A1018]/30 to-transparent z-10"></div>
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      objectPosition: 'center top'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1018] to-transparent opacity-70"></div>
                </div>
                
                {/* Karakter bilgileri */}
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{character.name}</h3>
                  <p className="text-[#FF4655] text-xs sm:text-sm mb-2">{character.role}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{character.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/characters"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-[#FF4655]/70 text-[#FF4655] font-medium rounded-md hover:bg-[#FF4655]/10 transition-all duration-300"
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