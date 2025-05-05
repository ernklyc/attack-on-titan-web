"use client";

import React, { useState } from 'react';
// Import from our local mock instead of framer-motion
import { motion } from '@/utils/motion-mock';

interface CharacterFilterProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedOccupation: string;
  setSelectedOccupation: (value: string) => void;
  handleClearFilters: () => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({
  nameFilter,
  setNameFilter,
  selectedStatus,
  setSelectedStatus,
  selectedGender,
  setSelectedGender,
  selectedOccupation,
  setSelectedOccupation,
  handleClearFilters
}) => {
  // State for managing custom dropdowns
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  // State for mobile filter toggle
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Check if there are any active filters
  const hasActiveFilters = nameFilter || selectedStatus || selectedGender || selectedOccupation;

  // Status options
  const statusOptions = [
    { value: "", label: "Tümü" },
    { value: "alive", label: "Hayatta" },
    { value: "deceased", label: "Ölü" },
    { value: "unknown", label: "Bilinmiyor" }
  ];

  // Gender options
  const genderOptions = [
    { value: "", label: "Tümü" },
    { value: "male", label: "Erkek" },
    { value: "female", label: "Kadın" },
    { value: "unknown", label: "Bilinmiyor" }
  ];

  // Custom dropdown handler
  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value);
    setStatusDropdownOpen(false);
  };

  const handleGenderSelect = (value: string) => {
    setSelectedGender(value);
    setGenderDropdownOpen(false);
  };

  // Kapandığında dropdown'ların kapanmasını sağla
  const handleClickOutside = () => {
    if (statusDropdownOpen) setStatusDropdownOpen(false);
    if (genderDropdownOpen) setGenderDropdownOpen(false);
  };

  // Aktif filtre sayısı
  const activeFilterCount = [nameFilter, selectedStatus, selectedGender, selectedOccupation].filter(Boolean).length;

  return (
    <motion.div 
      className="p-3 sm:p-4 w-full" 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onClick={handleClickOutside}
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF4655] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-bold text-white">Karakter Filtrele</h2>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} 
            className="ml-3 md:hidden bg-[#0F1923]/60 text-white p-1 rounded-md focus:outline-none"
            aria-expanded={isMobileFiltersOpen}
            aria-controls="filter-section"
          >
            {isMobileFiltersOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Counter for active filters */}
        {hasActiveFilters && (
          <div>
            <span className="bg-[#FF4655]/40 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center border border-[#FF4655]/30 shadow-lg">
              {activeFilterCount}
              <span className="ml-1">aktif filtre</span>
            </span>
          </div>
        )}
      </motion.div>
      
      {/* Filtreleme alanları - Can be hidden in mobile view */}
      <div 
        id="filter-section"
        className={`${!isMobileFiltersOpen && 'hidden md:block'} transition-all duration-300`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {/* Name filter */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="name-filter" className="text-sm font-medium text-gray-300 mb-1 sm:mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              İsim
            </label>
            <div className="relative group">
              <input
                id="name-filter"
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Karakter adı girin..."
                className="w-full px-4 py-2 h-10 bg-[#0F1923]/50 backdrop-blur-lg border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4655]/50 focus:border-[#FF4655]/30 transition-all duration-200 pl-10 text-sm"
                aria-label="Karakter ismine göre filtrele"
                autoComplete="off"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {nameFilter && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNameFilter('');
                    }}
                    className="text-gray-400 hover:text-white transition-colors bg-[#1A242D]/40 hover:bg-[#1A242D]/60 rounded-full p-1 backdrop-blur-lg"
                    aria-label="İsim filtresini temizle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Status filter - Custom dropdown */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label className="text-sm font-medium text-gray-300 mb-1 sm:mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Durum
            </label>
            <div className="relative">
              {/* Custom dropdown button */}
              <div
                className={`w-full px-4 py-2 h-10 bg-[#0F1923]/50 backdrop-blur-lg border ${statusDropdownOpen ? 'border-[#FF4655]/30 ring-2 ring-[#FF4655]/50' : 'border-white/10'} text-white rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200`}
                onClick={(e) => {
                  e.stopPropagation();
                  setStatusDropdownOpen(!statusDropdownOpen);
                  if (genderDropdownOpen) setGenderDropdownOpen(false);
                }}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-sm truncate">
                    {selectedStatus 
                      ? statusOptions.find(opt => opt.value === selectedStatus)?.label 
                      : "Tümü"}
                  </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transform transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown menu */}
              {statusDropdownOpen && (
                <div 
                  className="absolute z-[100] w-full mt-1 bg-[#1A242D]/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl max-h-60 overflow-auto custom-scrollbar"
                  style={{ maxHeight: '250px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {statusOptions.map((option) => (
                    <div 
                      key={option.value} 
                      className={`px-4 py-2.5 cursor-pointer text-sm hover:bg-[#FF4655]/20 transition-colors ${option.value === selectedStatus ? 'bg-[#FF4655]/30 text-white' : 'text-gray-300'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusSelect(option.value);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Gender filter - Custom dropdown */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label className="text-sm font-medium text-gray-300 mb-1 sm:mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Cinsiyet
            </label>
            <div className="relative">
              {/* Custom dropdown button */}
              <div
                className={`w-full px-4 py-2 h-10 bg-[#0F1923]/50 backdrop-blur-lg border ${genderDropdownOpen ? 'border-[#FF4655]/30 ring-2 ring-[#FF4655]/50' : 'border-white/10'} text-white rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200`}
                onClick={(e) => {
                  e.stopPropagation();
                  setGenderDropdownOpen(!genderDropdownOpen);
                  if (statusDropdownOpen) setStatusDropdownOpen(false);
                }}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm truncate">
                    {selectedGender 
                      ? genderOptions.find(opt => opt.value === selectedGender)?.label 
                      : "Tümü"}
                  </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transform transition-transform ${genderDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown menu */}
              {genderDropdownOpen && (
                <div 
                  className="absolute z-[100] w-full mt-1 bg-[#1A242D]/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl max-h-60 overflow-auto custom-scrollbar"
                  style={{ maxHeight: '250px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {genderOptions.map((option) => (
                    <div 
                      key={option.value} 
                      className={`px-4 py-2.5 cursor-pointer text-sm hover:bg-[#FF4655]/20 transition-colors ${option.value === selectedGender ? 'bg-[#FF4655]/30 text-white' : 'text-gray-300'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenderSelect(option.value);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Occupation filter */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="occupation-filter" className="text-sm font-medium text-gray-300 mb-1 sm:mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#FF4655]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Meslek
            </label>
            <div className="relative group">
              <input
                id="occupation-filter"
                type="text"
                value={selectedOccupation}
                onChange={(e) => setSelectedOccupation(e.target.value)}
                placeholder="Meslek girin..."
                className="w-full px-4 py-2 h-10 bg-[#0F1923]/50 backdrop-blur-lg border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4655]/50 focus:border-[#FF4655]/30 transition-all duration-200 pl-10 text-sm"
                aria-label="Mesleklere göre filtrele"
                autoComplete="off"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {selectedOccupation && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOccupation('');
                    }}
                    className="text-gray-400 hover:text-white transition-colors bg-[#1A242D]/40 hover:bg-[#1A242D]/60 rounded-full p-1 backdrop-blur-lg"
                    aria-label="Meslek filtresini temizle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Clear filters button */}
          <motion.div variants={itemVariants} className="col-span-1 flex items-end">
            <button
              onClick={hasActiveFilters ? handleClearFilters : undefined}
              disabled={!hasActiveFilters}
              className={`w-full px-4 py-2 h-10 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 backdrop-blur-lg
                ${hasActiveFilters 
                  ? "bg-[#0F1923]/70 hover:bg-[#0F1923]/90 text-white border border-white/10 hover:border-white/20 shadow-lg" 
                  : "bg-[#0F1923]/40 text-gray-500 cursor-not-allowed border border-white/5"}`}
              aria-label="Tüm filtreleri temizle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 mr-1 ${hasActiveFilters ? "text-[#FF4655]" : "text-gray-500"}`} 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Tüm Filtreleri Temizle</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterFilter;