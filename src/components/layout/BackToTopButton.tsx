import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface BackToTopButtonProps {
  language: Language;
}

/** Scroll distance (px) after which the button appears. */
const SHOW_AFTER_PX = 480;

/** Floating "back to top" button, shown once the page has been scrolled. */
export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.common.backToTop}
      title={t.common.backToTop}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 text-neutral-700 shadow-(--shadow-lift) backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-neutral-950 sm:right-6 lg:bottom-8 dark:border-white/10 dark:bg-neutral-800/90 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
