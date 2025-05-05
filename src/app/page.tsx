"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import from our local mock instead of framer-motion
import { motion } from '@/utils/motion-mock';

import { useState, useEffect } from 'react';

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

      {/* Kategoriler Bölümü */}
      <section className="w-full py-20 bg-[#0F1923]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Keşfet</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Attack on Titan evreninde keşfedebileceğiniz birçok kategori var.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Karakterler Kartı */}
            <motion.div variants={fadeInUp}>
              <Link href="/characters" className="block">
                <div className="glass-card rounded-xl overflow-hidden h-64 relative group img-hover-zoom">
                  <Image
                    src="/images/character-placeholder.png"
                    alt="Karakterler"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Karakterler</h3>
                    <p className="text-gray-300 text-sm">
                      Attack on Titan'ın unutulmaz karakterleri hakkında bilgi edinin
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Titanlar Kartı */}
            <motion.div variants={fadeInUp}>
              <Link href="/titans" className="block">
                <div className="glass-card rounded-xl overflow-hidden h-64 relative group img-hover-zoom">
                  <Image
                    src="/images/character-placeholder.png"
                    alt="Titanlar"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Titanlar</h3>
                    <p className="text-gray-300 text-sm">
                      Devasa titanlar ve onların güçlerini keşfedin
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Bölümler Kartı */}
            <motion.div variants={fadeInUp}>
              <Link href="/episodes" className="block">
                <div className="glass-card rounded-xl overflow-hidden h-64 relative group img-hover-zoom">
                  <Image
                    src="/images/character-placeholder.png"
                    alt="Bölümler"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Bölümler</h3>
                    <p className="text-gray-300 text-sm">
                      Tüm sezonların bölüm özetleri ve detayları
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/locations"
              className="inline-flex items-center text-[#FF4655] hover:text-white transition-colors duration-300"
            >
              <span>Tüm kategorileri keşfet</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Spotlight / Featured Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF4655]/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Öne Çıkanlar</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Attack on Titan evreninin en etkileyici anları ve karakterleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Duvarların Sırrı</h3>
              <p className="text-gray-300 mb-6">
                Üç duvar arasında yaşayan insanlık, dışarıdaki dev titanlardan korunmak için yüzlerce yıldır bu duvarlara sığınıyor. Ancak duvarların ardında çok daha büyük sırlar ve gerçekler gizleniyor...
              </p>
              <Link 
                href="/organizations"
                className="px-6 py-2 bg-[#FF4655]/90 text-white font-medium rounded-md hover:bg-[#FF4655] transition-colors duration-300 inline-flex items-center"
              >
                <span>Daha Fazla</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="order-1 lg:order-2 glass-card rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src="/images/backgrounds/titan-bg.webp"
                  alt="Duvarların Sırrı"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F1923]/50 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter / Call to Action */}
      <section className="w-full py-16 bg-gradient-to-b from-transparent to-[#0F1923]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Attack on Titan evrenini keşfetmeye başla
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Karakterler, titanlar ve Attack on Titan'ın sırları hakkında her şeyi öğrenin.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/characters"
                className="px-8 py-3 bg-[#FF4655] text-white font-medium rounded-md hover:bg-[#ff2238] transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
              >
                Şimdi Keşfet
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
