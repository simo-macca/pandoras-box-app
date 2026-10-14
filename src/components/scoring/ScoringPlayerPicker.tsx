import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Player, Language } from '../../types/game';
import { PlayerStats } from '../../utils/stats';
import { getPlayerColorTheme } from '../../utils/colors';
import { soundEffects } from '../../utils/sound';
import { TRANSLATIONS } from '../../data/translations';

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
  const activePlayer = players.find((p) => p.id === selectedPlayerId) || players[0];
  const activeColorTheme = getPlayerColorTheme(activePlayer.color);

  return (
    <div className="shrink-0 border-b border-neutral-200 bg-neutral-100/60 px-3 py-2.5 sm:px-4 dark:border-neutral-800 dark:bg-neutral-900/40">
      {/* Mobile Mode: Dropdown Menu */}
      <div className="flex items-center gap-2 sm:hidden">
        <label
          htmlFor="scoring-player-select"
          className="shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
        >
          {t.setup.playerName}:
        </label>
        <div className="relative flex-1">
          <div className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center justify-center">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: activeColorTheme.hex }}
            />
          </div>
          <select
            id="scoring-player-select"
            value={selectedPlayerId}
            onChange={(e) => {
              soundEffects.playClick();
              onSelectPlayer(e.target.value);
            }}
            className="w-full appearance-none rounded-xl border border-neutral-300 bg-white py-2 pr-8 pl-8 text-xs font-bold text-neutral-800 shadow-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
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
          <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400">
            <ChevronDown className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </div>

      {/* PC / Desktop Mode: Inline Labels Menu */}
      <div className="hidden flex-wrap items-center gap-1.5 sm:flex sm:gap-2">
        <span className="mr-1 shrink-0 text-xs font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.setup.playerName}:
        </span>
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
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 text-neutral-900 shadow-sm dark:border-amber-500/60 dark:bg-amber-500/20 dark:text-white'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-white'
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: pColorTheme.hex }}
              />
              <span>{p.name}</span>
              <span
                className={`text-[11px] tabular-nums ${
                  isSelected
                    ? 'font-extrabold text-amber-600 dark:text-amber-400'
                    : 'font-normal text-neutral-500 dark:text-neutral-400'
                }`}
              >
                ({totalScore} {t.rules.pts})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
