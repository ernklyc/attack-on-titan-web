'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import { textContent } from '@/data/textContent'; // Import textContent

// Dummy titan data for demo purposes
const dummyTitans = [
  // Nine Titans
  { 
    id: 1, 
    name: "Attack Titan", 
    type: "Nine Titans", 
    height: "15 meters", 
    abilities: "Future memory inheritance, enhanced strength and endurance",
    currentHolder: "Eren Yeager"
  },
  { 
    id: 2, 
    name: "Armored Titan", 
    type: "Nine Titans", 
    height: "15 meters", 
    abilities: "Hardened armored skin, enhanced defensive capabilities",
    currentHolder: "Reiner Braun"
  },
  { 
    id: 3, 
    name: "Colossal Titan", 
    type: "Nine Titans", 
    height: "60 meters", 
    abilities: "Enormous size, steam emission, explosive transformation",
    currentHolder: "Armin Arlert (formerly Bertolt Hoover)"
  },
  { 
    id: 4, 
    name: "Female Titan", 
    type: "Nine Titans", 
    height: "14 meters", 
    abilities: "Versatility, selective hardening, titan attraction scream",
    currentHolder: "Annie Leonhart"
  },
  { 
    id: 5, 
    name: "Beast Titan", 
    type: "Nine Titans", 
    height: "17 meters", 
    abilities: "Projectile throwing, titan control through scream",
    currentHolder: "Zeke Yeager"
  },
  { 
    id: 6, 
    name: "Jaw Titan", 
    type: "Nine Titans", 
    height: "5 meters", 
    abilities: "Extreme jaw strength, agility, and speed",
    currentHolder: "Falco Grice (formerly Porco Galliard, Ymir)"
  },
  { 
    id: 7, 
    name: "Cart Titan", 
    type: "Nine Titans", 
    height: "4 meters", 
    abilities: "Quadrupedal form, enhanced endurance, can stay transformed for long periods",
    currentHolder: "Pieck Finger"
  },
  { 
    id: 8, 
    name: "War Hammer Titan", 
    type: "Nine Titans", 
    height: "15 meters", 
    abilities: "Remote control, weapon creation from hardened titan flesh",
    currentHolder: "Eren Yeager (formerly Lara Tybur)"
  },
  { 
    id: 9, 
    name: "Founding Titan", 
    type: "Nine Titans", 
    height: "Varies", 
    abilities: "Control over titans, memory manipulation of subjects of Ymir",
    currentHolder: "Eren Yeager (formerly Frieda Reiss)"
  },
  
  // Pure Titans
  { 
    id: 10, 
    name: "3-5 meter class", 
    type: "Pure Titan", 
    height: "3-5 meters", 
    abilities: "Basic titan abilities",
    currentHolder: "Various"
  },
  { 
    id: 11, 
    name: "7-15 meter class", 
    type: "Pure Titan", 
    height: "7-15 meters", 
    abilities: "Basic titan abilities",
    currentHolder: "Various"
  },
  { 
    id: 12, 
    name: "Abnormal Titans", 
    type: "Pure Titan", 
    height: "Varies", 
    abilities: "Unpredictable behavior, heightened intelligence",
    currentHolder: "Various"
  }
];

// Group titans by type
const nineTitans = dummyTitans.filter(titan => titan.id <= 9);
const pureTitans = dummyTitans.filter(titan => titan.id > 9);

export default function Titans() {
  const [selectedTitan, setSelectedTitan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const texts = textContent.titansPage; // Get texts for this page

  const openTitanModal = (titan: any) => {
    setSelectedTitan(titan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-aot-dark">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gradient-to-r from-red-900 to-red-800 flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="aot-container relative z-10 flex flex-col items-center justify-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-red-600/40 text-white rounded-full mb-6 backdrop-blur backdrop-filter">
            {texts.banner.badge} {/* Use textContent */}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center tracking-wide">
            {texts.banner.title} {/* Use textContent */}
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl text-center leading-relaxed">
            {texts.banner.description} {/* Use textContent */}
          </p>
          <div className="mt-10 relative">
            <div className="h-[3px] w-24 bg-gradient-to-r from-red-400/50 to-red-600/50 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        {/* Nine Titans section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-red-800 pb-2">
            {texts.sections.nineTitans} {/* Use textContent */}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nine Titans cards */}
            {nineTitans.map((titan) => (
              <div key={titan.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="h-56 bg-gradient-to-b from-red-900/40 to-red-800/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-700/50 flex items-center justify-center text-xl font-bold text-white">
                    {titan.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{titan.name}</h3>
                  <p className="text-gray-400 mt-1">{titan.type}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => openTitanModal(titan)} 
                      className="text-sm text-red-400 hover:underline"
                    >
                      {texts.viewDetailsButton} {/* Use textContent */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pure Titans section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-red-800 pb-2">
            {texts.sections.pureTitans} {/* Use textContent */}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pure Titans cards */}
            {pureTitans.map((titan) => (
              <div key={titan.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="h-48 bg-gradient-to-b from-red-900/40 to-red-800/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-700/50 flex items-center justify-center text-xl font-bold text-white">
                    {titan.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{titan.name}</h3>
                  <p className="text-gray-400 mt-1">{titan.type}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => openTitanModal(titan)} 
                      className="text-sm text-red-400 hover:underline"
                    >
                      {texts.viewDetailsButton} {/* Use textContent */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Titan Abilities section */}
        <section className="bg-gray-900 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">{texts.sections.abilities}</h2> {/* Use textContent */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded p-4">
              <h3 className="font-semibold text-white">{texts.abilitiesInfo.regenerationTitle}</h3> {/* Use textContent */}
              <p className="text-gray-400 mt-1">{texts.abilitiesInfo.regenerationDesc}</p> {/* Use textContent */}
            </div>
            <div className="bg-gray-800 rounded p-4">
              <h3 className="font-semibold text-white">{texts.abilitiesInfo.strengthTitle}</h3> {/* Use textContent */}
              <p className="text-gray-400 mt-1">{texts.abilitiesInfo.strengthDesc}</p> {/* Use textContent */}
            </div>
            <div className="bg-gray-800 rounded p-4">
              <h3 className="font-semibold text-white">{texts.abilitiesInfo.inheritanceTitle}</h3> {/* Use textContent */}
              <p className="text-gray-400 mt-1">{texts.abilitiesInfo.inheritanceDesc}</p> {/* Use textContent */}
            </div>
          </div>
        </section>

        {/* Note about the placeholder content */}
        <div className="mt-12 bg-gray-800/50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{texts.comingSoon.title}</h2> {/* Use textContent */}
          <p className="text-gray-300">
            {texts.comingSoon.description} {/* Use textContent */}
          </p>
        </div>
      </div>

      {/* Titan Detail Modal */}
      {selectedTitan && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={selectedTitan.name}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full h-48 bg-gradient-to-b from-red-900/40 to-red-800/40 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-white opacity-70">{selectedTitan.name}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-red-400">{texts.modal.type}</h4> {/* Use textContent */}
                  <p className="text-white">{selectedTitan.type}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400">{texts.modal.height}</h4> {/* Use textContent */}
                  <p className="text-white">{selectedTitan.height}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400">{texts.modal.currentHolder}</h4> {/* Use textContent */}
                  <p className="text-white">{selectedTitan.currentHolder}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-400">{texts.modal.abilities}</h4> {/* Use textContent */}
                <p className="text-white">{selectedTitan.abilities}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-400">{texts.modal.description}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.descriptionPlaceholder.replace('{titanName}', selectedTitan.name)} {/* Use textContent */}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-400">{texts.modal.previousHolders}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.previousHoldersPlaceholder} {/* Use textContent */}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-400">{texts.modal.keyBattles}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.keyBattlesPlaceholder} {/* Use textContent */}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
