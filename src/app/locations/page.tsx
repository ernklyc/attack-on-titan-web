'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import { textContent } from '@/data/textContent'; // Import textContent

// Dummy location data for demo purposes
const dummyLocations = [
  { id: 1, name: "Shiganshina District", type: "District", region: "Southern Wall Maria" },
  { id: 2, name: "Trost District", type: "District", region: "Southern Wall Rose" },
  { id: 3, name: "Wall Maria", type: "Wall", region: "Outermost Wall" },
  { id: 4, name: "Wall Rose", type: "Wall", region: "Middle Wall" },
  { id: 5, name: "Wall Sina", type: "Wall", region: "Innermost Wall" },
  { id: 6, name: "Stohess District", type: "District", region: "Eastern Wall Sina" },
  { id: 7, name: "Orvud District", type: "District", region: "Northern Wall Sina" },
  { id: 8, name: "Paradis Island", type: "Island", region: "Beyond the Walls" },
  { id: 9, name: "Marley", type: "Nation", region: "Mainland" }
];

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const texts = textContent.locationsPage; // Get texts for this page

  const openLocationModal = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-aot-dark">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gradient-to-r from-green-900 to-green-800 flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="aot-container relative z-10 flex flex-col items-center justify-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-green-600/40 text-white rounded-full mb-6 backdrop-blur backdrop-filter">
            {texts.banner.badge} {/* Use textContent */}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center tracking-wide">
            {texts.banner.title} {/* Use textContent */}
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl text-center leading-relaxed">
            {texts.banner.description} {/* Use textContent */}
          </p>
          <div className="mt-10 relative">
            <div className="h-[3px] w-24 bg-gradient-to-r from-green-400/50 to-green-600/50 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location cards */}
          {dummyLocations.map((location) => (
            <div key={location.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
              <div className="h-56 bg-gradient-to-b from-green-900/40 to-green-800/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-green-700/50 flex items-center justify-center text-2xl font-bold text-white">
                  {location.name.charAt(0)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{location.name}</h3>
                <p className="text-gray-400 mt-1">{location.type}</p>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => openLocationModal(location)} 
                    className="text-sm text-green-400 hover:underline"
                  >
                    {texts.viewDetailsButton} {/* Use textContent */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map section placeholder */}
        <div className="mt-16 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{texts.mapSection.title}</h2> {/* Use textContent */}
          <div className="aspect-[16/9] bg-gradient-to-b from-green-900/20 to-green-800/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">{texts.mapSection.placeholder}</p> {/* Use textContent */}
          </div>
        </div>

        {/* Note about the placeholder content */}
        <div className="mt-12 bg-gray-800/50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{texts.comingSoon.title}</h2> {/* Use textContent */}
          <p className="text-gray-300">
            {texts.comingSoon.description} {/* Use textContent */}
          </p>
        </div>
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={selectedLocation.name} // Title remains dynamic
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full h-48 bg-gradient-to-b from-green-900/40 to-green-800/40 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-white opacity-70">{selectedLocation.name}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-green-400">{texts.modal.type}</h4> {/* Use textContent */}
                  <p className="text-white">{selectedLocation.type}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-400">{texts.modal.region}</h4> {/* Use textContent */}
                  <p className="text-white">{selectedLocation.region}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-400">{texts.modal.description}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.descriptionPlaceholder.replace('{locationName}', selectedLocation.name)} {/* Use textContent */}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-400">{texts.modal.notableResidents}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.notableResidentsPlaceholder} {/* Use textContent */}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-400">{texts.modal.keyEvents}</h4> {/* Use textContent */}
                <p className="text-gray-300">
                  {texts.modal.keyEventsPlaceholder} {/* Use textContent */}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
