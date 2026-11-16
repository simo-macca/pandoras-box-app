import React from 'react';
import { Scale, Info, ExternalLink } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { APP_VERSION } from '@/data/appInfo';

interface SettingsLegalSectionProps {
  language: Language;
}

export const SettingsLegalSection: React.FC<SettingsLegalSectionProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="animate-fade-in space-y-4">
      <section className="card-muted space-y-2 p-4">
        <h4 className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
          <Scale className="h-4 w-4 shrink-0 text-neutral-500" />
          {t.settings.disclaimerTitle}
        </h4>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {t.settings.fullDisclaimer}
        </p>
      </section>

      <section className="card-muted space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h5 className="text-sm font-bold text-neutral-900 dark:text-white">
              Rulefactory GmbH
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Original creator and publisher of Frantic and Pandora&apos;s Box.
            </p>
          </div>
          <span className="badge bg-neutral-200/80 text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
            Publisher
          </span>
        </div>

        <a
          href="https://rulefactory.ch"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-block"
        >
          <span>{t.settings.visitRulefactory}</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </section>

      <section className="card-muted space-y-2 p-4">
        <h5 className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
          <Info className="h-4 w-4 shrink-0 text-neutral-500" />
          {t.settings.version.replace('{version}', APP_VERSION)}
        </h5>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          Open-source community project licensed under the MIT License. Created
          for players to enhance physical board game sessions with automated
          scoring and rule references.
        </p>
      </section>
    </div>
  );
};
