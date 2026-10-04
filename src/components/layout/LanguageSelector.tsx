import React from 'react';
import { Language } from '../../types/game';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="inline-flex items-center rounded-lg bg-slate-900/80 p-0.5 border border-slate-700/60 shadow-inner">
      {LANGUAGES.map(lang => {
        const isActive = currentLanguage === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onSelectLanguage(lang.code)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all ${
              isActive
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title={`Switch to ${lang.label}`}
          >
            <span className="text-xs leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

