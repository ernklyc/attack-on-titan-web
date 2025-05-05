import Image from 'next/image';
import { Character } from '@/types/characters';
import { useState } from 'react';
import { cleanImageUrl, createImageFallback } from '@/utils/imageUtils';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Resim URL'sini temizle
  const imageSrc = character.img ? cleanImageUrl(character.img) : '/images/character-placeholder.png';
  
  // İlk harfi büyük yapmak için yardımcı fonksiyon
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Genel isim ve başlık/afiliasyon bilgisi
  const characterTitle = character.title || character.occupation || character.rank || '';
  
  // Canlı durumu için stil sınıfları
  const statusClasses = {
    Alive: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/30',
    Deceased: 'bg-[#FF4655]/30 text-white border-[#FF4655]/30',
    Unknown: 'bg-gray-500/30 text-gray-300 border-gray-500/30'
  };
  
  // Karakter durumunu kontrol et
  const statusClass = character.status === 'Alive' ? statusClasses.Alive : 
                      character.status === 'Deceased' ? statusClasses.Deceased : 
                      statusClasses.Unknown;
  
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer transition-all duration-500 h-full transform hover:-translate-y-1"
      tabIndex={0}
      role="button"
      aria-label={`Character: ${character.name}`}
    >
      {/* Ana kart konteyneri - Glass morphic tasarım */}
      <div className="relative rounded-2xl overflow-hidden bg-[#1A242D]/60 backdrop-blur-lg border border-white/10 shadow-lg group-hover:shadow-xl group-hover:shadow-[#FF4655]/20 group-hover:border-[#FF4655]/30 transition-all duration-500 h-full">
        
        {/* Shine efekti - hover durumunda */}
        <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        
        {/* Görsel konteyneri */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          {!imageError ? (
            <Image
              src={imageSrc}
              alt={character.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center group-hover:scale-110 transition-all duration-700 ease-out"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0F1923]/80 text-5xl font-bold text-white">
              {getInitials(character.name)}
            </div>
          )}
          
          {/* Arka plan gölge efekti - hover durumunda görünür, alttan yukarı doğru gölge */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/70 group-hover:to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Hafif gradient overlay - her zaman görünür */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        </div>
        
        {/* Status durumu */}
        {character.status && (
          <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${statusClass} transform transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
            {character.status}
          </div>
        )}
        
        {/* Karakter türü (insan, titan vs.) */}
        {character.species && character.species.length > 0 && (
          <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium bg-[#1A242D]/70 backdrop-blur-sm text-gray-300 border border-white/10 shadow-md">
            {character.species[0]}
          </div>
        )}
        
        {/* Karakter bilgileri - kartın en altında, hover durumunda yukarı kayacak */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transition-all duration-300 group-hover:translate-y-[-60px]">
          {/* İsim ve Meslek Alanı - artırılmış okunabilirlik için drop-shadow */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF4655] transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {character.name}
            </h3>
            
            {characterTitle && (
              <p className="text-sm text-gray-200 max-w-full truncate drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                {characterTitle}
              </p>
            )}
          </div>
        </div>

        {/* Detaylı bilgi butonu - sadece hover durumunda görünür */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button 
            type="button"
            className="w-full py-2 bg-gradient-to-r from-[#FF4655]/80 to-[#FF4655] text-white rounded-md text-sm font-medium flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            aria-label={`${character.name} hakkında detaylı bilgi`}
          >
            <span>Detaylı Bilgi</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Bottom shine effect */}
      <div className="absolute bottom-0 h-1 w-0 bg-gradient-to-r from-[#FF4655]/70 to-[#FF4655] group-hover:w-full transition-all duration-700 z-20"></div>
    </div>
  );
}