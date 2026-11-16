import React from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Player, Language } from '@/types/game';
import { ALL_PAWN_COLORS, PAWN_COLORS } from '@/utils/colors';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';

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
  const t = TRANSLATIONS[language];

  const handleAdd = () => {
    soundEffects.playClick();
    onAddPlayer();
  };

  const handleRemove = (id: string) => {
    soundEffects.playClick();
    onRemovePlayer(id);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="eyebrow">
          {t.setup.playerCount}{' '}
          <span className="text-neutral-400 tabular-nums">
            {players.length}/8
          </span>
        </h3>
        <span className="text-xs text-neutral-400">Min 2 — Max 8</span>
      </div>

      <ol className="space-y-2">
        {players.map((player, idx) => (
          <li
            key={player.id}
            className="card-muted grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: PAWN_COLORS[player.color].hex }}
            >
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
              aria-label={`${t.setup.playerName} ${idx + 1}`}
              className="input"
            />

            <div
              className="order-last col-span-3 flex flex-wrap items-center gap-2 pl-12 sm:order-none sm:col-span-1 sm:pl-0"
              role="radiogroup"
              aria-label={t.setup.color}
            >
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
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isTakenByOther}
                    onClick={() => {
                      if (isTakenByOther) return;
                      soundEffects.playClick();
                      onUpdatePlayer(player.id, { color: colorOption });
                    }}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform ${
                      isSelected
                        ? `ring-2 ring-offset-2 ring-offset-neutral-50 dark:ring-offset-neutral-900 ${theme.ringColor}`
                        : isTakenByOther
                          ? 'cursor-not-allowed opacity-20'
                          : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: theme.hex }}
                    title={`${theme.label[language] || theme.label.en}${isTakenByOther ? ' (Already picked)' : ''}`}
                  >
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 stroke-3 text-white drop-shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={players.length <= 2}
              onClick={() => handleRemove(player.id)}
              className="btn-icon hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
              title={
                players.length <= 2
                  ? 'Minimum 2 players required'
                  : 'Remove player'
              }
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ol>

      {players.length < 8 && (
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-block h-11 border border-dashed border-neutral-300 text-neutral-600 hover:border-amber-500 hover:text-amber-700 dark:border-white/15 dark:text-neutral-300 dark:hover:border-amber-400 dark:hover:text-amber-300"
        >
          <Plus className="h-4 w-4" />
          <span>
            {t.setup.addPlayer} ({8 - players.length} remaining)
          </span>
        </button>
      )}
    </section>
  );
};
