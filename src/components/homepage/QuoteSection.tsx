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
    <section className="relative py-24 overflow-hidden bg-aot-dark">
      <div className="absolute inset-0 bg-[url('/home_image/highlights.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923] via-transparent to-[#0F1923]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
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
                    <div className="relative h-full w-full">
                      <Image
                        src={quote.image}
                        alt={`${quote.character} from Attack on Titan`}
                        fill
                        className={`object-cover rounded-lg shadow-2xl ${
                          quote.position === 'left' ? 'object-left' : 
                          quote.position === 'right' ? 'object-right' : 
                          'object-center'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A121A] to-transparent rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Quote */}
            <div className="w-full md:w-1/2 order-1 md:order-2 md:pl-10">
              <div className="mb-4 inline-block">
                <span className="px-4 py-1 border border-[#FF4655]/30 text-[#FF4655] rounded-full text-sm font-medium tracking-wider uppercase bg-[#0F1923]/50 backdrop-blur-sm">
                  Ünlü Sözler
                </span>
              </div>
              
              <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="w-12 h-12 text-[#FF4655]/40 mb-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
                </svg>
                
                <blockquote className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {quotes[currentQuote].text}
                </blockquote>
                
                <div className="flex items-center">
                  <div className="h-1 w-12 bg-[#FF4655] mr-4"></div>
                  <p className="text-lg font-medium text-white">
                    {quotes[currentQuote].character}
                  </p>
                </div>
                
                {/* Quote Navigation */}
                <div className="mt-10 flex space-x-3">
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
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentQuote === index 
                          ? 'bg-[#FF4655] w-12' 
                          : 'bg-white/30 hover:bg-white/50'
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
    </section>
  );
};

export default QuoteSection;