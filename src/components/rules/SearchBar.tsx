import React from 'react';
import { Search, X } from 'lucide-react';
import { Language } from '../../types/game';
import { UI_TRANSLATIONS } from '../../data/translations';

interface SearchBarProps {
  query: string;
  onChangeQuery: (q: string) => void;
  language: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChangeQuery,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="relative flex w-full items-center">
      <div className="pointer-events-none absolute left-3.5 text-slate-400">
        <Search className="h-4 w-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder={t.rules.searchPlaceholder}
        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-9 text-sm font-medium text-neutral-900 shadow-inner transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700/80 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
      />

      {query && (
        <button
          type="button"
          onClick={() => onChangeQuery('')}
          className="absolute right-3 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
