import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Language, ThemeMode } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface ThemeToggleProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  className?: string;
  language?: Language;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
  className = '',
  language = 'en',
}) => {
  const t = TRANSLATIONS[language].common;
  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: t.themeLight, icon: Sun },
    { mode: 'dark', label: t.themeDark, icon: Moon },
    { mode: 'system', label: t.themeSystem, icon: Monitor },
  ];

  return (
    <div className={`segmented ${className}`}>
      {options.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onThemeChange(mode)}
          title={label}
          aria-label={label}
          aria-pressed={theme === mode}
          className={`segmented-item w-8 px-0 ${
            theme === mode ? 'segmented-item-active' : ''
          }`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};
