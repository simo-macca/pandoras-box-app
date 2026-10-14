import React from 'react';
import { Laptop, Sun, Moon, Volume2, VolumeX, Smartphone } from 'lucide-react';
import { Language, ThemeMode } from '../../../types/game';
import { TRANSLATIONS } from '../../../data/translations';
import { LanguageSelector } from '../LanguageSelector';

interface SettingsGeneralSectionProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
}

export const SettingsGeneralSection: React.FC<SettingsGeneralSectionProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  hapticsEnabled,
  onToggleHaptics,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-4">
      {/* Appearance */}
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
          {t.settings.appearance}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onThemeChange('system')}
            className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
              theme === 'system'
                ? 'border-blue-500 bg-blue-500/10 font-bold text-blue-600 dark:text-blue-400'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <Laptop className="mb-1 h-5 w-5 shrink-0" />
            <span className="text-xs">{t.settings.themeSystem}</span>
          </button>

          <button
            type="button"
            onClick={() => onThemeChange('light')}
            className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
              theme === 'light'
                ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-600'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <Sun className="mb-1 h-5 w-5 shrink-0" />
            <span className="text-xs">{t.settings.themeLight}</span>
          </button>

          <button
            type="button"
            onClick={() => onThemeChange('dark')}
            className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
              theme === 'dark'
                ? 'border-purple-500 bg-purple-500/10 font-bold text-purple-400'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <Moon className="mb-1 h-5 w-5 shrink-0" />
            <span className="text-xs">{t.settings.themeDark}</span>
          </button>
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
          {t.settings.language}
        </h3>
        <LanguageSelector
          currentLanguage={language}
          onSelectLanguage={onLanguageChange}
        />
      </div>

      {/* Audio & Haptic Feedback */}
      <div>
        <h3 className="mb-3 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.settings.soundAndHaptics}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onToggleSound}
            className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
              soundEnabled
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-neutral-200 text-neutral-500 dark:border-neutral-800'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 shrink-0" />
            ) : (
              <VolumeX className="h-5 w-5 shrink-0" />
            )}
            <div className="text-left">
              <div className="text-xs font-bold">
                {t.settings.soundEnabled}
              </div>
              <div className="text-[10px] opacity-75">
                {soundEnabled ? 'ON' : 'OFF'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={onToggleHaptics}
            className={`flex items-center gap-3 rounded-2xl border p-3 transition-all ${
              hapticsEnabled
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-neutral-200 text-neutral-500 dark:border-neutral-800'
            }`}
          >
            <Smartphone className="h-5 w-5 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold">
                {t.settings.hapticsEnabled}
              </div>
              <div className="text-[10px] opacity-75">
                {hapticsEnabled ? 'ON' : 'OFF'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
