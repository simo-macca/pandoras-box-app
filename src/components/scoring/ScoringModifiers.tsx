import React, { useState, useEffect } from 'react';
import { Bomb, Skull } from 'lucide-react';
import { Language, TableTimeBombMode, TimeBombModifier } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { Switch } from '@/components/common/Switch';

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
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="eyebrow">{t.scoring.eventsAndModifiers}</h3>
        <span className="text-xs text-neutral-400">
          {t.scoring.tableEventsTitle}
        </span>
      </div>

      <div className="card-muted space-y-4 p-4">
        {/* Doomsday switch */}
        <button
          type="button"
          onClick={onToggleDoomsday}
          aria-pressed={isDoomsday}
          className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
            isDoomsday
              ? 'border-purple-500/60 bg-purple-500/10'
              : 'border-neutral-200/80 bg-white hover:border-neutral-300 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/15'
          }`}
        >
          <div
            className={`icon-tile h-9 w-9 ${
              isDoomsday
                ? 'bg-purple-500 text-white'
                : 'bg-purple-500/10 text-purple-600 dark:text-purple-300'
            }`}
          >
            <Skull className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-neutral-900 dark:text-white">
              {t.scoring.doomsdayToggle}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {t.scoring.doomsdayHint}
            </div>
          </div>
          <Switch checked={isDoomsday} tone="purple" />
        </button>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Table-wide Time Bomb mode */}
          {onChangeTableTimeBomb && (
            <div>
              <label htmlFor="table-time-bomb-select" className="field-label">
                <Bomb className="h-3.5 w-3.5 text-amber-500" />
                <span>{t.scoring.timeBombTableLabel}</span>
              </label>
              <select
                id="table-time-bomb-select"
                value={tableTimeBombMode}
                onChange={(e) =>
                  onChangeTableTimeBomb(e.target.value as TableTimeBombMode)
                }
                disabled={isDoomsday}
                className="input"
              >
                <option value="none">{t.scoring.timeBombTableNone}</option>
                <option value="defused">
                  {t.scoring.timeBombTableDefused}
                </option>
                <option value="exploded">
                  {t.scoring.timeBombTableExploded}
                </option>
              </select>
            </div>
          )}

          {/* Time Bomb override for the selected player */}
          <div>
            <label htmlFor="player-time-bomb-select" className="field-label">
              <Bomb className="h-3.5 w-3.5 text-amber-500" />
              <span>{t.scoring.timeBombPlayerLabel}</span>
            </label>
            <select
              id="player-time-bomb-select"
              value={timeBombModifier}
              onChange={(e) =>
                onChangeTimeBomb(e.target.value as TimeBombModifier)
              }
              disabled={isDoomsday}
              className="input"
            >
              <option value="none">{t.scoring.timeBombNone}</option>
              {isWinner ? (
                <option value="winner_bonus">{t.scoring.timeBombWinner}</option>
              ) : (
                <option value="loser_penalty">{t.scoring.timeBombLoser}</option>
              )}
              <option value="expired_double">
                {t.scoring.timeBombExpired}
              </option>
            </select>
          </div>
        </div>

        {/* Custom +/- adjustment */}
        <div>
          <label htmlFor="custom-modifier-input" className="field-label">
            {t.scoring.customModifier}
          </label>
          <div className="flex items-center gap-3">
            <input
              id="custom-modifier-input"
              type="text"
              inputMode="numeric"
              pattern="[+-]?[0-9]*"
              placeholder="0"
              value={localCustomModifier}
              onChange={handleCustomModifierChange}
              onBlur={handleCustomModifierBlur}
              className="input w-28 shrink-0 text-center tabular-nums"
            />
            <p className="min-w-0 text-xs leading-snug text-neutral-500 dark:text-neutral-400">
              {t.scoring.customModifierHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
