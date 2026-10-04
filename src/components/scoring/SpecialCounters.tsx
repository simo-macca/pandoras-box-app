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
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900 dark:text-white">
              {t.scoring.standardSpecials}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Skip, Gift, Thief, Exchange, etc. ({specialCardsCount * 7} pts)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              updateCounter('specialCardsCount', -1, specialCardsCount)
            }
            disabled={specialCardsCount === 0 || disabled}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm font-black text-neutral-900 dark:text-white">
            {specialCardsCount}
          </span>
          <button
            type="button"
            onClick={() =>
              updateCounter('specialCardsCount', 1, specialCardsCount)
            }
            disabled={disabled}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 font-bold text-white shadow-sm transition-colors hover:bg-purple-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Unique Specials */}
      <div className="grid grid-cols-2 gap-2">
        {/* Curse (13 pts) */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/15 text-indigo-500">
              <Skull className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                Curse
              </div>
              <div className="text-[10px] text-neutral-400">+13 pts</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('curseCount', -1, curseCount)}
              disabled={curseCount === 0 || disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-200 disabled:opacity-30 dark:bg-neutral-700"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-4 text-center text-xs font-bold">
              {curseCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('curseCount', 1, curseCount)}
              disabled={disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* The End (17 pts) */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/15 text-red-500">
              <Hourglass className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                The End
              </div>
              <div className="text-[10px] text-neutral-400">+17 pts</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', -1, theEndCount)}
              disabled={theEndCount === 0 || disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-200 disabled:opacity-30 dark:bg-neutral-700"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-4 text-center text-xs font-bold">
              {theEndCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', 1, theEndCount)}
              disabled={disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-500"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Fuck You (42 pts) */}
        <div className="flex items-center justify-between rounded-2xl border border-red-500/40 bg-red-500/10 p-2.5 shadow-sm">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
              <Zap className="h-4 w-4 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-extrabold text-red-600 dark:text-red-400">
                Fuck You
              </div>
              <div className="text-[10px] font-bold text-red-500/80">
                +42 pts!
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', -1, fuckYouCount)}
              disabled={fuckYouCount === 0 || disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-200 text-red-800 disabled:opacity-30 dark:bg-red-900/60 dark:text-red-200"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-4 text-center text-xs font-black text-red-600 dark:text-red-400">
              {fuckYouCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', 1, fuckYouCount)}
              disabled={disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-500"
            >
              <Plus className="h-3 w-3 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Mimicry (7 pts) */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800/40">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/15 text-teal-500">
              <CopyCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
                Mimicry
              </div>
              <div className="text-[10px] text-neutral-400">+7 pts</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', -1, mimicryCount)}
              disabled={mimicryCount === 0 || disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-200 disabled:opacity-30 dark:bg-neutral-700"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-4 text-center text-xs font-bold">
              {mimicryCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', 1, mimicryCount)}
              disabled={disabled}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-600 text-white hover:bg-teal-500"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
