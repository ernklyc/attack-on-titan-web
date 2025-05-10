'use client';
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-all duration-300 animate-fadeIn"
          aria-label="Yukarı çık"
        >
          <IoIosArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
