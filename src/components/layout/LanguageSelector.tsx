import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '@/types/game';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  className?: string;
}

// Language codes instead of flag emoji: a language is not a country
// (German is spoken in CH/AT/DE) and flags render as letters on Windows.
const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
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
            aria-pressed={isActive}
            className={`option relative flex items-center gap-2.5 px-3 py-2.5 text-left ${
              isActive ? 'option-active' : ''
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold uppercase ${
                isActive
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300'
              }`}
            >
              {item.code}
            </span>
            <span className="min-w-0 truncate text-sm font-semibold">
              {item.label}
            </span>
            {isActive && (
              <Check className="ml-auto h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
};
