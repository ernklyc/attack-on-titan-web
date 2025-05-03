import React from 'react';
import Image from 'next/image';
// Import from our local mock instead of framer-motion
import { motion } from '@/utils/motion-mock';

// Utils for handling images
import { cleanImageUrl, createImageFallback } from '@/utils/imageUtils';

// Character type (simplified version, you may import from types)
interface Character {
  id: number;
  name: string;
  img: string;
  alias: string[];
  species: string[];
  status: string;
  occupation: string | null;
  // Add other fields as needed
}

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <motion.div 
      className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[380px] cursor-pointer"
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.25)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container with Effect */}
      <div className="h-56 overflow-hidden relative">
        {character.img ? (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
            <Image 
              src={cleanImageUrl(character.img)} 
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                // Fallback for failed images
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  // Create a fallback UI with first letter of character name
                  container.classList.add('bg-gray-800', 'flex', 'items-center', 'justify-center');
                  
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white';
                  placeholder.textContent = character.name.charAt(0).toUpperCase();
                  container.appendChild(placeholder);
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
              {character.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
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
      
      {/* Card Content Area */}
      <div className="p-5 flex flex-col h-[148px]">
        <h3 className="text-xl font-bold text-white mb-1 truncate font-display">
          {character.name}
        </h3>
        <p className="text-gray-400 text-sm mb-2 truncate">
          {character.species?.join(', ') || 'Bilinmiyor'}
        </p>
        {character.alias && character.alias.length > 0 && (
          <p className="text-gray-500 text-xs italic mb-auto truncate">
            Alias: {character.alias[0]}{character.alias.length > 1 ? '...' : ''}
          </p>
        )}
        
        {/* Action Button */}
        <button 
          type="button"
          className="mt-auto py-2.5 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-900/20"
        >
          <span>Detaylı Bilgi</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-700"></div>
    </motion.div>
  );
};

export default CharacterCard;