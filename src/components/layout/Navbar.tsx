import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { Language, ThemeMode } from '../../types/game';
import { OFFICIAL_PDF_LINKS } from '../../types/rules';
import { TRANSLATIONS } from '../../data/translations';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { soundEffects } from '../../utils/sound';

interface NavbarProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  roundsCount: number;
  targetScore: number;
  onOpenSetup: () => void;
  onStartNewGame?: () => void;
  onOpenSettings?: () => void;
  onOpenResetConfirm?: () => void;
  theme?: ThemeMode;
  onThemeChange?: (newTheme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onSelectLanguage,
  roundsCount,
  targetScore,
  onOpenSetup,
  onStartNewGame,
  onOpenSettings,
  theme,
  onThemeChange,
}) => {
  const t = TRANSLATIONS[language];
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.enabled);
  const pdfUrl = OFFICIAL_PDF_LINKS[language] || OFFICIAL_PDF_LINKS.en;

  const toggleSound = () => {
    soundEffects.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      soundEffects.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/90 shadow-sm backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 font-black text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Sparkles className="h-5 w-5 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white sm:text-lg">
                Frantic
              </span>
              <span className="hidden rounded-full border border-purple-500/30 bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 sm:inline-block">
                Pandora's Box
              </span>
            </div>
            <div className="flex items-center gap-2 truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span>
                {t.scoreboard.round} {roundsCount}
              </span>
              <span>•</span>
              <span className="font-bold text-amber-500">
                {t.scoreboard.targetLimit}: {targetScore} {t.setup.points}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Official Rulebook PDF Link */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-purple-500/25 bg-purple-500/10 px-2.5 py-1.5 text-xs font-bold text-purple-600 shadow-sm transition-all hover:bg-purple-500/20 dark:text-purple-400"
            title={`${t.rules.officialPdfTitle} (PDF)`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </a>

          {/* New Game Quick Action */}
          {onStartNewGame && (
            <button
              type="button"
              onClick={onStartNewGame}
              className="flex items-center gap-1.5 rounded-xl border border-amber-500/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-bold text-amber-600 shadow-sm transition-all hover:bg-amber-500/20 dark:text-amber-400"
              title={t.nav.newGame}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.nav.newGame}</span>
            </button>
          )}

          {theme && onThemeChange && (
            <ThemeToggle
              theme={theme}
              onThemeChange={onThemeChange}
              className="hidden sm:inline-flex"
            />
          )}

          <LanguageSelector
            currentLanguage={language}
            onSelectLanguage={onSelectLanguage}
          />

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="rounded-xl border border-neutral-200 bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-amber-500" />
            ) : (
              <VolumeX className="h-4 w-4 text-neutral-400" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSetup}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-800 shadow-sm transition-all hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 sm:text-sm"
            title={t.setup.title}
          >
            <span>👥</span>
            <span className="hidden sm:inline">{t.setup.playerCount}</span>
          </button>

          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="rounded-xl border border-neutral-200 bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              title={t.settings.title}
            >
              <Settings className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
