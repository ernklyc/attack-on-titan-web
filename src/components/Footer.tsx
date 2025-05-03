import Link from 'next/link';
import { FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaGooglePlay, FaTwitter, FaInstagram } from 'react-icons/fa';
import { textContent } from '@/data/textContent'; // Import textContent

export default function Footer() {
  const categories = textContent.navbar.links.filter(link => link.path !== '/'); // Reuse navbar links, excluding Home

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
    <footer className="bg-[#0F1923] text-gray-400 border-t border-white/5">
      <div className="aot-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#FF4655]">{textContent.footer.logoShort}</span> {/* Use textContent */}
              <span className="ml-2 text-lg text-white">{textContent.footer.logoLong}</span> {/* Use textContent */}
            </Link>
            <p className="mt-4 max-w-md">
              {textContent.footer.description} {/* Use textContent */}
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
              {textContent.footer.exploreTitle} {/* Use textContent */}
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
              {textContent.footer.resourcesTitle} {/* Use textContent */}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white relative group inline-block">
                  {textContent.footer.links.about} {/* Use textContent */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white relative group inline-block">
                  {textContent.footer.links.faq} {/* Use textContent */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white relative group inline-block">
                  {textContent.footer.links.contact} {/* Use textContent */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white relative group inline-block">
                  {textContent.footer.links.privacy} {/* Use textContent */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FF4655]/70 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p>{textContent.footer.copyright}</p> {/* Use textContent */}
          <p className="mt-2 text-sm">
            {textContent.footer.disclaimer} {/* Use textContent */}
          </p>
          
          <div className="mt-6 bg-[#1A242D]/30 p-4 rounded-lg backdrop-blur-md border border-white/5 text-gray-500 text-sm">
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                {textContent.footer.credits.design} {/* Use textContent */}
              </span>
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                {textContent.footer.credits.stack} {/* Use textContent */}
              </span>
              <span className="flex items-center">
                <div className="h-2 w-2 bg-[#FF4655] rounded-full mr-1.5"></div>
                {textContent.footer.credits.edition} {/* Use textContent */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
