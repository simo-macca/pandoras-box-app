import React from 'react';
import { Zap, Bomb, Check } from 'lucide-react';
import { Language, TimeBombModifier } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

interface ScoringModifiersProps {
  isDoomsday: boolean;
  timeBombModifier: TimeBombModifier;
  customModifier: number;
  onToggleDoomsday: () => void;
  onChangeTimeBomb: (modifier: TimeBombModifier) => void;
  onChangeCustomModifier: (value: number) => void;
  language: Language;
}

export const ScoringModifiers: React.FC<ScoringModifiersProps> = ({
  isDoomsday,
  timeBombModifier,
  customModifier,
  onToggleDoomsday,
  onChangeTimeBomb,
  onChangeCustomModifier,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 sm:p-4 dark:border-neutral-800 dark:bg-neutral-800/30">
      <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:text-neutral-300">
        <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
        <span>{t.scoring.eventsAndModifiers}</span>
      </h4>

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
          <div className="text-xs font-bold">
            {t.scoring.doomsdayToggle}
          </div>
          <div className="text-[10px] opacity-75">
            {t.scoring.doomsdayHint}
          </div>
        </div>
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
            isDoomsday
              ? 'border-purple-600 bg-purple-600 text-white'
              : 'border-neutral-400 dark:border-neutral-600'
          }`}
        >
          {isDoomsday && (
            <Check className="h-3.5 w-3.5 shrink-0 stroke-[3]" />
          )}
        </div>
      </button>

      {/* Time Bomb Selector */}
      <div className="space-y-1">
        <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
          <Bomb className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span>{t.scoring.timeBombModifier}</span>
        </label>
        <select
          value={timeBombModifier}
          onChange={(e) =>
            onChangeTimeBomb(e.target.value as TimeBombModifier)
          }
          disabled={isDoomsday}
          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        >
          <option value="none">{t.scoring.timeBombNone}</option>
          <option value="winner_bonus">{t.scoring.timeBombWinner}</option>
          <option value="loser_penalty">{t.scoring.timeBombLoser}</option>
          <option value="expired_double">{t.scoring.timeBombExpired}</option>
        </select>
      </div>

      {/* Custom +/- modifier */}
      <div className="flex items-center gap-2 pt-1">
        <div className="flex-1">
          <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
            {t.scoring.customModifier}
          </label>
          <input
            type="number"
            value={customModifier || 0}
            onChange={(e) =>
              onChangeCustomModifier(parseInt(e.target.value, 10) || 0)
            }
            disabled={isDoomsday}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>
        <div className="flex-1 pt-4 text-[10px] text-neutral-400">
          {t.scoring.customModifierHint}
        </div>
      </div>
    </div>
  );
};
