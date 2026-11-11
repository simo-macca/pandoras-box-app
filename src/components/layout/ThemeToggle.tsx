import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
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
  return (
    <div
      className={`inline-flex items-center rounded-xl border border-neutral-300 bg-neutral-200/80 p-1 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80 ${className}`}
    >
      <button
        type="button"
        onClick={() => onThemeChange('light')}
        title={t.themeLight}
        aria-label={t.themeLight}
        aria-pressed={theme === 'light'}
        className={`rounded-lg p-1.5 text-xs font-medium transition-all ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onThemeChange('dark')}
        title={t.themeDark}
        aria-label={t.themeDark}
        aria-pressed={theme === 'dark'}
        className={`rounded-lg p-1.5 text-xs font-medium transition-all ${
          theme === 'dark'
            ? 'bg-neutral-900 text-purple-400 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onThemeChange('system')}
        title={t.themeSystem}
        aria-label={t.themeSystem}
        aria-pressed={theme === 'system'}
        className={`rounded-lg p-1.5 text-xs font-medium transition-all ${
          theme === 'system'
            ? 'bg-white text-blue-500 shadow-sm dark:bg-neutral-700 dark:text-blue-300'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
};
