"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import from our local mock instead of framer-motion
import { motion } from '@/utils/motion-mock';

import { useState } from 'react';

// Import all homepage components
import HeroSection from '@/components/homepage/HeroSection';
import CategoriesSection from '@/components/homepage/CategoriesSection';
import QuoteSection from '@/components/homepage/QuoteSection';
import TimelineSection from '@/components/homepage/TimelineSection';
import NewsUpdatesSection from '@/components/homepage/NewsUpdatesSection';

// Kaydırma animasyonu için bileşen tipi
interface AnimatedSectionProps {
  id?: string;
  children: React.ReactNode;
  delay?: number;
}

// Kaydırma animasyonu için bileşen - daha hızlı
function AnimatedSection({ id, children, delay = 0 }: AnimatedSectionProps) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.05, // Daha erken tetiklenme için eşik değeri düşürüldü
        rootMargin: '0px 0px -2% 0px' // Görünür alan daha geniş
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`w-full transition-all duration-400 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        marginBottom: '3rem'
      }}
    >
      {children}
    </section>
  );
}

// İçerik bölümlerine hızlı erişim için menü - camsı tasarım ile
function ContentQuickMenu() {
  const contentLinks = [
    { name: 'Kategoriler', path: '#categories-section', icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Zaman Çizelgesi', path: '#timeline-section', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Güncellemeler', path: '#news-updates', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-20 bg-[#1A242D]/30 backdrop-blur-xl py-3 flex justify-center border-b border-white/5 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="container flex items-center justify-center overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 px-2 md:space-x-4 md:px-4">
          {contentLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => scrollToSection(link.path)}
              className="whitespace-nowrap px-4 py-2 text-xs md:text-sm text-gray-300 hover:text-white bg-[#0F1923]/20 hover:bg-[#FF4655]/10 rounded-md transition-all duration-300 flex items-center border border-white/5 hover:border-[#FF4655]/30 backdrop-blur-xl shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 md:mr-2 text-[#FF4655]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
              </svg>
              <span className="hidden md:inline">{link.name}</span>
              <span className="inline md:hidden">{link.name.substring(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Slider için görüntüler
  const images = [
    '/images/backgrounds/titan-bg.webp',
    // Daha fazla görüntü ekleyebilirsiniz
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Otomatik slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Sayfa kaydırma sorununu çözmek için
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen relative">
      {/* Sabit arka plan */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/backgrounds/titan-bg.webp"
          alt="Attack on Titan Background"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/70"></div>
      </div>
      
      {/* Hero Section - cam efekti ve vurgu çizgisiyle */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/50 via-[#0F1923]/40 to-transparent backdrop-blur-sm"></div>

        {/* Hero içeriği */}
        <div className="container mx-auto px-4 relative z-10 mt-16 md:mt-0">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-4"
            >
              <div className="inline-block px-5 py-2 bg-[#FF4655]/30 rounded-lg backdrop-blur-xl border border-[#FF4655]/20 shadow-lg shadow-[#FF4655]/10 hover:shadow-[#FF4655]/20 hover:bg-[#FF4655]/40 transition-all duration-300">
                <span className="text-sm font-medium text-white tracking-wide uppercase"></span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-[#FF4655]">Attack</span> on Titan
              <div className="h-1 w-24 bg-gradient-to-r from-[#FF4655]/80 to-[#FF4655] mt-4 mb-5 shadow-md"></div>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] bg-[#0F1923]/20 backdrop-blur-xl p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Keşfet, derinleşen gizem içindeki devlerin dünyasına dal ve insanlığın son kalesi içindeki karakterlerin hikayesini öğren.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link 
                href="/characters"
                className="px-6 py-3 bg-gradient-to-r from-[#FF4655]/80 to-[#FF4655] text-white font-medium rounded-md hover:from-[#FF4655] hover:to-[#FF4655] transition-all duration-300 transform hover:scale-105 shadow-[0_4px_8px_rgba(0,0,0,0.5)] border border-[#FF4655]/30 hover:border-[#FF4655]/50"
              >
                Karakterleri Keşfet
              </Link>
              
              <Link 
                href="/titans"
                className="px-6 py-3 bg-[#1A242D]/30 backdrop-blur-xl border border-white/10 text-white font-medium rounded-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:border-white/20"
              >
                Titanlar
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll animasyonu */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-300 text-sm mb-1 backdrop-blur-xl bg-[#0F1923]/40 px-4 py-2 rounded-full border border-white/10 shadow-lg hover:bg-[#0F1923]/50 transition-all duration-300">Keşfetmeye Başla</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-[#FF4655] filter drop-shadow-glow" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* İçerik Menüsü - cam efekti ile */}
      <ContentQuickMenu />

      {/* Ana İçerik Container - cam efekti */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Categories Section */}
          <AnimatedSection id="categories-section">
            <div className="bg-[#1A242D]/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="inline-flex items-center mb-4 md:mb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FF4655]/20 rounded-full mr-3 backdrop-blur-xl border border-[#FF4655]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-glow-white">Kategoriler</h2>
                </div>
              </div>
              <CategoriesSection />
            </div>
          </AnimatedSection>

          {/* Quote Section */}
          <AnimatedSection id="quote-section" delay={300}>
            <div className="bg-[#1A242D]/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500 relative">
              {/* Dekoratif elementler */}
              <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
              <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="inline-flex items-center mb-4 md:mb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FF4655]/20 rounded-full mr-3 backdrop-blur-xl border border-[#FF4655]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-glow-white">Alıntılar</h2>
                    <div className="h-1 w-16 bg-[#FF4655] mt-2"></div>
                  </div>
                </div>
                <div className="mb-4 md:mb-0">
                  <div className="rounded-full px-4 py-1 bg-[#FF4655]/30 backdrop-blur-xl border border-[#FF4655]/20 shadow-lg">
                    <span className="text-xs font-bold text-white tracking-widest uppercase">ALINTILAR</span>
                  </div>
                </div>
              </div>
              <QuoteSection />
            </div>
          </AnimatedSection>
          
          {/* Timeline Section */}
          <AnimatedSection id="timeline-section" delay={400}>
            <div className="bg-[#1A242D]/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500 relative">
              {/* Dekoratif elementler */}
              <div className="absolute top-0 right-0 -mt-10 mr-10 w-32 h-32 bg-gradient-to-br from-[#FF4655]/20 to-transparent rounded-full filter blur-2xl opacity-70"></div>
              <div className="absolute bottom-0 left-0 -mb-16 ml-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="inline-flex items-center mb-4 md:mb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FF4655]/20 rounded-full mr-3 backdrop-blur-xl border border-[#FF4655]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-glow-white">Zaman Çizelgesi</h2>
                    <div className="h-1 w-16 bg-[#FF4655] mt-2"></div>
                  </div>
                </div>
                <div className="mb-4 md:mb-0">
                  <div className="rounded-full px-4 py-1 bg-[#FF4655]/30 backdrop-blur-xl border border-[#FF4655]/20 shadow-lg">
                    <span className="text-xs font-bold text-white tracking-widest uppercase">ZAMAN ÇİZELGESİ</span>
                  </div>
                </div>
              </div>
              <TimelineSection />
            </div>
          </AnimatedSection>
          
          {/* News & Updates Section */}
          <AnimatedSection id="news-updates" delay={600}>
            <div className="bg-[#1A242D]/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="inline-flex items-center mb-4 md:mb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FF4655]/20 rounded-full mr-3 backdrop-blur-xl border border-[#FF4655]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-glow-white">Haberler & Güncellemeler</h2>
                </div>
              </div>
              <NewsUpdatesSection />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
