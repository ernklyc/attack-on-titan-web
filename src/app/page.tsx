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

      {/* Kategoriler Bölümü - Üst düzey tasarım */}
      <section className="w-full py-24 bg-[#0F1923] relative overflow-hidden">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4655]/10 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Başlık Bölümü - Geliştirilmiş */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-md mb-4">
              <span className="text-xs font-medium text-white tracking-wide uppercase">Attack on Titan Dünyası</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              <span className="relative">
                Keşfet
                <motion.div 
                  className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6">
              Attack on Titan evrenindeki karakterlerden lokasyonlara, titanlardan organizasyonlara kadar tüm detayları keşfedin.
            </p>
          </motion.div>

          {/* Ana kategori kartları kısmı - Düzenlenmiş boyutlar ve hizalama */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {/* Ana büyük kart - Karakterler Kartı */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="lg:col-span-1 h-[600px] flex"
            >
              <Link href="/characters" className="block w-full">
                <div className="glass-card rounded-2xl overflow-hidden relative group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 hover:border-[#FF4655]/30 transition-all duration-500 h-full">
                  <Image
                    src="/home_image/characters.jpg"
                    alt="Karakterler"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent opacity-80"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <div className="mb-4">
                      <span className="bg-gradient-to-r from-[#FF4655]/70 to-[#FF2238]/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs md:text-sm text-white font-medium shadow-lg border border-[#FF4655]/20 inline-flex items-center">
                        <motion.span 
                          className="inline-block h-2 w-2 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.span>
                        Ana Kategori
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 group-hover:text-[#FF4655] transition-colors duration-300">Karakterler</h3>
                    <div className="h-0.5 w-16 bg-[#FF4655] mb-3 group-hover:w-24 transition-all duration-500"></div>
                    
                    <p className="text-gray-300 text-sm md:text-base group-hover:text-white transition-colors duration-300">
                      Attack on Titan'ın en ikonik karakterleri, hikayeleri ve aralarındaki ilişkiler.
                    </p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center text-white font-medium text-sm md:text-base">
                        <span>Keşfet</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7-7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* Sağ taraftaki 2x2 grid - Aynı boyutlarda kartlar */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6 h-[600px]">
              {/* Titanlar Kartı */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="h-[290px]"
              >
                <Link href="/titans" className="block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden h-full relative group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 hover:border-blue-500/30 transition-all duration-500">
                    <Image
                      src="/home_image/titans.jpg"
                      alt="Titanlar"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent opacity-80"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                      <div className="mb-2">
                        <span className="bg-blue-500/40 backdrop-blur-md px-2 py-1 rounded-full text-xs text-blue-200 font-medium border border-blue-500/20 inline-flex">
                          Yaratıklar
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Titanlar</h3>
                      <div className="h-0.5 w-10 bg-blue-500 mb-2 group-hover:w-16 transition-all duration-500"></div>
                      
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                        Devasa titanlar ve güçleri
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              {/* Bölümler Kartı */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="h-[290px]"
              >
                <Link href="/episodes" className="block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden h-full relative group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 hover:border-green-500/30 transition-all duration-500">
                    <Image
                      src="/home_image/episodes.jpg"
                      alt="Bölümler"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent opacity-80"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                      <div className="mb-2">
                        <span className="bg-green-500/40 backdrop-blur-md px-2 py-1 rounded-full text-xs text-green-200 font-medium border border-green-500/20 inline-flex">
                          Anime
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Bölümler</h3>
                      <div className="h-0.5 w-10 bg-green-500 mb-2 group-hover:w-16 transition-all duration-500"></div>
                      
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                        Sezonların bölüm detayları
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Lokasyonlar Kartı */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="h-[290px]"
              >
                <Link href="/locations" className="block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden h-full relative group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 hover:border-amber-500/30 transition-all duration-500">
                    <Image
                      src="/home_image/locations.jpg"
                      alt="Lokasyonlar"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent opacity-80"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                      <div className="mb-2">
                        <span className="bg-amber-500/40 backdrop-blur-md px-2 py-1 rounded-full text-xs text-amber-200 font-medium border border-amber-500/20 inline-flex">
                          Dünya
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">Lokasyonlar</h3>
                      <div className="h-0.5 w-10 bg-amber-500 mb-2 group-hover:w-16 transition-all duration-500"></div>
                      
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                        Önemli mekanlar ve yerler
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              {/* Organizasyonlar Kartı */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="h-[290px]"
              >
                <Link href="/organizations" className="block h-full">
                  <div className="glass-card rounded-2xl overflow-hidden h-full relative group shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/10 hover:border-purple-500/30 transition-all duration-500">
                    <Image
                      src="/home_image/organizations.png"
                      alt="Organizasyonlar"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/70 to-transparent opacity-80"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                      <div className="mb-2">
                        <span className="bg-purple-500/40 backdrop-blur-md px-2 py-1 rounded-full text-xs text-purple-200 font-medium border border-purple-500/20 inline-flex">
                          Gruplar
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Organizasyonlar</h3>
                      <div className="h-0.5 w-10 bg-purple-500 mb-2 group-hover:w-16 transition-all duration-500"></div>
                      
                      <p className="text-gray-300 text-xs md:text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                        Askeri gruplar ve birlikler
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
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
                  src="/home_image/highlights.jpg"
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
    </main>
  );
}
