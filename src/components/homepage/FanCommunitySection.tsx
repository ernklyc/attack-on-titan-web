'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FanCommunitySection = () => {
  const [activeTab, setActiveTab] = useState('comments');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fanComments = [
    {
      id: 1,
      name: "Mehmet Y.",
      comment: "Attack on Titan kesinlikle izlediğim en iyi anime! Hikaye gelişimi muazzam ve karakterlerin derinliği inanılmaz.",
      avatar: "/images/character-placeholder.png",
      rating: 5
    },
    {
      id: 2,
      name: "Ayşe K.",
      comment: "İlk sezondan beri takip ediyorum ve her sezon kendisini aşıyor. Final sezonu beklentilerimin çok üzerinde.",
      avatar: "/images/character-placeholder.png",
      rating: 5
    },
    {
      id: 3,
      name: "Can D.",
      comment: "Hikaye kurgusu ve karakter gelişimleri açısından benzersiz. Eren'in karakterindeki değişim çok iyi işlenmiş.",
      avatar: "/images/character-placeholder.png",
      rating: 4
    }
  ];

  const communityEvents = [
    {
      id: 1,
      title: "Attack on Titan Fan Buluşması",
      date: "15 Haziran 2025",
      location: "Ankara",
      image: "/home_image/highlights.jpg"
    },
    {
      id: 2,
      title: "AoT Cosplay Yarışması",
      date: "22 Temmuz 2025",
      location: "İstanbul",
      image: "/home_image/characters.jpg"
    },
    {
      id: 3,
      title: "Attack on Titan Çizim Atölyesi",
      date: "5 Ağustos 2025",
      location: "İzmir",
      image: "/home_image/titans.jpg"
    }
  ];

  const socialMediaLinks = [
    {
      id: "twitter",
      name: "Twitter",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: "#1DA1F2"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      ),
      color: "#E1306C"
    },
    {
      id: "discord",
      name: "Discord",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      color: "#7289DA"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "#FF0000"
    }
  ];

  const newsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada gerçek bir abonelik işlemi yapılabilir
    alert('Newsletter aboneliğiniz başarıyla kaydedildi!');
  };

  useEffect(() => {
    // IntersectionObserver ile section görünür olduğunda animasyonları tetikle
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

  // Tabları değiştirme fonksiyonu
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık - Enhanced */}
        <div className="text-center mb-20">
          <div className={`mb-4 inline-block px-6 py-2 bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30 rounded-full backdrop-blur-sm border border-[#FF4655]/20 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-sm font-medium text-white tracking-wide uppercase">
              Topluluk
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mt-6 mb-4 transition-all duration-1000 delay-100 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <span className="relative inline-block">
              Hayran Topluluğumuz
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238]"></div>
            </span>
          </h2>
          
          <p className={`text-gray-300 max-w-3xl mx-auto text-lg md:text-xl mt-6 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Attack on Titan severlerin buluşma noktası! Etkinlikler, topluluk paylaşımları ve daha fazlası.
          </p>
          
          <div className="h-px w-24 mx-auto bg-[#FF4655]/30 mt-10"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Tab Navigasyon - Enhanced */}
          <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex rounded-xl p-1.5 border border-white/10 bg-black/20 backdrop-blur-md shadow-xl">
              <button
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeTab === 'comments' ? 'bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => switchTab('comments')}
              >
                Yorumlar
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeTab === 'events' ? 'bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => switchTab('events')}
              >
                Etkinlikler
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeTab === 'connect' ? 'bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => switchTab('connect')}
              >
                Bağlantı
              </button>
            </div>
          </div>

          {/* İçerik - Enhanced */}
          <div className="relative min-h-[400px]">
            {/* Yorumlar Tab İçeriği - Enhanced */}
            <div className={`transition-all duration-500 ${
              activeTab === 'comments' ? 'opacity-100 transform translate-y-0' : 'opacity-0 absolute inset-0 transform translate-y-8 pointer-events-none'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fanComments.map((comment, index) => (
                  <div 
                    key={comment.id} 
                    className={`border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm bg-black/10 hover:border-[#FF4655]/30 transition-all duration-500 hover:-translate-y-1 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className="flex items-start mb-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4655] to-[#FF2238] rounded-full blur opacity-30 group-hover:opacity-70"></div>
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 relative">
                          <Image 
                            src={comment.avatar} 
                            alt={comment.name} 
                            width={56} 
                            height={56} 
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-white font-bold text-lg">{comment.name}</h3>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < comment.rating ? 'text-[#FF4655]' : 'text-gray-400'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-white/10 my-4"></div>
                    <p className="text-gray-300 text-base leading-relaxed">{comment.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 inline-flex items-center group">
                  <span>Tüm Yorumları Gör</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Etkinlikler Tab İçeriği - Enhanced */}
            <div className={`transition-all duration-500 ${
              activeTab === 'events' ? 'opacity-100 transform translate-y-0' : 'opacity-0 absolute inset-0 transform translate-y-8 pointer-events-none'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {communityEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`border border-white/10 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#FF4655]/30 transition-all duration-500 transform hover:-translate-y-2 group ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#FF4655]/30 rounded-tr-2xl z-10"></div>
                      
                      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-white text-sm z-10">
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="p-6 bg-black/20 backdrop-blur-sm">
                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4655] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/90 text-sm font-medium">{event.date}</span>
                      </div>
                      
                      <h3 className="text-white text-xl font-bold mb-4 group-hover:text-[#FF4655] transition-colors min-h-[3.5rem]">{event.title}</h3>
                      
                      <div className="h-0.5 w-12 bg-[#FF4655]/40 mb-4 group-hover:w-24 transition-all duration-500"></div>
                      
                      <div className="flex justify-between items-center">
                        <Link href="#" className="text-white hover:text-[#FF4655] transition-colors text-sm inline-flex items-center group">
                          <span>Detaylı Bilgi</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                        
                        <button className="px-4 py-1.5 bg-gradient-to-r from-[#FF4655]/70 to-[#FF2238]/70 text-white text-sm font-medium rounded transition-all hover:shadow-md hover:shadow-[#FF4655]/20">
                          Kaydol
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#FF4655]/80 to-[#FF2238]/80 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300 inline-flex items-center group">
                  <span>Tüm Etkinlikleri Gör</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Bağlantı Tab İçeriği - Enhanced */}
            <div className={`transition-all duration-500 ${
              activeTab === 'connect' ? 'opacity-100 transform translate-y-0' : 'opacity-0 absolute inset-0 transform translate-y-8 pointer-events-none'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className={`transition-all duration-1000 delay-400 ${isInView && activeTab === 'connect' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <h3 className="text-3xl font-bold text-white mb-8">Sosyal Medya</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {socialMediaLinks.map((social) => (
                      <Link 
                        key={social.id}
                        href="#"
                        className="border border-white/10 rounded-xl p-5 flex flex-col items-center hover:border-white/20 hover:shadow-lg backdrop-blur-sm bg-black/10 transition-all duration-300 hover:-translate-y-1 group"
                        style={{ "--hover-color": social.color } as React.CSSProperties}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#131E2A] to-black border border-white/10 group-hover:shadow-lg mb-3" style={{ color: social.color }}>
                          {social.icon}
                        </div>
                        <span className="text-white text-base font-medium">{social.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="text-3xl font-bold text-white mb-6">Topluluğa Katıl</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">Attack on Titan hayranları Discord sunucumuza katılın ve diğer hayranlarla etkileşime geçin.</p>
                    <a 
                      href="#" 
                      className="inline-flex items-center px-8 py-4 bg-[#7289DA] text-white font-medium rounded-lg hover:bg-[#7289DA]/80 transition-all duration-300 shadow-lg hover:shadow-[#7289DA]/30"
                    >
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                      Discord'a Katıl
                    </a>
                  </div>
                </div>
                
                <div className={`transition-all duration-1000 delay-600 ${isInView && activeTab === 'connect' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <h3 className="text-3xl font-bold text-white mb-8">Bültenimize Abone Ol</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">En son Attack on Titan haberleri, etkinlikler ve daha fazlası için bültenimize abone olun.</p>
                  
                  <form onSubmit={newsletterSubmit} className="border border-white/10 rounded-xl p-8 shadow-xl backdrop-blur-sm bg-black/10">
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-base font-medium text-white/80 mb-2">İsim</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FF4655]/50 focus:outline-none focus:ring-1 focus:ring-[#FF4655]/50 transition-all"
                        placeholder="Adınız"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-base font-medium text-white/80 mb-2">E-posta</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FF4655]/50 focus:outline-none focus:ring-1 focus:ring-[#FF4655]/50 transition-all"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center mb-8">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        className="w-5 h-5 accent-[#FF4655] bg-white/5 border-white/20 rounded focus:ring-[#FF4655]" 
                        required
                      />
                      <label htmlFor="consent" className="ml-3 text-sm text-white/80">
                        İletişim izni veriyorum
                      </label>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#FF4655] to-[#FF2238] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF4655]/30 transition-all duration-300"
                    >
                      Abone Ol
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanCommunitySection;