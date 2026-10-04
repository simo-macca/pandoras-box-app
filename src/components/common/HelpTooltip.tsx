import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, X } from 'lucide-react';

interface HelpTooltipProps {
  title: string;
  content: string;
  size?: 'sm' | 'md';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  title,
  content,
  size = 'sm',
  align = 'center',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    center: 'left-1/2 -translate-x-1/2 origin-top',
    right: 'right-0 origin-top-right',
  }[align];

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Info: ${title}`}
        className={`rounded-full p-1 text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
          size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
        } ${isOpen ? 'text-amber-500 dark:text-amber-400' : ''}`}
      >
        <Info className="w-full h-full stroke-[2.2]" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className={`absolute bottom-full mb-2 z-50 w-72 sm:w-80 p-3.5 rounded-2xl bg-neutral-900 dark:bg-neutral-800 text-white shadow-2xl border border-neutral-700/80 animate-fade-in text-left pointer-events-auto ${alignmentClasses}`}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-700/60 mb-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{title}</span>
            </span>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Close info"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-neutral-200 dark:text-neutral-300 leading-relaxed font-normal">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
