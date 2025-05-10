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
import CharactersShowcase from '@/components/homepage/CharactersShowcase';
import FeaturedSection from '@/components/homepage/FeaturedSection';
import QuoteSection from '@/components/homepage/QuoteSection';
import TimelineSection from '@/components/homepage/TimelineSection';
import VideoTrailerSection from '@/components/homepage/VideoTrailerSection';
import NewsUpdatesSection from '@/components/homepage/NewsUpdatesSection';
import FanCommunitySection from '@/components/homepage/FanCommunitySection';
import GallerySection from '@/components/homepage/GallerySection';

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

// İçerik bölümlerine hızlı erişim için menü
function ContentQuickMenu() {
  const contentLinks = [
    { name: 'Ana Karakterler', path: '#characters-showcase', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Titanlar', path: '#featured-section', icon: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' },
    { name: 'Zaman Çizelgesi', path: '#timeline-section', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Video Fragmanı', path: '#video-trailer', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Güncellemeler', path: '#news-updates', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'Galeri', path: '#gallery-section', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-20 bg-[#1A242D]/80 backdrop-blur-xl py-2 flex justify-center border-b border-white/5">
      <div className="container flex items-center justify-center overflow-x-auto hide-scrollbar">
        <div className="flex space-x-1 px-1 md:space-x-3 md:px-4">
          {contentLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => scrollToSection(link.path)}
              className="whitespace-nowrap px-3 py-2 text-xs md:text-sm text-gray-300 hover:text-white hover:bg-[#FF4655]/10 rounded-md transition-all duration-200 flex items-center border border-white/5 hover:border-[#FF4655]/30"
            >
              <svg className="w-4 h-4 md:mr-1.5 text-[#FF4655]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    <main className="flex flex-col items-center min-h-screen bg-[#0F1923] text-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Arkaplan görüntüsü */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[currentImage]}
            alt="Attack on Titan"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/80 via-[#0F1923]/60 to-[#0F1923]/95"></div>
        </div>

        {/* Hero içeriği */}
        <div className="container mx-auto px-4 relative z-10 mt-16 md:mt-0">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-[#FF4655]">Attack</span> on Titan
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
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
                className="px-6 py-3 bg-gradient-to-r from-[#FF4655]/90 to-[#FF4655] text-white font-medium rounded-md hover:from-[#FF4655] hover:to-[#FF4655] transition-all duration-300 transform hover:scale-105 shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              >
                Karakterleri Keşfet
              </Link>
              
              <Link 
                href="/titans"
                className="px-6 py-3 bg-[#1A242D]/60 backdrop-blur-lg border border-white/10 text-white font-medium rounded-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
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
            <span className="text-gray-300 text-sm mb-1">Kaydır</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* İçerik Menüsü */}
      <ContentQuickMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <AnimatedSection id="categories-section">
          <CategoriesSection />
        </AnimatedSection>

        {/* Characters Showcase Section */}
        <AnimatedSection id="characters-showcase" delay={100}>
          <CharactersShowcase />
        </AnimatedSection>

        {/* Featured Section */}
        <AnimatedSection id="featured-section" delay={200}>
          <FeaturedSection />
        </AnimatedSection>

        {/* Quote Section */}
        <AnimatedSection id="quote-section" delay={300}>
          <QuoteSection />
        </AnimatedSection>
        
        {/* Timeline Section */}
        <AnimatedSection id="timeline-section" delay={400}>
          <TimelineSection />
        </AnimatedSection>
        
        {/* Video Trailer Section */}
        <AnimatedSection id="video-trailer" delay={500}>
          <VideoTrailerSection />
        </AnimatedSection>
        
        {/* News & Updates Section */}
        <AnimatedSection id="news-updates" delay={600}>
          <NewsUpdatesSection />
        </AnimatedSection>
        
        {/* Fan Community Section */}
        <AnimatedSection id="fan-community-section" delay={700}>
          <FanCommunitySection />
        </AnimatedSection>
        
        {/* Gallery Section */}
        <AnimatedSection id="gallery-section" delay={800}>
          <GallerySection />
        </AnimatedSection>
      </div>
    </main>
  );
}
