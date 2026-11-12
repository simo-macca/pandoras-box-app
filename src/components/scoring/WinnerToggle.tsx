import React from 'react';
import { Check, Trophy } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

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
      className={`flex w-full items-center justify-between rounded-2xl border p-3.5 transition-all ${
        disabled
          ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 opacity-60 dark:border-neutral-800 dark:bg-neutral-800/20'
          : isWinner
            ? 'border-emerald-500 bg-emerald-500/15 font-bold text-emerald-600 shadow-md dark:text-emerald-400'
            : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
            isWinner
              ? 'bg-emerald-500 text-white'
              : 'bg-neutral-200 text-neutral-400 dark:bg-neutral-700'
          }`}
        >
          <Trophy className="h-4 w-4 shrink-0" />
        </div>
        <div className="text-left">
          <div className="text-xs font-black">{t.scoring.isWinner}</div>
          <div className="text-[11px] opacity-75">{t.scoring.isWinnerHint}</div>
        </div>
      </div>

      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
          isWinner
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-neutral-300 dark:border-neutral-700'
        }`}
      >
        {isWinner && <Check className="h-4 w-4 shrink-0 stroke-3" />}
      </div>
    </button>
  );
};
