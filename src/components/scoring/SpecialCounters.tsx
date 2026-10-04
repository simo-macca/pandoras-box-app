import React from 'react';
import { Plus, Minus, Skull, Hourglass, Zap, CopyCheck, Sparkles } from 'lucide-react';
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

  const updateCounter = (key: 'specialCardsCount' | 'curseCount' | 'theEndCount' | 'fuckYouCount' | 'mimicryCount', delta: number, current: number) => {
    if (disabled) return;
    const nextVal = Math.max(0, current + delta);
    soundEffects.playClick();
    onChange({ [key]: nextVal });
  };

  return (
    <div className={`space-y-3 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Standard Specials (7 pts each) */}
      <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Sparkles className="w-5 h-5" />
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
            onClick={() => updateCounter('specialCardsCount', -1, specialCardsCount)}
            disabled={specialCardsCount === 0 || disabled}
            className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-30 text-neutral-800 dark:text-neutral-200 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-6 text-center font-black text-sm text-neutral-900 dark:text-white">
            {specialCardsCount}
          </span>
          <button
            type="button"
            onClick={() => updateCounter('specialCardsCount', 1, specialCardsCount)}
            disabled={disabled}
            className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Unique Specials */}
      <div className="grid grid-cols-2 gap-2">
        {/* Curse (13 pts) */}
        <div className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-500 shrink-0">
              <Skull className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                Curse
              </div>
              <div className="text-[10px] text-neutral-400">+13 pts</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => updateCounter('curseCount', -1, curseCount)}
              disabled={curseCount === 0 || disabled}
              className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-700 disabled:opacity-30 flex items-center justify-center"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-4 text-center font-bold text-xs">{curseCount}</span>
            <button
              type="button"
              onClick={() => updateCounter('curseCount', 1, curseCount)}
              disabled={disabled}
              className="w-6 h-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* The End (17 pts) */}
        <div className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <Hourglass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                The End
              </div>
              <div className="text-[10px] text-neutral-400">+17 pts</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', -1, theEndCount)}
              disabled={theEndCount === 0 || disabled}
              className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-700 disabled:opacity-30 flex items-center justify-center"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-4 text-center font-bold text-xs">{theEndCount}</span>
            <button
              type="button"
              onClick={() => updateCounter('theEndCount', 1, theEndCount)}
              disabled={disabled}
              className="w-6 h-6 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Fuck You (42 pts) */}
        <div className="p-2.5 rounded-2xl border border-red-500/40 bg-red-500/10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-red-600 dark:text-red-400 truncate">
                Fuck You
              </div>
              <div className="text-[10px] text-red-500/80 font-bold">+42 pts!</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', -1, fuckYouCount)}
              disabled={fuckYouCount === 0 || disabled}
              className="w-6 h-6 rounded-lg bg-red-200 dark:bg-red-900/60 disabled:opacity-30 flex items-center justify-center text-red-800 dark:text-red-200"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-4 text-center font-black text-xs text-red-600 dark:text-red-400">
              {fuckYouCount}
            </span>
            <button
              type="button"
              onClick={() => updateCounter('fuckYouCount', 1, fuckYouCount)}
              disabled={disabled}
              className="w-6 h-6 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-sm"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Mimicry (7 pts) */}
        <div className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-500 shrink-0">
              <CopyCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                Mimicry
              </div>
              <div className="text-[10px] text-neutral-400">+7 pts</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', -1, mimicryCount)}
              disabled={mimicryCount === 0 || disabled}
              className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-700 disabled:opacity-30 flex items-center justify-center"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-4 text-center font-bold text-xs">{mimicryCount}</span>
            <button
              type="button"
              onClick={() => updateCounter('mimicryCount', 1, mimicryCount)}
              disabled={disabled}
              className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
