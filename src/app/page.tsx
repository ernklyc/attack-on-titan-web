import Link from 'next/link';
import Image from 'next/image';
import { textContent } from '@/data/textContent'; // Import textContent

export default function Home() {
  const sections = [
    { 
      title: textContent.homePage.explore.sections[0].title, // Use textContent
      path: '/characters',
      description: textContent.homePage.explore.sections[0].description, // Use textContent
      bgColor: 'from-blue-900/80 to-blue-800/80'
    },
    { 
      title: textContent.homePage.explore.sections[1].title, // Use textContent
      path: '/episodes',
      description: textContent.homePage.explore.sections[1].description, // Use textContent
      bgColor: 'from-purple-900/80 to-purple-800/80'
    },
    { 
      title: textContent.homePage.explore.sections[2].title, // Use textContent
      path: '/locations',
      description: textContent.homePage.explore.sections[2].description, // Use textContent
      bgColor: 'from-green-900/80 to-green-800/80'
    },
    { 
      title: textContent.homePage.explore.sections[3].title, // Use textContent
      path: '/organizations',
      description: textContent.homePage.explore.sections[3].description, // Use textContent
      bgColor: 'from-yellow-900/80 to-yellow-800/80'
    },
    { 
      title: textContent.homePage.explore.sections[4].title, // Use textContent
      path: '/titans',
      description: textContent.homePage.explore.sections[4].description, // Use textContent
      bgColor: 'from-red-900/80 to-red-800/80'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-aot-red/30 to-gray-900 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aot-dark z-10"></div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-aot-red/30 text-white rounded-full mb-6 backdrop-blur backdrop-filter">
            {textContent.homePage.hero.badge} {/* Use textContent */}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide mb-4">
            <span className="text-aot-red">{textContent.homePage.hero.titlePart1}</span><br /> {/* Use textContent */}
            {textContent.homePage.hero.titlePart2} {/* Use textContent */}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
            {textContent.homePage.hero.subtitle} {/* Use textContent */}
          </p>
          <Link href="#explore" 
            className="aot-btn text-lg px-8 py-3 hover:bg-aot-red/90 transition-all duration-300">
            {textContent.homePage.hero.button} {/* Use textContent */}
          </Link>
          <div className="mt-10 relative">
            <div className="h-[3px] w-24 bg-gradient-to-r from-aot-red/40 to-red-500/40 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <section id="explore" className="py-16 bg-aot-dark">
        <div className="aot-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{textContent.homePage.explore.title}</h2> {/* Use textContent */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {textContent.homePage.explore.description} {/* Use textContent */}
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
                        {textContent.homePage.explore.exploreLink} {/* Use textContent */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
              <h2 className="text-3xl font-bold mb-6">{textContent.homePage.about.title}</h2> {/* Use textContent */}
              <p className="text-gray-300 mb-4">
                {textContent.homePage.about.paragraph1} {/* Use textContent */}
              </p>
              <p className="text-gray-300 mb-4">
                {textContent.homePage.about.paragraph2} {/* Use textContent */}
              </p>
              <Link href="/about" className="aot-btn mt-2">
                {textContent.homePage.about.button} {/* Use textContent */}
              </Link>
            </div>
            <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
              <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 h-full w-full flex items-center justify-center"
              >
                <div className="text-6xl font-bold text-aot-red opacity-30">{textContent.homePage.about.placeholder}</div> {/* Use textContent */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
