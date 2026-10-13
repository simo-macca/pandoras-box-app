import React from 'react';
import {
  Plus,
  Minus,
  Skull,
  Hourglass,
  Zap,
  CopyCheck,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

interface SpecialCountersProps {
  specialCardsCount: number;
  curseCount: number;
  theEndCount: number;
  fuckYouCount: number;
  mimicryCount: number;
  onChange: (updates: {
    specialCardsCount?: number;
    curseCount?: number;
    theEndCount?: number;
    fuckYouCount?: number;
    mimicryCount?: number;
  }) => void;
  language: Language;
  disabled?: boolean;
}

export const SpecialCounters: React.FC<SpecialCountersProps> = ({
  specialCardsCount,
  curseCount,
  theEndCount,
  fuckYouCount,
  mimicryCount,
  onChange,
  language,
  disabled = false,
}) => {
  const t = TRANSLATIONS[language];

  const updateCounter = (
    key:
      | 'specialCardsCount'
      | 'curseCount'
      | 'theEndCount'
      | 'fuckYouCount'
      | 'mimicryCount',
    delta: number,
    current: number
  ) => {
    if (disabled) return;
    const nextVal = Math.max(0, current + delta);
    soundEffects.playClick();
    onChange({ [key]: nextVal });
  };

  return (
    <div
      className={`space-y-3 ${disabled ? 'pointer-events-none opacity-40' : ''}`}
    >
      {/* Standard Specials (7 pts each) */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 sm:p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-400">
            <Sparkles className="h-5 w-5 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
              {t.scoring.standardSpecials}
            </div>
            <div className="truncate text-[11px] whitespace-nowrap text-neutral-500 tabular-nums dark:text-neutral-400">
              Skip, Gift, Thief, Exchange, etc. ({specialCardsCount * 7} pts)
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() =>
              updateCounter('specialCardsCount', -1, specialCardsCount)
            }
            disabled={specialCardsCount === 0 || disabled}
            aria-label="Decrease standard specials"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <Minus className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          </button>
          <span className="min-w-[1.25rem] text-center text-xs font-black whitespace-nowrap text-neutral-900 tabular-nums sm:min-w-[1.5rem] sm:text-sm dark:text-white">
            {specialCardsCount}
          </span>
          <button
            type="button"
            onClick={() =>
              updateCounter('specialCardsCount', 1, specialCardsCount)
            }
            disabled={disabled}
            aria-label="Increase standard specials"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shadow-sm transition-colors hover:bg-purple-500 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm"
          >
            <Plus className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      {/* Unique Specials: Mimicry -> Curse -> The End -> Fuck You */}
      <div className="grid grid-cols-1 gap-2 min-[440px]:grid-cols-2">
        {/* Mimicry (7 pts) */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/15 text-teal-500">
              <CopyCheck className="h-4 w-4 shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                Mimicry
              </div>
              <div className="text-[10px] whitespace-nowrap text-neutral-400 tabular-nums">
                +7 pts
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', -1, mimicryCount)}
              disabled={mimicryCount === 0 || disabled}
              aria-label="Decrease Mimicry"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 disabled:opacity-30 sm:h-8 sm:w-8 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Minus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="min-w-[1rem] text-center text-xs font-bold whitespace-nowrap tabular-nums sm:min-w-[1.25rem]">
              {mimicryCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', 1, mimicryCount)}
              disabled={disabled}
              aria-label="Increase Mimicry"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-xs text-white hover:bg-teal-500 sm:h-8 sm:w-8"
            >
              <Plus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

        {/* Curse (13 pts) */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/15 text-indigo-500">
              <Skull className="h-4 w-4 shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                Curse
              </div>
              <div className="text-[10px] whitespace-nowrap text-neutral-400 tabular-nums">
                +13 pts
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('curseCount', -1, curseCount)}
              disabled={curseCount === 0 || disabled}
              aria-label="Decrease Curse"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 disabled:opacity-30 sm:h-8 sm:w-8 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Minus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="min-w-[1rem] text-center text-xs font-bold whitespace-nowrap tabular-nums sm:min-w-[1.25rem]">
              {curseCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('curseCount', 1, curseCount)}
              disabled={disabled}
              aria-label="Increase Curse"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs text-white hover:bg-indigo-500 sm:h-8 sm:w-8"
            >
              <Plus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

        {/* The End (17 pts) */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/15 text-red-500">
              <Hourglass className="h-4 w-4 shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                The End
              </div>
              <div className="text-[10px] whitespace-nowrap text-neutral-400 tabular-nums">
                +17 pts
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', -1, theEndCount)}
              disabled={theEndCount === 0 || disabled}
              aria-label="Decrease The End"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 disabled:opacity-30 sm:h-8 sm:w-8 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <Minus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="min-w-[1rem] text-center text-xs font-bold whitespace-nowrap tabular-nums sm:min-w-[1.25rem]">
              {theEndCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', 1, theEndCount)}
              disabled={disabled}
              aria-label="Increase The End"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-xs text-white hover:bg-red-500 sm:h-8 sm:w-8"
            >
              <Plus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

        {/* Fuck You (42 pts) */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 p-2.5 shadow-sm">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
              <Zap className="h-4 w-4 shrink-0 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-extrabold text-red-600 dark:text-red-400">
                Fuck You
              </div>
              <div className="text-[10px] font-bold whitespace-nowrap text-red-500/80 tabular-nums">
                +42 pts!
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', -1, fuckYouCount)}
              disabled={fuckYouCount === 0 || disabled}
              aria-label="Decrease Fuck You"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-200 text-xs text-red-800 disabled:opacity-30 sm:h-8 sm:w-8 dark:bg-red-900/60 dark:text-red-200"
            >
              <Minus className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="min-w-[1rem] text-center text-xs font-black whitespace-nowrap text-red-600 tabular-nums sm:min-w-[1.25rem] dark:text-red-400">
              {fuckYouCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', 1, fuckYouCount)}
              disabled={disabled}
              aria-label="Increase Fuck You"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-xs text-white shadow-sm hover:bg-red-500 sm:h-8 sm:w-8"
            >
              <Plus className="h-3 w-3 shrink-0 stroke-[2.5] sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
