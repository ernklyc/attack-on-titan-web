'use client';

import React, { useEffect } from 'react';
import '../styles/Home.css';

// Import the homepage section components
import HeroSection from '../components/homepage/HeroSection';
import FeaturedSection from '../components/homepage/FeaturedSection';
import QuoteSection from '../components/homepage/QuoteSection';
import VideoTrailerSection from '../components/homepage/VideoTrailerSection';
import NewsUpdatesSection from '../components/homepage/NewsUpdatesSection';
import CategoriesSection from '../components/homepage/CategoriesSection';
import CallToActionSection from '../components/homepage/CallToActionSection';

export default function Home() {
  // Add particle effects and animated styles to the page
  useEffect(() => {
    // Add any global animations or effects here if needed
    const addAnimationStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Animated particles */
        .particle-1, .particle-2, .particle-3 {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
        }
        
        .particle-1 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255,70,85,0.5) 0%, rgba(255,70,85,0) 70%);
          top: 10%;
          left: 20%;
          animation: float 8s infinite ease-in-out;
        }
        
        .particle-2 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%);
          bottom: 10%;
          right: 20%;
          animation: float 12s infinite ease-in-out reverse;
        }
        
        .particle-3 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          top: 50%;
          left: 50%;
          animation: float 10s infinite ease-in-out 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(20px); }
          50% { transform: translateY(0) translateX(40px); }
          75% { transform: translateY(30px) translateX(20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 6s infinite 3s;
        }
        
        @keyframes scrollDown {
          0% { opacity: 1; transform: translateY(0); }
          75% { opacity: 0; transform: translateY(8px); }
          76% { opacity: 0; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-scrollDown {
          animation: scrollDown 2s infinite;
        }
      `;
      document.head.appendChild(style);
    };
    
    addAnimationStyles();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1923] text-white overflow-hidden">
      <HeroSection />
      <FeaturedSection />
      <QuoteSection />
      <VideoTrailerSection />
      <NewsUpdatesSection />
      <CategoriesSection />
      <CallToActionSection />
    </div>
  );
}