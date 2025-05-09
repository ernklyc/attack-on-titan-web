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
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-aot-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık - Enhanced */}
        <div className="text-center mb-20">
          <div className={`mb-4 inline-block px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm border border-[#FF4655]/20 transition-all duration-1000 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <span className="text-sm font-medium text-white tracking-wide uppercase">
              Galeri
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mt-6 mb-4 transition-all duration-1000 delay-100 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <span className="relative inline-block">
              Attack on Titan Görsel Dünyası
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className={`text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mt-6 mb-12 transition-all duration-1000 delay-200 transform ${isInView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            Etkileyici sahneler ve unutulmaz anlar koleksiyonu
          </p>
          
          <div className="h-px w-24 mx-auto bg-[#FF4655]/30 mt-10 mb-10"></div>
        </div>

        {/* Galeri Grid - Enhanced */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`group cursor-pointer transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-xl border border-white/10">
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#FF4655]/30 rounded-tl-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#FF4655]/30 rounded-br-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="aspect-w-16 aspect-h-12">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-80 transition-opacity group-hover:opacity-90"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white text-xs font-medium rounded-md shadow-lg">
                        {image.category}
                      </span>
                      <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF4655] transition-colors">
                      {image.alt}
                    </h3>
                    
                    <div className="h-0.5 w-12 bg-white/30 mb-3 group-hover:w-24 group-hover:bg-[#FF4655]/30 transition-all duration-500"></div>
                    
                    <p className="text-white/80 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 text-sm leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-800 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <button className="px-8 py-4 bg-transparent border border-white/20 rounded-lg text-white hover:bg-[#FF4655]/10 hover:border-[#FF4655] transition-all duration-300 group inline-flex items-center">
              <span className="font-medium">Tüm Galeriyi Görüntüle</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Enhanced */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          
          <button 
            className="absolute top-6 right-6 bg-black/40 hover:bg-[#FF4655] transition-colors p-2.5 rounded-full text-white border border-white/10 z-10"
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
            className="relative max-w-7xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                quality={90}
                priority
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 rounded-b-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white text-sm font-medium rounded-md shadow-lg">
                      {galleryImages[selectedImage].category}
                    </span>
                    <span className="ml-3 text-white/60 text-sm">
                      Görsel {selectedImage + 1} / {galleryImages.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-1">
                    {galleryImages[selectedImage].alt}
                  </h3>
                  <p className="text-white/80 text-base">
                    {galleryImages[selectedImage].description}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    className="w-12 h-12 bg-black/30 hover:bg-[#FF4655]/80 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors"
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
                    className="w-12 h-12 bg-black/30 hover:bg-[#FF4655]/80 border border-white/10 rounded-full flex items-center justify-center text-white transition-colors"
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
              
              {/* Küçük Resimler - Enhanced */}
              <div className="mt-8 grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#FF4655]/20 scrollbar-track-transparent">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={`thumb-${img.id}`} 
                    className={`w-24 h-16 rounded-md overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                      selectedImage === idx 
                        ? 'ring-2 ring-[#FF4655] scale-105' 
                        : 'ring-1 ring-white/20 opacity-60 hover:opacity-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(idx);
                    }}
                  >
                    <Image 
                      src={img.src} 
                      alt={`Thumbnail ${idx + 1}`} 
                      width={96}
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