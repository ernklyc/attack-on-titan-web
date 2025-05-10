'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on page navigation and refresh
    window.scrollTo(0, 0);
    
    // Handle history changes (back/forward buttons)
    const handlePopstate = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('popstate', handlePopstate);
    
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [pathname]);

  return null;
}