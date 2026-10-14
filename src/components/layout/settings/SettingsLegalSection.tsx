import React from 'react';
import { Scale, Info, ExternalLink } from 'lucide-react';
import { Language } from '../../../types/game';
import { TRANSLATIONS } from '../../../data/translations';

interface SettingsLegalSectionProps {
  language: Language;
}

export const SettingsLegalSection: React.FC<SettingsLegalSectionProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Full Legal Disclaimer Card */}
      <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 shrink-0 text-purple-500" />
          <h4 className="text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-white">
            {t.settings.disclaimerTitle}
          </h4>
        </div>
        <p className="text-xs leading-relaxed font-normal text-neutral-700 dark:text-neutral-300">
          {t.settings.fullDisclaimer}
        </p>
      </div>

      {/* Publisher Credit Card */}
      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
              Rulefactory GmbH
            </h5>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Original creator and publisher of Frantic and Pandora&apos;s Box.
            </p>
          </div>
          <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
            Publisher
          </span>
        </div>

        <a
          href="https://rulefactory.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 px-4 py-2.5 text-xs font-bold text-purple-600 shadow-sm transition-all hover:bg-purple-500/20 dark:text-purple-400"
        >
          <span>{t.settings.visitRulefactory}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </a>
      </div>

      {/* App Info Card */}
      <div className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-blue-500" />
          <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
            {t.settings.version}
          </h5>
        </div>
        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          Open-source community project licensed under the MIT License. Created
          for players to enhance physical board game sessions with automated
          scoring and rule references.
        </p>
      </div>
    </div>
  );
};
