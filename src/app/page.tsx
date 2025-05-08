"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import from our local mock instead of framer-motion
import { motion } from '@/utils/motion-mock';

import { useState, useEffect } from 'react';

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen overflow-x-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923] via-transparent to-[#0F1923]" />
        </div>

        {/* Hero içeriği */}
        <div className="container mx-auto px-4 relative z-10 mt-20">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight text-shadow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-[#FF4655]">Attack</span> on Titan
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl text-shadow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Keşfet, derinleşen gizem içindeki devlerin dünyasına dal ve insanlığın son kalesi içindeki karakterlerin hikayesini öğren.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link 
                href="/characters"
                className="px-8 py-3 bg-[#FF4655] text-white font-medium rounded-md hover:bg-[#ff2238] transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
              >
                Karakterleri Keşfet
              </Link>
              
              <Link 
                href="/titans"
                className="px-8 py-3 bg-transparent border-2 border-white/50 text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300 transform hover:scale-105"
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
            y: [0, 12, 0],
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

      {/* Categories Section using the component */}
      <CategoriesSection />

      {/* Characters Showcase Section */}
      <CharactersShowcase />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Quote Section */}
      <QuoteSection />
      
      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Video Trailer Section */}
      <VideoTrailerSection />
      
      {/* News & Updates Section */}
      <NewsUpdatesSection />
      
      {/* Fan Community Section */}
      <FanCommunitySection />
      
      {/* Gallery Section */}
      <GallerySection />
    </main>
  );
}
