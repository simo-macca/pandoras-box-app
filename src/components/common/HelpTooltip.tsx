import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';

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
  // Hover shows a preview; a click pins the box open until it is closed
  // (X, click outside or Escape), so it does not vanish when the pointer leaves.
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isOpen = isHovered || isPinned;
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsPinned(false);
    setIsHovered(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsPinned(false);
        setIsHovered(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPinned(false);
        setIsHovered(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (isPinned) close();
          else setIsPinned(true);
        }}
        aria-label={`Info: ${title}`}
        aria-expanded={isOpen}
        className={`rounded-full p-1 text-neutral-400 transition-colors hover:text-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:hover:text-amber-400 ${
          size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'
        } ${isOpen ? 'text-amber-500 dark:text-amber-400' : ''}`}
      >
        <Info className="h-full w-full stroke-[2.2]" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className={`animate-fade-in pointer-events-auto absolute bottom-full z-50 mb-2 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-neutral-200/80 bg-white p-4 text-left text-neutral-900 shadow-(--shadow-lift) sm:w-80 dark:border-white/10 dark:bg-neutral-800 dark:text-white ${alignmentClasses}`}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-neutral-900 dark:text-white">
              {title}
            </span>
            {isPinned && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="btn-icon -my-1 -mr-1 h-7 w-7 rounded-lg"
                aria-label="Close info"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
