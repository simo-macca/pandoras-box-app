import React from 'react';
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
  `option flex h-10 items-center justify-center px-2 text-sm font-semibold ${
    isSelected ? 'option-active' : ''
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
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor="round-limit-input" className="eyebrow">
          {t.setup.roundLimit}
        </label>
        <span className="text-xs text-neutral-400">
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
        className="input tabular-nums"
      />
    </section>
  );
};
