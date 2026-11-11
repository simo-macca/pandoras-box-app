import React from 'react';
import { Target } from 'lucide-react';
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-neutral-200">
          <Target className="h-4 w-4 text-amber-500" />
          <span>{t.setup.targetScore}</span>
        </label>
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
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
              className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.2)] dark:text-amber-400'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <span className="text-lg font-black text-neutral-900 dark:text-white">
                {preset.score}
              </span>
              <span className="text-[10px] font-semibold text-neutral-400">
                {formatNote(preset.uses)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Limit */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onSelectCustom}
          className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
            presetName === 'custom'
              ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-600 dark:text-amber-400'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
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
            className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
          <span className="pointer-events-none absolute top-2 right-3 text-xs font-semibold text-neutral-400">
            {t.setup.points}
          </span>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {t.setup.description}
      </p>
    </div>
  );
};

export default ScoreLimitSelector;
