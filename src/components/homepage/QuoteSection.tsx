'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const quotes = [
    {
      text: "Bu dünyada yaşamaya devam etmek için, savaşmalısın.",
      character: "Eren Yeager",
      image: "/home_image/characters.jpg",
      position: "left"
    },
    {
      text: "İnsanlara güçlerini fark ettirdikten sonra, kendi güçlerini kullanmamalarını bekleyemezsin.",
      character: "Armin Arlert",
      image: "/home_image/titans.jpg",
      position: "center"
    },
    {
      text: "Birinin için ölmeye hazırsan, yaşamaya da hazır olmalısın.",
      character: "Mikasa Ackerman",
      image: "/home_image/episodes.jpg",
      position: "right"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dekoratif elementler */}
      <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/home_image/highlights.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/20 via-[#1A242D]/10 to-[#0F1923]/20 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Character Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
              <div className="relative h-[400px] w-full">
                {quotes.map((quote, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      currentQuote === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 hover:border-white/20 bg-[#1A242D]/20 backdrop-blur-lg shadow-xl hover:shadow-[0_8px_30px_rgba(255,70,85,0.15)] transition-all duration-500 transform hover:scale-[1.02] group">
                      <Image
                        src={quote.image}
                        alt={`${quote.character} from Attack on Titan`}
                        fill
                        className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                          quote.position === 'left' ? 'object-left' : 
                          quote.position === 'right' ? 'object-right' : 
                          'object-center'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/90 via-[#0F1923]/50 to-[#0F1923]/20"></div>
                      
                      {/* Glass effect overlay */}
                      <div className="absolute inset-0 bg-[#0F1923]/10 backdrop-blur-md opacity-40 group-hover:opacity-30 transition-opacity duration-300"></div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                      
                      {/* Character Name Glass Badge */}
                      <div className="absolute bottom-6 left-6">
                        <div className="bg-[#0F1923]/30 backdrop-blur-xl px-5 py-2.5 rounded-lg border border-white/10 hover:border-[#FF4655]/30 transition-all duration-300 shadow-lg group-hover:shadow-[#FF4655]/20">
                          <h4 className="text-white font-bold group-hover:text-[#FF4655] transition-colors">{quote.character}</h4>
                          <div className="h-0.5 w-0 bg-[#FF4655]/70 mt-1 group-hover:w-full transition-all duration-500"></div>
                        </div>
                      </div>
                      
                      {/* Bottom shine effect */}
                      <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] group-hover:w-full transition-all duration-700 z-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Quote */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="p-6 md:p-10 relative">
                {/* Quote content */}
                <div className={`transition-all duration-500 p-8 bg-[#1A242D]/20 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 shadow-xl hover:shadow-[0_8px_30px_rgba(255,70,85,0.15)] transform hover:-translate-y-1 group ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Dekoratif elementler */}
                  <div className="absolute top-2 right-2 w-24 h-24 bg-gradient-to-br from-[#FF4655]/10 to-transparent rounded-full filter blur-2xl opacity-40 pointer-events-none"></div>
                  
                  <svg className="w-12 h-12 text-[#FF4655]/40 mb-6 group-hover:text-[#FF4655]/60 transition-colors" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
                  </svg>
                  
                  <blockquote className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {quotes[currentQuote].text}
                  </blockquote>
                  
                  <div className="flex items-center bg-[#0F1923]/20 backdrop-blur-lg p-3 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 mt-6">
                    <div className="h-1 w-12 bg-[#FF4655] mr-4 group-hover:w-16 transition-all duration-500"></div>
                    <p className="text-lg font-medium text-white">
                      {quotes[currentQuote].character}
                    </p>
                  </div>
                  
                  {/* Quote Navigation */}
                  <div className="mt-8 flex justify-center md:justify-start space-x-3">
                    {quotes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsVisible(false);
                          setTimeout(() => {
                            setCurrentQuote(index);
                            setIsVisible(true);
                          }, 500);
                        }}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          currentQuote === index 
                            ? 'bg-[#FF4655] w-16 shadow-md shadow-[#FF4655]/20' 
                            : 'bg-white/20 hover:bg-white/30 w-3 hover:w-6'
                        }`}
                        aria-label={`Quote ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;