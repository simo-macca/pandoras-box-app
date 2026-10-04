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
      className={`relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
        player.isLeader
          ? 'bg-gradient-to-br from-game-surface via-slate-800/90 to-amber-950/20 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40'
          : player.isEliminated
          ? 'bg-rose-950/20 border-rose-600/50 opacity-90'
          : player.isInDanger
          ? 'bg-game-surface border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
          : 'bg-game-surface border-game-border hover:border-slate-700'
      }`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
        style={{ backgroundColor: theme.hex }}
      />

      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${rankBadge.bg}`}
          >
            {player.isLeader ? (
              <Crown className="w-4 h-4 fill-current text-neutral-950" />
            ) : (
              <span>{rankBadge.label}</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-lg truncate">
                {player.name}
              </span>
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: theme.hex }}
              />
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              {player.isLeader && (
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                  <span>👑 {t.scoreboard.leading}</span>
                </span>
              )}
              {player.isInDanger && (
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>DANGER ({player.pointsRemaining} pts to loss)</span>
                </span>
              )}
              {player.isEliminated && (
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                  <Skull className="w-3.5 h-3.5" />
                  <span>EXCEEDED LIMIT ({player.totalScore}/{targetScore})</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="flex items-baseline justify-end gap-1">
            <span
              className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
                player.isLeader
                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : player.isEliminated
                  ? 'text-rose-400'
                  : 'text-slate-100'
              }`}
            >
              {player.totalScore}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              / {targetScore} {t.scoreboard.pts}
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            {player.pointsRemaining > 0 ? (
              <span>{player.pointsRemaining} pts safety buffer</span>
            ) : (
              <span className="text-rose-400 font-semibold">Limit reached!</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Proximity to Loss:</span>
          <span className="font-mono font-bold text-slate-300">
            {player.progressPct.toFixed(0)}%
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-700/60 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(player.progressPct)}`}
            style={{ width: `${player.progressPct}%` }}
          />

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500/50"
            style={{ left: `${Math.max(0, ((targetScore - 20) / targetScore) * 100)}%` }}
            title="Danger threshold (within 20 pts)"
          />
        </div>
      </div>
    </div>
  );
};
