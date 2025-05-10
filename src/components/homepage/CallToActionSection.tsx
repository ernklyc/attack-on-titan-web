'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CallToActionSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  return (
    <section 
      ref={sectionRef}
      className="bg-aot-dark py-16 md:py-24 min-h-screen flex flex-col justify-center relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 16, 24, 0.9), rgba(10, 16, 24, 0.98)), url(/images/backgrounds/titan-bg.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dekoratif elementler */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FF4655]/10 to-transparent rounded-full filter blur-[120px] opacity-30"></div>
        <div className="absolute -bottom-48 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-[120px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="relative inline-block">
                Özgürlüğün Peşindeki Yolculuğa Katıl
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
              </span>
            </h2>
            
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Attack on Titan'ın etkileyici dünyasını keşfet. 
              Karakterlerden titanlara, organizasyonlardan önemli bölümlere kadar tüm detayları öğren.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link 
                href="/characters" 
                className="px-8 py-4 bg-gradient-to-r from-[#FF4655] to-[#FF2238] text-white font-medium rounded-md hover:shadow-lg hover:shadow-[#FF4655]/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Keşfetmeye Başla
              </Link>
              
              <Link 
                href="/episodes" 
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-medium rounded-md hover:border-white hover:bg-white/5 transform hover:-translate-y-1 transition-all duration-300"
              >
                Bölümleri İzle
              </Link>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className={`bg-[#131E2A]/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FF4655]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FF4655]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Karakterleri Tanı</h3>
              <p className="text-gray-300">Eren Yeager'dan Mikasa Ackerman'a, Levi'den Historia'ya kadar tüm sevdiğiniz karakterlerin derinlemesine analizlerini bulun.</p>
            </div>
            
            <div className={`bg-[#131E2A]/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FF4655]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FF4655]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bölümleri İzle</h3>
              <p className="text-gray-300">Tüm sezonların bölümlerini, özel bölümleri ve OVA'ları detaylı özetleri ve izleme rehberleri ile keşfedin.</p>
            </div>
            
            <div className={`bg-[#131E2A]/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FF4655]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FF4655]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Topluluk Oluştur</h3>
              <p className="text-gray-300">Diğer hayranlarla tartışın, teorileri paylaşın ve çevrimiçi etkinliklere katılarak Attack on Titan deneyiminizi geliştirin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;