'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    {
      id: 1,
      src: "/home_image/titans.jpg",
      alt: "Attack on Titan Savaş Sahnesi",
      category: "Aksiyon",
      description: "Eren'in titan formunda düşman titanlar ile çarpışması"
    },
    {
      id: 2,
      src: "/home_image/characters.jpg",
      alt: "Ana Karakterler",
      category: "Karakterler",
      description: "Eren, Mikasa ve Armin keşif birliği üniformalarıyla"
    },
    {
      id: 3,
      src: "/home_image/highlights.jpg",
      alt: "Duvarlar",
      category: "Lokasyon",
      description: "İnsanlığı koruyan devasa duvarların panoramik görüntüsü"
    },
    {
      id: 4,
      src: "/home_image/episodes.jpg",
      alt: "Keşif Birliği",
      category: "Askeri",
      description: "Keşif Birliği askerleri duvarın dışında keşif yaparken"
    },
    {
      id: 5,
      src: "/home_image/titans.jpg",
      alt: "Titan Dönüşümü",
      category: "Supernatural",
      description: "Titan dönüşümü sırasında oluşan enerji patlaması"
    },
    {
      id: 6,
      src: "/home_image/episodes.jpg",
      alt: "3D Manevra Ekipmanı",
      category: "Ekipman",
      description: "Üç boyutlu manevra ekipmanıyla yüksek binalar arasında hareket"
    }
  ];

  useEffect(() => {
    // IntersectionObserver ile section görünür olduğunda animasyonu tetikle
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
    <section ref={sectionRef} className="relative py-24 bg-[#0A121A] overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/home_image/highlights.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923] via-transparent to-[#0F1923]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-16">
          <div className="reveal mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-[#FF4655]/40 to-[#FF2238]/40 rounded-md backdrop-blur-sm text-xs font-medium text-white tracking-wide uppercase border border-[#FF4655]/20">
              Galeri
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 reveal reveal-delay-100">
            <span className="relative inline-block">
              Attack on Titan Görsel Dünyası
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6 reveal reveal-delay-200">
            Etkileyici sahneler ve unutulmaz anlar koleksiyonu
          </p>
        </div>

        {/* Galeri Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`group cursor-pointer ${isInView ? 'reveal' : ''} ${isInView ? `reveal-delay-${(index % 6) * 100}` : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-w-16 aspect-h-10">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity group-hover:opacity-90"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2 py-1 bg-[#FF4655]/80 text-white text-xs font-medium rounded">
                        {image.category}
                      </span>
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#FF4655] transition-colors">
                      {image.alt}
                    </h3>
                    
                    <p className="text-sm text-white/70 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - Büyük Görüntüleyici */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 bg-black/50 hover:bg-[#FF4655] transition-colors p-2 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative max-w-6xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-w-16 aspect-h-9 bg-[#0A121A]/50 rounded-lg overflow-hidden">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="px-2 py-1 bg-[#FF4655]/80 text-white text-xs font-medium rounded">
                    {galleryImages[selectedImage].category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {galleryImages[selectedImage].alt}
                  </h3>
                  <p className="text-white/70">
                    {galleryImages[selectedImage].description}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((selectedImage + 1) % galleryImages.length);
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Küçük Resimler */}
              <div className="mt-6 grid grid-flow-col auto-cols-max gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={`thumb-${img.id}`} 
                    className={`w-20 h-16 rounded overflow-hidden cursor-pointer border-2 transition-colors ${selectedImage === idx ? 'border-[#FF4655]' : 'border-transparent hover:border-white/50'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(idx);
                    }}
                  >
                    <Image 
                      src={img.src} 
                      alt={`Thumbnail ${idx + 1}`} 
                      width={80}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;