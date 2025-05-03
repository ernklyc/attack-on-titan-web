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
        throw new Error(`API yanıtı başarısız: ${response.status}`);
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
        throw new Error('API yanıtı beklenen formatta değil');
      }
      
    } catch (err) {
      console.error("API hatası:", err);
      setError(`Karakterler yüklenirken bir hata oluştu: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`);
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
            aria-label={`Sayfa ${i}`}
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
          aria-label="İlk sayfa"
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
            aria-label="Sayfa 2"
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
            aria-label={`Sayfa ${i}`}
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
          aria-label="Son sayfa"
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
    <div className="min-h-screen bg-[#0F1923] text-gray-100">
      {/* Wrap useSearchParams in Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsWrapper>
          {(params) => handleSearchParams(params)}
        </SearchParamsWrapper>
      </Suspense>
      
      <div ref={topRef} className="scroll-mt-20" id="top"></div> {/* Scroll target with offset for fixed header */}
      
      {/* Hero Banner with improved design and single color scheme */}
      <motion.div 
        ref={bannerRef}
        initial={{ opacity: 0 }}
        animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[30vh] md:h-[35vh] flex items-center bg-[url('/placeholder.png')] bg-cover bg-center overflow-hidden"
      >
        {/* Improved overlay with consistent color */}
        <div className="absolute inset-0 bg-[#0F1923]/90 opacity-90"></div>
        
        {/* Animated title section with compact layout */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={bannerInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Compact badge with new red gradient */}
            <div className="inline-block px-4 py-1 text-xs font-medium bg-[#FF4655]/40 text-white rounded-full mb-3 backdrop-blur-sm border border-[#FF4655]/20 shadow-sm">
              Attack on Titan Evrenini Keşfet
            </div>
            
            {/* Clean title design */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Karakterler
            </h1>
            
            {/* Simplified description */}
            <p className="text-lg text-gray-300 mx-auto leading-relaxed max-w-2xl">
              Attack on Titan evreninin kahramanlarını, kötü adamlarını ve tüm karakterlerini keşfedin.
            </p>
            
            {/* Simple decorative element with updated red color */}
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] rounded-full mx-auto"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Section - Glass morphism design */}
      <div className="relative z-20 -mt-8 md:-mt-12 px-4">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto bg-[#1A242D]/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/5"
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
      </div>

      {/* Main Content with Staggered Animation */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
            <h3 className="text-xl font-bold mb-3">Hata Oluştu</h3>
            <p className="mb-4">{error}</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => fetchCharacters(currentPage, filters)} 
                className="px-4 py-2 bg-[#FF4655]/70 hover:bg-[#FF4655] rounded-md flex items-center transition-colors backdrop-blur-sm"
                aria-label="Verileri yeniden yükle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Tekrar Dene
              </button>
              <button 
                onClick={handleClearFilters} 
                className="px-4 py-2 bg-[#1A242D]/70 hover:bg-[#1A242D] rounded-md flex items-center transition-colors backdrop-blur-sm"
                aria-label="Filtreleri temizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Filtreleri Temizle
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
            <h3 className="text-xl text-gray-300 mb-4">Bu filtrelere uygun karakter bulunamadı.</h3>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#FF4655]/70 hover:bg-[#FF4655] text-white rounded-lg transition-colors shadow-lg hover:shadow-[#FF4655]/30 backdrop-blur-sm"
              aria-label="Filtreleri temizle"
            >
              Filtreleri Temizle
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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

            {/* Enhanced Pagination with updated styling */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 mb-8"
              >
                <div className="flex flex-col items-center">
                  {/* Page information */}
                  <div className="text-center mb-6">
                    <p className="text-gray-400">
                      Toplam <span className="text-white font-medium">{totalPages}</span> sayfada <span className="text-white font-medium">{totalPages * characters.length}</span>'den fazla karakter
                    </p>
                  </div>
                  
                  {/* Page navigation - glassmorphism style */}
                  <div className="inline-flex bg-[#1A242D]/60 backdrop-blur-lg rounded-lg p-2 shadow-xl border border-white/5">
                    {/* First page */}
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4655]/70 transition-all duration-300 
                        ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-[#0F1923]/60'}`}
                      aria-label="İlk sayfa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zM6.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L2.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Previous page */}
                    <button
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4655]/70 transition-all duration-300 
                        ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-[#0F1923]/60'}`}
                      aria-label="Önceki sayfa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    <div className="flex items-center px-2">
                      {/* Use the existing renderPageNumbers but we'll update the styles below */}
                      {renderPageNumbers()}
                    </div>
                    
                    {/* Next page */}
                    <button
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4655]/70 transition-all duration-300 
                        ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-[#0F1923]/60'}`}
                      aria-label="Sonraki sayfa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Last page */}
                    <button 
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center mx-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4655]/70 transition-all duration-300 
                        ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-[#0F1923]/60'}`}
                      aria-label="Son sayfa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 6.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0zM13.293 15.707a1 1 0 010-1.414L17.586 10l-4.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
            <CharacterDetail character={selectedCharacter} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Character Detail Component (Extracted for cleaner code organization)
function CharacterDetail({ character }: { character: Character }) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <div className="relative h-80 w-full flex items-center justify-center bg-[#0F1923]/80 rounded-lg overflow-hidden backdrop-blur-md border border-white/5 shadow-lg">
          {character.img ? (
            <div className="relative w-full h-full">
              <Image 
                src={cleanImageUrl(character.img)} 
                alt={character.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-contain"
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
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-[#1A242D]/90 flex items-center justify-center text-4xl font-bold text-white shadow-inner border border-white/10">
              {character.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              character.status === 'Alive' ? 'bg-green-900/40 text-green-300 border border-green-700/30 backdrop-blur-sm' : 
              character.status === 'Deceased' ? 'bg-[#FF4655]/20 text-white border border-[#FF4655]/30 backdrop-blur-sm' : 
              'bg-[#1A242D]/70 text-gray-300 border border-white/10 backdrop-blur-sm'
            }`}>
              {character.status === 'Alive' ? 'Hayatta' : 
               character.status === 'Deceased' ? 'Ölü' : 
               'Bilinmiyor'}
            </span>
            
            {character.species?.map((species, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1A242D]/70 text-blue-300 border border-white/10 backdrop-blur-sm">
                {species}
              </span>
            ))}
          </div>
          
          {character.alias && character.alias.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Lakaplar</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {character.alias.map((alias, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0F1923]/70 text-gray-300 border border-white/5 backdrop-blur-sm">
                    {alias}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center" id="character-modal-title">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-[#FF4655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Karakter Bilgileri
        </h2>
        
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar rounded-lg" id="character-modal-description">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Character properties grid layout */}
            {character.gender && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Cinsiyet</h3>
                <p className="text-gray-200">{character.gender}</p>
              </div>
            )}
            
            {character.age !== null && character.age !== undefined && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Yaş</h3>
                <p className="text-gray-200">{character.age}</p>
              </div>
            )}
            
            {character.height && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Boy</h3>
                <p className="text-gray-200">{character.height}</p>
              </div>
            )}
            
            {character.birthplace && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Doğum Yeri</h3>
                <p className="text-gray-200">{character.birthplace}</p>
              </div>
            )}
            
            {character.residence && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">İkametgah</h3>
                <p className="text-gray-200">{character.residence}</p>
              </div>
            )}
            
            {character.occupation && (
              <div className="bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Meslek</h3>
                <p className="text-gray-200">{character.occupation}</p>
              </div>
            )}
          </div>
          
          {/* Character groups */}
          {character.groups && character.groups.length > 0 && (
            <div className="mt-6 bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
              <h3 className="text-lg font-semibold text-[#FF4655] mb-3">Gruplar</h3>
              <div className="space-y-4">
                {character.groups.map((group, index) => (
                  <div key={index} className="bg-[#0F1923]/70 p-4 rounded-lg border border-white/5">
                    <h4 className="font-medium text-gray-200 mb-2">{group.name}</h4>
                    {group.sub_groups && group.sub_groups.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.sub_groups.map((subGroup, subIndex) => (
                          <span key={subIndex} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1A242D]/90 text-gray-300 border border-white/5">
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
            <div className="mt-6 bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
              <h3 className="text-lg font-semibold text-[#FF4655] mb-3">Roller</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {character.roles.map((role, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 bg-[#0F1923]/80 text-gray-200 rounded-lg text-sm border border-white/5"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Character relatives */}
          {character.relatives && character.relatives.length > 0 && (
            <div className="mt-6 bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
              <h3 className="text-lg font-semibold text-[#FF4655] mb-3">Akrabalar</h3>
              <div className="space-y-4">
                {character.relatives.map((relative, index) => (
                  <div key={index} className="bg-[#0F1923]/70 p-4 rounded-lg border border-white/5">
                    <h4 className="font-medium text-gray-200 mb-2">{relative.family}</h4>
                    {relative.members && relative.members.length > 0 && (
                      <ul className="list-disc pl-5 text-gray-300 space-y-1">
                        {relative.members.map((member, memberIndex) => (
                          <li key={memberIndex}>
                            {typeof member === 'string' && member.startsWith('http')
                              ? 'İlişkili Karakter'
                              : member}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Character episodes */}
          {character.episodes && character.episodes.length > 0 && (
            <div className="mt-6 bg-[#1A242D]/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
              <h3 className="text-lg font-semibold text-[#FF4655] mb-2">Bölümler</h3>
              <div className="flex items-center gap-3">
                <div className="bg-[#FF4655]/30 text-white border border-[#FF4655]/40 rounded-full px-4 py-1 text-xl font-bold backdrop-blur-sm">
                  {character.episodes.length}
                </div>
                <p className="text-gray-200">bölümde yer aldı</p>
              </div>
              
              <Link
                href={`/episodes?character=${character.id}`}
                className="mt-4 inline-flex items-center text-[#FF4655]/90 hover:text-[#FF4655] transition-colors"
              >
                <span>Bu karakterin yer aldığı bölümleri görüntüle</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
