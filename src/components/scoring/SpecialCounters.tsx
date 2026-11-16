import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { CARD_POINTS, UNIQUE_CARD_LIMIT } from '@/utils/scoring';

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
  /** Points per card, shown in the coloured tile. */
  points: number;
  tileClass: string;
  title: string;
  subtitle: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  disabled: boolean;
  ariaLabel: string;
  /** Upper bound for the counter (unique cards exist only once). */
  max?: number;
}

const CounterRow: React.FC<CounterRowProps> = ({
  points,
  tileClass,
  title,
  subtitle,
  count,
  onDecrement,
  onIncrement,
  disabled,
  ariaLabel,
  max,
}) => (
  <div
    className={`flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4 ${
      count > 0 ? 'bg-amber-500/[0.06]' : ''
    }`}
  >
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl text-sm leading-none font-bold tabular-nums ${tileClass}`}
        aria-hidden="true"
      >
        {points}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
          {title}
        </div>
        <div className="mt-0.5 text-xs leading-snug text-neutral-500 tabular-nums dark:text-neutral-400">
          {subtitle}
        </div>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={onDecrement}
        disabled={count === 0 || disabled}
        aria-label={`Decrease ${ariaLabel}`}
        className="stepper-btn"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-bold text-neutral-900 tabular-nums dark:text-white">
        {count}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={disabled || (max !== undefined && count >= max)}
        aria-label={`Increase ${ariaLabel}`}
        className="stepper-btn"
      >
        <Plus className="h-4 w-4" />
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
    current: number,
    max: number = Infinity
  ) => {
    if (disabled) return;
    const nextVal = Math.min(max, Math.max(0, current + delta));
    if (nextVal === current) return;
    soundEffects.playClick();
    onChange({ [key]: nextVal });
  };

  return (
    <div
      className={`card-muted divide-y divide-neutral-200/80 overflow-hidden dark:divide-white/[0.06] ${disabled ? 'pointer-events-none opacity-40' : ''}`}
    >
      {/* Standard Specials (7 pts each) */}
      <CounterRow
        points={CARD_POINTS.SPECIAL}
        tileClass="bg-purple-500/15 text-purple-700 dark:text-purple-300"
        title={t.scoring.standardSpecials}
        subtitle={`Skip, Gift, Thief, Exchange, etc. (+${CARD_POINTS.SPECIAL} pts)`}
        count={specialCardsCount}
        onDecrement={() =>
          updateCounter('specialCardsCount', -1, specialCardsCount)
        }
        onIncrement={() =>
          updateCounter('specialCardsCount', 1, specialCardsCount)
        }
        disabled={disabled}
        ariaLabel="standard specials"
      />

      {/* Curse Card (13 pts) */}
      <CounterRow
        points={CARD_POINTS.CURSE}
        tileClass="bg-rose-500/15 text-rose-700 dark:text-rose-300"
        title={t.scoring.curseCard}
        subtitle={`+${CARD_POINTS.CURSE} pts · ${t.scoring.uniqueCardHint}`}
        count={curseCount}
        onDecrement={() => updateCounter('curseCount', -1, curseCount)}
        onIncrement={() =>
          updateCounter('curseCount', 1, curseCount, UNIQUE_CARD_LIMIT)
        }
        disabled={disabled}
        ariaLabel="curse card"
        max={UNIQUE_CARD_LIMIT}
      />

      {/* The End Card (17 pts) */}
      <CounterRow
        points={CARD_POINTS.THE_END}
        tileClass="bg-amber-500/15 text-amber-700 dark:text-amber-300"
        title={t.scoring.theEndCard}
        subtitle={`+${CARD_POINTS.THE_END} pts · ${t.scoring.uniqueCardHint}`}
        count={theEndCount}
        onDecrement={() => updateCounter('theEndCount', -1, theEndCount)}
        onIncrement={() =>
          updateCounter('theEndCount', 1, theEndCount, UNIQUE_CARD_LIMIT)
        }
        disabled={disabled}
        ariaLabel="the end card"
        max={UNIQUE_CARD_LIMIT}
      />

      {/* Fuck You Card (42 pts) */}
      <CounterRow
        points={CARD_POINTS.FUCK_YOU}
        tileClass="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
        title={t.scoring.fuckYouCard}
        subtitle={`+${CARD_POINTS.FUCK_YOU} pts · ${t.scoring.uniqueCardHint}`}
        count={fuckYouCount}
        onDecrement={() => updateCounter('fuckYouCount', -1, fuckYouCount)}
        onIncrement={() =>
          updateCounter('fuckYouCount', 1, fuckYouCount, UNIQUE_CARD_LIMIT)
        }
        disabled={disabled}
        ariaLabel="fuck you card"
        max={UNIQUE_CARD_LIMIT}
      />

      {/* Mimicry Card (7 pts) */}
      <CounterRow
        points={CARD_POINTS.MIMICRY}
        tileClass="bg-blue-500/15 text-blue-700 dark:text-blue-300"
        title={t.scoring.mimicryCard}
        subtitle={`+${CARD_POINTS.MIMICRY} pts · ${t.scoring.uniqueCardHint}`}
        count={mimicryCount}
        onDecrement={() => updateCounter('mimicryCount', -1, mimicryCount)}
        onIncrement={() =>
          updateCounter('mimicryCount', 1, mimicryCount, UNIQUE_CARD_LIMIT)
        }
        disabled={disabled}
        ariaLabel="mimicry card"
        max={UNIQUE_CARD_LIMIT}
      />
    </div>
  );
};
