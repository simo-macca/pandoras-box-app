import React from 'react';

export type ScoreCellTone =
  'neutral' | 'winner' | 'emerald' | 'rose' | 'amber' | 'indigo';

const CELL_TONES: Record<ScoreCellTone, { cell: string; badge: string }> = {
  neutral: {
    cell: 'border-neutral-100 bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-800/30',
    badge: 'bg-neutral-500/20 text-neutral-700 dark:text-neutral-300',
  },
  winner: {
    cell: 'border-emerald-500/50 bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
  },
  emerald: {
    cell: 'border-emerald-500/40 bg-emerald-500/10 dark:border-emerald-500/30 dark:bg-emerald-950/30',
    badge: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
  },
  rose: {
    cell: 'border-rose-500/40 bg-rose-500/10 dark:border-rose-500/30 dark:bg-rose-950/30',
    badge: 'bg-rose-500/20 text-rose-700 dark:text-rose-300',
  },
  amber: {
    cell: 'border-amber-500/40 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-950/30',
    badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
  },
  indigo: {
    cell: 'border-indigo-500/40 bg-indigo-500/10 dark:border-indigo-500/30 dark:bg-indigo-950/30',
    badge: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
  },
};

interface HistoryScoreCellProps {
  playerName: string;
  points: number;
  /** Show a leading "+" for positive values (event adjustments). */
  signed?: boolean;
  tone?: ScoreCellTone;
  /** Small label or icon next to the player name. */
  badge?: React.ReactNode;
  /** Extra markers shown next to the points (Doomsday, Time Bomb, ...). */
  markers?: React.ReactNode;
}

/** One player's result inside a round or event history entry. */
export const HistoryScoreCell: React.FC<HistoryScoreCellProps> = ({
  playerName,
  points,
  signed = false,
  tone = 'neutral',
  badge,
  markers,
}) => {
  const styles = CELL_TONES[tone];
  return (
    <div
      className={`rounded-2xl border p-2 transition-all sm:p-2.5 ${styles.cell}`}
    >
      <div className="mb-1 flex items-center justify-between gap-1">
        <span className="truncate text-xs font-bold text-neutral-800 dark:text-neutral-200">
          {playerName}
        </span>
        {typeof badge === 'string' ? (
          <span
            className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${styles.badge}`}
          >
            {badge}
          </span>
        ) : (
          badge
        )}
      </div>

      <div className="mt-1 flex items-baseline justify-between">
        <span className="text-base font-black whitespace-nowrap text-neutral-900 tabular-nums dark:text-white">
          {signed && points > 0 ? `+${points}` : points}{' '}
          <span className="text-[10px] font-semibold text-neutral-400">
            pts
          </span>
        </span>
        {markers}
      </div>
    </div>
  );
};
