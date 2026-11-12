import React, { useState, useEffect } from 'react';
import { Zap, Bomb, Check, Globe } from 'lucide-react';
import { Language, TableTimeBombMode, TimeBombModifier } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface ScoringModifiersProps {
  isDoomsday: boolean;
  /** Whether the selected player ended the round (limits the Time Bomb options). */
  isWinner?: boolean;
  timeBombModifier: TimeBombModifier;
  tableTimeBombMode?: TableTimeBombMode;
  customModifier: number;
  onToggleDoomsday: () => void;
  onChangeTimeBomb: (modifier: TimeBombModifier) => void;
  onChangeTableTimeBomb?: (mode: TableTimeBombMode) => void;
  onChangeCustomModifier: (value: number) => void;
  language: Language;
}

export const ScoringModifiers: React.FC<ScoringModifiersProps> = ({
  isDoomsday,
  isWinner = false,
  timeBombModifier,
  tableTimeBombMode = 'none',
  customModifier,
  onToggleDoomsday,
  onChangeTimeBomb,
  onChangeTableTimeBomb,
  onChangeCustomModifier,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [localCustomModifier, setLocalCustomModifier] = useState<string>(
    customModifier ? String(customModifier) : ''
  );

  useEffect(() => {
    setLocalCustomModifier((prev) => {
      const parsed = parseInt(prev, 10);
      const currentNumber = isNaN(parsed) ? 0 : parsed;
      if (currentNumber !== customModifier) {
        return customModifier === 0 ? '' : String(customModifier);
      }
      return prev;
    });
  }, [customModifier]);

  const handleCustomModifierChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    if (val === '' || val === '-' || val === '+') {
      setLocalCustomModifier(val);
      onChangeCustomModifier(0);
      return;
    }
    if (/^[+-]?\d+$/.test(val)) {
      setLocalCustomModifier(val);
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        onChangeCustomModifier(parsed);
      }
    }
  };

  const handleCustomModifierBlur = () => {
    if (
      localCustomModifier === '' ||
      localCustomModifier === '-' ||
      localCustomModifier === '+'
    ) {
      setLocalCustomModifier(
        customModifier === 0 ? '' : String(customModifier)
      );
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 sm:p-4 dark:border-neutral-800 dark:bg-neutral-800/30">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:text-neutral-300">
          <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
          <span>{t.scoring.eventsAndModifiers}</span>
        </h4>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-neutral-400">
          <Globe className="h-3 w-3" />
          <span>{t.scoring.tableEventsTitle}</span>
        </span>
      </div>

      {/* Doomsday Switch */}
      <button
        type="button"
        onClick={onToggleDoomsday}
        className={`flex w-full items-center justify-between rounded-xl border p-3 transition-all ${
          isDoomsday
            ? 'border-purple-500 bg-purple-500/15 font-bold text-purple-600 dark:text-purple-400'
            : 'border-neutral-200 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300'
        }`}
      >
        <div className="text-left">
          <div className="text-xs font-bold">{t.scoring.doomsdayToggle}</div>
          <div className="text-[10px] opacity-75">{t.scoring.doomsdayHint}</div>
        </div>
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
            isDoomsday
              ? 'border-purple-600 bg-purple-600 text-white'
              : 'border-neutral-400 dark:border-neutral-600'
          }`}
        >
          {isDoomsday && <Check className="h-3.5 w-3.5 shrink-0 stroke-3" />}
        </div>
      </button>

      {/* Table-wide Time Bomb Mode */}
      {onChangeTableTimeBomb && (
        <div className="space-y-1">
          <label
            htmlFor="table-time-bomb-select"
            className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-400"
          >
            <Bomb className="h-3.5 w-3.5 shrink-0 text-amber-500" />
            <span>{t.scoring.timeBombTableLabel}</span>
          </label>
          <select
            id="table-time-bomb-select"
            value={tableTimeBombMode}
            onChange={(e) =>
              onChangeTableTimeBomb(e.target.value as TableTimeBombMode)
            }
            disabled={isDoomsday}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          >
            <option value="none">{t.scoring.timeBombTableNone}</option>
            <option value="defused">{t.scoring.timeBombTableDefused}</option>
            <option value="exploded">{t.scoring.timeBombTableExploded}</option>
          </select>
        </div>
      )}

      {/* Time Bomb Selector (Player Override) */}
      <div className="space-y-1 border-t border-neutral-200/60 pt-1 dark:border-neutral-700/60">
        <label
          htmlFor="player-time-bomb-select"
          className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-400"
        >
          <Bomb className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span>{t.scoring.timeBombPlayerLabel}</span>
        </label>
        <select
          id="player-time-bomb-select"
          value={timeBombModifier}
          onChange={(e) => onChangeTimeBomb(e.target.value as TimeBombModifier)}
          disabled={isDoomsday}
          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        >
          <option value="none">{t.scoring.timeBombNone}</option>
          {isWinner ? (
            <option value="winner_bonus">{t.scoring.timeBombWinner}</option>
          ) : (
            <option value="loser_penalty">{t.scoring.timeBombLoser}</option>
          )}
          <option value="expired_double">{t.scoring.timeBombExpired}</option>
        </select>
      </div>

      {/* Custom +/- modifier: label on its own line, input and hint below */}
      <div className="space-y-1 border-t border-neutral-200/60 pt-2 dark:border-neutral-700/60">
        <label
          htmlFor="custom-modifier-input"
          className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400"
        >
          {t.scoring.customModifier}
        </label>
        <div className="flex items-center gap-2">
          <input
            id="custom-modifier-input"
            type="text"
            inputMode="numeric"
            pattern="[+-]?[0-9]*"
            placeholder="0"
            value={localCustomModifier}
            onChange={handleCustomModifierChange}
            onBlur={handleCustomModifierBlur}
            className="w-24 shrink-0 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none sm:w-32 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
          <p className="min-w-0 text-[10px] leading-snug text-neutral-400">
            {t.scoring.customModifierHint}
          </p>
        </div>
      </div>
    </div>
  );
};
