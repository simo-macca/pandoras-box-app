import React from 'react';
import { Language } from '../../types/game';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  className?: string;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${className}`}>
      {LANGUAGES.map((item) => {
        const isActive = currentLanguage === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => onSelectLanguage(item.code)}
            className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 transition-all sm:p-3 ${
              isActive
                ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-600 shadow-sm dark:text-amber-400'
                : 'border-neutral-200 bg-neutral-50/50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <span className="mb-1 shrink-0 text-lg">{item.flag}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
