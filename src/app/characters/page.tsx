'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';

// Dummy character data for demo purposes
const dummyCharacters = [
  { id: 1, name: 'Eren Yeager', role: 'Protagonist', affiliation: 'Survey Corps' },
  { id: 2, name: 'Mikasa Ackerman', role: 'Main Character', affiliation: 'Survey Corps' },
  { id: 3, name: 'Armin Arlert', role: 'Main Character', affiliation: 'Survey Corps' },
  { id: 4, name: 'Levi Ackerman', role: 'Supporting Character', affiliation: 'Survey Corps' },
  { id: 5, name: 'Erwin Smith', role: 'Supporting Character', affiliation: 'Survey Corps' },
  { id: 6, name: 'Hange Zoë', role: 'Supporting Character', affiliation: 'Survey Corps' },
  { id: 7, name: 'Reiner Braun', role: 'Antagonist', affiliation: 'Marley Warriors' },
  { id: 8, name: 'Bertolt Hoover', role: 'Antagonist', affiliation: 'Marley Warriors' },
  { id: 9, name: 'Annie Leonhart', role: 'Antagonist', affiliation: 'Marley Warriors' },
  { id: 10, name: 'Historia Reiss', role: 'Supporting Character', affiliation: 'Survey Corps' },
  { id: 11, name: 'Jean Kirstein', role: 'Supporting Character', affiliation: 'Survey Corps' },
  { id: 12, name: 'Connie Springer', role: 'Supporting Character', affiliation: 'Survey Corps' },
];

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCharacterModal = (character: any) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-aot-dark">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="aot-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Characters</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Explore the heroes, villains, and everyone in between from the Attack on Titan universe.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Character cards */}
          {dummyCharacters.map((character) => (
            <div key={character.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
              <div className="h-64 bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold text-white">
                  {character.name.charAt(0)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{character.name}</h3>
                <p className="text-gray-400 mt-1">{character.role}</p>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => openCharacterModal(character)} 
                    className="text-sm text-aot-red hover:underline"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about the placeholder content */}
        <div className="mt-12 bg-gray-800/50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">More Characters Coming Soon</h2>
          <p className="text-gray-300">
            We're currently working on adding detailed information for all Attack on Titan characters.
            Check back soon for updates!
          </p>
        </div>
      </div>

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={selectedCharacter.name}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-blue-800 flex items-center justify-center text-4xl font-bold text-white">
                {selectedCharacter.name.charAt(0)}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-blue-400">Role</h4>
                <p className="text-white">{selectedCharacter.role}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-blue-400">Affiliation</h4>
                <p className="text-white">{selectedCharacter.affiliation}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-blue-400">Background</h4>
                <p className="text-gray-300">
                  Detailed character background information will be available soon. This is a placeholder for the full character biography that will include their history, personality traits, abilities, and key story moments.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-blue-400">Relationships</h4>
                <p className="text-gray-300">
                  Information about this character's relationships with other characters will be added soon.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
