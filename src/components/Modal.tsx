import React, { useRef, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';

// Create context to share status color with child components
export const ModalStatusContext = createContext<string>('#FF4655');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  motionProps?: {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  };
  accessibility?: {
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
  };
  statusColor?: string; // Karakter hayatta olma durumuna göre renk
  statusBorderClass?: string; // Border sınıfı
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  motionProps,
  accessibility,
  statusColor = '#FF4655', // Varsayılan renk
  statusBorderClass = 'border-white/10' // Varsayılan border sınıfı
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Close modal when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Apply any motion props that were passed
  const modalStyle = motionProps ? {
    initial: motionProps.initial,
    animate: motionProps.animate,
    exit: motionProps.exit,
    transition: motionProps.transition
  } : {};

  // Use a portal to render the modal directly in the body, outside of any container
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999}}>
      {/* Background blur and overlay */}
      <div className="absolute inset-0 bg-[#0F1923]/70 backdrop-blur-md animate-fade-in"></div>
      
      <div 
        ref={modalRef}
        className={`relative bg-[#0F1923]/40 text-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in border ${statusBorderClass} hover:border-opacity-30 backdrop-blur-lg`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={accessibility?.ariaLabelledBy || "modal-title"}
        aria-describedby={accessibility?.ariaDescribedBy}
        style={modalStyle as React.CSSProperties}
      >
        {/* Modal top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${statusColor}50, transparent)` }}></div>
        
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b ${statusBorderClass} flex justify-between items-center bg-[#1A242D]/30 backdrop-blur-sm`}>
          <h3 id={accessibility?.ariaLabelledBy || "modal-title"} className="text-xl font-bold text-white flex items-center">
            <span className="h-4 w-1 rounded-full mr-2" style={{ backgroundColor: statusColor }}></span>
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-[#FF4655] transition-colors p-1.5 hover:bg-[#0F1923]/50 rounded-full backdrop-blur-sm"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content - Wrapped with ModalStatusContext to provide status color to children */}
        <ModalStatusContext.Provider value={statusColor}>
          <div 
            className="p-6 overflow-y-auto flex-grow custom-scrollbar bg-[#0F1923]/30 backdrop-blur-lg"
            id={accessibility?.ariaDescribedBy}
          >
            {children}
          </div>
        </ModalStatusContext.Provider>
        
        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t ${statusBorderClass} flex justify-end bg-[#1A242D]/30 backdrop-blur-sm`}>
          <button 
            onClick={onClose}
            className="px-5 py-2 text-white rounded-lg transition-all duration-300 shadow-lg backdrop-blur-lg border flex items-center"
            style={{ 
              backgroundColor: `${statusColor}50`, 
              borderColor: `${statusColor}30`,
              boxShadow: `0 4px 6px -1px ${statusColor}20`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${statusColor}70`;
              e.currentTarget.style.borderColor = `${statusColor}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${statusColor}50`;
              e.currentTarget.style.borderColor = `${statusColor}30`;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Kapat
          </button>
        </div>
        
        {/* Modal bottom glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${statusColor}50, transparent)` }}></div>
      </div>
    </div>
  );
  
  // Only render when modal is open and client-side (for SSR compatibility)
  return isOpen && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
