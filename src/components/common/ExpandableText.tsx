import React, { useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

const CLAMP_CLASSES = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
} as const;

interface ExpandableTextProps {
  text: string;
  language: Language;
  /** Lines shown before the text is cut with "See more". */
  lines?: keyof typeof CLAMP_CLASSES;
  className?: string;
}

/**
 * Paragraph clamped to a few lines with an inline "See more / See less"
 * toggle. The toggle only appears when the text is actually cut off.
 */
export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  language,
  lines = 3,
  className = '',
}) => {
  const t = TRANSLATIONS[language];
  const ref = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isExpanded) return;
    const measure = () =>
      setIsOverflowing(el.scrollHeight - el.clientHeight > 1);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, isExpanded]);

  return (
    <div className={className}>
      <p
        ref={ref}
        className={`text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 ${
          isExpanded ? '' : CLAMP_CLASSES[lines]
        }`}
      >
        {text}
      </p>
      {(isOverflowing || isExpanded) && (
        <button
          type="button"
          onClick={(e) => {
            // Cards around the text may be clickable themselves.
            e.stopPropagation();
            setIsExpanded((v) => !v);
          }}
          onKeyDown={(e) => e.stopPropagation()}
          aria-expanded={isExpanded}
          className="mt-2 inline-flex h-7 items-center gap-1 rounded-full bg-amber-500/10 px-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-500/20 dark:text-amber-300"
        >
          {isExpanded ? t.common.showLess : t.common.showMore}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};
