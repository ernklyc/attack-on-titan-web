import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaGooglePlay, FaTwitter, FaInstagram } from 'react-icons/fa';
import { textContent } from '@/data/textContent'; // Import textContent

export default function Navbar() {
  const navLinks = textContent.navbar.links; // Use textContent

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: textContent.navbar.socialLabels.github }, // Use textContent
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: textContent.navbar.socialLabels.linkedin }, // Use textContent
    { icon: <FaGlobe />, url: '#', label: textContent.navbar.socialLabels.website }, // Use textContent
    { icon: <FaYoutube />, url: 'https://youtube.com', label: textContent.navbar.socialLabels.youtube }, // Use textContent
    { icon: <FaGooglePlay />, url: 'https://play.google.com', label: textContent.navbar.socialLabels.googlePlay }, // Use textContent
    { icon: <FaTwitter />, url: 'https://twitter.com', label: textContent.navbar.socialLabels.twitter }, // Use textContent
    { icon: <FaInstagram />, url: 'https://instagram.com', label: textContent.navbar.socialLabels.instagram }, // Use textContent
  ];

  return (
    <nav className="bg-[#0F1923]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 shadow-lg">
      <div className="aot-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FF4655]">{textContent.navbar.logoShort}</span> {/* Use textContent */}
            <span className="ml-2 text-lg hidden sm:inline-block">{textContent.navbar.logoLong}</span> {/* Use textContent */}
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="text-gray-300 hover:text-white relative group px-2 py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
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
                className="social-icon p-1 text-lg text-gray-400 hover:text-[#FF4655] transition-colors relative group"
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
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
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-[#1A242D]/70 rounded-md relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
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
                className="social-icon p-1 text-lg text-gray-400 hover:text-[#FF4655] transition-colors relative group"
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
