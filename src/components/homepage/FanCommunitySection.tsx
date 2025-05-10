'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type FanArt = {
  id: number;
  title: string;
  artist: string;
  image: string;
  likes: number;
};

type CommunityEvent = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
};

const fanArtworks: FanArt[] = [
  {
    id: 1,
    title: "Eren'in Titan Dönüşümü",
    artist: "TitanFanArt",
    image: "/images/community/fanart-1.jpg",
    likes: 1452
  },
  {
    id: 2,
    title: "Levi vs Beast Titan",
    artist: "AOTSuperFan",
    image: "/images/community/fanart-2.jpg",
    likes: 2104
  },
  {
    id: 3,
    title: "Mikasa Portesi",
    artist: "AnimeArtist",
    image: "/images/community/fanart-3.jpg",
    likes: 1823
  },
  {
    id: 4,
    title: "Duvarların Yıkılışı",
    artist: "MangaLover",
    image: "/images/community/fanart-4.jpg",
    likes: 967
  }
];

const communityEvents: CommunityEvent[] = [
  {
    id: 1,
    title: "Attack on Titan Fan Buluşması",
    date: "15 Haziran 2024",
    location: "İstanbul",
    image: "/images/community/event-1.jpg",
    description: "Tüm Attack on Titan fanlarının bir araya geleceği büyük buluşma. Cosplay yarışması, özel gösterimler ve daha fazlası."
  },
  {
    id: 2,
    title: "Manga Çizim Atölyesi",
    date: "28 Temmuz 2024",
    location: "Ankara",
    image: "/images/community/event-2.jpg",
    description: "Attack on Titan manga sanatçılarından çizim teknikleri öğrenin. Tüm seviyelere açık atölye çalışması."
  },
  {
    id: 3,
    title: "Anime Müzik Konseri",
    date: "10 Ağustos 2024",
    location: "İzmir",
    image: "/images/community/event-3.jpg",
    description: "Attack on Titan ve diğer popüler anime müziklerinin canlı performansı. Unutulmaz bir müzik deneyimi."
  }
];

export default function FanCommunitySection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'fanart' | 'events'>('fanart');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-[#0F1923] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/texture-bg.png')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Fan <span className="text-red-500">Topluluğu</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Attack on Titan hayranlarının oluşturduğu muhteşem içerikler ve yaklaşan topluluk etkinliklerini keşfedin.
          </p>
        </div>
        
        {/* Tab Menüsü */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveTab('fanart')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'fanart' 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-transparent text-gray-300 hover:text-white'
              }`}
            >
              Fan Sanatı
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'events' 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-transparent text-gray-300 hover:text-white'
              }`}
            >
              Topluluk Etkinlikleri
            </button>
          </div>
        </div>
        
        {/* Fan Sanatı İçeriği */}
        {activeTab === 'fanart' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fanArtworks.map((art) => (
              <div 
                key={art.id}
                className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:scale-[1.02]"
              >
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 text-lg">{art.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">Sanatçı: {art.artist}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {art.likes.toLocaleString()}
                    </span>
                    <button className="ml-auto bg-gray-800 hover:bg-red-500 text-gray-300 hover:text-white px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300">
                      Beğen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Topluluk Etkinlikleri İçeriği */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:scale-[1.02]"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                      {event.date}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                  <button className="w-full bg-gray-800 hover:bg-red-500 text-gray-300 hover:text-white py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center">
                    <span>Etkinliğe Katıl</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Topluluk Katılım CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Fan Topluluğumuza Katılın
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Kendi fan sanatınızı paylaşın, etkinliklere katılın ve dünya çapındaki Attack on Titan hayranlarıyla bağlantı kurun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Hemen Üye Ol
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 