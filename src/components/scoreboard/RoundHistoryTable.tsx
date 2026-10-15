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
  UserCheck,
  Swords,
  UserPlus,
  X,
} from 'lucide-react';
import { Player, RoundEntry, Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { RULE_CARDS_DATA } from '../../data/ruleCardsData';
import { soundEffects } from '../../utils/sound';

interface RoundHistoryTableProps {
  rounds: RoundEntry[];
  players: Player[];
  onUndoLastRound: () => void;
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number, entryId?: string) => void;
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
  const [deleteConfirmKey, setDeleteConfirmKey] = useState<string | null>(null);

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

  const actualRoundsCount = rounds.filter((r) => !r.isEvent).length;

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
          <span>{t.scoreboard.historyTitle}</span>
          <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-500 tabular-nums dark:bg-neutral-800">
            {actualRoundsCount}
          </span>
        </h3>

        <button
          type="button"
          onClick={handleUndo}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-200 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          title="Revert the scores of the most recent round"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span className="whitespace-nowrap">{t.scoreboard.undoRound}</span>
        </button>
      </div>

      {/* Rounds list (newest first) */}
      <div className="space-y-3">
        {[...rounds].reverse().map((round) => {
          const entryKey =
            round.id ||
            `${round.isEvent ? 'event' : 'round'}-${round.roundNumber}-${round.timestamp}`;
          const ruleCardId =
            round.activeRuleCardIds?.[0] || round.activeRuleCardId;
          const activeRuleCard = ruleCardId
            ? RULE_CARDS_DATA.find((c) => c.id === ruleCardId)
            : null;

          return (
            <div
              key={entryKey}
              className={`rounded-3xl border p-3 shadow-sm transition-all sm:p-4 ${
                round.isEvent
                  ? round.eventType === 'seppuku'
                    ? 'border-rose-500/30 bg-rose-500/[0.03] dark:border-rose-500/20 dark:bg-rose-950/20'
                    : round.eventType === 'late-joiner'
                      ? 'border-emerald-500/30 bg-emerald-500/[0.03] dark:border-emerald-500/20 dark:bg-emerald-950/20'
                      : 'border-indigo-500/30 bg-indigo-500/[0.03] dark:border-indigo-500/20 dark:bg-indigo-950/20'
                  : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
              }`}
            >
              {/* Round / Event Header */}
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
                <div className="flex min-w-0 items-center gap-2">
                  {round.isEvent ? (
                    round.eventType === 'seppuku' ? (
                      <>
                        <span className="flex shrink-0 items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/15 px-2.5 py-1 text-xs font-black whitespace-nowrap text-rose-600 tabular-nums dark:text-rose-400">
                          <Swords className="h-3.5 w-3.5 shrink-0" />
                          <span>{t.events?.seppuku || 'Seppuku T'}</span>
                        </span>
                        {round.notes && (
                          <span className="hidden truncate text-xs font-semibold text-neutral-500 sm:inline dark:text-neutral-400">
                            {round.notes}
                          </span>
                        )}
                      </>
                    ) : round.eventType === 'late-joiner' ? (
                      <>
                        <span className="flex shrink-0 items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-black whitespace-nowrap text-emerald-600 tabular-nums dark:text-emerald-400">
                          <UserPlus className="h-3.5 w-3.5 shrink-0" />
                          <span>{t.events?.lateJoiner || 'Late Joiner'}</span>
                        </span>
                        {round.notes && (
                          <span className="hidden truncate text-xs font-semibold text-neutral-500 sm:inline dark:text-neutral-400">
                            {round.notes}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="flex shrink-0 items-center gap-1 rounded-xl border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-1 text-xs font-black whitespace-nowrap text-indigo-600 tabular-nums dark:text-indigo-400">
                          <UserCheck className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {t.events?.identityTheft || 'Identity Theft'}
                          </span>
                        </span>
                        {round.eventMetadata &&
                          'lowPlayerName' in round.eventMetadata && (
                            <span className="hidden truncate text-xs font-semibold text-neutral-500 sm:inline dark:text-neutral-400">
                              {round.eventMetadata.lowPlayerName} (
                              {round.eventMetadata.lowScoreBefore} pts) ⇄{' '}
                              {round.eventMetadata.highPlayerName} (
                              {round.eventMetadata.highScoreBefore} pts)
                            </span>
                          )}
                      </>
                    )
                  ) : (
                    <>
                      <span className="shrink-0 rounded-xl border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-black whitespace-nowrap text-amber-600 tabular-nums dark:text-amber-400">
                        {t.scoreboard.round} {round.roundNumber}
                      </span>

                      {activeRuleCard && (
                        <span className="flex max-w-[160px] items-center gap-1 truncate rounded-xl border border-purple-500/30 bg-purple-500/15 px-2 py-1 text-xs font-bold text-purple-600 sm:max-w-[200px] sm:px-2.5 dark:text-purple-400">
                          <Sparkles className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {activeRuleCard.name[language]}
                          </span>
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Actions: Edit / Delete */}
                <div className="flex shrink-0 items-center gap-1">
                  {!round.isEvent && onEditRound && (
                    <button
                      type="button"
                      onClick={() => onEditRound(round.roundNumber)}
                      className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-amber-500 dark:hover:bg-neutral-800"
                      title={t.scoreboard.editRound}
                    >
                      <Edit3 className="h-3.5 w-3.5 shrink-0" />
                    </button>
                  )}

                  {onDeleteRound && (
                    <>
                      {deleteConfirmKey === entryKey ? (
                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              if (round.id) {
                                onDeleteRound(round.roundNumber, round.id);
                              } else {
                                onDeleteRound(round.roundNumber);
                              }
                              setDeleteConfirmKey(null);
                            }}
                            className="rounded-lg bg-red-600 px-2 py-0.5 font-bold text-white"
                          >
                            {t.setup.confirm}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmKey(null)}
                            className="rounded-lg p-1 text-neutral-400 hover:text-neutral-200"
                            aria-label={t.setup.cancel}
                          >
                            <X className="h-3.5 w-3.5 shrink-0" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmKey(entryKey)}
                          className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                          title={t.scoreboard.deleteRound}
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Player Scores Grid */}
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
                {players.map((player) => {
                  const score = round.scores[player.id];
                  if (!score) return null;

                  if (round.isEvent) {
                    const hasDelta = score.totalPoints !== 0;
                    return (
                      <div
                        key={player.id}
                        className={`rounded-2xl border p-2 transition-all sm:p-2.5 ${
                          hasDelta
                            ? 'border-indigo-500/40 bg-indigo-500/10 dark:border-indigo-500/30 dark:bg-indigo-950/30'
                            : 'border-neutral-100 bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-800/30'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            {player.name}
                          </span>
                          {hasDelta && (
                            <span className="rounded-md bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700 dark:text-indigo-300">
                              {t.events?.swappedPoints || 'Swapped'}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-baseline justify-between">
                          <span className="text-base font-black whitespace-nowrap text-neutral-900 tabular-nums dark:text-white">
                            {score.totalPoints > 0
                              ? `+${score.totalPoints}`
                              : score.totalPoints}{' '}
                            <span className="text-[10px] font-semibold text-neutral-400">
                              pts
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={player.id}
                      className={`rounded-2xl border p-2 transition-all sm:p-2.5 ${
                        score.isWinner
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-neutral-100 bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-800/30'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            {player.name}
                          </span>
                        </div>

                        {score.isWinner && (
                          <Trophy className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        )}
                      </div>

                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-base font-black whitespace-nowrap text-neutral-900 tabular-nums dark:text-white">
                          {score.totalPoints}{' '}
                          <span className="text-[10px] font-semibold text-neutral-400">
                            pts
                          </span>
                        </span>

                        {score.isDoomsday && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-purple-500 tabular-nums">
                            <Skull className="h-3 w-3 shrink-0" />
                            50
                          </span>
                        )}

                        {score.timeBombModifier !== 'none' && (
                          <Bomb className="h-3 w-3 shrink-0 text-amber-500" />
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
