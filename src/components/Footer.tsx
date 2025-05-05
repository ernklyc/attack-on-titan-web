"use client";

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaGooglePlay, FaTwitter, FaInstagram } from 'react-icons/fa';
import { textContent } from '@/data/textContent';

export default function Footer() {
  const categories = textContent.navbar.links.filter(link => link.path !== '/');

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: textContent.navbar.socialLabels.github },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: textContent.navbar.socialLabels.linkedin },
    { icon: <FaGlobe />, url: '#', label: textContent.navbar.socialLabels.website },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: textContent.navbar.socialLabels.youtube },
    { icon: <FaGooglePlay />, url: 'https://play.google.com', label: textContent.navbar.socialLabels.googlePlay },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: textContent.navbar.socialLabels.twitter },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: textContent.navbar.socialLabels.instagram },
  ];

  return (
    <footer className="relative z-10 mt-12 pb-4 px-4 sm:px-6">
      {/* Glass container wrapper for the entire footer */}
      <div className="bg-[#0F1923]/40 backdrop-blur-md border border-white/10 rounded-t-2xl shadow-xl">
        <div className="max-w-7xl mx-auto py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
            {/* Logo and Description */}
            <div className="col-span-1 sm:col-span-2">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-[#FF4655]">{textContent.footer.logoShort}</span>
                <span className="ml-2 text-lg text-white">{textContent.footer.logoLong}</span>
              </Link>
              <p className="mt-4 max-w-md text-sm sm:text-base">
                {textContent.footer.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon text-lg sm:text-xl text-gray-300 hover:text-[#FF4655] transition-colors p-1"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <span className="h-4 w-1 bg-[#FF4655] rounded-full mr-2"></span>
                {textContent.footer.exploreTitle}
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      href={category.path}
                      className="hover:text-white relative group inline-block text-gray-300"
                    >
                      {category.name}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div className="col-span-1">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <span className="h-4 w-1 bg-[#FF4655] rounded-full mr-2"></span>
                {textContent.footer.resourcesTitle}
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link href="/about" className="hover:text-white relative group inline-block text-gray-300">
                    {textContent.footer.links.about}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white relative group inline-block text-gray-300">
                    {textContent.footer.links.faq}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white relative group inline-block text-gray-300">
                    {textContent.footer.links.contact}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white relative group inline-block text-gray-300">
                    {textContent.footer.links.privacy}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-300 px-4 sm:px-6">
            <p className="text-sm">{textContent.footer.copyright}</p>
            <p className="mt-2 text-xs sm:text-sm">
              {textContent.footer.disclaimer}
            </p>
            
            <div className="mt-6 bg-[#1A242D]/50 p-3 sm:p-4 rounded-lg backdrop-blur-md border border-white/10 text-gray-400 text-xs sm:text-sm">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <span className="flex items-center">
                  <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                  {textContent.footer.credits.design}
                </span>
                <span className="flex items-center">
                  <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                  {textContent.footer.credits.stack}
                </span>
                <span className="flex items-center">
                  <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                  {textContent.footer.credits.edition}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
