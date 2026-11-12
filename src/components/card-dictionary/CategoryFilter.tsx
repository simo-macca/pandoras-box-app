import React from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  Layers,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { DictionaryCategory } from '@/utils/cardSearch';

interface CategoryFilterProps {
  value: DictionaryCategory;
  onChange: (category: DictionaryCategory) => void;
  language: Language;
}

interface CategoryOption {
  id: DictionaryCategory;
  label: string;
  icon?: LucideIcon;
  colorClass?: string;
}

/** Category picker: a dropdown on phones, a row of chips on larger screens. */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const options: CategoryOption[] = [
    { id: 'all', label: t.rules.allCategories },
    {
      id: 'specials',
      label: t.rules.specials,
      icon: Sparkles,
      colorClass: 'text-amber-500 dark:text-amber-400',
    },
    {
      id: 'events',
      label: t.rules.events,
      icon: Flame,
      colorClass: 'text-rose-500 dark:text-rose-400',
    },
    {
      id: 'power',
      label: t.rules.powerCards,
      icon: Zap,
      colorClass: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      id: 'rules',
      label: t.rules.ruleCards,
      icon: Layers,
      colorClass: 'text-purple-600 dark:text-purple-400',
    },
  ];
  const selected = options.find((o) => o.id === value);
  const SelectedIcon = selected?.icon;

  return (
    <>
      {/* Phones: dropdown */}
      <div className="flex items-center gap-2 pt-1 sm:hidden">
        <label
          htmlFor="category-select"
          className="shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
        >
          {t.rules.categoryLabel}
        </label>
        <div className="relative w-full">
          {SelectedIcon && (
            <div className="pointer-events-none absolute top-1/2 left-3.5 flex -translate-y-1/2 items-center justify-center">
              <SelectedIcon
                className={`h-4 w-4 shrink-0 ${selected.colorClass}`}
              />
            </div>
          )}
          <select
            id="category-select"
            value={value}
            onChange={(e) => onChange(e.target.value as DictionaryCategory)}
            className={`w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 py-2 pr-8 text-xs font-bold text-neutral-900 shadow-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white ${
              SelectedIcon ? 'pl-10' : 'pl-3.5'
            }`}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400">
            <ChevronDown className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </div>

      {/* Larger screens: chips */}
      <div className="hidden flex-wrap items-center gap-2 pt-1 sm:flex">
        <span className="mr-1 shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.rules.categoryLabel}
        </span>
        {options.map((o) => {
          const Icon = o.icon;
          const isSelected = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(o.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 text-neutral-900 shadow-sm dark:border-amber-500/60 dark:bg-amber-500/20 dark:text-white'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-white'
              }`}
            >
              {Icon && (
                <Icon className={`h-3.5 w-3.5 shrink-0 ${o.colorClass}`} />
              )}
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
