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
  // State for animation triggers and tabs
  const [activeTab, setActiveTab] = React.useState("info"); // 'info', 'groups', 'episodes'
  const [expandedImage, setExpandedImage] = React.useState(false);
  
  // Refs for scroll animations
  const imageRef = React.useRef<HTMLDivElement>(null);
  
  // Karakter durum renk sınıfları ve statüs belirlemeleri - zenginleştirilmiş renklerle
  const statusStyles = {
    'Alive': {
      bgClass: 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30',
      textClass: 'text-emerald-300',
      borderClass: 'border-emerald-500/30',
      iconClass: 'text-emerald-400',
      accentColor: 'from-emerald-500 to-emerald-600',
      pulseColor: 'emerald',
      statusEmoji: '💚'
    },
    'Deceased': {
      bgClass: 'bg-gradient-to-r from-[#FF4655]/30 to-[#FF2238]/30',
      textClass: 'text-[#FF4655]',
      borderClass: 'border-[#FF4655]/30',
      iconClass: 'text-[#FF4655]',
      accentColor: 'from-[#FF4655] to-[#FF2238]',
      pulseColor: 'red',
      statusEmoji: '💔'
    },
    'Unknown': {
      bgClass: 'bg-gradient-to-r from-gray-600/30 to-gray-700/30',
      textClass: 'text-gray-300',
      borderClass: 'border-gray-500/30',
      iconClass: 'text-gray-400',
      accentColor: 'from-gray-500 to-gray-700',
      pulseColor: 'gray',
      statusEmoji: '❓'
    }
  };

  // Karakterin durumuna göre stilini belirle
  const statusStyle = character.status === 'Alive' ? statusStyles.Alive : 
                      character.status === 'Deceased' ? statusStyles.Deceased : 
                      statusStyles.Unknown;

  // Karakter detaylarını modal içinde render ederken kullanılacak olan fonksiyonlar
  const renderInfoTab = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Character hero stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
        {character.gender && (
          <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all hover:bg-[#0F1923]/70 group">
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs uppercase tracking-wider text-gray-400">{texts.gender}</p>
              <span className="text-[#FF4655] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
            <p className="text-white font-medium">{character.gender}</p>
          </div>
        )}
        
        {character.age !== null && character.age !== undefined && (
          <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all hover:bg-[#0F1923]/70 group">
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs uppercase tracking-wider text-gray-400">{texts.age}</p>
              <span className="text-[#FF4655] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            <p className="text-white font-medium">{character.age}</p>
          </div>
        )}
        
        {character.height && (
          <div className="bg-[#0F1923]/50 rounded-lg p-3 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all hover:bg-[#0F1923]/70 group">
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs uppercase tracking-wider text-gray-400">{texts.height}</p>
              <span className="text-[#FF4655] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </div>
            <p className="text-white font-medium">{character.height}</p>
          </div>
        )}
        
        {character.status && (
          <div className={`${statusStyle.bgClass} rounded-lg p-3 backdrop-blur-sm border ${statusStyle.borderClass} transition-all group`}>
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs uppercase tracking-wider text-gray-200">Status</p>
              <span className={statusStyle.iconClass}>
                {character.status === 'Alive' && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </span>
            </div>
            <p className={`font-medium ${statusStyle.textClass}`}>
              {character.status === 'Alive' ? texts.status.alive : 
              character.status === 'Deceased' ? texts.status.deceased : 
              texts.status.unknown}
            </p>
          </div>
        )}
      </div>

      {/* Personal background */}
      <div className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md mr-3 ${statusStyle.bgClass} ${statusStyle.borderClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </span>
          <span>{texts.title || "Kişisel Bilgiler"}</span>
          <span className="ml-2 text-sm font-normal text-gray-400">BIO</span>
        </h3>

        <div className="space-y-5">
          {character.birthplace && (
            <div className="group">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${statusStyle.bgClass} mr-2`}></span>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1 group-hover:text-white transition-colors">{texts.birthplace}</h4>
              </div>
              <p className="text-gray-200 pl-4 border-l border-white/10 py-1 ml-[0.15rem]">{character.birthplace}</p>
            </div>
          )}
          
          {character.residence && (
            <div className="group">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${statusStyle.bgClass} mr-2`}></span>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1 group-hover:text-white transition-colors">{texts.residence}</h4>
              </div>
              <p className="text-gray-200 pl-4 border-l border-white/10 py-1 ml-[0.15rem]">{character.residence}</p>
            </div>
          )}
          
          {character.occupation && (
            <div className="group">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${statusStyle.bgClass} mr-2`}></span>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-1 group-hover:text-white transition-colors">{texts.occupation}</h4>
              </div>
              <p className="text-gray-200 pl-4 border-l border-white/10 py-1 ml-[0.15rem]">{character.occupation}</p>
            </div>
          )}
        </div>
      </div>
    
      {/* Aliases section */}
      {character.alias && character.alias.length > 0 && (
        <div className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md mr-3 ${statusStyle.bgClass} ${statusStyle.borderClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            <span>{texts.aliases}</span>
            <span className="ml-2 text-sm font-normal text-gray-400">ID</span>
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {character.alias.map((alias, index) => (
              <motion.span 
                key={index} 
                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-[#1A242D]/70 text-gray-200 border border-white/5 backdrop-blur-md shadow-md hover:border-white/20 hover:bg-[#1A242D]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {alias}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
  
  const renderGroupsTab = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Character groups */}
      {character.groups && character.groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {character.groups.map((group, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-lg group-hover:text-[#FF4655] transition-colors">{group.name}</h3>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStyle.bgClass} ${statusStyle.borderClass} backdrop-blur-sm shadow-md`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </span>
              </div>
              
              {group.sub_groups && group.sub_groups.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Alt Gruplar</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.sub_groups.map((subGroup, subIndex) => (
                      <motion.span 
                        key={subIndex} 
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1A242D]/70 text-gray-300 border border-white/5 shadow-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {subGroup}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Character roles */}
      {character.roles && character.roles.length > 0 && (
        <div className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md mr-3 ${statusStyle.bgClass} ${statusStyle.borderClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <span>{texts.roles}</span>
            <span className="ml-2 text-sm font-normal text-gray-400">ROLE</span>
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {character.roles.map((role, index) => (
              <motion.span 
                key={index}
                className="px-4 py-2 bg-[#1A242D]/70 backdrop-blur-md text-gray-200 rounded-lg text-sm border border-white/5 shadow-md hover:border-white/20 hover:bg-[#1A242D]/90 transition-colors"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 70, 85, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      )}
      
      {/* Character relatives */}
      {character.relatives && character.relatives.length > 0 && (
        <div className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md mr-3 ${statusStyle.bgClass} ${statusStyle.borderClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </span>
            <span>{texts.relatives}</span>
            <span className="ml-2 text-sm font-normal text-gray-400">FAMILY</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {character.relatives.map((relative, index) => (
              <motion.div 
                key={index}
                className="bg-[#1A242D]/70 backdrop-blur-md rounded-lg border border-white/5 overflow-hidden group hover:border-white/20 transition-all duration-300"
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
              >
                <div className={`p-3 ${statusStyle.bgClass} border-b ${statusStyle.borderClass}`}>
                  <h4 className="font-medium text-white">{relative.family}</h4>
                </div>
                {relative.members && relative.members.length > 0 && (
                  <ul className="p-4">
                    {relative.members.map((member, memberIndex) => (
                      <li key={memberIndex} className="flex items-center py-1.5 group/item">
                        <div className={`w-1.5 h-1.5 ${statusStyle.bgClass} rounded-full mr-2 group-hover/item:scale-110 transition-transform`}></div>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors">
                          {typeof member === 'string' && member.startsWith('http')
                            ? texts.relatedCharacter
                            : member}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderEpisodesTab = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Character episodes */}
      {character.episodes && character.episodes.length > 0 ? (
        <div className="bg-[#0F1923]/70 backdrop-blur-lg rounded-xl border border-white/10 transition-all duration-300 shadow-lg overflow-hidden">
          <div className={`p-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 ${statusStyle.bgClass}`}>
            <div className="flex items-center">
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-white/10 backdrop-blur-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{texts.episodes}</h3>
                <p className="text-sm text-white/80">{texts.episodesInfo.replace('{count}', character.episodes.length.toString())}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`bg-black/30 text-white border ${statusStyle.borderClass} rounded-full px-4 py-1 text-lg font-bold backdrop-blur-lg shadow-inner`}>
                {character.episodes.length}
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex flex-wrap gap-3 mb-6">
              {[...Array(Math.min(10, character.episodes.length))].map((_, index) => (
                <motion.div 
                  key={index}
                  className="bg-[#1A242D]/70 backdrop-blur-md rounded-md py-1 px-3 text-white/90 text-sm border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Ep {index + 1}
                </motion.div>
              ))}
              {character.episodes.length > 10 && (
                <motion.div 
                  className="bg-[#1A242D]/70 backdrop-blur-md rounded-md py-1 px-3 text-white/90 text-sm border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  +{character.episodes.length - 10} daha
                </motion.div>
              )}
            </div>
            
            <Link
              href={`/episodes?character=${character.id}`}
              className="inline-flex items-center text-white hover:text-[#FF4655] transition-colors bg-[#0F1923]/40 hover:bg-[#0F1923]/60 px-4 py-2.5 rounded-md backdrop-blur-md border border-white/10 hover:border-[#FF4655]/40 shadow-md group"
            >
              <span>{texts.viewEpisodesLink}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#0F1923]/70 backdrop-blur-lg p-5 rounded-xl border border-white/10 transition-all duration-300 shadow-lg text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A242D]/70 flex items-center justify-center backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400">Bu karakter hiçbir bölümde görünmüyor.</p>
        </div>
      )}
    </motion.div>
  );

  // Ana render fonksiyonu
  return (
    <div className="relative space-y-6 overflow-x-hidden">
      {/* Hero Section - Visual Highlight */}
      <div className="relative overflow-hidden rounded-xl bg-[#1A242D]/60 backdrop-blur-3xl border border-white/10 shadow-2xl min-h-[250px]">
        {/* Animasyonlu arka plan dekorasyonu */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Durum rengine göre arka plan gradyanı */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#0F1923]/90 via-[#1A242D]/80 to-[#0F1923]/90 z-0`}></div>
          
          {/* Dekoratif elementler */}
          <motion.div 
            className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${statusStyle.accentColor} opacity-20 blur-xl`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.9, 1], 
              opacity: [0, 0.2, 0.15, 0.25],
              y: [0, -10, 5, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          ></motion.div>
          
          <motion.div 
            className={`absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-gradient-to-tr ${statusStyle.accentColor} opacity-10 blur-xl`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 0.9, 1], 
              opacity: [0.1, 0.15, 0.1, 0.12],
              y: [0, 10, -5, 0],
              x: [0, -5, 5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          ></motion.div>

          {/* Semi-transparent pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] z-10"></div>
        </div>

        <div className="relative z-20 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Character Image */}
            <motion.div 
              ref={imageRef}
              className={`w-full md:w-1/3 max-w-[220px] aspect-square relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer`}
              onClick={() => setExpandedImage(!expandedImage)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                scale: expandedImage ? 1.05 : 1,
                boxShadow: expandedImage ? '0 0 60px rgba(0,0,0,0.7)' : '0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {character.img ? (
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src={cleanImageUrl(character.img)} 
                    alt={character.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={`object-cover transition-all duration-700 ${expandedImage ? 'scale-110' : 'scale-100'} group-hover:scale-110`}
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
                  
                  {/* Semi-transparent gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 ${expandedImage ? 'opacity-30' : 'opacity-50'} transition-opacity duration-500`}></div>
                  
                  {/* Image expand/collapse icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-lg flex items-center justify-center">
                      {expandedImage ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <div className={`px-3 py-1 rounded-full backdrop-blur-lg ${statusStyle.bgClass} ${statusStyle.textClass} border ${statusStyle.borderClass} shadow-lg flex items-center gap-1.5`}>
                      <span className="text-xs font-medium">{statusStyle.statusEmoji}</span>
                      <span className="text-xs font-medium">
                        {character.status === 'Alive' ? texts.status.alive : 
                         character.status === 'Deceased' ? texts.status.deceased : 
                         texts.status.unknown}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0F1923]/90 text-6xl font-bold text-white">
                  {character.name.charAt(0).toUpperCase()}
                </div>
              )}
            </motion.div>

            {/* Character Info */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              {/* Name and Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  {character.species?.map((species, index) => (
                    <span key={index} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1A242D]/70 text-blue-300 border border-blue-500/30 backdrop-blur-lg shadow-md">
                      {species}
                    </span>
                  ))}
                </div>
                
                <motion.h2 
                  className={`text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg`}
                  id="character-modal-title"
                >
                  {character.name}
                  <motion.div 
                    className={`h-1 w-24 bg-gradient-to-r ${statusStyle.accentColor} rounded-full mt-2 mx-auto md:mx-0`}
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                </motion.h2>
                
                <motion.p 
                  className="text-gray-300 mb-6 max-w-lg mx-auto md:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {character.occupation || character.residence || "Attack on Titan karakteri"}
                </motion.p>
              </motion.div>
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                <button 
                  onClick={() => setActiveTab("info")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "info" 
                      ? `bg-gradient-to-r ${statusStyle.accentColor} text-white shadow-md` 
                      : 'bg-[#0F1923]/60 text-gray-300 hover:bg-[#0F1923]/80'
                  }`}
                >
                  Bilgiler
                </button>
                <button 
                  onClick={() => setActiveTab("groups")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "groups" 
                      ? `bg-gradient-to-r ${statusStyle.accentColor} text-white shadow-md` 
                      : 'bg-[#0F1923]/60 text-gray-300 hover:bg-[#0F1923]/80'
                  }`}
                >
                  Gruplar & İlişkiler
                </button>
                <button 
                  onClick={() => setActiveTab("episodes")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "episodes" 
                      ? `bg-gradient-to-r ${statusStyle.accentColor} text-white shadow-md` 
                      : 'bg-[#0F1923]/60 text-gray-300 hover:bg-[#0F1923]/80'
                  }`}
                >
                  Bölümler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Tab Based */}
      <AnimatePresence>
        <div className="min-h-[400px]" id="character-modal-description">
          {activeTab === "info" && renderInfoTab()}
          {activeTab === "groups" && renderGroupsTab()}
          {activeTab === "episodes" && renderEpisodesTab()}
        </div>
      </AnimatePresence>
      
      {/* Footer */}
      <div className="py-4 flex items-center justify-between text-sm text-gray-500 border-t border-white/5 mt-8">
        <span>ID: {character.id}</span>
        <div className="flex items-center">
          <span className="mr-2">© Attack on Titan Wiki</span>
          <span className={`inline-block w-2 h-2 rounded-full ${statusStyle.bgClass}`}></span>
        </div>
      </div>
    </div>
  );
}
