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
    <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center relative">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="mb-10 text-center backdrop-blur-xl bg-[#0F1923]/20 p-6 rounded-xl border border-white/10 shadow-lg max-w-3xl mx-auto hover:border-white/20 transition-all duration-300 hover:shadow-xl">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium text-[#FF4655] tracking-widest uppercase bg-[#FF4655]/10 px-4 py-1 rounded-full backdrop-blur-sm">Kronoloji</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-[#FF4655]">Hikaye</span> Zaman Çizelgesi
          </h2>
          <div className="h-1 w-24 bg-[#FF4655] mx-auto mb-4"></div>
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
                  <div className="absolute left-0 top-3 md:hidden w-6 h-6 rounded-full border-2 border-[#FF4655] bg-[#0F1923]/30 backdrop-blur-xl shadow-md shadow-[#FF4655]/20"></div>
                  
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'text-left'} bg-[#0F1923]/20 backdrop-blur-xl p-5 rounded-lg border border-white/10 shadow-lg hover:shadow-[0_8px_20px_rgba(255,70,85,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:border-white/20 group`}>
                    <div className="inline-block px-3 py-1 bg-[#FF4655]/20 backdrop-blur-xl border border-[#FF4655]/20 rounded-md mb-3 group-hover:bg-[#FF4655]/30 transition-all duration-300">
                      <span className="text-[#FF4655] font-bold">Yıl {event.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#FF4655] transition-colors">{event.title}</h3>
                    <div className="h-0.5 w-12 bg-[#FF4655]/70 group-hover:w-full transition-all duration-500 mb-3"></div>
                    <p className="text-gray-300 bg-[#0F1923]/30 backdrop-blur-lg p-3 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">{event.description}</p>
                  </div>
                </div>
                
                {/* Desktop görünümde orta nokta - Mobil'de gizli */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-3 border-[#FF4655] bg-[#0F1923]/30 backdrop-blur-xl shadow-lg shadow-[#FF4655]/20 z-20"></div>
                </div>
                
                {/* Görsel alanı - Mobil'de tam genişlik */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-6">
                  <div className={`bg-[#0F1923]/20 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_8px_20px_rgba(255,70,85,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:border-white/20 group ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`} style={{maxWidth: '100%', width: index % 2 === 0 ? 'calc(100% - 24px)' : 'calc(100% - 24px)'}}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/80 via-[#0F1923]/40 to-transparent"></div>
                      <div className="absolute inset-0 bg-[#0F1923]/10 backdrop-blur-md opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                      
                      {/* Bottom shine effect */}
                      <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] group-hover:w-full transition-all duration-700 z-20"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 bg-[#0F1923]/40 backdrop-blur-xl px-3 py-1.5 rounded-lg text-white text-sm border border-white/10 hover:border-[#FF4655]/20 transition-all duration-300 group-hover:bg-[#0F1923]/50">
                        <span className="font-medium">{event.year}</span>
                      </div>
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