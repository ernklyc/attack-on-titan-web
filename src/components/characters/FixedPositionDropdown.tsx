"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface FixedPositionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export default function FixedPositionDropdown({ 
  isOpen, 
  onClose, 
  triggerRef,
  children 
}: FixedPositionDropdownProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update position based on the trigger element
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5, // Add a small gap
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen, triggerRef]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) && 
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  // Render the dropdown through a portal to avoid z-index issues
  return createPortal(
    <div 
      ref={dropdownRef}
      className="fixed bg-[#1A242D]/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl max-h-60 overflow-auto custom-scrollbar"
      style={{ 
        zIndex: 99999, // Very high z-index
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxHeight: '250px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
}
