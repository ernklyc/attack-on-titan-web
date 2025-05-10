// Sections spacing utility script
// This script calculates and optimizes the gap between sections when scrolling

document.addEventListener('DOMContentLoaded', () => {
  // Get all sections that should be optimized
  const sections = document.querySelectorAll('section[class*="bg-aot-dark"]');
  
  // Function to adjust section height based on viewport
  function adjustSectionHeights() {
    const viewportHeight = window.innerHeight;
    
    sections.forEach(section => {
      // Make sure the section fills at least the viewport height
      if (section.offsetHeight < viewportHeight) {
        section.style.minHeight = `${viewportHeight}px`;
      }
      
      // Ensure content is properly centered
      const content = section.querySelector('div[class*="container"]');
      if (content) {
        const contentHeight = content.offsetHeight;
        const availableSpace = section.offsetHeight - contentHeight;
        
        if (availableSpace > 0) {
          content.style.marginTop = `${Math.max(16, availableSpace / 2)}px`;
          content.style.marginBottom = `${Math.max(16, availableSpace / 2)}px`;
        }
      }
    });
  }
  
  // Run on page load and resize
  adjustSectionHeights();
  window.addEventListener('resize', adjustSectionHeights);
  
  // Enable smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Smooth scroll with offset for fixed header
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
