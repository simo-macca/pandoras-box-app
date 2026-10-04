import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { getRecommendedPresets } from '../../hooks/useGameState';
import { HelpTooltip } from '../common/HelpTooltip';

interface ScoreLimitPresetsProps {
  playerCount: number;
  selectedTarget: number;
  presetName: 'short' | 'medium' | 'long' | 'custom';
  onSelectLimit: (
    target: number,
    preset: 'short' | 'medium' | 'long' | 'custom'
  ) => void;
  language: Language;
}

export const ScoreLimitPresets: React.FC<ScoreLimitPresetsProps> = ({
  playerCount,
  selectedTarget,
  presetName,
  onSelectLimit,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const presets = getRecommendedPresets(playerCount);
  const [customValue, setCustomValue] = useState<string>(
    presetName === 'custom' ? String(selectedTarget) : '150'
  );

  const presetOptions: {
    id: 'short' | 'medium' | 'long';
    label: string;
    score: number;
  }[] = [
    { id: 'short', label: t.setup.shortGame, score: presets.short },
    { id: 'medium', label: t.setup.mediumGame, score: presets.medium },
    { id: 'long', label: t.setup.longGame, score: presets.long },
  ];

  const handleCustomChange = (val: string) => {
    setCustomValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onSelectLimit(parsed, 'custom');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-sm font-bold text-neutral-800 dark:text-neutral-200">
          <Target className="h-4 w-4 text-amber-500" />
          <span>{t.setup.targetScore}</span>
          <HelpTooltip
            title={t.scoreboard.limitHelpTitle}
            content={t.scoreboard.limitHelpDesc}
            align="left"
          />
        </label>
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {playerCount <= 4 ? '2–4 Players' : '5–8 Players'} (
          {t.setup.recommended})
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {presetOptions.map((opt) => {
          const isSelected =
            presetName === opt.id && selectedTarget === opt.score;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectLimit(opt.score, opt.id)}
              className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.2)] dark:text-amber-400'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {opt.label}
              </span>
              <span className="mt-0.5 text-lg font-black text-neutral-900 dark:text-white">
                {opt.score}
              </span>
              <span className="text-[10px] font-semibold text-neutral-400">
                {t.setup.pts}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Option */}
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const parsed = parseInt(customValue, 10) || 150;
              onSelectLimit(parsed, 'custom');
            }}
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
              type="number"
              min="10"
              max="999"
              value={customValue}
              onChange={(e) => handleCustomChange(e.target.value)}
              onFocus={() => {
                const parsed = parseInt(customValue, 10) || 150;
                onSelectLimit(parsed, 'custom');
              }}
              placeholder={t.setup.customPlaceholder}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
            <span className="pointer-events-none absolute right-3 top-2 text-xs font-semibold text-neutral-400">
              {t.setup.pts}
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {t.setup.targetScoreDesc}
      </p>
    </div>
  );
};
