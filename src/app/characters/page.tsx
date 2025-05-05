'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Import mocks instead of actual libraries
import { motion, AnimatePresence } from '@/utils/motion-mock';
import { useInView } from '@/utils/intersection-observer-mock';

// Components
import Modal from '@/components/Modal';
// Directly import by relative path to avoid module resolution issues
import CharacterSkeleton from '../../components/characters/CharacterSkeleton';
import CharacterCard from '../../components/characters/CharacterCard';
import CharacterFilter from '../../components/characters/CharacterFilter';

// Utils
import { cleanImageUrl, createImageFallback } from '@/utils/imageUtils';

// Types
import { Character, ApiResponse, FilterParams } from '@/types/characters';

// Text Content
import { textContent } from '@/data/textContent';

// Search params component to wrap in Suspense
function SearchParamsWrapper({
  children
}: {
  children: (params: URLSearchParams) => React.ReactNode
}) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}

export default function Characters() {
  // State management
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState<FilterParams>({});
  const [nameFilter, setNameFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  
  // API meta verilerini saklamak için state ekliyorum
  const [apiMeta, setApiMeta] = useState({
    characterCount: 0,
    filteredCount: 0,
    uniqueSpeciesCount: 0,
    uniqueStatusCount: 0
  });
  
  // References
  const topRef = useRef<HTMLDivElement>(null);
  
  // Intersection observers for lazy loading
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Get URL params on initial load - Fixing the Suspense issue with useSearchParams
  useEffect(() => {
    // We'll handle this after the component mounts through the SearchParamsWrapper
  }, []);

  // API meta verilerini yüklemek için useEffect hook'u
  useEffect(() => {
    async function fetchApiMetadata() {
      try {
        // Toplam karakter sayısını almak için ilk sayfayı çek
        const characterResponse = await fetch('https://attack-on-titan-wiki-api.vercel.app/characters?page=1', { 
          cache: 'no-store'
        });
        
        if (characterResponse.ok) {
          const data = await characterResponse.json();
          
          // Toplam karakter sayısı ve sayfa bilgilerini al
          let totalCharacters = 0;
          if (data.info && data.info.count) {
            totalCharacters = data.info.count;
          } else if (data.results) {
            // Eğer info nesnesi yoksa, sonuç sayısını kullan (yaklaşık değer)
            totalCharacters = data.results.length * (data.info?.pages || 10);
          }
          
          // Kullanılabilir tüm filtreleri çekmek için türleri hesapla
          const uniqueSpecies = new Set();
          const uniqueStatus = new Set();
          
          if (data.results && Array.isArray(data.results)) {
            data.results.forEach((character: Character) => {
              if (character.status) uniqueStatus.add(character.status);
              if (character.species && Array.isArray(character.species)) {
                character.species.forEach(species => uniqueSpecies.add(species));
              }
            });
          }
          
          setApiMeta({
            characterCount: totalCharacters,
            filteredCount: data.results ? data.results.length : 0,
            uniqueSpeciesCount: uniqueSpecies.size,
            uniqueStatusCount: uniqueStatus.size
          });
        }
      } catch (error) {
        console.error("API meta verisi yüklenirken hata oluştu:", error);
      }
    }
    
    fetchApiMetadata();
  }, []);

  // Fetch characters when dependencies change
  useEffect(() => {
    fetchCharacters(currentPage, filters);
    
    // Update URL with current filters
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    
    window.history.replaceState({}, '', url.toString());
  }, [currentPage, filters]);
  
  // Scroll to top when page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Apply filter changes
  useEffect(() => {
    const newFilters: FilterParams = {};
    
    if (nameFilter) newFilters.name = nameFilter;
    if (selectedStatus) newFilters.status = selectedStatus;
    if (selectedGender) newFilters.gender = selectedGender;
    if (selectedOccupation) newFilters.occupation = selectedOccupation;
    
    // Only apply filters if they've changed
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
      setCurrentPage(1); // Return to first page when filters change
    }
  }, [nameFilter, selectedStatus, selectedGender, selectedOccupation]);

  const fetchCharacters = async (page: number, filterParams: FilterParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Add filter parameters to URL
      let url = `https://attack-on-titan-wiki-api.vercel.app/characters?page=${page}`;
      
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Enable streaming responses
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`${textContent.charactersPage.error.messagePrefix} ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check API response format
      if (data && data.results && Array.isArray(data.results)) {
        setCharacters(data.results);
        setTotalPages(data.info?.pages || 1);
      } else if (Array.isArray(data)) {
        setCharacters(data);
        setTotalPages(1);
      } else {
        throw new Error(textContent.charactersPage.error.unknownError);
      }
      
    } catch (err) {
      console.error("API hatası:", err);
      setError(`${textContent.charactersPage.error.messagePrefix} ${err instanceof Error ? err.message : textContent.charactersPage.error.unknownError}`);
      setCharacters([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const openCharacterModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
    
    // For accessibility, focus trap and announce modal opening
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
    
    // Wait for closing animation before clearing selected character
    setTimeout(() => {
      setSelectedCharacter(null);
    }, 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setNameFilter('');
    setSelectedStatus('');
    setSelectedGender('');
    setSelectedOccupation('');
  };
  
  // Create pagination display
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Logic for showing appropriate page numbers
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md transition-all duration-300 
              ${currentPage === i
                ? 'bg-[#FF4655]/70 text-white font-medium scale-110 shadow-md shadow-[#FF4655]/20 backdrop-blur-md'
                : 'text-gray-300 hover:bg-[#0F1923]/60 hover:text-white backdrop-blur-sm'
              }`}
            aria-label={textContent.charactersPage.pagination.pageLabel.replace('{pageNumber}', i.toString())}
            aria-current={currentPage === i ? 'page' : undefined}
          >
            {i}
          </button>
        );
      }
    } else {
      // Complex pagination logic for many pages
      // Always show first page
      pages.push(
        <button
          key="page-1"
          onClick={() => handlePageChange(1)}
          className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md transition-all duration-300
            ${currentPage === 1
              ? 'bg-[#FF4655]/70 text-white font-medium scale-110 shadow-md shadow-[#FF4655]/20 backdrop-blur-md'
              : 'text-gray-300 hover:bg-[#0F1923]/60 hover:text-white backdrop-blur-sm'
            }`}
          aria-label={textContent.charactersPage.pagination.firstPageLabel}
          aria-current={currentPage === 1 ? 'page' : undefined}
        >
          1
        </button>
      );
      
      // Calculate visible page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Show ellipsis if needed
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="w-10 h-10 flex items-center justify-center mx-1 text-gray-500" aria-hidden="true">
            ···
          </span>
        );
      } else if (startPage === 2) {
        // Show page 2 instead of ellipsis if it's next
        pages.push(
          <button
            key="page-2"
            onClick={() => handlePageChange(2)}
            className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md transition-all duration-300
              ${currentPage === 2
                ? 'bg-[#FF4655]/70 text-white font-medium scale-110 shadow-md shadow-[#FF4655]/20 backdrop-blur-md'
                : 'text-gray-300 hover:bg-[#0F1923]/60 hover:text-white backdrop-blur-sm'
              }`}
            aria-label={textContent.charactersPage.pagination.pageLabel.replace('{pageNumber}', '2')}
            aria-current={currentPage === 2 ? 'page' : undefined}
          >
            2
          </button>
        );
        startPage = 3;
      }
      
      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md transition-all duration-300
              ${currentPage === i
                ? 'bg-[#FF4655]/70 text-white font-medium scale-110 shadow-md shadow-[#FF4655]/20 backdrop-blur-md'
                : 'text-gray-300 hover:bg-[#0F1923]/60 hover:text-white backdrop-blur-sm'
              }`}
            aria-label={textContent.charactersPage.pagination.pageLabel.replace('{pageNumber}', i.toString())}
            aria-current={currentPage === i ? 'page' : undefined}
          >
            {i}
          </button>
        );
      }
      
      // End ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="w-10 h-10 flex items-center justify-center mx-1 text-gray-500" aria-hidden="true">
            ···
          </span>
        );
      }
      
      // Always show last page
      pages.push(
        <button
          key={`page-last`}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md transition-all duration-300
            ${currentPage === totalPages
              ? 'bg-[#FF4655]/70 text-white font-medium scale-110 shadow-md shadow-[#FF4655]/20 backdrop-blur-md'
              : 'text-gray-300 hover:bg-[#0F1923]/60 hover:text-white backdrop-blur-sm'
            }`}
          aria-label={textContent.charactersPage.pagination.lastPageLabel}
          aria-current={currentPage === totalPages ? 'page' : undefined}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  // Component to handle URL parameters safely
  const handleSearchParams = (searchParams: URLSearchParams) => {
    // Only apply URL filters if explicitly requested by user
    // Removed auto-filtering on page load to avoid unexpected filtering
    const shouldApplyFilters = searchParams.get('applyFilters') === 'true';
    
    if (shouldApplyFilters) {
      const pageParam = searchParams.get('page');
      const nameParam = searchParams.get('name');
      const statusParam = searchParams.get('status');
      const genderParam = searchParams.get('gender');
      const occupationParam = searchParams.get('occupation');
      
      if (pageParam) setCurrentPage(parseInt(pageParam));
      if (nameParam) setNameFilter(nameParam);
      if (statusParam) setSelectedStatus(statusParam);
      if (genderParam) setSelectedGender(genderParam);
      if (occupationParam) setSelectedOccupation(occupationParam);
    }
    
    // Return null as we don't need to render anything here
    return null;
  };

  return (
    <div className="min-h-screen relative bg-[#0F1923] text-gray-100">
      {/* Background image with semi-transparent black overlay */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/images/backgrounds/titan-bg.webp"
          alt="Attack on Titan Background"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      
      {/* Wrap useSearchParams in Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsWrapper>
          {(params) => handleSearchParams(params)}
        </SearchParamsWrapper>
      </Suspense>
      
      <div ref={topRef} className="scroll-mt-20" id="top"></div> {/* Scroll target with offset for fixed header */}

      {/* Content container with relative positioning to appear above background */}
      <div className="relative z-10 w-full">
        {/* Hero Banner with improved design and single color scheme */}
        <motion.div 
          ref={bannerRef}
          initial={{ opacity: 0 }}
          animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center pt-6 md:pt-10 overflow-hidden"
          style={{ minHeight: '200px' }}
        >
          {/* Enhanced overlay with gradient - removed background images since we now have a global background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/50 via-[#0F1923]/40 to-transparent"></div>
          
          {/* Animated title section with improved layout - Left aligned */}
          <div className="relative z-10 w-full py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={bannerInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-2"
              >
                <div className="inline-block px-4 py-1 bg-[#FF4655]/40 rounded-md backdrop-blur-md">
                  <span className="text-xs font-medium text-white tracking-wide uppercase">{textContent.charactersPage.banner.badge}</span>
                </div>
              </motion.div>
              
              {/* Main content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* SOL TARAF - Ana başlık ve açıklama - 7 sütun genişliğinde */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={bannerInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="lg:col-span-7"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {textContent.charactersPage.banner.title}
                    <div className="h-1 w-16 bg-[#FF4655] mt-2 mb-3"></div>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-gray-300 max-w-2xl" dangerouslySetInnerHTML={{ 
                    __html: textContent.charactersPage.banner.description 
                  }}>
                  </p>
                </motion.div>

                {/* SAĞ TARAF - API Bilgileri - 5 sütun genişliğinde */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={bannerInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="lg:col-span-5"
                >
                  <div className="text-xs sm:text-sm text-gray-400 space-y-3 sm:space-y-4">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: textContent.charactersPage.banner.apiInfo1 }}></span>
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: textContent.charactersPage.banner.apiInfo2 }}></span>
                    </p>
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: textContent.charactersPage.banner.apiInfo3 }}></span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content with Staggered Animation */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          {/* Filter Section - Glass morphism design - Moved closer to character list */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1A242D]/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/5 mb-6 sm:mb-8"
          >
            <CharacterFilter
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedOccupation={selectedOccupation}
              setSelectedOccupation={setSelectedOccupation}
              handleClearFilters={handleClearFilters}
            />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6">
              {[...Array(12)].map((_, i) => (
                <CharacterSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FF4655]/20 border border-[#FF4655]/30 text-white p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3">{textContent.charactersPage.error.title}</h3>
              <p className="mb-4">{error}</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => fetchCharacters(currentPage, filters)} 
                  className="px-4 py-2 bg-[#FF4655]/70 hover:bg-[#FF4655] rounded-md flex items-center transition-colors backdrop-blur-sm"
                  aria-label={textContent.charactersPage.error.retryButton}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  {textContent.charactersPage.error.retryButton}
                </button>
                <button 
                  onClick={handleClearFilters} 
                  className="px-4 py-2 bg-[#1A242D]/70 hover:bg-[#1A242D] rounded-md flex items-center transition-colors backdrop-blur-sm"
                  aria-label={textContent.charactersPage.error.clearFiltersButton}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {textContent.charactersPage.error.clearFiltersButton}
                </button>
              </div>
            </motion.div>
          ) : characters.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="mx-auto w-24 h-24 rounded-full bg-[#1A242D]/80 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-300 mb-4">{textContent.charactersPage.noResults.message}</h3>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-[#FF4655]/70 hover:bg-[#FF4655] text-white rounded-lg transition-colors shadow-lg hover:shadow-[#FF4655]/30 backdrop-blur-sm"
                aria-label={textContent.charactersPage.noResults.clearFiltersButton}
              >
                {textContent.charactersPage.noResults.clearFiltersButton}
              </button>
            </motion.div>
          ) : (
            <>
              {/* Glassmorphic container for character cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1A242D]/40 backdrop-blur-md rounded-xl p-4 md:p-8 border border-white/5 shadow-xl"
              >
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                  <AnimatePresence>
                    {characters.map((character, index) => (
                      <motion.div
                        key={character.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.5, delay: index * 0.05 } 
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                      >
                        <Suspense fallback={<CharacterSkeleton />}>
                          <CharacterCard 
                            character={character} 
                            onClick={() => openCharacterModal(character)}
                          />
                        </Suspense>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Enhanced Pagination with updated styling in a separate glassmorphic container */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8 mb-8 bg-[#1A242D]/40 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/5 shadow-xl"
                >
                  <div className="flex flex-col items-center">
                    {/* Page information */}
                    <div className="text-center mb-4 sm:mb-6">
                      <p className="text-gray-400 text-sm sm:text-base" dangerouslySetInnerHTML={{
                        __html: textContent.charactersPage.pagination.pageInfo
                          .replace('{totalPages}', totalPages.toString())
                          .replace('{totalCharacters}', (totalPages * characters.length).toString())
                      }}>
                      </p>
                    </div>
                    
                    {/* Page navigation - glassmorphism style with nested glass effect */}
                    <div className="inline-flex flex-wrap justify-center bg-[#1A242D]/60 backdrop-blur-lg rounded-lg p-2 shadow-lg border border-white/5 max-w-full overflow-hidden">
                      {/* First page button */}
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center p-1.5 sm:p-2 rounded-md m-0.5 sm:m-1 min-w-8 sm:min-w-10 ${currentPage === 1 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-white hover:bg-[#FF4655]/20 hover:text-[#FF4655] transition-all duration-200'}`}
                        aria-label={textContent.charactersPage.pagination.firstPageLabel}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M9.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Previous page button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center p-1.5 sm:p-2 rounded-md m-0.5 sm:m-1 min-w-8 sm:min-w-10 ${currentPage === 1 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-white hover:bg-[#FF4655]/20 hover:text-[#FF4655] transition-all duration-200'}`}
                        aria-label={textContent.charactersPage.pagination.previousPageLabel}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Page numbers with responsive design */}
                      <div className="hidden sm:flex items-center">
                        {renderPageNumbers()}
                      </div>
                      
                      {/* Mobile page indicator */}
                      <div className="sm:hidden flex items-center justify-center">
                        <span className="bg-[#FF4655]/50 text-white px-3 py-1 rounded-md text-sm font-medium min-w-16 text-center">
                          {currentPage} / {totalPages}
                        </span>
                      </div>

                      {/* Next page button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center p-1.5 sm:p-2 rounded-md m-0.5 sm:m-1 min-w-8 sm:min-w-10 ${currentPage === totalPages 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-white hover:bg-[#FF4655]/20 hover:text-[#FF4655] transition-all duration-200'}`}
                        aria-label={textContent.charactersPage.pagination.nextPageLabel}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Last page button */}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center p-1.5 sm:p-2 rounded-md m-0.5 sm:m-1 min-w-8 sm:min-w-10 ${currentPage === totalPages 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-white hover:bg-[#FF4655]/20 hover:text-[#FF4655] transition-all duration-200'}`}
                        aria-label={textContent.charactersPage.pagination.lastPageLabel}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Character Detail Modal with animated transitions and new glassmorphism styling */}
        <AnimatePresence>
          {isModalOpen && selectedCharacter && (
            <Modal 
              isOpen={isModalOpen} 
              onClose={closeModal} 
              title={selectedCharacter.name}
              motionProps={{
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                transition: { duration: 0.3 }
              }}
              accessibility={{
                ariaLabelledBy: "character-modal-title",
                ariaDescribedBy: "character-modal-description"
              }}
            >
              <CharacterDetail character={selectedCharacter} texts={textContent.charactersPage.modal} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Character Detail Component (Extracted for cleaner code organization)
function CharacterDetail({ character, texts }: { character: Character, texts: typeof textContent.charactersPage.modal }) {
  // Karakter durum renk sınıfları
  const statusColorClasses = {
    'Alive': 'bg-emerald-500/30 text-emerald-300 border-emerald-500/30',
    'Deceased': 'bg-[#FF4655]/30 text-white border-[#FF4655]/30',
    'Unknown': 'bg-gray-500/30 text-gray-300 border-gray-500/30'
  };

  // Karakterin durumuna göre renk sınıfı seçimi
  const statusClass = character.status === 'Alive' ? statusColorClasses.Alive : 
                      character.status === 'Deceased' ? statusColorClasses.Deceased : 
                      statusColorClasses.Unknown;

  // Karakter başlık renk aksanı
  const accentColor = character.status === 'Alive' ? 'from-emerald-500 to-emerald-700' : 
                     character.status === 'Deceased' ? 'from-[#FF4655] to-[#FF2238]' : 
                     'from-gray-500 to-gray-700';

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-[#1A242D]/60 backdrop-blur-lg border border-white/10 shadow-xl">
        {/* Background gradient and blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/80 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start relative z-10 p-6">
          {/* Character Image Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="relative mx-auto md:mx-0 aspect-square w-56 md:w-full max-w-[240px] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 transform md:translate-y-0 md:translate-x-0">
              {character.img ? (
                <Image 
                  src={cleanImageUrl(character.img)} 
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  loading="eager"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const container = target.parentElement;
                    if (container) {
                      createImageFallback(container, character.name, 'lg');
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0F1923]/70 text-6xl font-bold text-white">
                  {character.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
            </div>
          </div>

          {/* Character Info Section */}
          <div className="w-full md:w-2/3 md:pl-8 text-center md:text-left">
            {/* Character name with gradient underline matching status color */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg" id="character-modal-title">
              {character.name}
              <div className={`h-1 w-24 bg-gradient-to-r ${accentColor} rounded-full mt-2 mx-auto md:mx-0`}></div>
            </h2>
            
            {/* Character status and badges */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4 mb-5">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-lg border shadow-lg ${statusClass}`}>
                {character.status === 'Alive' ? texts.status.alive : 
                character.status === 'Deceased' ? texts.status.deceased : 
                texts.status.unknown}
              </span>
              
              {character.species?.map((species, index) => (
                <span key={index} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#1A242D]/70 text-blue-300 border border-blue-500/30 backdrop-blur-lg shadow-md">
                  {species}
                </span>
              ))}
            </div>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {character.gender && (
                <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-gray-400 mb-1">{texts.gender}</p>
                  <p className="text-white font-medium">{character.gender}</p>
                </div>
              )}
              
              {character.age !== null && character.age !== undefined && (
                <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-gray-400 mb-1">{texts.age}</p>
                  <p className="text-white font-medium">{character.age}</p>
                </div>
              )}
              
              {character.height && (
                <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-gray-400 mb-1">{texts.height}</p>
                  <p className="text-white font-medium">{character.height}</p>
                </div>
              )}
            </div>
            
            {/* Aliases list as tags */}
            {character.alias && character.alias.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">{texts.aliases}</h3>
                <div className="flex flex-wrap gap-2">
                  {character.alias.map((alias, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#0F1923]/40 text-gray-300 border border-white/5 backdrop-blur-md">
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="character-modal-description">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal info section - Fixed the missing 'background' property */}
          <div className="bg-[#1A242D]/30 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {texts.title || "Kişisel Bilgiler"}
            </h3>

            <div className="space-y-4">
              {character.birthplace && (
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1.5">{texts.birthplace}</h4>
                  <p className="text-gray-200">{character.birthplace}</p>
                </div>
              )}
              
              {character.residence && (
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1.5">{texts.residence}</h4>
                  <p className="text-gray-200">{character.residence}</p>
                </div>
              )}
              
              {character.occupation && (
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1.5">{texts.occupation}</h4>
                  <p className="text-gray-200">{character.occupation}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Character episodes section */}
          {character.episodes && character.episodes.length > 0 && (
            <div className="bg-[#1A242D]/30 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {texts.episodes}
              </h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FF4655]/30 text-white border border-[#FF4655]/40 rounded-full px-4 py-1 text-xl font-bold backdrop-blur-lg shadow-md">
                  {character.episodes.length}
                </div>
                <p className="text-gray-200">{texts.episodesInfo.replace('{count}', character.episodes.length.toString())}</p>
              </div>
              
              <Link
                href={`/episodes?character=${character.id}`}
                className="inline-flex items-center text-[#FF4655]/90 hover:text-[#FF4655] transition-colors bg-[#0F1923]/40 hover:bg-[#0F1923]/60 px-3 py-2 rounded-md backdrop-blur-md border border-[#FF4655]/20 hover:border-[#FF4655]/40 shadow-md"
              >
                <span>{texts.viewEpisodesLink}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Character affiliations/groups */}
          {character.groups && character.groups.length > 0 && (
            <div className="bg-[#1A242D]/30 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {texts.groups}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.groups.map((group, index) => (
                  <div key={index} className="bg-[#0F1923]/50 backdrop-blur-md p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="font-medium text-white mb-2 pb-2 border-b border-white/5">{group.name}</h4>
                    {group.sub_groups && group.sub_groups.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.sub_groups.map((subGroup, subIndex) => (
                          <span key={subIndex} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#1A242D]/70 backdrop-blur-lg text-gray-300 border border-white/5 shadow-sm">
                            {subGroup}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Character roles */}
          {character.roles && character.roles.length > 0 && (
            <div className="bg-[#1A242D]/30 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                {texts.roles}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {character.roles.map((role, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-[#0F1923]/60 backdrop-blur-md text-gray-200 rounded-lg text-sm border border-white/5 shadow-md hover:bg-[#0F1923]/80 transition-colors"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Character relatives */}
          {character.relatives && character.relatives.length > 0 && (
            <div className="bg-[#1A242D]/30 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {texts.relatives}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.relatives.map((relative, index) => (
                  <div key={index} className="bg-[#0F1923]/50 backdrop-blur-md p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="font-medium text-white mb-2 pb-2 border-b border-white/5">{relative.family}</h4>
                    {relative.members && relative.members.length > 0 && (
                      <ul className="space-y-2 pl-2">
                        {relative.members.map((member, memberIndex) => (
                          <li key={memberIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#FF4655] rounded-full mr-2"></span>
                            <span className="text-gray-300">
                              {typeof member === 'string' && member.startsWith('http')
                                ? texts.relatedCharacter
                                : member}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
