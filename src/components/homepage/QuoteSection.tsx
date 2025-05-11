'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const QuoteSection = () => {
  // Örnek alıntılar
  const quotes = [
    {
      text: "Bu dünyada yaşamaya devam etmek için, savaşmalısın.",
      character: "Eren Yeager",
      image: "/home_image/characters.jpg",
      color: "text-[#FF4655]",
      bgColor: "bg-[#FF4655]/50",
      borderColor: "hover:border-[#FF4655]/30",
      shadowColor: "hover:shadow-[#FF4655]/10",
      lineColor: "bg-[#FF4655]",
      hoverTextColor: "group-hover:text-[#FF4655]"
    },
    {
      text: "İnsanlara güçlerini fark ettirdikten sonra, kendi güçlerini kullanmamalarını bekleyemezsin.",
      character: "Armin Arlert",
      image: "/home_image/titans.jpg",
      color: "text-blue-400",
      bgColor: "bg-blue-500/50",
      borderColor: "hover:border-blue-500/30",
      shadowColor: "hover:shadow-blue-500/10",
      lineColor: "bg-blue-500",
      hoverTextColor: "group-hover:text-blue-400"
    },
    {
      text: "Birinin için ölmeye hazırsan, yaşamaya da hazır olmalısın.",
      character: "Mikasa Ackerman",
      image: "/home_image/episodes.jpg",
      color: "text-green-400",
      bgColor: "bg-green-500/50",
      borderColor: "hover:border-green-500/30",
      shadowColor: "hover:shadow-green-500/10",
      lineColor: "bg-green-500",
      hoverTextColor: "group-hover:text-green-400"
    }
  ];

  return (
    <section className="py-12 relative">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium text-[#FF4655] tracking-widest uppercase bg-[#FF4655]/10 px-4 py-1 rounded-full">İlham Verici</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Alıntılar</h2>
          <div className="h-1 w-24 bg-[#FF4655] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Anime'nin en unutulmaz repliklerini ve karakterlerin ilham verici sözlerini keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div 
              key={index}
              className="group relative rounded-[32px] overflow-hidden shadow-xl border border-white/10 hover:border-white/20 bg-[rgba(7,6,6,0.37)] backdrop-filter backdrop-blur-[35.9px] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={quote.image} 
                  alt={`Quote by ${quote.character}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`${quote.bgColor} px-3 py-1 rounded-full text-xs text-white font-medium backdrop-blur-sm`}>
                    Alıntı
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${quote.color} opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <blockquote className="text-xl font-medium text-white mb-4 italic">
                  "{quote.text}"
                </blockquote>
                
                <div className={`h-1 w-12 ${quote.lineColor} mb-4 group-hover:w-24 transition-all duration-500`}></div>
                
                <div className="flex items-center mt-4">
                  <div className="inline-flex items-center bg-[rgba(7,6,6,0.37)] backdrop-filter backdrop-blur-[35.9px] p-2 rounded-[32px] border border-white/5 hover:border-white/10 transition-all duration-300">
                    <p className={`text-lg font-medium text-white ${quote.hoverTextColor} transition-colors`}>
                      {quote.character}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Bottom shine effect */}
              <div className={`absolute bottom-0 h-1 w-0 bg-gradient-to-r from-${quote.lineColor}/70 to-${quote.lineColor} group-hover:w-full transition-all duration-700 z-20`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;