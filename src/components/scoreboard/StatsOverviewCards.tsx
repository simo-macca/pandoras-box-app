import React from 'react';
import { Trophy, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PlayerStats } from '../../utils/stats';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { HelpTooltip } from '../common/HelpTooltip';

interface StatsOverviewCardsProps {
  playerStats: PlayerStats[];
  targetScore: number;
  language: Language;
}

export const StatsOverviewCards: React.FC<StatsOverviewCardsProps> = ({
  playerStats,
  targetScore,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const leader = playerStats[0];
  const playersInDanger = playerStats.filter(
    (p) => p.isInDanger || p.isEliminated
  );

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
      {/* Current Leader */}
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="min-w-0 space-y-0.5">
          <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
            {t.scoreboard.currentLeader}
          </span>
          <div className="flex items-center gap-1.5 truncate text-base font-black text-neutral-900 sm:text-lg dark:text-white">
            <span className="truncate">{leader?.name || '—'}</span>
            <span className="font-mono text-xs font-bold whitespace-nowrap text-amber-500 tabular-nums">
              ({leader?.totalScore} pts)
            </span>
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 sm:h-10 sm:w-10">
          <Trophy className="h-5 w-5 shrink-0 stroke-[2.2]" />
        </div>
      </div>

      {/* Target Score / Elimination Limit */}
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
              {t.scoreboard.eliminationLimit}
            </span>
            <HelpTooltip
              title={t.scoreboard.limitHelpTitle}
              content={t.scoreboard.limitHelpDesc}
              align="left"
            />
          </div>
          <div className="font-mono text-base font-black whitespace-nowrap text-rose-500 tabular-nums sm:text-lg">
            {targetScore} {t.scoreboard.pts}
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-500 sm:h-10 sm:w-10">
          <AlertTriangle className="h-5 w-5 shrink-0 stroke-[2.2]" />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
              {t.scoreboard.dangerZone}
            </span>
            <HelpTooltip
              title={t.scoreboard.dangerHelpTitle}
              content={t.scoreboard.dangerHelpDesc}
              align="right"
            />
          </div>
          <div className="text-base font-black text-neutral-800 sm:text-lg dark:text-neutral-200">
            {playersInDanger.length > 0 ? (
              <span className="font-bold whitespace-nowrap text-rose-500 tabular-nums">
                {playersInDanger.length} in Danger Zone
              </span>
            ) : (
              <span className="font-bold text-emerald-500">All Safe</span>
            )}
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-400 sm:h-10 sm:w-10 dark:border-neutral-700 dark:bg-neutral-800">
          {playersInDanger.length > 0 ? (
            <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
          ) : (
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
          )}
        </div>
      </div>
    </div>
  );
};
