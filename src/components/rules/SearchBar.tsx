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
    <div className="relative flex items-center w-full">
      <div className="absolute left-3.5 text-slate-400 pointer-events-none">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={e => onChangeQuery(e.target.value)}
        placeholder={t.rules.searchPlaceholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500 transition-all shadow-inner"
      />

      {query && (
        <button
          type="button"
          onClick={() => onChangeQuery('')}
          className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
