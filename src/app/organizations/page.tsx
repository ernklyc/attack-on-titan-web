'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';

// Dummy organization data for demo purposes
const dummyOrganizations = [
  // Military
  { 
    id: 1, 
    name: "Survey Corps", 
    type: "Military", 
    leader: "Erwin Smith (formerly), Hange Zoë (currently)", 
    purpose: "Exploration outside the Walls and combat against Titans"
  },
  { 
    id: 2, 
    name: "Garrison", 
    type: "Military", 
    leader: "Dot Pixis", 
    purpose: "Wall maintenance and defense"
  },
  { 
    id: 3, 
    name: "Military Police", 
    type: "Military", 
    leader: "Nile Dok", 
    purpose: "Law enforcement and protection of the King"
  },
  // Government
  { 
    id: 4, 
    name: "Royal Government", 
    type: "Government", 
    leader: "King Fritz (puppet), Rod Reiss (true ruler, formerly)", 
    purpose: "Governance of the walled territory"
  },
  { 
    id: 5, 
    name: "Wall Cult", 
    type: "Religious", 
    leader: "Pastor Nick (formerly)", 
    purpose: "Worship and protection of the Walls"
  },
  // Other groups
  { 
    id: 6, 
    name: "Warriors", 
    type: "Military", 
    leader: "Marleyan Military Command", 
    purpose: "Titan-shifters used by Marley for warfare"
  },
  { 
    id: 7, 
    name: "Yeagerists", 
    type: "Faction", 
    leader: "Eren Yeager, Floch Forster", 
    purpose: "Support Eren's plan for Eldia"
  },
  { 
    id: 8, 
    name: "Anti-Marleyan Volunteers", 
    type: "Faction", 
    leader: "Yelena", 
    purpose: "Support Zeke Yeager's plan"
  }
];

// Group organizations by type
const militaryOrgs = dummyOrganizations.filter(org => org.id <= 3);
const governmentOrgs = dummyOrganizations.filter(org => org.id > 3 && org.id <= 5);
const otherOrgs = dummyOrganizations.filter(org => org.id > 5);

export default function Organizations() {
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openOrgModal = (org: any) => {
    setSelectedOrg(org);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-aot-dark">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gradient-to-r from-yellow-900 to-yellow-800 flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="aot-container relative z-10 flex flex-col items-center justify-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-yellow-600/40 text-white rounded-full mb-6 backdrop-blur backdrop-filter">
            Attack on Titan Evrenini Keşfet
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center tracking-wide">
            Organizasyonlar
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl text-center leading-relaxed">
            Attack on Titan evrenindeki askeri birlikler, hükümet organları ve diğer önemli organizasyonlar hakkında bilgi edinin.
          </p>
          <div className="mt-10 relative">
            <div className="h-[3px] w-24 bg-gradient-to-r from-yellow-400/50 to-yellow-600/50 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        {/* Military section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-yellow-800 pb-2">
            Military
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Military organization cards */}
            {militaryOrgs.map((org) => (
              <div key={org.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="h-48 bg-gradient-to-b from-yellow-900/40 to-yellow-800/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-700/50 flex items-center justify-center text-xl font-bold text-white">
                    {org.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{org.name}</h3>
                  <p className="text-gray-400 mt-1">{org.type}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => openOrgModal(org)} 
                      className="text-sm text-yellow-400 hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Government section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-yellow-800 pb-2">
            Government
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Government organization cards */}
            {governmentOrgs.map((org) => (
              <div key={org.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="h-48 bg-gradient-to-b from-yellow-900/40 to-yellow-800/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-700/50 flex items-center justify-center text-xl font-bold text-white">
                    {org.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{org.name}</h3>
                  <p className="text-gray-400 mt-1">{org.type}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => openOrgModal(org)} 
                      className="text-sm text-yellow-400 hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other groups section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-yellow-800 pb-2">
            Other Groups
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Other organization cards */}
            {otherOrgs.map((org) => (
              <div key={org.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="h-48 bg-gradient-to-b from-yellow-900/40 to-yellow-800/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-700/50 flex items-center justify-center text-xl font-bold text-white">
                    {org.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{org.name}</h3>
                  <p className="text-gray-400 mt-1">{org.type}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => openOrgModal(org)} 
                      className="text-sm text-yellow-400 hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note about the placeholder content */}
        <div className="mt-12 bg-gray-800/50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">More Details Coming Soon</h2>
          <p className="text-gray-300">
            We're currently working on adding more detailed information for all Attack on Titan organizations.
            Check back soon for updates!
          </p>
        </div>
      </div>

      {/* Organization Detail Modal */}
      {selectedOrg && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={selectedOrg.name}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full h-40 bg-gradient-to-b from-yellow-900/40 to-yellow-800/40 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-white opacity-70">{selectedOrg.name}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400">Type</h4>
                  <p className="text-white">{selectedOrg.type}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400">Leader</h4>
                  <p className="text-white">{selectedOrg.leader}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-yellow-400">Purpose</h4>
                <p className="text-white">{selectedOrg.purpose}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-yellow-400">Overview</h4>
                <p className="text-gray-300">
                  Detailed information about {selectedOrg.name} will be available soon. This will include its history, structure, and role in the story.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-yellow-400">Notable Members</h4>
                <p className="text-gray-300">
                  Information about key members of this organization will be added soon.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-yellow-400">Key Events</h4>
                <p className="text-gray-300">
                  Significant events involving this organization will be added soon.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
