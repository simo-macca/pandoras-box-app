import React, { useState } from 'react';
import { Volume2, VolumeX, Settings, Sparkles, FileText, RotateCcw } from 'lucide-react';
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
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 text-white font-black">
            <Sparkles className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-base sm:text-lg uppercase text-neutral-900 dark:text-white truncate">
                Frantic
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                Pandora's Box
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
              <span>{t.scoreboard.round} {roundsCount}</span>
              <span>•</span>
              <span className="text-amber-500 font-bold">{t.scoreboard.targetLimit}: {targetScore} {t.setup.points}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Official Rulebook PDF Link */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/25 font-bold text-xs shadow-sm transition-all"
            title={`${t.rules.officialPdfTitle} (PDF)`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </a>

          {/* New Game Quick Action */}
          {onStartNewGame && (
            <button
              type="button"
              onClick={onStartNewGame}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/25 font-bold text-xs shadow-sm transition-all"
              title={t.nav.newGame}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.newGame}</span>
            </button>
          )}

          {theme && onThemeChange && (
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} className="hidden sm:inline-flex" />
          )}

          <LanguageSelector currentLanguage={language} onSelectLanguage={onSelectLanguage} />

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors"
            title={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSetup}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-bold text-xs sm:text-sm shadow-sm transition-all"
            title={t.setup.title}
          >
            <span>👥</span>
            <span className="hidden sm:inline">{t.setup.playerCount}</span>
          </button>

          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors"
              title={t.settings.title}
            >
              <Settings className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
