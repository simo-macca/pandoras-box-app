import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { REPOSITORY_URL } from '@/data/appInfo';
import { GitHubIcon } from '@/components/common/GitHubIcon';

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
    <footer className="mt-auto border-t border-neutral-200/70 pt-6 pb-28 lg:pb-8 dark:border-white/[0.06]">
      <div className="page-container flex flex-col items-center justify-between gap-3 text-center text-xs text-neutral-500 sm:flex-row sm:text-left dark:text-neutral-400">
        <p className="max-w-xl">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            © {currentYear}
          </span>{' '}
          · {t.settings.copyright}
        </p>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-1">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            title={t.common.github}
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://rulefactory.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            title={t.settings.visitRulefactory}
          >
            Rulefactory
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="btn btn-ghost btn-sm"
          >
            {t.settings.disclaimerTitle}
          </button>
        </div>
      </div>
    </footer>
  );
};
