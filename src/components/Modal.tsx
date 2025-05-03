import React, { useRef, useEffect } from 'react';

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
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  motionProps,
  accessibility 
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Arka plan blur ve overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"></div>
      
      <div 
        ref={modalRef}
        className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in border border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby={accessibility?.ariaLabelledBy || "modal-title"}
        aria-describedby={accessibility?.ariaDescribedBy}
        style={modalStyle as React.CSSProperties}
      >
        {/* Modal üst kısmındaki parlama efekti */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-700/50 flex justify-between items-center bg-gray-800/50">
          <h3 id={accessibility?.ariaLabelledBy || "modal-title"} className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded-full"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div 
          className="p-6 overflow-y-auto flex-grow custom-scrollbar"
          id={accessibility?.ariaDescribedBy}
        >
          {children}
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-700/50 flex justify-end bg-gray-800/50">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Kapat
          </button>
        </div>
        
        {/* Modal alt kısmındaki parlama efekti */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>
    </div>
  );
}
