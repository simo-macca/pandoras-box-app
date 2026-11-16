import React from 'react';
import { Language, GameConfig } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface ScoreLimitSelectorProps {
  targetScore: number;
  presetName: GameConfig['presetName'];
  customValue: string;
  onSelectPreset: (score: number) => void;
  onSelectCustom: () => void;
  onCustomChange: (val: string) => void;
  onSubmitCustom?: () => void;
  language: Language;
}

type PresetLength = 'short' | 'medium' | 'long';

// Official Rulefactory point limits (rulebook p. 4).
const OFFICIAL_SCORE_PRESETS: ReadonlyArray<{
  score: number;
  label: string;
  uses: ReadonlyArray<{ players: string; length: PresetLength }>;
}> = [
  { score: 113, label: '113 pts', uses: [{ players: '5–8', length: 'short' }] },
  {
    score: 137,
    label: '137 pts',
    uses: [
      { players: '2–4', length: 'short' },
      { players: '5–8', length: 'medium' },
    ],
  },
  {
    score: 154,
    label: '154 pts',
    uses: [
      { players: '2–4', length: 'medium' },
      { players: '5–8', length: 'long' },
    ],
  },
  { score: 179, label: '179 pts', uses: [{ players: '2–4', length: 'long' }] },
];

export const ScoreLimitSelector: React.FC<ScoreLimitSelectorProps> = ({
  targetScore,
  presetName,
  customValue,
  onSelectPreset,
  onSelectCustom,
  onCustomChange,
  onSubmitCustom,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const lengthLabel: Record<PresetLength, string> = {
    short: t.setup.shortGame,
    medium: t.setup.mediumGame,
    long: t.setup.longGame,
  };
  const formatNote = (
    uses: ReadonlyArray<{ players: string; length: PresetLength }>
  ) => uses.map((u) => `${u.players}: ${lengthLabel[u.length]}`).join(' · ');

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="eyebrow">{t.setup.targetScore}</h3>
        <span className="text-xs text-neutral-400">
          {t.common.officialLimits}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OFFICIAL_SCORE_PRESETS.map((preset) => {
          const isSelected =
            presetName !== 'custom' && targetScore === preset.score;

          return (
            <button
              key={preset.score}
              type="button"
              onClick={() => onSelectPreset(preset.score)}
              aria-pressed={isSelected}
              className={`option flex flex-col items-center justify-center gap-0.5 px-2 py-3 text-center ${
                isSelected ? 'option-active' : ''
              }`}
            >
              <span className="score-number text-xl text-neutral-900 dark:text-white">
                {preset.score}
              </span>
              <span className="text-[11px] leading-tight text-neutral-500 dark:text-neutral-400">
                {formatNote(preset.uses)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Limit */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSelectCustom}
          aria-pressed={presetName === 'custom'}
          className={`option h-10 shrink-0 px-4 text-sm font-semibold ${
            presetName === 'custom' ? 'option-active' : ''
          }`}
        >
          {t.setup.customGame}
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={customValue}
            onChange={(e) => onCustomChange(e.target.value)}
            onFocus={onSelectCustom}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmitCustom?.();
              }
            }}
            placeholder="150"
            className="input pr-14 tabular-nums"
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-neutral-400">
            {t.setup.points}
          </span>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {t.setup.targetScoreDesc}
      </p>
    </section>
  );
};

export default ScoreLimitSelector;
