import React from 'react';
import { Monitor, Sun, Moon, Volume2, VolumeX, Vibrate } from 'lucide-react';
import { Language, ThemeMode } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { Switch } from '@/components/common/Switch';

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

  const themes: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'system', label: t.settings.themeSystem, icon: Monitor },
    { mode: 'light', label: t.settings.themeLight, icon: Sun },
    { mode: 'dark', label: t.settings.themeDark, icon: Moon },
  ];

  const toggles = [
    {
      id: 'sound',
      label: t.settings.soundEnabled,
      checked: soundEnabled,
      onToggle: onToggleSound,
      icon: soundEnabled ? Volume2 : VolumeX,
    },
    {
      id: 'haptics',
      label: t.settings.hapticsEnabled,
      checked: hapticsEnabled,
      onToggle: onToggleHaptics,
      icon: Vibrate,
    },
  ];

  return (
    <div className="space-y-7">
      <section>
        <h3 className="eyebrow mb-3">{t.settings.appearance}</h3>
        <div className="grid grid-cols-3 gap-2">
          {themes.map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              type="button"
              onClick={() => onThemeChange(mode)}
              aria-pressed={theme === mode}
              className={`option flex flex-col items-center justify-center gap-1.5 px-2 py-3 ${
                theme === mode ? 'option-active' : ''
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="eyebrow mb-3">{t.settings.language}</h3>
        <LanguageSelector
          currentLanguage={language}
          onSelectLanguage={onLanguageChange}
        />
      </section>

      <section>
        <h3 className="eyebrow mb-3">{t.settings.soundAndHaptics}</h3>
        <div className="card-muted divide-y divide-neutral-200/80 dark:divide-white/[0.06]">
          {toggles.map(({ id, label, checked, onToggle, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={onToggle}
              aria-pressed={checked}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  checked ? 'text-amber-500' : 'text-neutral-400'
                }`}
              />
              <span className="flex-1 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                {label}
              </span>
              <Switch checked={checked} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
