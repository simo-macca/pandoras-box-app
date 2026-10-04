import React, { useState } from 'react';
import { RotateCcw, Calendar, Edit3, Trash2, Trophy, Sparkles, Skull, Bomb } from 'lucide-react';
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
  const [deleteConfirmRound, setDeleteConfirmRound] = useState<number | null>(null);

  if (rounds.length === 0) {
    return (
      <div className="p-8 text-center rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 space-y-2">
        <Calendar className="w-8 h-8 text-neutral-400 mx-auto stroke-1" />
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
        <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <span>{t.scoreboard.historyTitle}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-mono font-bold text-amber-500">
            {rounds.length}
          </span>
        </h3>

        <button
          type="button"
          onClick={handleUndo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold border border-neutral-200 dark:border-neutral-700 transition-all active:scale-95"
          title="Revert the scores of the most recent round"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.scoreboard.undoRound}</span>
        </button>
      </div>

      {/* Rounds list (newest first) */}
      <div className="space-y-3">
        {[...rounds].reverse().map(round => {
          const activeRuleCard = round.activeRuleCardIds?.[0]
            ? RULE_CARDS_DATA.find(c => c.id === round.activeRuleCardIds![0])
            : null;

          return (
            <div
              key={round.roundNumber}
              className="p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all"
            >
              {/* Round Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black">
                    {t.scoreboard.round} {round.roundNumber}
                  </span>

                  {activeRuleCard && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold truncate max-w-[200px]">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate">{activeRuleCard.name[language]}</span>
                    </span>
                  )}
                </div>

                {/* Actions: Edit / Delete */}
                <div className="flex items-center gap-1">
                  {onEditRound && (
                    <button
                      type="button"
                      onClick={() => onEditRound(round.roundNumber)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title={t.scoreboard.editRound}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
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
                            className="px-2 py-0.5 rounded-lg bg-red-600 text-white font-bold"
                          >
                            {t.setup.confirm}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmRound(null)}
                            className="px-1.5 py-0.5 rounded-lg text-neutral-400 hover:text-neutral-200"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmRound(round.roundNumber)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title={t.scoreboard.deleteRound}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Player Scores Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {players.map(player => {
                  const score = round.scores[player.id];
                  const theme = getPlayerColorTheme(player.color);
                  if (!score) return null;

                  return (
                    <div
                      key={player.id}
                      className={`p-2.5 rounded-2xl border transition-all ${
                        score.isWinner
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-neutral-100 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-800/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: theme.hex }}
                          />
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                            {player.name}
                          </span>
                        </div>

                        {score.isWinner && (
                          <Trophy className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-black text-neutral-900 dark:text-white">
                          {score.totalPoints}{' '}
                          <span className="text-[10px] font-semibold text-neutral-400">pts</span>
                        </span>

                        {score.isDoomsday && (
                          <span className="text-[10px] text-purple-500 font-bold flex items-center gap-0.5">
                            <Skull className="w-3 h-3" />
                            50
                          </span>
                        )}

                        {score.timeBombModifier !== 'none' && (
                          <Bomb className="w-3 h-3 text-amber-500" />
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

