import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const sections = [
    { 
      title: 'Characters', 
      path: '/characters',
      description: 'Explore the heroes, villains, and everyone in between from the Attack on Titan universe.',
      bgColor: 'from-blue-900/80 to-blue-800/80'
    },
    { 
      title: 'Episodes', 
      path: '/episodes',
      description: 'Follow the story from beginning to end with detailed episode guides.',
      bgColor: 'from-purple-900/80 to-purple-800/80'
    },
    { 
      title: 'Locations', 
      path: '/locations',
      description: 'Discover the key settings and environments where the story unfolds.',
      bgColor: 'from-green-900/80 to-green-800/80'
    },
    { 
      title: 'Organizations', 
      path: '/organizations',
      description: 'Learn about the military branches, government bodies, and other groups.',
      bgColor: 'from-yellow-900/80 to-yellow-800/80'
    },
    { 
      title: 'Titans', 
      path: '/titans',
      description: 'Examine the terrifying titans and their special abilities.',
      bgColor: 'from-red-900/80 to-red-800/80'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aot-dark z-10"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-aot-red/30 to-black bg-cover bg-center"
        ></div>
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Welcome to the<br />
            <span className="text-aot-red">Attack on Titan</span> Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Explore the world beyond the walls
          </p>
          <Link href="#explore" 
            className="aot-btn text-lg px-8 py-3">
            Explore Now
          </Link>
        </div>
      </div>

      {/* Main Content Sections */}
      <section id="explore" className="py-16 bg-aot-dark">
        <div className="aot-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore the Universe</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Dive into the dark and captivating world of Attack on Titan through our comprehensive guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <Link key={index} href={section.path} className="block">
                <div className={`aot-card h-64 relative overflow-hidden group`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.bgColor} group-hover:scale-105 transition-transform duration-300`}></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="text-gray-300">{section.description}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium flex items-center">
                        Explore <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-900">
        <div className="aot-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Attack on Titan</h2>
              <p className="text-gray-300 mb-4">
                Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. The story follows Eren Yeager, who vows to exterminate the Titans after a Titan brings about the destruction of his hometown and the death of his mother.
              </p>
              <p className="text-gray-300 mb-4">
                The series has become a critical and commercial success, with an anime adaptation that has further boosted its popularity worldwide.
              </p>
              <Link href="/about" className="aot-btn mt-2">
                Learn More
              </Link>
            </div>
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 h-full w-full flex items-center justify-center"
              >
                <div className="text-6xl font-bold text-aot-red opacity-30">AoT</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
