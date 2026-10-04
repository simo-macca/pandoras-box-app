import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

interface FooterProps {
  language: Language;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenDisclaimer }) => {
  const t = TRANSLATIONS[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm py-4 px-3 sm:px-6 pb-20 md:pb-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
        {/* Left: Copyright and short disclaimer */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
          <span className="font-semibold text-neutral-600 dark:text-neutral-300">
            © {currentYear}
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
          <span>{t.settings.disclaimerShort}</span>
        </div>

        {/* Right: Credit link and disclaimer modal trigger */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          <a
            href="https://rulefactory.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
            title={t.settings.visitRulefactory}
          >
            <span>Rulefactory</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <span className="text-neutral-300 dark:text-neutral-700">•</span>

          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.settings.disclaimerTitle}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
