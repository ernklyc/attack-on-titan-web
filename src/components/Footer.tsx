import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaGooglePlay, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const categories = [
    { name: 'Characters', path: '/characters' },
    { name: 'Episodes', path: '/episodes' },
    { name: 'Locations', path: '/locations' },
    { name: 'Organizations', path: '/organizations' },
    { name: 'Titans', path: '/titans' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaGlobe />, url: '#', label: 'Website' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaGooglePlay />, url: 'https://play.google.com', label: 'Google Play' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#0F1923] text-gray-400 border-t border-white/5">
      <div className="aot-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#FF4655]">AoT</span>
              <span className="ml-2 text-lg text-white">Universe</span>
            </Link>
            <p className="mt-4 max-w-md">
              Your comprehensive guide to the Attack on Titan universe. Explore characters, episodes, locations, organizations, and titans.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon text-xl text-gray-400 hover:text-[#FF4655] relative group"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="h-4 w-1 bg-[#FF4655] rounded-full mr-2"></span>
              Explore
            </h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path}
                    className="hover:text-white relative group inline-block"
                  >
                    {category.name}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="h-4 w-1 bg-[#FF4655] rounded-full mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white relative group inline-block">
                  About
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white relative group inline-block">
                  FAQ
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white relative group inline-block">
                  Contact
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white relative group inline-block">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Attack on Titan Universe. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This is a fan-made website. All trademarks, logos, and brand names are the property of their respective owners.
          </p>
          
          <div className="mt-6 bg-[#1A242D]/30 p-4 rounded-lg backdrop-blur-md border border-white/5 text-gray-500 text-sm">
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                Design by You
              </span>
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                Next.js + Tailwind CSS
              </span>
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                2025 Edition
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
