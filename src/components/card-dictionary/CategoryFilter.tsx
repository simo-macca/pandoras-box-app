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
      <div className="flex items-center gap-3 sm:hidden">
        <label htmlFor="category-select" className="eyebrow shrink-0">
          {t.rules.categoryLabel}
        </label>
        <div className="relative w-full">
          {SelectedIcon && (
            <SelectedIcon
              className={`pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 ${selected.colorClass}`}
            />
          )}
          <select
            id="category-select"
            value={value}
            onChange={(e) => onChange(e.target.value as DictionaryCategory)}
            className={`input appearance-none pr-9 font-semibold ${
              SelectedIcon ? 'pl-9' : ''
            }`}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {/* Larger screens: chips */}
      <div
        className="hidden flex-wrap items-center gap-2 sm:flex"
        role="group"
        aria-label={t.rules.categoryLabel}
      >
        {options.map((o) => {
          const Icon = o.icon;
          const isSelected = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(o.id)}
              className={`option inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold ${
                isSelected ? 'option-active' : ''
              }`}
            >
              {Icon && <Icon className={`h-4 w-4 ${o.colorClass}`} />}
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
