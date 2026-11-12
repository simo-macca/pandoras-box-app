import React from 'react';
import { RotateCcw, Calendar } from 'lucide-react';
import { Player, RoundEntry, Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { soundEffects } from '@/utils/sound';
import { countPlayedRounds } from '@/utils/stats';
import { RoundHistoryEntry } from './RoundHistoryEntry';

interface RoundHistoryTableProps {
  rounds: RoundEntry[];
  players: Player[];
  onUndoLastRound: () => void;
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number, entryId?: string) => void;
  onEditSeppuku?: (roundId: string) => void;
  language: Language;
}

/** Match history, newest entry first. */
export const RoundHistoryTable: React.FC<RoundHistoryTableProps> = ({
  rounds,
  players,
  onUndoLastRound,
  onEditRound,
  onDeleteRound,
  onEditSeppuku,
  language,
}) => {
  const t = TRANSLATIONS[language];

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
          <span>{t.scoreboard.historyTitle}</span>
          <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-500 tabular-nums dark:bg-neutral-800">
            {countPlayedRounds(rounds)}
          </span>
        </h3>

        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onUndoLastRound();
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-200 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          title={t.common.undoLastRoundHint}
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span className="whitespace-nowrap">{t.scoreboard.undoRound}</span>
        </button>
      </div>

      <div className="space-y-3">
        {[...rounds].reverse().map((round) => (
          <RoundHistoryEntry
            key={
              round.id ??
              `${round.isEvent ? 'event' : 'round'}-${round.roundNumber}-${round.timestamp}`
            }
            round={round}
            players={players}
            onEditRound={onEditRound}
            onDeleteRound={onDeleteRound}
            onEditSeppuku={onEditSeppuku}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};
