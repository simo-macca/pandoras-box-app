import React from 'react';
import { Crown, AlertTriangle, Skull } from 'lucide-react';
import { PlayerStats } from '../../hooks/useGameState';
import { PAWN_COLORS } from '../../utils/colors';
import { Language } from '../../types/game';
import { UI_TRANSLATIONS } from '../../data/translations';

interface PlayerCardProps {
  player: PlayerStats;
  targetScore: number;
  language: Language;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  targetScore,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];
  const theme = PAWN_COLORS[player.color];

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-amber-400 text-neutral-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.5)]',
          label: '1st',
        };
      case 2:
        return {
          bg: 'bg-slate-200 text-neutral-900 font-bold dark:bg-slate-300 dark:text-neutral-950',
          label: '2nd',
        };
      case 3:
        return {
          bg: 'bg-amber-700/80 text-amber-100 font-bold',
          label: '3rd',
        };
      default:
        return {
          bg: 'bg-neutral-100 text-neutral-600 font-medium dark:bg-slate-800 dark:text-slate-400',
          label: `${rank}th`,
        };
    }
  };

  const rankBadge = getRankBadge(player.rank);

  const getProgressColor = (pct: number) => {
    if (pct >= 100) return 'bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.8)]';
    if (pct >= 80) return 'bg-rose-500';
    if (pct >= 55) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-3 transition-all duration-300 sm:p-4 ${
        player.isLeader
          ? 'border-amber-500/60 bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white shadow-sm ring-1 ring-amber-500/40 dark:from-neutral-900 dark:via-neutral-800/90 dark:to-amber-950/20 dark:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
          : player.isEliminated
            ? 'border-rose-300 bg-rose-50/80 opacity-90 dark:border-rose-600/50 dark:bg-rose-950/20'
            : player.isInDanger
              ? 'border-rose-300 bg-rose-50/30 shadow-sm dark:border-rose-500/40 dark:bg-neutral-900 dark:shadow-[0_0_15px_rgba(244,63,94,0.1)]'
              : 'border-neutral-200 bg-white shadow-sm hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700'
      }`}
    >
      <div
        className="absolute top-0 right-0 left-0 h-1.5 opacity-90"
        style={{ backgroundColor: theme.hex }}
      />

      <div className="flex items-start justify-between gap-2 pt-1 sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs ${rankBadge.bg}`}
          >
            {player.isLeader ? (
              <Crown className="h-4 w-4 shrink-0 fill-current text-neutral-950" />
            ) : (
              <span className="font-bold tabular-nums">{rankBadge.label}</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="truncate text-sm font-bold text-neutral-900 sm:text-base md:text-lg dark:text-white">
                {player.name}
              </span>
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {player.isLeader && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 dark:text-amber-400">
                  <Crown className="h-3 w-3 shrink-0" />
                  <span className="truncate">{t.scoreboard.leading}</span>
                </span>
              )}
              {player.isInDanger && (
                <span className="flex animate-pulse items-center gap-1 text-[11px] font-bold text-rose-500 dark:text-rose-400">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap tabular-nums">
                    DANGER ({player.pointsRemaining} pts to loss)
                  </span>
                </span>
              )}
              {player.isEliminated && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-500 dark:text-rose-400">
                  <Skull className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap tabular-nums">
                    EXCEEDED LIMIT ({player.totalScore}/{targetScore})
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="flex items-baseline justify-end gap-1">
            <span
              className={`font-mono text-xl font-black tracking-tight whitespace-nowrap tabular-nums sm:text-2xl md:text-3xl ${
                player.isLeader
                  ? 'text-amber-500 drop-shadow-xs dark:text-amber-400 dark:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : player.isEliminated
                    ? 'text-rose-500 dark:text-rose-400'
                    : 'text-neutral-900 dark:text-slate-100'
              }`}
            >
              {player.totalScore}
            </span>
            <span className="text-xs font-semibold whitespace-nowrap text-neutral-500 tabular-nums dark:text-slate-400">
              / {targetScore} {t.scoreboard.pts}
            </span>
          </div>

          <div className="text-[11px] whitespace-nowrap text-neutral-500 tabular-nums dark:text-slate-400">
            {player.pointsRemaining > 0 ? (
              <span>{player.pointsRemaining} pts safety buffer</span>
            ) : (
              <span className="font-semibold text-rose-500 dark:text-rose-400">
                Limit reached!
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-slate-400">
          <span>Proximity to Loss:</span>
          <span className="font-mono font-bold whitespace-nowrap text-neutral-700 tabular-nums dark:text-slate-300">
            {player.progressPct.toFixed(0)}%
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-slate-700/60 dark:bg-slate-900">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(player.progressPct)}`}
            style={{
              width: `${Math.max(0, Math.min(100, player.progressPct))}%`,
            }}
          />

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500/50"
            style={{
              left: `${Math.max(0, ((targetScore - 20) / targetScore) * 100)}%`,
            }}
            title="Danger threshold (within 20 pts)"
          />
        </div>
      </div>
    </div>
  );
};
