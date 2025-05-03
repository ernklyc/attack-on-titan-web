import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaGooglePlay, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', path: '/' },
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
    <nav className="bg-[#0F1923]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 shadow-lg">
      <div className="aot-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FF4655]">AoT</span>
            <span className="ml-2 text-lg hidden sm:inline-block">Universe</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="text-gray-300 hover:text-white hover:underline decoration-[#FF4655] decoration-2 underline-offset-8 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (Hidden on larger screens) */}
          <button className="md:hidden text-gray-400 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon p-1 text-lg text-gray-400 hover:text-[#FF4655] transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className="hidden md:hidden bg-[#0F1923]">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.path}
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1A242D]/70 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Social Media Links */}
          <div className="flex flex-wrap px-3 py-2 gap-3">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon p-1 text-lg text-gray-400 hover:text-[#FF4655] transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
