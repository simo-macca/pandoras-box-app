import React from 'react';
import { Undo2, History } from 'lucide-react';
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
      <section className="card flex flex-col items-center gap-2 border-dashed px-6 py-12 text-center">
        <div className="icon-tile mb-1 bg-neutral-100 text-neutral-400 dark:bg-white/[0.06]">
          <History className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {t.scoreboard.noRoundsYet}
        </p>
        <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
          {t.scoreboard.startFirstRound}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="section-title flex items-center gap-2">
          <span>{t.scoreboard.historyTitle}</span>
          <span className="chip px-2 py-0.5 tabular-nums">
            {countPlayedRounds(rounds)}
          </span>
        </h3>

        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onUndoLastRound();
          }}
          className="btn btn-secondary btn-sm"
          title={t.common.undoLastRoundHint}
        >
          <Undo2 className="h-3.5 w-3.5" />
          <span>{t.scoreboard.undoRound}</span>
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
    </section>
  );
};
