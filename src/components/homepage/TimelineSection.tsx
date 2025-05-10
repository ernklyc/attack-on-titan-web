'use client';

import React from 'react';
import Image from 'next/image';

export default function TimelineSection() {
  const timelineEvents = [
    {
      id: 1,
      year: "845",
      title: "Duvarın Yıkılışı",
      description: "Colossal Titan ve Armored Titan'ın saldırısıyla Maria Duvarı yıkıldı ve insanlık topraklarının %20'sini kaybetti.",
      image: "/images/timeline/wall-breach.webp"
    },
    {
      id: 2,
      year: "850",
      title: "Trost Savaşı",
      description: "Eren ilk kez Titan formuna dönüştü ve insanlık tarihinde ilk kez bir bölgeyi geri almayı başardı.",
      image: "/images/timeline/trost-battle.webp"
    },
    {
      id: 3,
      year: "850",
      title: "Female Titan Olayı",
      description: "Keşif Birliği'nin 57. seferi sırasında Female Titan ortaya çıktı ve birçok askerin ölümüne neden oldu.",
      image: "/images/timeline/female-titan.webp"
    },
    {
      id: 4,
      year: "851",
      title: "Denize Ulaşma",
      description: "Duvarların ötesindeki dünyaya ulaşan Keşif Birliği, denizi ve düşman topraklarını keşfetti.",
      image: "/images/timeline/ocean.webp"
    }
  ];
  return (
    <section className="bg-aot-dark py-16 md:py-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#FF4655]">Hikaye</span> Zaman Çizelgesi
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Attack on Titan evrenindeki önemli olayları kronolojik olarak keşfedin.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline orta çizgi - Sadece tablet ve üstü ekranlarda görünür */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-px bg-gradient-to-b from-[#FF4655]/10 via-[#FF4655]/40 to-[#FF4655]/10"></div>
          
          {/* Timeline olaylar */}
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`flex flex-col md:flex-row items-start md:items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Mobil görünümde başlık ve açıklama üstte */}
                <div className="w-full pl-8 md:pl-0 md:w-1/2 md:px-6 mb-4 md:mb-0 relative">
                  {/* Mobil görünümde soldaki nokta */}
                  <div className="absolute left-0 top-3 md:hidden w-6 h-6 rounded-full border-2 border-[#FF4655] bg-[#0A1018] shadow-md shadow-[#FF4655]/10"></div>
                  
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                    <div className="inline-block px-3 py-1 bg-[#FF4655]/10 border border-[#FF4655]/20 rounded-md mb-2">
                      <span className="text-[#FF4655] font-bold">Yıl {event.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
                
                {/* Desktop görünümde orta nokta - Mobil'de gizli */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-3 border-[#FF4655] bg-[#0A1018] shadow-md shadow-[#FF4655]/10"></div>
                </div>
                
                {/* Görsel alanı - Mobil'de tam genişlik */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-6">
                  <div className={`bg-[#10171F] border border-gray-800 rounded-lg overflow-hidden shadow-md ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`} style={{maxWidth: '100%', width: index % 2 === 0 ? 'calc(100% - 24px)' : 'calc(100% - 24px)'}}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1018]/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}