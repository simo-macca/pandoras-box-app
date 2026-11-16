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
  label: string;
  /** Rendered after the label outside the truncated text (e.g. a HelpTooltip). */
  labelExtra?: React.ReactNode;
  icon: React.ReactNode;
  iconClassName: string;
  children: React.ReactNode;
  /** Extra classes (grid placement / borders) for the tile. */
  className?: string;
  /** Show the icon on phones too (used by the full-width danger tile). */
  alwaysShowIcon?: boolean;
}

const StatTile: React.FC<StatTileProps> = ({
  label,
  labelExtra,
  icon,
  iconClassName,
  children,
  className = '',
  alwaysShowIcon = false,
}) => (
  <div className={`flex min-w-0 items-center gap-3 p-3.5 sm:p-5 ${className}`}>
    <div
      className={`icon-tile ${alwaysShowIcon ? 'h-9 w-9 sm:h-10 sm:w-10' : 'hidden sm:flex'} ${iconClassName}`}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      {/* Only the text truncates: an overflow-hidden row would clip the tooltip. */}
      <div className="eyebrow flex min-w-0 items-center gap-1 text-[10px] sm:text-[11px]">
        <span className="truncate">{label}</span>
        {labelExtra}
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
    <div className="card grid grid-cols-2 sm:grid-cols-3">
      <StatTile
        label={t.scoreboard.currentLeader}
        icon={<Crown className="h-5 w-5" />}
        iconClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        className="border-r border-neutral-200/80 dark:border-white/[0.06]"
      >
        <span className="truncate">{leader?.name || '—'}</span>{' '}
        {leader && (
          <span className="hidden text-sm font-semibold text-neutral-500 tabular-nums sm:inline dark:text-neutral-400">
            · {leader.totalScore} {t.scoreboard.pts}
          </span>
        )}
      </StatTile>

      <StatTile
        label={t.scoreboard.eliminationLimit}
        labelExtra={
          <HelpTooltip
            title={t.scoreboard.limitHelpTitle}
            content={t.scoreboard.limitHelpDesc}
            align="right"
            placement="bottom"
          />
        }
        icon={<Flag className="h-5 w-5" />}
        iconClassName="bg-blue-500/15 text-blue-600 dark:text-blue-400"
        className="sm:border-r sm:border-neutral-200/80 sm:dark:border-white/[0.06]"
      >
        <span className="tabular-nums">
          {targetScore} {t.scoreboard.pts}
        </span>
      </StatTile>

      <StatTile
        label={t.scoreboard.dangerZone}
        labelExtra={
          <HelpTooltip
            title={t.scoreboard.dangerHelpTitle}
            content={t.scoreboard.dangerHelpDesc}
            align="right"
            placement="bottom"
          />
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
        alwaysShowIcon
        className={`col-span-2 rounded-b-(--radius-card) border-t border-neutral-200/80 sm:col-span-1 sm:rounded-l-none sm:rounded-r-(--radius-card) sm:border-t-0 dark:border-white/[0.06] ${
          playersInDanger.length > 0 ? 'bg-rose-500/[0.04]' : ''
        }`}
      >
        {playersInDanger.length > 0 ? (
          <span className="block truncate text-rose-600 dark:text-rose-400">
            <span className="tabular-nums">
              {t.common.playersInDanger.replace(
                '{count}',
                String(playersInDanger.length)
              )}
            </span>
            <span className="ml-1.5 text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
              {playersInDanger.map((p) => p.name).join(', ')}
            </span>
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
