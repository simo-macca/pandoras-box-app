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
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Info: ${title}`}
        className={`rounded-full p-1 text-neutral-400 transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:hover:text-amber-400 ${
          size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'
        } ${isOpen ? 'text-amber-500 dark:text-amber-400' : ''}`}
      >
        <Info className="h-full w-full stroke-[2.2]" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className={`animate-fade-in pointer-events-auto absolute bottom-full z-50 mb-2 w-72 rounded-2xl border border-neutral-700/80 bg-neutral-900 p-3.5 text-left text-white shadow-2xl dark:bg-neutral-800 sm:w-80 ${alignmentClasses}`}
        >
          <div className="mb-2 flex items-center justify-between border-b border-neutral-700/60 pb-1.5">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>{title}</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="rounded p-0.5 text-neutral-400 transition-colors hover:text-white"
              aria-label="Close info"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs font-normal leading-relaxed text-neutral-200 dark:text-neutral-300">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
