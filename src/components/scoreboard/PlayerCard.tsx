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
          bg: 'bg-slate-300 text-neutral-950 font-bold',
          label: '2nd',
        };
      case 3:
        return {
          bg: 'bg-amber-700/80 text-amber-100 font-bold',
          label: '3rd',
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-400 font-medium',
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
          ? 'border-amber-500/60 bg-gradient-to-br from-game-surface via-slate-800/90 to-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40'
          : player.isEliminated
            ? 'border-rose-600/50 bg-rose-950/20 opacity-90'
            : player.isInDanger
              ? 'border-rose-500/40 bg-game-surface shadow-[0_0_15px_rgba(244,63,94,0.1)]'
              : 'border-game-border bg-game-surface hover:border-slate-700'
      }`}
    >
      <div
        className="absolute left-0 right-0 top-0 h-1.5 opacity-90"
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
              <span className="truncate text-sm font-bold text-white sm:text-base md:text-lg">
                {player.name}
              </span>
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm"
                style={{ backgroundColor: theme.hex }}
              />
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {player.isLeader && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                  <span className="shrink-0">👑</span>
                  <span className="truncate">{t.scoreboard.leading}</span>
                </span>
              )}
              {player.isInDanger && (
                <span className="flex animate-pulse items-center gap-1 text-[11px] font-bold text-rose-400">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap tabular-nums">
                    DANGER ({player.pointsRemaining} pts to loss)
                  </span>
                </span>
              )}
              {player.isEliminated && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400">
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
              className={`whitespace-nowrap font-mono text-xl font-black tabular-nums tracking-tight sm:text-2xl md:text-3xl ${
                player.isLeader
                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : player.isEliminated
                    ? 'text-rose-400'
                    : 'text-slate-100'
              }`}
            >
              {player.totalScore}
            </span>
            <span className="whitespace-nowrap text-xs font-semibold tabular-nums text-slate-400">
              / {targetScore} {t.scoreboard.pts}
            </span>
          </div>

          <div className="whitespace-nowrap text-[11px] tabular-nums text-slate-400">
            {player.pointsRemaining > 0 ? (
              <span>{player.pointsRemaining} pts safety buffer</span>
            ) : (
              <span className="font-semibold text-rose-400">
                Limit reached!
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
          <span>Proximity to Loss:</span>
          <span className="whitespace-nowrap font-mono font-bold tabular-nums text-slate-300">
            {player.progressPct.toFixed(0)}%
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full border border-slate-700/60 bg-slate-900">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(player.progressPct)}`}
            style={{ width: `${player.progressPct}%` }}
          />

          <div
            className="absolute bottom-0 top-0 w-0.5 bg-rose-500/50"
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
