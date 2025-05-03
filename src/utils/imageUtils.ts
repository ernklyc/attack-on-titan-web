/**
 * Utility functions for handling images in the Attack on Titan application
 */

/**
 * Cleans and normalizes image URLs from various sources
 * @param url - The original image URL
 * @returns A cleaned and normalized image URL, or placeholder if invalid
 */
export const cleanImageUrl = (url: string): string => {
  // Return default placeholder if URL is empty or undefined
  if (!url) return '/images/character-placeholder.png';
  
  // Handle URLs from common CDNs and image hosts
  if (url.includes('wikia.nocookie.net')) {
    // Remove revision parameters for better caching and stability
    try {
      const baseUrl = url.split('/revision/')[0];
      return baseUrl;
    } catch (e) {
      console.warn('Failed to clean wikia URL:', e);
      return url;
    }
  }
  
  // Handle relative URLs
  if (url.startsWith('/')) {
    return url;
  }
  
  // Handle potentially invalid URLs
  try {
    new URL(url);
    return url;
  } catch (e) {
    console.warn('Invalid URL detected, using placeholder:', url);
    return '/images/character-placeholder.png';
  }
};

/**
 * Creates a fallback UI element when an image fails to load
 * @param container - The HTML container element where the image should be
 * @param name - Text to use for generating the fallback (usually character name)
 * @param size - Size variant of the fallback (small or large)
 */
export const createImageFallback = (
  container: HTMLElement,
  name: string,
  size: 'sm' | 'lg' = 'sm'
): void => {
  // Clear existing content and add styling
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.classList.add('bg-gray-800', 'flex', 'items-center', 'justify-center');
  
  // Create the placeholder element with initials
  const placeholder = document.createElement('div');
  const firstChar = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  
  placeholder.className = size === 'sm' 
    ? 'w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-white'
    : 'w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-white';
  
  placeholder.textContent = firstChar;
  container.appendChild(placeholder);
  
  // Add subtle animation
  placeholder.animate(
    [
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    {
      duration: 300,
      easing: 'ease-out'
    }
  );
};