import React from 'react';
import { Clock } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface RoundLimitSelectorProps {
  /** Raw input value; an empty string means "no limit". */
  value: string;
  onChange: (value: string) => void;
  language: Language;
}

const ROUND_LIMIT_PRESETS = [5, 10, 15, 20];

const optionClass = (isSelected: boolean) =>
  `flex flex-col items-center justify-center rounded-2xl border p-2.5 text-xs font-bold transition-all ${
    isSelected
      ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300'
  }`;

/**
 * House rule (not in the official rulebook): an optional maximum number of
 * rounds; when it is reached, the lowest score wins.
 */
export const RoundLimitSelector: React.FC<RoundLimitSelectorProps> = ({
  value,
  onChange,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const parsed = parseInt(value, 10);
  const hasLimit = !isNaN(parsed) && parsed > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="round-limit-input"
          className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-neutral-200"
        >
          <Clock className="h-4 w-4 text-amber-500" />
          <span>{t.setup.roundLimit}</span>
        </label>
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {hasLimit
            ? `${parsed} ${t.setup.roundLimitRounds}`
            : t.setup.roundLimitUnlimited}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <button
          type="button"
          onClick={() => onChange('')}
          className={optionClass(!hasLimit)}
        >
          <span>{t.setup.roundLimitUnlimited}</span>
        </button>

        {ROUND_LIMIT_PRESETS.map((rounds) => (
          <button
            key={rounds}
            type="button"
            onClick={() => onChange(String(rounds))}
            className={optionClass(parsed === rounds)}
          >
            <span>
              {rounds} {t.setup.roundLimitRounds}
            </span>
          </button>
        ))}
      </div>

      <input
        id="round-limit-input"
        type="number"
        min="1"
        max="100"
        placeholder={t.common.roundLimitPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
      />
    </div>
  );
};
