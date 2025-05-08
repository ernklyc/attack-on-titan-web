'use client';

import React, { useEffect } from 'react';
import '../styles/Home.css';

// Yeni ve optimize edilmiş bileşenleri içe aktarma
import HeroSection from '../components/homepage/HeroSection';
import SpotlightSection from '../components/homepage/SpotlightSection';
import CharactersShowcase from '../components/homepage/CharactersShowcase';
import TimelineSection from '../components/homepage/TimelineSection';
import GallerySection from '../components/homepage/GallerySection';
import FanCommunitySection from '../components/homepage/FanCommunitySection';
import NewsUpdatesSection from '../components/homepage/NewsUpdatesSection';
import CallToActionSection from '../components/homepage/CallToActionSection';
import QuoteSection from '../components/homepage/QuoteSection';
import VideoTrailerSection from '../components/homepage/VideoTrailerSection';
import CategoriesSection from '../components/homepage/CategoriesSection';
import FeaturedSection from '../components/homepage/FeaturedSection';

export default function Home() {
  // Sayfa için animasyon stillerini ekle
  useEffect(() => {
    const addAnimationStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Ana animasyon stilleri */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .reveal-delay-100 { transition-delay: 100ms; }
        .reveal-delay-200 { transition-delay: 200ms; }
        .reveal-delay-300 { transition-delay: 300ms; }
        .reveal-delay-400 { transition-delay: 400ms; }
        .reveal-delay-500 { transition-delay: 500ms; }
        
        /* Gelişmiş parçacık animasyonları */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        
        .particle-red {
          background: radial-gradient(circle, rgba(255,70,85,0.35) 0%, rgba(255,70,85,0) 70%);
          animation: float-slow 15s infinite ease-in-out;
        }
        
        .particle-blue {
          background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%);
          animation: float-slow 18s infinite ease-in-out reverse;
        }
        
        .particle-white {
          background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%);
          animation: float-slow 12s infinite ease-in-out 2s;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-40px) translateX(30px) rotate(5deg); }
          50% { transform: translateY(-10px) translateX(50px) rotate(0deg); }
          75% { transform: translateY(40px) translateX(20px) rotate(-5deg); }
        }
        
        @keyframes scroll-indicator {
          0% { opacity: 0.8; transform: translateY(0); }
          50% { opacity: 0.2; transform: translateY(8px); }
          100% { opacity: 0.8; transform: translateY(0); }
        }
        
        .scroll-indicator {
          animation: scroll-indicator 2s infinite ease-in-out;
        }
        
        /* Arka plan geçiş efektleri */
        .bg-transition {
          transition: background-position 0.8s ease, opacity 0.8s ease;
        }
        
        /* Metnin altını çizen animasyon */
        .animate-underline:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -3px;
          left: 0;
          background-color: #FF4655;
          transition: width 0.5s ease;
        }
        
        .animate-underline:hover:after {
          width: 100%;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Scroll reveal animasyonu için IntersectionObserver kullanımı
    const setupScrollReveal = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.15 });
      
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
      });
    };
    
    addAnimationStyles();
    
    // DOM tamamen yüklendikten sonra scroll reveal'i başlat
    setTimeout(() => {
      setupScrollReveal();
    }, 100);
    
    // Parçacık animasyonları için DOM elemanları oluştur
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      // Kırmızı parçacıklar
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-red`;
        particle.style.width = `${Math.random() * 150 + 100}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 90}%`;
        particle.style.top = `${Math.random() * 90}%`;
        particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        container.appendChild(particle);
      }
      
      // Mavi parçacıklar
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-blue`;
        particle.style.width = `${Math.random() * 180 + 150}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 90}%`;
        particle.style.top = `${Math.random() * 90}%`;
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        container.appendChild(particle);
      }
      
      // Beyaz parçacıklar
      for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-white`;
        particle.style.width = `${Math.random() * 80 + 50}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 90}%`;
        particle.style.top = `${Math.random() * 90}%`;
        particle.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        container.appendChild(particle);
      }
    };
    
    setTimeout(createParticles, 500);
    
    // Temizlik işlemi
    return () => {
      document.querySelectorAll('.particle').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1923] text-white overflow-hidden relative">
      {/* Parçacık animasyonları için konteyner */}
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none z-0"></div>
      
      {/* Ana sayfa bölümleri */}
      <HeroSection />
      <SpotlightSection />
      <CharactersShowcase />
      <TimelineSection />
      <GallerySection />
      <NewsUpdatesSection />
      <FanCommunitySection />
      <CallToActionSection />
      <QuoteSection />
      <VideoTrailerSection />
      <CategoriesSection />
      <FeaturedSection />
    </div>
  );
}