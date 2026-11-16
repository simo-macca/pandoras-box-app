import React from 'react';
import { Trophy } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { Switch } from '@/components/common/Switch';

interface WinnerToggleProps {
  isWinner: boolean;
  disabled: boolean;
  onToggle: () => void;
  language: Language;
}

/** Marks the selected player as having ended the round with no cards. */
export const WinnerToggle: React.FC<WinnerToggleProps> = ({
  isWinner,
  disabled,
  onToggle,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={isWinner}
      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isWinner
          ? 'border-emerald-500/60 bg-emerald-500/10'
          : 'border-neutral-200/80 bg-white hover:border-neutral-300 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/15'
      }`}
    >
      <div
        className={`icon-tile ${
          isWinner
            ? 'bg-emerald-500 text-white'
            : 'bg-neutral-100 text-neutral-400 dark:bg-white/[0.06]'
        }`}
      >
        <Trophy className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`text-sm font-semibold ${
            isWinner
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-neutral-900 dark:text-white'
          }`}
        >
          {t.scoring.isWinner}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {t.scoring.isWinnerHint}
        </div>
      </div>
      <Switch checked={isWinner} tone="emerald" />
    </button>
  );
};
