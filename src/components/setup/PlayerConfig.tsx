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
        <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-500" />
          <span>
            {t.setup.playerCount} ({players.length}/8)
          </span>
        </label>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Min 2 — Max 8
        </span>
      </div>

      <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
        {players.map((player, idx) => {
          return (
            <div
              key={player.id}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-2.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-700/80 shadow-sm"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="w-7 h-7 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-black text-neutral-600 dark:text-neutral-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {idx + 1}
                </span>

                <input
                  type="text"
                  maxLength={18}
                  value={player.name}
                  onChange={e => onUpdatePlayer(player.id, { name: e.target.value })}
                  placeholder={`Player ${idx + 1}`}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-neutral-400"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-200 dark:border-neutral-700/60">
                <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
                  {ALL_PAWN_COLORS.map(colorOption => {
                    const theme = PAWN_COLORS[colorOption];
                    const isSelected = player.color === colorOption;
                    const isTakenByOther = players.some(
                      other => other.id !== player.id && other.color === colorOption
                    );

                    return (
                      <button
                        key={colorOption}
                        type="button"
                        onClick={() => {
                          soundEffects.playClick();
                          onUpdatePlayer(player.id, { color: colorOption });
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? `ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 ${theme.ringColor} scale-110 shadow-md`
                            : isTakenByOther
                            ? 'opacity-35 hover:opacity-75'
                            : 'opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: theme.hex }}
                        title={`${theme.label[language] || theme.label.en}${isTakenByOther ? ' (in use)' : ''}`}
                      >
                        {isSelected && (
                          <div
                            className={`w-2 h-2 rounded-full ${
                              colorOption === 'white' ? 'bg-neutral-900' : 'bg-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={players.length <= 2}
                  onClick={() => handleRemove(player.id)}
                  className={`p-1.5 rounded-xl border transition-all ${
                    players.length <= 2
                      ? 'opacity-25 cursor-not-allowed border-transparent text-neutral-400 dark:text-neutral-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 dark:hover:border-rose-500/40'
                  }`}
                  title={players.length <= 2 ? 'Minimum 2 players required' : 'Remove player'}
                >
                  <Trash2 className="w-4 h-4" />
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
          className="w-full py-2.5 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-500 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-amber-500" />
          <span>
            {t.setup.addPlayer} ({8 - players.length} remaining)
          </span>
        </button>
      )}
    </div>
  );
};
