import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Player, Language } from '@/types/game';
import { PlayerStats } from '@/utils/stats';
import { getPlayerColorTheme } from '@/utils/colors';
import { soundEffects } from '@/utils/sound';
import { TRANSLATIONS } from '@/data/translations';

interface ScoringPlayerPickerProps {
  players: Player[];
  playerStats?: PlayerStats[];
  selectedPlayerId: string;
  onSelectPlayer: (id: string) => void;
  language: Language;
}

export const ScoringPlayerPicker: React.FC<ScoringPlayerPickerProps> = ({
  players,
  playerStats,
  selectedPlayerId,
  onSelectPlayer,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const activePlayer =
    players.find((p) => p.id === selectedPlayerId) || players[0];
  const activeColorTheme = getPlayerColorTheme(activePlayer.color);

  return (
    <div className="shrink-0 border-b border-neutral-200/80 px-5 py-3 dark:border-white/[0.07]">
      {/* Phones: native select (fast with many players) */}
      <div className="flex items-center gap-3 sm:hidden">
        <label htmlFor="scoring-player-select" className="eyebrow shrink-0">
          {t.setup.playerName}:
        </label>
        <div className="relative flex-1">
          <span
            className="pointer-events-none absolute top-1/2 left-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: activeColorTheme.hex }}
          />
          <select
            id="scoring-player-select"
            value={selectedPlayerId}
            onChange={(e) => {
              soundEffects.playClick();
              onSelectPlayer(e.target.value);
            }}
            className="input appearance-none pr-9 pl-8 font-semibold"
          >
            {players.map((p) => {
              const stat = playerStats?.find((s) => s.id === p.id);
              const totalScore = stat ? stat.totalScore : 0;
              return (
                <option key={p.id} value={p.id}>
                  {p.name} ({totalScore} {t.rules.pts})
                </option>
              );
            })}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {/* Tablets & desktop: one chip per player */}
      <div
        className="hidden flex-wrap items-center gap-2 sm:flex"
        role="group"
        aria-label={t.setup.playerName}
      >
        {players.map((p) => {
          const isSelected = p.id === selectedPlayerId;
          const stat = playerStats?.find((s) => s.id === p.id);
          const totalScore = stat ? stat.totalScore : 0;
          const pColorTheme = getPlayerColorTheme(p.color);

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onSelectPlayer(p.id);
              }}
              aria-pressed={isSelected}
              className={`option inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm font-semibold ${
                isSelected ? 'option-active' : ''
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: pColorTheme.hex }}
              />
              <span>{p.name}</span>
              <span className="text-xs font-medium text-neutral-500 tabular-nums dark:text-neutral-400">
                {totalScore}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
