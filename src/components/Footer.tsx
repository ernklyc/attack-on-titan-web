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
    <footer className="bg-black text-gray-400">
      <div className="aot-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-aot-red">AoT</span>
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
                  className="social-icon text-xl hover:text-aot-red"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path}
                    className="hover:text-white hover:underline transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:underline transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Attack on Titan Universe. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This is a fan-made website. All trademarks, logos, and brand names are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
