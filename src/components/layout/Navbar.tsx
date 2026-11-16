import React from 'react';
import { Settings, Users } from 'lucide-react';
import { Language, ThemeMode } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { ThemeToggle } from './ThemeToggle';
import { AppLogo } from '@/components/common/AppLogo';
import { GitHubIcon } from '@/components/common/GitHubIcon';
import { REPOSITORY_URL } from '@/data/appInfo';

interface NavbarProps {
  language: Language;
  roundsCount: number;
  targetScore: number;
  roundLimit?: number | null;
  onOpenSetup: () => void;
  onOpenSettings?: () => void;
  theme?: ThemeMode;
  onThemeChange?: (newTheme: ThemeMode) => void;
  /** Desktop tab navigation, rendered in the centre of the bar from `md` up. */
  navigation?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  roundsCount,
  targetScore,
  roundLimit,
  onOpenSetup,
  onOpenSettings,
  theme,
  onThemeChange,
  navigation,
}) => {
  const t = TRANSLATIONS[language];
  const roundLabel = `${t.scoreboard.round} ${roundsCount}${
    roundLimit && roundLimit > 0 ? ` / ${roundLimit}` : ''
  }`;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 bg-white/75 pt-[env(safe-area-inset-top)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.06] dark:bg-neutral-950/70">
      <div className="page-container flex h-16 items-center justify-between gap-3">
        {/* Brand + match status */}
        <div className="flex min-w-0 items-center gap-3">
          <AppLogo className="h-9 w-9 rounded-xl sm:h-10 sm:w-10" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-bold tracking-tight text-neutral-900 sm:text-base dark:text-white">
              Pandora's Box
            </div>
            <div className="flex items-center gap-1.5 truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="whitespace-nowrap tabular-nums">
                {roundLabel}
              </span>
              <span
                aria-hidden="true"
                className="text-neutral-300 dark:text-neutral-600"
              >
                ·
              </span>
              <span className="truncate whitespace-nowrap tabular-nums">
                {t.scoreboard.targetLimit}{' '}
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {targetScore}
                </span>
              </span>
            </div>
          </div>
        </div>

        {navigation && (
          <div className="hidden flex-1 justify-center lg:flex">
            {navigation}
          </div>
        )}

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {theme && onThemeChange && (
            <ThemeToggle
              theme={theme}
              onThemeChange={onThemeChange}
              language={language}
              className="hidden lg:inline-flex"
            />
          )}

          <button
            type="button"
            onClick={onOpenSetup}
            className="btn btn-secondary h-9 px-3"
            title={t.setup.title}
            aria-label={t.setup.title}
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t.setup.playerCount}</span>
          </button>

          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon h-9 w-9"
            title={t.common.github}
            aria-label={t.common.github}
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>

          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="btn-icon h-9 w-9"
              title={t.settings.title}
              aria-label={t.settings.title}
            >
              <Settings className="h-[18px] w-[18px]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
