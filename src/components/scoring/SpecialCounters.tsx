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
import { CARD_POINTS } from '../../utils/scoring';

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

interface CounterRowProps {
  icon: React.ReactNode;
  iconBorderClass: string;
  title: string;
  subtitle: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  disabled: boolean;
  ariaLabel: string;
}

const CounterRow: React.FC<CounterRowProps> = ({
  icon,
  iconBorderClass,
  title,
  subtitle,
  count,
  onDecrement,
  onIncrement,
  disabled,
  ariaLabel,
}) => (
  <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 sm:p-3 dark:border-neutral-800 dark:bg-neutral-800/40">
    <div className="flex min-w-0 items-center gap-2.5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${iconBorderClass}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs font-bold text-neutral-900 dark:text-white">
          {title}
        </div>
        <div className="truncate text-[11px] whitespace-nowrap text-neutral-500 tabular-nums dark:text-neutral-400">
          {subtitle}
        </div>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={count === 0 || disabled}
        aria-label={`Decrease ${ariaLabel}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
      >
        <Minus className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
      </button>
      <span className="min-w-[1.25rem] text-center text-xs font-black whitespace-nowrap text-neutral-900 tabular-nums sm:min-w-[1.5rem] sm:text-sm dark:text-white">
        {count}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={disabled}
        aria-label={`Increase ${ariaLabel}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-xs text-neutral-800 transition-colors hover:bg-neutral-300 disabled:opacity-30 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
      >
        <Plus className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
      </button>
    </div>
  </div>
);

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
    <div className={`space-y-3 ${disabled ? 'pointer-events-none opacity-40' : ''}`}>
      {/* Standard Specials (7 pts each) */}
      <CounterRow
        icon={<Sparkles className="h-5 w-5 shrink-0" />}
        iconBorderClass="border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-400"
        title={t.scoring.standardSpecials}
        subtitle={`Skip, Gift, Thief, Exchange, etc. (+${CARD_POINTS.SPECIAL} pts)`}
        count={specialCardsCount}
        onDecrement={() => updateCounter('specialCardsCount', -1, specialCardsCount)}
        onIncrement={() => updateCounter('specialCardsCount', 1, specialCardsCount)}
        disabled={disabled}
        ariaLabel="standard specials"
      />

      {/* Curse Card (13 pts) */}
      <CounterRow
        icon={<Skull className="h-5 w-5 shrink-0" />}
        iconBorderClass="border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400"
        title={t.scoring.curseCard}
        subtitle={`+${CARD_POINTS.CURSE} pts`}
        count={curseCount}
        onDecrement={() => updateCounter('curseCount', -1, curseCount)}
        onIncrement={() => updateCounter('curseCount', 1, curseCount)}
        disabled={disabled}
        ariaLabel="curse card"
      />

      {/* The End Card (17 pts) */}
      <CounterRow
        icon={<Hourglass className="h-5 w-5 shrink-0" />}
        iconBorderClass="border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400"
        title={t.scoring.theEndCard}
        subtitle={`+${CARD_POINTS.THE_END} pts`}
        count={theEndCount}
        onDecrement={() => updateCounter('theEndCount', -1, theEndCount)}
        onIncrement={() => updateCounter('theEndCount', 1, theEndCount)}
        disabled={disabled}
        ariaLabel="the end card"
      />

      {/* Fuck You Card (42 pts) */}
      <CounterRow
        icon={<Zap className="h-5 w-5 shrink-0" />}
        iconBorderClass="border-red-600/40 bg-red-600/20 text-red-600 dark:text-red-400"
        title={t.scoring.fuckYouCard}
        subtitle={`+${CARD_POINTS.FUCK_YOU} pts!`}
        count={fuckYouCount}
        onDecrement={() => updateCounter('fuckYouCount', -1, fuckYouCount)}
        onIncrement={() => updateCounter('fuckYouCount', 1, fuckYouCount)}
        disabled={disabled}
        ariaLabel="fuck you card"
      />

      {/* Mimicry Card (7 pts) */}
      <CounterRow
        icon={<CopyCheck className="h-5 w-5 shrink-0" />}
        iconBorderClass="border-blue-500/30 bg-blue-500/15 text-blue-600 dark:text-blue-400"
        title={t.scoring.mimicryCard}
        subtitle={`+${CARD_POINTS.MIMICRY} pts`}
        count={mimicryCount}
        onDecrement={() => updateCounter('mimicryCount', -1, mimicryCount)}
        onIncrement={() => updateCounter('mimicryCount', 1, mimicryCount)}
        disabled={disabled}
        ariaLabel="mimicry card"
      />
    </div>
  );
};
