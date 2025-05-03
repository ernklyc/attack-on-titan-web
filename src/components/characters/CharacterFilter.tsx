import React from 'react';
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

  return (
    <motion.div 
      className="p-4 sm:p-6" // Reduced padding for more compact design
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex items-center mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Karakter Filtrele
        </h2>
        
        {/* Counter for active filters */}
        {(nameFilter || selectedStatus || selectedGender || selectedOccupation) && (
          <div className="ml-auto">
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center">
              {[nameFilter, selectedStatus, selectedGender, selectedOccupation].filter(Boolean).length}
              <span className="ml-1">aktif filtre</span>
            </span>
          </div>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name filter */}
        <motion.div variants={itemVariants}>
          <label htmlFor="name-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
              className="w-full px-4 py-2 h-10 bg-gray-700/70 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all pl-10 text-sm group-hover:border-gray-500"
              aria-label="Karakter ismine göre filtrele"
              autoComplete="off" // Prevents browser autofill
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
                  aria-label="İsim filtresini temizle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            <div className="absolute h-0.5 w-0 bg-red-500 bottom-0 left-0 group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-50"></div>
          </div>
        </motion.div>
        
        {/* Status filter */}
        <motion.div variants={itemVariants}>
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Durum
          </label>
          <div className="relative group">
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 h-10 bg-gray-700/70 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none pl-10 text-sm group-hover:border-gray-500"
              aria-label="Durum filtresini seçin"
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
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {selectedStatus && (
                <button
                  onClick={() => setSelectedStatus('')}
                  className="text-gray-400 hover:text-white transition-colors mr-6"
                  aria-label="Durum filtresini temizle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute h-0.5 w-0 bg-red-500 bottom-0 left-0 group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-50"></div>
          </div>
        </motion.div>
        
        {/* Gender filter */}
        <motion.div variants={itemVariants}>
          <label htmlFor="gender-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Cinsiyet
          </label>
          <div className="relative group">
            <select
              id="gender-filter"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-4 py-2 h-10 bg-gray-700/70 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none pl-10 text-sm group-hover:border-gray-500"
              aria-label="Cinsiyet filtresini seçin"
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
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {selectedGender && (
                <button
                  onClick={() => setSelectedGender('')}
                  className="text-gray-400 hover:text-white transition-colors mr-6"
                  aria-label="Cinsiyet filtresini temizle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute h-0.5 w-0 bg-red-500 bottom-0 left-0 group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-50"></div>
          </div>
        </motion.div>
        
        {/* Occupation filter */}
        <motion.div variants={itemVariants}>
          <label htmlFor="occupation-filter" className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
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
              className="w-full px-4 py-2 h-10 bg-gray-700/70 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all pl-10 text-sm group-hover:border-gray-500"
              aria-label="Mesleklere göre filtrele"
              autoComplete="off" // Prevents browser autofill
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
                  aria-label="Meslek filtresini temizle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            <div className="absolute h-0.5 w-0 bg-red-500 bottom-0 left-0 group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-50"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Clear filters button */}
      {(nameFilter || selectedStatus || selectedGender || selectedOccupation) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
            aria-label="Tüm filtreleri temizle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-300 group-hover:text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Tüm Filtreleri Temizle</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CharacterFilter;