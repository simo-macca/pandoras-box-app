import React from 'react';
import { Crown, Flag, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PlayerStats } from '@/utils/stats';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { HelpTooltip } from '@/components/common/HelpTooltip';

interface StatsOverviewCardsProps {
  playerStats: PlayerStats[];
  targetScore: number;
  language: Language;
}

interface StatTileProps {
  label: React.ReactNode;
  icon: React.ReactNode;
  iconClassName: string;
  children: React.ReactNode;
}

const StatTile: React.FC<StatTileProps> = ({
  label,
  icon,
  iconClassName,
  children,
}) => (
  <div className="flex min-w-0 items-center gap-3 p-3 sm:p-5">
    <div className={`icon-tile hidden sm:flex ${iconClassName}`}>{icon}</div>
    <div className="min-w-0 flex-1">
      <div className="eyebrow flex items-center gap-1 text-[10px] sm:text-[11px]">
        {label}
      </div>
      <div className="mt-0.5 truncate text-sm font-bold text-neutral-900 sm:text-lg dark:text-white">
        {children}
      </div>
    </div>
  </div>
);

/** Match summary strip: leader, point limit and danger zone. */
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
    <div className="card grid grid-cols-3 divide-x divide-neutral-200/80 dark:divide-white/[0.06]">
      <StatTile
        label={t.scoreboard.currentLeader}
        icon={<Crown className="h-5 w-5" />}
        iconClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
      >
        <span className="truncate">{leader?.name || '—'}</span>{' '}
        {leader && (
          <span className="hidden text-sm font-semibold text-neutral-500 tabular-nums sm:inline dark:text-neutral-400">
            · {leader.totalScore} {t.scoreboard.pts}
          </span>
        )}
      </StatTile>

      <StatTile
        label={
          <>
            {t.scoreboard.eliminationLimit}
            <HelpTooltip
              title={t.scoreboard.limitHelpTitle}
              content={t.scoreboard.limitHelpDesc}
              align="left"
            />
          </>
        }
        icon={<Flag className="h-5 w-5" />}
        iconClassName="bg-blue-500/15 text-blue-600 dark:text-blue-400"
      >
        <span className="tabular-nums">
          {targetScore} {t.scoreboard.pts}
        </span>
      </StatTile>

      <StatTile
        label={
          <>
            {t.scoreboard.dangerZone}
            <HelpTooltip
              title={t.scoreboard.dangerHelpTitle}
              content={t.scoreboard.dangerHelpDesc}
              align="right"
            />
          </>
        }
        icon={
          playersInDanger.length > 0 ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )
        }
        iconClassName={
          playersInDanger.length > 0
            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
        }
      >
        {playersInDanger.length > 0 ? (
          <span className="text-rose-600 tabular-nums dark:text-rose-400">
            {playersInDanger.length} × {t.scoreboard.dangerZone}
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400">
            {t.common.allSafe}
          </span>
        )}
      </StatTile>
    </div>
  );
};
