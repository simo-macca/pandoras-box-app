import React, { useState } from 'react';
import {
  RotateCcw,
  Calendar,
  Edit3,
  Trash2,
  Trophy,
  Sparkles,
  Skull,
  Bomb,
} from 'lucide-react';
import { Player, RoundEntry, Language } from '../../types/game';
import { getPlayerColorTheme } from '../../utils/colors';
import { TRANSLATIONS } from '../../data/translations';
import { RULE_CARDS_DATA } from '../../data/ruleCardsData';
import { soundEffects } from '../../utils/sound';

interface RoundHistoryTableProps {
  rounds: RoundEntry[];
  players: Player[];
  onUndoLastRound: () => void;
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number) => void;
  language: Language;
}

export const RoundHistoryTable: React.FC<RoundHistoryTableProps> = ({
  rounds,
  players,
  onUndoLastRound,
  onEditRound,
  onDeleteRound,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [deleteConfirmRound, setDeleteConfirmRound] = useState<number | null>(
    null
  );

  if (rounds.length === 0) {
    return (
      <div className="space-y-2 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
        <Calendar className="mx-auto h-8 w-8 stroke-1 text-neutral-400" />
        <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
          {t.scoreboard.noRoundsYet}
        </p>
        <p className="text-xs text-neutral-400">
          {t.scoreboard.startFirstRound}
        </p>
      </div>
    );
  }

  const handleUndo = () => {
    soundEffects.playClick();
    onUndoLastRound();
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
          <span>{t.scoreboard.historyTitle}</span>
          <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-500 dark:bg-neutral-800">
            {rounds.length}
          </span>
        </h3>

        <button
          type="button"
          onClick={handleUndo}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-200 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          title="Revert the scores of the most recent round"
        >
          <RotateCcw className="h-3.5 w-3.5 text-amber-500" />
          <span>{t.scoreboard.undoRound}</span>
        </button>
      </div>

      {/* Rounds list (newest first) */}
      <div className="space-y-3">
        {[...rounds].reverse().map((round) => {
          const activeRuleCard = round.activeRuleCardIds?.[0]
            ? RULE_CARDS_DATA.find((c) => c.id === round.activeRuleCardIds![0])
            : null;

          return (
            <div
              key={round.roundNumber}
              className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Round Header */}
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-black text-amber-600 dark:text-amber-400">
                    {t.scoreboard.round} {round.roundNumber}
                  </span>

                  {activeRuleCard && (
                    <span className="flex max-w-[200px] items-center gap-1 truncate rounded-xl border border-purple-500/30 bg-purple-500/15 px-2.5 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {activeRuleCard.name[language]}
                      </span>
                    </span>
                  )}
                </div>

                {/* Actions: Edit / Delete */}
                <div className="flex items-center gap-1">
                  {onEditRound && (
                    <button
                      type="button"
                      onClick={() => onEditRound(round.roundNumber)}
                      className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-amber-500 dark:hover:bg-neutral-800"
                      title={t.scoreboard.editRound}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {onDeleteRound && (
                    <>
                      {deleteConfirmRound === round.roundNumber ? (
                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteRound(round.roundNumber);
                              setDeleteConfirmRound(null);
                            }}
                            className="rounded-lg bg-red-600 px-2 py-0.5 font-bold text-white"
                          >
                            {t.setup.confirm}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmRound(null)}
                            className="rounded-lg px-1.5 py-0.5 text-neutral-400 hover:text-neutral-200"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmRound(round.roundNumber)
                          }
                          className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                          title={t.scoreboard.deleteRound}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Player Scores Grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {players.map((player) => {
                  const score = round.scores[player.id];
                  const theme = getPlayerColorTheme(player.color);
                  if (!score) return null;

                  return (
                    <div
                      key={player.id}
                      className={`rounded-2xl border p-2.5 transition-all ${
                        score.isWinner
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-neutral-100 bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-800/30'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: theme.hex }}
                          />
                          <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            {player.name}
                          </span>
                        </div>

                        {score.isWinner && (
                          <Trophy className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        )}
                      </div>

                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-base font-black text-neutral-900 dark:text-white">
                          {score.totalPoints}{' '}
                          <span className="text-[10px] font-semibold text-neutral-400">
                            pts
                          </span>
                        </span>

                        {score.isDoomsday && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-purple-500">
                            <Skull className="h-3 w-3" />
                            50
                          </span>
                        )}

                        {score.timeBombModifier !== 'none' && (
                          <Bomb className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
