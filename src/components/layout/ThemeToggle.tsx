import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { ThemeMode } from '../../types/game';

interface ThemeToggleProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange, className = '' }) => {
  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 backdrop-blur-sm ${className}`}>
      <button
        type="button"
        onClick={() => onThemeChange('light')}
        title="Light Mode"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onThemeChange('dark')}
        title="Dark Mode"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          theme === 'dark'
            ? 'bg-neutral-900 text-purple-400 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onThemeChange('system')}
        title="System Preference"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          theme === 'system'
            ? 'bg-white dark:bg-neutral-700 text-blue-500 dark:text-blue-300 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
        }`}
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
};
