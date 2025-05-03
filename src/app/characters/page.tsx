'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import Image from 'next/image';

// API'den gelen karakter tipi
interface Character {
  id: number;
  name: string;
  img: string;
  alias: string[];
  species: string[];
  gender: string;
  age: number | null;
  height: string | null;
  relatives: { family: string; members: string[] }[];
  birthplace: string | null;
  residence: string | null;
  status: string;
  occupation: string | null;
  groups: { name: string; sub_groups: string[] }[];
  roles: string[];
  episodes: string[];
}

// API'den gelen yanıt tipi
interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next_page: string | null;
    prev_page: string | null;
  };
  results: Character[];
}

// Filtre parametreleri
interface FilterParams {
  name?: string;
  status?: string;
  gender?: string;
  occupation?: string;
}

// Görüntü URL'sini temizleyen ve düzelten yardımcı fonksiyon
const cleanImageUrl = (url: string) => {
  // Eğer URL boş veya geçersizse, varsayılan görüntüyü döndür
  if (!url) return '/placeholder.png';
  
  // URL'den revision/latest parametrelerini kaldırarak daha sağlam bir URL oluştur
  try {
    if (url.includes('/revision/')) {
      const baseUrl = url.split('/revision/')[0];
      return baseUrl;
    }
    return url;
  } catch (e) {
    return url; // Hata durumunda orijinal URL'yi döndür
  }
};

// Fallback görüntüsü oluşturma fonksiyonu
const createImageFallback = (container: HTMLElement, name: string, size: 'sm' | 'lg' = 'sm') => {
  container.classList.add('bg-gray-700', 'flex', 'items-center', 'justify-center');
  
  const placeholder = document.createElement('div');
  placeholder.className = size === 'sm' 
    ? 'w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold text-white'
    : 'w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-4xl font-bold text-white';
  placeholder.textContent = name.charAt(0).toUpperCase();
  container.appendChild(placeholder);
};

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  
  // Filtre state'leri
  const [filters, setFilters] = useState<FilterParams>({});
  const [nameFilter, setNameFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');

  useEffect(() => {
    fetchCharacters(currentPage, filters);
  }, [currentPage, filters]);
  
  // Sayfa değiştiğinde sayfanın başına scroll
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Filtre değişikliklerini izle ve anlık uygula
  useEffect(() => {
    const newFilters: FilterParams = {};
    
    if (nameFilter) newFilters.name = nameFilter;
    if (selectedStatus) newFilters.status = selectedStatus;
    if (selectedGender) newFilters.gender = selectedGender;
    if (selectedOccupation) newFilters.occupation = selectedOccupation;
    
    // Sadece değişiklik varsa filtre uygula
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
      setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
    }
  }, [nameFilter, selectedStatus, selectedGender, selectedOccupation]);

  const fetchCharacters = async (page: number, filterParams: FilterParams = {}) => {
    setLoading(true);
    setError(null); // Her yeni istekte hata durumunu temizle
    try {
      // Filtre parametrelerini URL'ye ekle
      let url = `https://attack-on-titan-wiki-api.vercel.app/characters?page=${page}`;
      
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
      
      console.log("API isteği:", url);
      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API yanıtı başarısız: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API yanıtı:", data);
      
      // API yanıtını kontrol et
      if (data && data.results && Array.isArray(data.results)) {
        setCharacters(data.results);
        setTotalPages(data.info?.pages || 1);
      } else if (Array.isArray(data)) {
        // API direkt bir dizi döndürürse
        setCharacters(data);
        setTotalPages(1);
      } else {
        throw new Error('API yanıtı beklenen formatta değil');
      }
      
      setLoading(false);
    } catch (err) {
      console.error("API hatası:", err);
      setError(`Karakterler yüklenirken bir hata oluştu: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`);
      setLoading(false);
      setCharacters([]);
      setTotalPages(0);
    }
  };

  const openCharacterModal = (character: Character) => {
    console.log("Opening modal for:", character.name);
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    // Modal kapandıktan sonra içeriği temizlemeyi beklet
    setTimeout(() => {
      setSelectedCharacter(null);
    }, 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleClearFilters = () => {
    setNameFilter('');
    setSelectedStatus('');
    setSelectedGender('');
    setSelectedOccupation('');
  };
  
  // Sayfa numaralarını oluştur
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Toplam sayfalar 5'ten az ise tüm sayfa numaralarını göster
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
              currentPage === i
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // İlk sayfa her zaman gösterilir
      pages.push(
        <button
          key="page-1"
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
            currentPage === 1
              ? 'bg-blue-600 text-white font-medium'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          1
        </button>
      );
      
      // Mevcut sayfa civarındaki sayfaları göster
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Başta boşluk varsa "..." koy
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="w-8 h-8 flex items-center justify-center mx-1 text-gray-500">
            ...
          </span>
        );
      } else if (startPage === 2) {
        // "..." yerine 2 göster
        pages.push(
          <button
            key="page-2"
            onClick={() => handlePageChange(2)}
            className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
              currentPage === 2
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            2
          </button>
        );
        startPage = 3;
      }
      
      // Orta sayfaları göster
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
              currentPage === i
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {i}
          </button>
        );
      }
      
      // Sonda boşluk varsa "..." koy
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="w-8 h-8 flex items-center justify-center mx-1 text-gray-500">
            ...
          </span>
        );
        
        // Son sayfa - 1'i ekle (çakışmayı önlemek için)
        const secondLastPage = totalPages - 1;
        pages.push(
          <button
            key={`page-second-last`}
            onClick={() => handlePageChange(secondLastPage)}
            className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
              currentPage === secondLastPage
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {secondLastPage}
          </button>
        );
      }
      
      // Son sayfa her zaman gösterilir
      pages.push(
        <button
          key={`page-last`}
          onClick={() => handlePageChange(totalPages)}
          className={`w-8 h-8 flex items-center justify-center mx-1 rounded-md transition-colors ${
            currentPage === totalPages
              ? 'bg-blue-600 text-white font-medium'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-aot-dark">
      <div ref={topRef}></div> {/* Scroll hedefi için referans */}
      
      {/* Hero Banner */}
      <div className="relative h-[400px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://static.wikia.nocookie.net/shingekinokyojin/images/9/9e/Titan_Shifters.jpg/revision/latest/scale-to-width-down/1000?cb=20210224212535')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900"></div>
        
        {/* Noise pattern overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-soft-light bg-repeat" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '150px'
             }}
        ></div>
        
        {/* Parallax Effect Layers */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full rounded-full bg-blue-700/10 filter blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full rounded-full bg-purple-700/10 filter blur-3xl"></div>
        
        <div className="aot-container relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600/80 text-white rounded-full mb-6 backdrop-blur-sm">
              Attack on Titan Evrenini Keşfet
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Karakterler</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Attack on Titan evreninin kahramanlarını, kötü adamlarını ve tüm karakterlerini keşfedin. 
              Favori karakterleriniz hakkında detaylı bilgilere ulaşın.
            </p>
            
            <div className="mt-10 relative">
              <div className="h-[5px] w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtre Bölümü */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="aot-container relative z-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Karakter Filtrele
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="relative">
              <label htmlFor="name-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                İsim
              </label>
              <div className="relative">
                <input
                  id="name-filter"
                  type="text"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Karakter adı girin..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {nameFilter && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={() => setNameFilter('')}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Temizle"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Durum
              </label>
              <div className="relative">
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none pl-10"
                >
                  <option value="">Tümü</option>
                  <option value="alive">Hayatta</option>
                  <option value="deceased">Ölü</option>
                  <option value="unknown">Bilinmiyor</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="gender-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Cinsiyet
              </label>
              <div className="relative">
                <select
                  id="gender-filter"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none pl-10"
                >
                  <option value="">Tümü</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                  <option value="unknown">Bilinmiyor</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="occupation-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Meslek
              </label>
              <div className="relative">
                <input
                  id="occupation-filter"
                  type="text"
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e.target.value)}
                  placeholder="Meslek girin..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {selectedOccupation && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={() => setSelectedOccupation('')}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Temizle"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-aot-red"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Hata Oluştu</h3>
            <p className="mb-4">{error}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => fetchCharacters(currentPage, filters)} 
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Tekrar Dene
              </button>
              <button 
                onClick={handleClearFilters} 
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Filtreleri Temizle
              </button>
            </div>
          </div>
        ) : characters.length === 0 && !loading ? (
          <div className="text-center py-10">
            <h3 className="text-xl text-gray-300 mb-4">Bu filtrelere uygun karakter bulunamadı.</h3>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-aot-red hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Character cards */}
              {characters.map((character) => (
                <div 
                  key={character.id} 
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-[380px] cursor-pointer"
                  onClick={() => openCharacterModal(character)}
                >
                  {/* Kart üzerinde görsel kapsayıcı */}
                  <div className="h-56 overflow-hidden relative">
                    {character.img ? (
                      <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                        <Image 
                          src={cleanImageUrl(character.img)} 
                          alt={character.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          onError={(e) => {
                            // Resim yüklenemezse fallback göster
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const container = target.parentElement;
                            if (container) {
                              createImageFallback(container, character.name, 'sm');
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
                  {character.name.charAt(0)}
                </div>
              </div>
                    )}
                    
                    {/* Durum badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        character.status === 'Alive' ? 'bg-green-500/80 text-white' : 
                        character.status === 'Deceased' ? 'bg-red-500/80 text-white' : 
                        'bg-gray-500/80 text-white'
                      }`}>
                        {character.status === 'Alive' ? 'Hayatta' : 
                         character.status === 'Deceased' ? 'Ölü' : 
                         'Bilinmiyor'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Kart içerik alanı */}
                  <div 
                    className="p-5 flex flex-col h-[148px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-bold text-white mb-1 truncate">{character.name}</h3>
                    <p className="text-gray-400 text-sm mb-2 truncate">
                      {character.species?.join(', ') || 'Bilinmiyor'}
                    </p>
                    {character.alias && character.alias.length > 0 && (
                      <p className="text-gray-500 text-xs italic mb-auto truncate">
                        Alias: {character.alias[0]}{character.alias.length > 1 ? '...' : ''}
                      </p>
                    )}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openCharacterModal(character);
                      }} 
                      className="mt-auto py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold"
                    >
                      Detaylı Bilgi
                    </button>
                  </div>
                  
                  {/* Parlama efekti */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 mb-8">
              <div className="flex flex-col items-center">
                {/* Sayfa bilgisi */}
                <div className="text-center mb-6">
                  <p className="text-gray-400">
                    Toplam <span className="text-white font-medium">{totalPages}</span> sayfada <span className="text-white font-medium">{totalPages * characters.length}</span>'den fazla karakter
                  </p>
                </div>
                
                {/* Sayfa numaraları */}
                <div className="inline-flex bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
                  {/* İlk sayfa */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none transition-colors 
                      ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                    aria-label="İlk sayfa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zM6.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L2.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Önceki sayfa */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none transition-colors 
                      ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                    aria-label="Önceki sayfa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Sayfa numaraları */}
                  <div className="flex items-center px-2">
                    {renderPageNumbers()}
                  </div>
                  
                  {/* Sonraki sayfa */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none transition-colors 
                      ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                    aria-label="Sonraki sayfa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Son sayfa */}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none transition-colors 
                      ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                    aria-label="Son sayfa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 6.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0zM13.293 15.707a1 1 0 010-1.414L17.586 10l-4.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Character Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={selectedCharacter?.name || 'Karakter Detayları'}
      >
        {selectedCharacter && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="relative h-80 w-full flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
                {selectedCharacter.img ? (
                  <Image 
                    src={cleanImageUrl(selectedCharacter.img)} 
                    alt={selectedCharacter.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const container = target.parentElement;
                      if (container) {
                        createImageFallback(container, selectedCharacter.name, 'lg');
                      }
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-4xl font-bold text-white">
                {selectedCharacter.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-aot-red font-medium mt-1">
                  {selectedCharacter.status === 'Alive' ? 'Hayatta' : 
                   selectedCharacter.status === 'Deceased' ? 'Ölü' : 
                   'Bilinmiyor'} - {selectedCharacter.species?.join(', ') || 'Bilinmiyor'}
                </p>
                
                {selectedCharacter.alias && selectedCharacter.alias.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-blue-400">Lakaplar</h3>
                    <p className="text-gray-300">{selectedCharacter.alias.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-6">Karakter Bilgileri</h2>
              
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCharacter.gender && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">Cinsiyet</h3>
                      <p className="text-white">{selectedCharacter.gender}</p>
                    </div>
                  )}
                  
                  {selectedCharacter.age !== null && selectedCharacter.age !== undefined && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">Yaş</h3>
                      <p className="text-white">{selectedCharacter.age}</p>
                    </div>
                  )}
                  
                  {selectedCharacter.height && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">Boy</h3>
                      <p className="text-white">{selectedCharacter.height}</p>
                    </div>
                  )}
                  
                  {selectedCharacter.birthplace && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">Doğum Yeri</h3>
                      <p className="text-white">{selectedCharacter.birthplace}</p>
                    </div>
                  )}
                  
                  {selectedCharacter.residence && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">İkametgah</h3>
                      <p className="text-white">{selectedCharacter.residence}</p>
                    </div>
                  )}
                  
                  {selectedCharacter.occupation && (
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">Meslek</h3>
                      <p className="text-white">{selectedCharacter.occupation}</p>
                    </div>
                  )}
                </div>
                
                {selectedCharacter.groups && selectedCharacter.groups.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Gruplar</h3>
                    <ul className="list-disc pl-5 text-white">
                      {selectedCharacter.groups.map((group, index) => (
                        <li key={index} className="mb-1">
                          {group.name}
                          {group.sub_groups && group.sub_groups.length > 0 && (
                            <ul className="list-circle pl-5 text-gray-300 mt-1">
                              {group.sub_groups.map((subGroup, subIndex) => (
                                <li key={subIndex}>{subGroup}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedCharacter.roles && selectedCharacter.roles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Roller</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCharacter.roles.map((role, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCharacter.relatives && selectedCharacter.relatives.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Akrabalar</h3>
                    <div className="space-y-4 mt-2">
                      {selectedCharacter.relatives.map((relative, index) => (
                        <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                          <h4 className="font-medium text-white mb-2">{relative.family}</h4>
                          {relative.members && relative.members.length > 0 && (
                            <ul className="list-disc pl-5 text-gray-300">
                              {relative.members.map((member, memberIndex) => (
                                <li key={memberIndex}>{
                                  // API'den direkt URL olarak döndürülen karakter bilgisini kontrol et
                                  typeof member === 'string' && member.startsWith('http') 
                                    ? 'İlişkili Karakter' 
                                    : member
                                }</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCharacter.episodes && selectedCharacter.episodes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Bölüm Sayısı</h3>
                    <p className="text-white">{selectedCharacter.episodes.length} bölüm</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
