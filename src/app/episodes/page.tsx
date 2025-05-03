'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';

// Dummy episode data for demo purposes
const generateEpisodes = (season: number) => {
  return Array.from({ length: 12 }, (_, index) => ({
    id: season * 100 + index + 1,
    title: `Episode ${index + 1}`,
    seasonNumber: season,
    episodeNumber: index + 1,
    airDate: `2013-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    synopsis: "This is a placeholder synopsis. The actual content will be added later.",
    runtime: `${Math.floor(Math.random() * 5) + 20} minutes`,
    director: "To be announced",
    writer: "To be announced"
  }));
};

const dummyEpisodes = {
  1: generateEpisodes(1),
  2: generateEpisodes(2),
  3: generateEpisodes(3),
  4: generateEpisodes(4)
};

export default function Episodes() {
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEpisodeModal = (episode: any) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-aot-dark">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-900 to-purple-800 flex items-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="aot-container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Episodes</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Follow the story from beginning to end with detailed episode guides.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="aot-container py-12">
        {/* Seasons sections */}
        {[1, 2, 3, 4].map((season) => (
          <div key={season} className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-800 pb-2">
              Season {season}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Episode cards */}
              {dummyEpisodes[season as keyof typeof dummyEpisodes].slice(0, 8).map((episode) => (
                <div key={episode.id} className="aot-card hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="h-48 bg-gradient-to-b from-purple-900/40 to-purple-800/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-700/50 flex items-center justify-center text-xl font-bold text-white">
                      {episode.episodeNumber}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{episode.title}</h3>
                    <p className="text-gray-400 mt-1">Season {episode.seasonNumber}</p>
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={() => openEpisodeModal(episode)} 
                        className="text-sm text-purple-400 hover:underline"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Note about the placeholder content */}
        <div className="mt-12 bg-gray-800/50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">More Episodes Coming Soon</h2>
          <p className="text-gray-300">
            We're currently working on adding detailed information for all Attack on Titan episodes.
            Check back soon for updates!
          </p>
        </div>
      </div>

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={`Season ${selectedEpisode.seasonNumber} - ${selectedEpisode.title}`}
        >
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-900/40 w-full h-40 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-white">
                  S{selectedEpisode.seasonNumber}E{selectedEpisode.episodeNumber}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400">Air Date</h4>
                  <p className="text-white">{selectedEpisode.airDate}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400">Runtime</h4>
                  <p className="text-white">{selectedEpisode.runtime}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400">Director</h4>
                  <p className="text-white">{selectedEpisode.director}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400">Writer</h4>
                  <p className="text-white">{selectedEpisode.writer}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-400">Synopsis</h4>
                <p className="text-gray-300">
                  {selectedEpisode.synopsis}
                </p>
                <p className="text-gray-400 mt-4">
                  Detailed episode summary will be available soon. This will include key plot points, character developments, and important moments from the episode.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-400">Key Moments</h4>
                <p className="text-gray-300">
                  Information about key moments in this episode will be added soon.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
