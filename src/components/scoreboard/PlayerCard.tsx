import React from 'react';
import { Crown, AlertTriangle, OctagonX } from 'lucide-react';
import { PlayerStats, DANGER_THRESHOLD_RATIO } from '@/utils/stats';
import { PAWN_COLORS } from '@/utils/colors';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';

interface PlayerCardProps {
  player: PlayerStats;
  targetScore: number;
  language: Language;
}

const getProgressColor = (pct: number) => {
  if (pct >= 100) return 'bg-rose-600';
  if (pct >= DANGER_THRESHOLD_RATIO * 100) return 'bg-rose-500';
  if (pct >= 55) return 'bg-amber-500';
  return 'bg-emerald-500';
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  targetScore,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const theme = PAWN_COLORS[player.color];

  const stateClasses = player.isLeader
    ? 'border-amber-400/60 ring-1 ring-amber-400/30 dark:border-amber-400/40'
    : player.isEliminated
      ? 'border-rose-400/60 dark:border-rose-500/40'
      : player.isInDanger
        ? 'border-rose-300/70 dark:border-rose-500/30'
        : '';

  return (
    <article
      className={`card card-interactive relative overflow-hidden p-4 sm:p-5 ${stateClasses}`}
    >
      {/* Player colour accent */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: theme.hex }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar; the leader gets a crown */}
          <div className="relative shrink-0">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${theme.avatarBg}`}
            >
              {player.name.slice(0, 2).toUpperCase()}
            </div>
            {player.isLeader && (
              <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-neutral-950 ring-2 ring-white dark:ring-neutral-900">
                <Crown className="h-3.5 w-3.5 fill-current" />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-neutral-900 dark:text-white">
              {player.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex h-5 min-w-8 items-center justify-center rounded-full px-2 text-[11px] font-bold tabular-nums ${
                  player.isLeader
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300'
                }`}
                title={`#${player.rank}`}
              >
                #{player.rank}
              </span>
              {player.isLeader && (
                <span className="badge bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {t.scoreboard.leading}
                </span>
              )}
              {player.isInDanger && (
                <span className="badge bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="h-3 w-3" />
                  {t.scoreboard.dangerZone}
                </span>
              )}
              {player.isEliminated && (
                <span className="badge bg-rose-600 text-white">
                  <OctagonX className="h-3 w-3" />
                  {t.scoreboard.overLimit}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div
            className={`score-number text-3xl leading-none ${
              player.isEliminated
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-neutral-900 dark:text-white'
            }`}
          >
            {player.totalScore}
          </div>
          <div className="mt-1 text-xs font-medium whitespace-nowrap text-neutral-500 tabular-nums dark:text-neutral-400">
            / {targetScore} {t.scoreboard.pts}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div
          className="progress-track"
          role="progressbar"
          aria-label={t.common.proximityToLoss}
          aria-valuenow={player.progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`progress-bar ${getProgressColor(player.progressPct)}`}
            style={{
              width: `${Math.max(0, Math.min(100, player.progressPct))}%`,
            }}
          />
          <div
            className="absolute inset-y-0 w-0.5 bg-rose-500/60"
            style={{ left: `${DANGER_THRESHOLD_RATIO * 100}%` }}
            title={t.common.dangerThreshold}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
          <span>
            {player.pointsRemaining > 0 ? (
              t.scoreboard.pointsLeft.replace(
                '{points}',
                String(player.pointsRemaining)
              )
            ) : (
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                {t.scoreboard.limitReached}
              </span>
            )}
          </span>
          <span className="font-semibold">{player.progressPct}%</span>
        </div>
      </div>
    </article>
  );
};
