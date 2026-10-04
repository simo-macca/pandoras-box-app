import React from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { Player, Language } from '../../types/game';
import { ALL_PAWN_COLORS, PAWN_COLORS } from '../../utils/colors';
import { UI_TRANSLATIONS } from '../../data/translations';
import { soundEffects } from '../../utils/sound';

interface PlayerConfigProps {
  players: Player[];
  onAddPlayer: () => void;
  onRemovePlayer: (id: string) => void;
  onUpdatePlayer: (id: string, updates: Partial<Player>) => void;
  language: Language;
}

export const PlayerConfig: React.FC<PlayerConfigProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  const handleAdd = () => {
    soundEffects.playClick();
    onAddPlayer();
  };

  const handleRemove = (id: string) => {
    soundEffects.playClick();
    onRemovePlayer(id);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-neutral-200">
          <Users className="h-4 w-4 text-amber-500" />
          <span>
            {t.setup.playerCount} ({players.length}/8)
          </span>
        </label>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Min 2 — Max 8
        </span>
      </div>

      <div className="max-h-[340px] space-y-2.5 overflow-y-auto pr-1">
        {players.map((player, idx) => {
          return (
            <div
              key={player.id}
              className="flex flex-col items-stretch gap-2.5 rounded-2xl border border-neutral-200/80 bg-neutral-100/80 p-2.5 shadow-sm dark:border-neutral-700/80 dark:bg-neutral-800/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-xs font-black text-neutral-600 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {idx + 1}
                </span>

                <input
                  type="text"
                  maxLength={18}
                  value={player.name}
                  onChange={(e) =>
                    onUpdatePlayer(player.id, { name: e.target.value })
                  }
                  placeholder={`Player ${idx + 1}`}
                  className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex shrink-0 items-center justify-between gap-1.5 border-t border-neutral-200/80 pt-1.5 dark:border-neutral-700/60 sm:justify-end sm:border-t-0 sm:pt-0">
                <div className="flex flex-wrap items-center gap-1 sm:flex-nowrap sm:gap-1.5">
                  {ALL_PAWN_COLORS.map((colorOption) => {
                    const theme = PAWN_COLORS[colorOption];
                    const isSelected = player.color === colorOption;
                    const isTakenByOther = players.some(
                      (other) =>
                        other.id !== player.id && other.color === colorOption
                    );

                    return (
                      <button
                        key={colorOption}
                        type="button"
                        disabled={isTakenByOther}
                        onClick={() => {
                          if (isTakenByOther) return;
                          soundEffects.playClick();
                          onUpdatePlayer(player.id, { color: colorOption });
                        }}
                        className={`sm:h-5.5 sm:w-5.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all ${
                          isSelected
                            ? `shadow-sm ring-2 ring-offset-1 ring-offset-neutral-100 dark:ring-offset-neutral-800 ${theme.ringColor}`
                            : isTakenByOther
                              ? 'cursor-not-allowed opacity-20'
                              : 'opacity-75 hover:scale-105 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: theme.hex }}
                        title={`${theme.label[language] || theme.label.en}${isTakenByOther ? ' (Already picked)' : ''}`}
                      >
                        {isSelected && (
                          <div className="shadow-xs h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                        {isTakenByOther && (
                          <span className="drop-shadow-xs text-[9px] font-black text-white">
                            ✕
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={players.length <= 2}
                  onClick={() => handleRemove(player.id)}
                  className={`rounded-xl border p-1.5 transition-all ${
                    players.length <= 2
                      ? 'cursor-not-allowed border-transparent text-neutral-400 opacity-25 dark:text-neutral-600'
                      : 'border-neutral-200 text-neutral-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-rose-500/40 dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
                  }`}
                  title={
                    players.length <= 2
                      ? 'Minimum 2 players required'
                      : 'Remove player'
                  }
                >
                  <Trash2 className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {players.length < 8 && (
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-bold text-neutral-700 shadow-sm transition-all hover:border-amber-500 hover:bg-neutral-100 hover:text-amber-600 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-200 dark:hover:border-amber-500 dark:hover:bg-neutral-800/80 dark:hover:text-amber-400"
        >
          <Plus className="h-4 w-4 text-amber-500" />
          <span>
            {t.setup.addPlayer} ({8 - players.length} remaining)
          </span>
        </button>
      )}
    </div>
  );
};
