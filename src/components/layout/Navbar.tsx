import React from 'react';
import { Settings, Users } from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { ThemeToggle } from './ThemeToggle';
import { AppLogo } from '../common/AppLogo';

interface NavbarProps {
  language: Language;
  roundsCount: number;
  targetScore: number;
  roundLimit?: number | null;
  onOpenSetup: () => void;
  onOpenSettings?: () => void;
  theme?: ThemeMode;
  onThemeChange?: (newTheme: ThemeMode) => void;
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
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/90 shadow-sm backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 overflow-x-hidden px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <AppLogo className="h-9 w-9 sm:h-10 sm:w-10" />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="truncate text-sm font-black tracking-wider text-neutral-900 uppercase sm:text-lg dark:text-white">
                Frantic
              </span>
              <span className="hidden rounded-full border border-purple-500/30 bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-black text-purple-600 uppercase sm:inline-block dark:text-purple-400">
                Pandora's Box
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate text-xs font-medium text-neutral-500 sm:gap-2 dark:text-neutral-400">
              <span className="whitespace-nowrap tabular-nums">
                {t.scoreboard.round} {roundsCount}
                {roundLimit && roundLimit > 0 ? ` / ${roundLimit}` : ''}
              </span>
              <span className="shrink-0">•</span>
              <span className="truncate font-bold whitespace-nowrap text-amber-500 tabular-nums">
                {t.scoreboard.targetLimit}: {targetScore} {t.setup.points}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {theme && onThemeChange && (
            <div className="hidden md:inline-flex">
              <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
            </div>
          )}

          <button
            type="button"
            onClick={onOpenSetup}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-2.5 py-1.5 text-xs font-bold text-neutral-800 shadow-sm transition-all hover:bg-neutral-200 sm:px-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            title={t.setup.title}
          >
            <Users className="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
            <span className="hidden sm:inline">{t.setup.playerCount}</span>
          </button>

          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="rounded-xl border border-neutral-200 bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              title={t.settings.title}
            >
              <Settings className="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
