import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  language: Language;
  roundsCount: number;
  targetScore: number;
  onOpenSetup: () => void;
  onOpenSettings?: () => void;
  theme?: ThemeMode;
  onThemeChange?: (newTheme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  roundsCount,
  targetScore,
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
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 font-black text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] sm:h-10 sm:w-10">
            <Sparkles className="h-4 w-4 shrink-0 stroke-[2.2] sm:h-5 sm:w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="truncate text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
                Frantic
              </span>
              <span className="hidden rounded-full border border-purple-500/30 bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 sm:inline-block">
                Pandora's Box
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate text-xs font-medium text-neutral-500 dark:text-neutral-400 sm:gap-2">
              <span className="whitespace-nowrap tabular-nums">
                {t.scoreboard.round} {roundsCount}
              </span>
              <span className="shrink-0">•</span>
              <span className="truncate whitespace-nowrap font-bold tabular-nums text-amber-500">
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
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-2.5 py-1.5 text-xs font-bold text-neutral-800 shadow-sm transition-all hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 sm:px-3 sm:text-sm"
            title={t.setup.title}
          >
            <span className="shrink-0 text-sm">👥</span>
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
