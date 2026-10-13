import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

interface FooterProps {
  language: Language;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenDisclaimer,
}) => {
  const t = TRANSLATIONS[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-200/80 bg-white/50 px-3 py-4 pb-20 backdrop-blur-sm transition-colors sm:px-6 md:pb-4 dark:border-neutral-800/80 dark:bg-neutral-900/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-neutral-500 sm:flex-row dark:text-neutral-400">
        {/* Left: Copyright & disclaimer label */}
        <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-2 sm:text-left">
          <span className="shrink-0 font-semibold text-neutral-600 dark:text-neutral-300">
            © {currentYear}
          </span>
          <span className="hidden text-neutral-300 sm:inline dark:text-neutral-700">
            •
          </span>
          <span className="max-w-full text-neutral-500 dark:text-neutral-400">
            Unofficial, non-commercial companion app for Pandora's Box & Frantic
            by Rulefactory.
          </span>
        </div>

        {/* Right: Credit link and disclaimer modal trigger */}
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <a
            href="https://rulefactory.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-neutral-600 transition-colors hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400"
            title={t.settings.visitRulefactory}
          >
            <span>Rulefactory</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <span className="text-neutral-300 dark:text-neutral-700">•</span>

          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="inline-flex items-center gap-1 font-medium text-neutral-600 transition-colors hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span>{t.settings.disclaimerTitle}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
