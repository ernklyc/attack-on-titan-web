'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Character = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  abilities: string[];
  color: string;
};

const characters: Character[] = [
  {
    id: 1,
    name: "Eren Yeager",
    role: "Ana Karakter / Titan Dönüşümcüsü",
    image: "/images/characters/eren.png",
    description: "Eren Yeager, Maria Duvarı'nın yıkılması ve annesinin Titanlar tarafından yenmesi sonrasında intikam yemini eden ana karakterdir. Daha sonra kendisinin de bir Titan dönüşümcüsü olduğu ortaya çıkar.",
    abilities: ["Saldırı Titanı", "Savaş Sanatları", "3D Manevra Ekipmanı"],
    color: "from-emerald-600 to-teal-800",
  },
  {
    id: 2,
    name: "Mikasa Ackerman",
    role: "Ana Karakter / Savaşçı",
    image: "/images/characters/mikasa.png",
    description: "Mikasa, Eren'in evlat edinilen kardeşi ve koruyucusudur. İnanılmaz fiziksel güce ve savaş yeteneklerine sahip elit bir savaşçıdır. Eren'e karşı derin bir bağlılık hisseder.",
    abilities: ["Üstün Fiziksel Güç", "Ackerman Gücü", "Eşsiz Savaş Yetenekleri"],
    color: "from-red-600 to-rose-800",
  },
  {
    id: 3,
    name: "Armin Arlert",
    role: "Ana Karakter / Stratejist",
    image: "/images/characters/armin.png",
    description: "Armin, fiziksel olarak zayıf ancak zekası ve stratejik düşünme yeteneğiyle öne çıkan bir karakterdir. Sık sık takımı zor durumlardan kurtaran planlar geliştirir.",
    abilities: ["Stratejik Deha", "Kolosal Titan", "Analitik Düşünme"],
    color: "from-blue-600 to-cyan-800",
  },
  {
    id: 4,
    name: "Levi Ackerman",
    role: "Kaptan / İnsanlığın En Güçlü Askeri",
    image: "/images/characters/levi.png",
    description: "Levi, Keşif Birliği'nin en güçlü askeri ve bir bölük kaptanıdır. Titanları öldürmede olağanüstü yeteneklere sahiptir ve disiplinli, titiz bir yapısı vardır.",
    abilities: ["Eşsiz 3D Manevra Ekipmanı Ustalığı", "Süper İnsan Gücü", "Liderlik"],
    color: "from-gray-700 to-gray-900",
  },
  {
    id: 5,
    name: "Erwin Smith",
    role: "Komutan / Stratejist",
    image: "/images/characters/erwin.png",
    description: "Erwin, Keşif Birliği'nin karizmatik ve cesur komutanıdır. İnsanlığın geleceği için büyük fedakarlıklar yapabilecek, vizyoner bir liderdir.",
    abilities: ["Stratejik Deha", "Karizmatik Liderlik", "Cesaret"],
    color: "from-amber-600 to-yellow-800",
  },
];

export default function CharactersShowcase() {
  const [activeCharacter, setActiveCharacter] = useState<Character>(characters[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCharacterClick = (character: Character) => {
    setActiveCharacter(character);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0F1923] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl md:text-5xl font-bold mb-3 text-white transition-all duration-700 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-5'
            }`}
          >
            Karakter <span className="text-red-500">Koleksiyonu</span>
          </h2>
          <p 
            className={`text-gray-400 max-w-2xl mx-auto text-lg transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-5'
            }`}
          >
            Attack on Titan'ın unutulmaz karakterleriyle tanışın. Titanlarla savaşan, hayatta kalmak için mücadele eden bu karakterlerin destansı hikayesine tanık olun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center" ref={containerRef}>
          {/* Karakter Detay Bölümü */}
          <div 
            className={`bg-gray-900/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-800 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${activeCharacter.color} flex items-center justify-center overflow-hidden`}>
                  <Image
                    src={activeCharacter.image}
                    alt={activeCharacter.name}
                    width={50}
                    height={50}
                    className="object-cover w-12 h-12"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">{activeCharacter.name}</h3>
                  <p className="text-gray-400">{activeCharacter.role}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">{activeCharacter.description}</p>
              
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-3">Yetenekler</h4>
                <ul className="space-y-2">
                  {activeCharacter.abilities.map((ability, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-gray-300">{ability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Karakter Seçim Bölümü */}
          <div 
            className={`grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'
            }`}
          >
            {characters.map((character) => (
              <div 
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className={`
                  cursor-pointer transition-all duration-300 transform hover:scale-105
                  rounded-2xl overflow-hidden border-2 
                  ${activeCharacter.id === character.id 
                    ? 'border-red-500 shadow-lg shadow-red-500/20' 
                    : 'border-gray-700 hover:border-gray-500'}
                `}
              >
                <div className={`h-36 bg-gradient-to-br ${character.color} relative flex items-center justify-center`}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={100}
                    height={120}
                    className="object-contain h-28 w-auto"
                  />
                </div>
                <div className="p-3 bg-gray-900/80">
                  <h3 className="text-sm font-semibold text-white truncate">{character.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{character.role.split('/')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 