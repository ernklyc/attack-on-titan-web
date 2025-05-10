'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  description: string;
  category: 'battle' | 'character' | 'titan' | 'scenery';
};

const galleryImages: GalleryImage[] = [
  {
    id: 1, 
    src: '/images/gallery/battle-scene-1.jpg',
    alt: 'Eren ve Mikasa savaş sahnesinde',
    description: 'Eren ve Mikasa, Trost Bölgesi Muharebesi sırasında omuz omuza savaşıyor.',
    category: 'battle'
  },
  {
    id: 2, 
    src: '/images/gallery/titan-form-1.jpg',
    alt: 'Eren\'in Titan formu',
    description: 'Eren\'in Saldırı Titanı formunda dövüş anı.',
    category: 'titan'
  },
  {
    id: 3, 
    src: '/images/gallery/characters-1.jpg',
    alt: 'Keşif Birliği karakterleri',
    description: 'Levi, Erwin ve Hange, yeni bir sefer için strateji toplantısında.',
    category: 'character'
  },
  {
    id: 4, 
    src: '/images/gallery/wall-maria.jpg',
    alt: 'Maria Duvarı manzarası',
    description: 'Maria Duvarı\'nın etkileyici görüntüsü ve arkasındaki yerleşim bölgesi.',
    category: 'scenery'
  },
  {
    id: 5, 
    src: '/images/gallery/colossal-titan.jpg',
    alt: 'Kolosal Titan',
    description: 'Kolosal Titan\'ın Maria Duvarı\'nı aşan devasa görünümü.',
    category: 'titan'
  },
  {
    id: 6, 
    src: '/images/gallery/survey-corps.jpg',
    alt: 'Keşif Birliği operasyonda',
    description: 'Keşif Birliği\'nin duvar dışına çıkarken çekilmiş etkileyici fotoğrafı.',
    category: 'character'
  },
  {
    id: 7, 
    src: '/images/gallery/battle-scene-2.jpg',
    alt: 'Trost Bölgesi Muharebesi',
    description: 'Trost Bölgesi Muharebesi sırasında askerler ve titanlar arasındaki çatışma.',
    category: 'battle'
  },
  {
    id: 8, 
    src: '/images/gallery/underground-city.jpg',
    alt: 'Yeraltı Şehri',
    description: 'Duvarların içinde yer alan gizemli yeraltı şehrinin görüntüsü.',
    category: 'scenery'
  },
];

export default function GallerySection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A111A] to-[#0F1923] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/texture-bg.png')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div 
          className={`text-center mb-12 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
            Görsel <span className="text-red-500">Galeri</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Attack on Titan evreninden en etkileyici kareler. Duvarların içindeki ve dışındaki yaşamın, savaşların ve karakterlerin anlarına göz atın.
          </p>
        </div>
        
        {/* Filtre butonları */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
        >
          {['all', 'battle', 'character', 'titan', 'scenery'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === category 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
              `}
            >
              {category === 'all' ? 'Tümünü Göster' : 
               category === 'battle' ? 'Savaş Sahneleri' :
               category === 'character' ? 'Karakterler' :
               category === 'titan' ? 'Titanlar' : 'Manzaralar'}
            </button>
          ))}
        </div>
        
        {/* Galeri Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`
                relative group overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm 
                hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 transform
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-semibold mb-1">{image.alt}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* "Daha Fazla Göster" butonu */}
        <div 
          className={`text-center mt-10 transition-all duration-700 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Tüm Galeriyi Keşfet
          </button>
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <button 
                className="absolute top-4 right-4 bg-black/60 rounded-full p-2 text-white hover:bg-black"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-2">{selectedImage.alt}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 