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
      className="group relative bg-gradient-to-br from-[#0F1923]/80 to-[#1A242D]/90 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[450px] cursor-pointer flex flex-col backdrop-blur-md border border-white/5"
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.25)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container with Effect - Height increased to h-80 (320px) */}
      <div className="h-80 overflow-hidden relative">
        {character.img ? (
          <div className="relative w-full h-full">
            {/* Enhanced gradient overlay to make text more readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/30 to-transparent z-10"></div>
            <Image 
              src={cleanImageUrl(character.img)} 
              alt={character.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                // Fallback for failed images
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  // Create a larger fallback UI with first letter of character name
                  container.classList.add('bg-[#0F1923]', 'flex', 'items-center', 'justify-center');
                  
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-32 h-32 rounded-full bg-[#1A242D] flex items-center justify-center text-5xl font-bold text-white border border-white/10';
                  placeholder.textContent = character.name.charAt(0).toUpperCase();
                  container.appendChild(placeholder);
                }
              }}
            />

            {/* Status Badge positioned at top right */}
            <div className="absolute top-3 right-3 z-20">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border ${
                character.status?.toLowerCase() === 'alive' ? 'bg-green-500/50 text-white border-green-500/30' : 
                character.status?.toLowerCase() === 'deceased' ? 'bg-[#FF4655]/50 text-white border-[#FF4655]/30' : 
                'bg-[#1A242D]/70 text-white border-white/10'
              }`}>
                {character.status?.toLowerCase() === 'alive' ? 'Hayatta' : 
                 character.status?.toLowerCase() === 'deceased' ? 'Ölü' : 
                 'Bilinmiyor'}
              </span>
            </div>

            {/* Character name overlayed on the image, positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
              <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-md mb-1">
                {character.name}
              </h3>
              <p className="text-sm text-gray-300 drop-shadow-md">
                {character.species?.join(', ') || 'Bilinmiyor'}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0F1923] to-[#1A242D] flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-[#1A242D]/90 flex items-center justify-center text-5xl font-bold text-white border border-white/10">
              {character.name.charAt(0).toUpperCase()}
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-20">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border ${
                character.status?.toLowerCase() === 'alive' ? 'bg-green-500/50 text-white border-green-500/30' : 
                character.status?.toLowerCase() === 'deceased' ? 'bg-[#FF4655]/50 text-white border-[#FF4655]/30' : 
                'bg-[#1A242D]/70 text-white border-white/10'
              }`}>
                {character.status?.toLowerCase() === 'alive' ? 'Hayatta' : 
                 character.status?.toLowerCase() === 'deceased' ? 'Ölü' : 
                 'Bilinmiyor'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Card Content Area - Now smaller due to larger image */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-2 flex-grow">
          {character.alias && character.alias.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 font-medium">Lakap:</p>
              <p className="text-sm text-gray-300">
                {character.alias.slice(0, 2).join(', ')}
                {character.alias.length > 2 ? '...' : ''}
              </p>
            </div>
          )}
          
          {character.occupation && (
            <div>
              <p className="text-sm text-gray-400 font-medium">Meslek:</p>
              <p className="text-sm text-gray-300 line-clamp-1">{character.occupation}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Button */}
      <div className="px-4 pb-4">
        <button 
          type="button"
          className="w-full py-2.5 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] hover:from-[#FF4655]/90 hover:to-[#FF4655] text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FF4655]/20 backdrop-blur-sm"
          aria-label={`${character.name} hakkında detaylı bilgi`}
        >
          <span>Detaylı Bilgi</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Hover Effects */}
      <div className={`absolute inset-0 bg-gradient-to-r ${
        character.status?.toLowerCase() === 'alive' 
          ? 'from-green-500/5 via-transparent to-green-500/5'
          : character.status?.toLowerCase() === 'deceased'
          ? 'from-[#FF4655]/5 via-transparent to-[#FF4655]/5'
          : 'from-gray-500/5 via-transparent to-gray-500/5'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      <div className={`absolute bottom-0 h-1 w-0 bg-gradient-to-r ${
        character.status?.toLowerCase() === 'alive'
          ? 'from-green-500 to-green-700'
          : character.status?.toLowerCase() === 'deceased'
          ? 'from-[#FF4655]/70 to-[#FF4655]'
          : 'from-gray-500 to-gray-700'
      } group-hover:w-full transition-all duration-700`}></div>
    </motion.div>
  );
};

export default CharacterCard;