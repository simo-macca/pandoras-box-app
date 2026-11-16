import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Language, Player } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { getPlayerColorTheme } from '@/utils/colors';

interface ActivePlayerBannerProps {
  player: Player;
  totalPoints: number;
  onReset: () => void;
  language: Language;
}

/** Name, colour and live total of the player whose hand is being entered. */
export const ActivePlayerBanner: React.FC<ActivePlayerBannerProps> = ({
  player,
  totalPoints,
  onReset,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const colorTheme = getPlayerColorTheme(player.color);

  return (
    <div className="card-muted flex items-center justify-between gap-3 p-3 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorTheme.avatarBg}`}
        >
          {player.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate text-base font-semibold text-neutral-900 dark:text-white">
            {player.name}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition-colors hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400"
            title={t.scoring.quickZero}
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t.scoring.quickZero}</span>
          </button>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="eyebrow text-[10px]">{t.scoring.playerTotal}</div>
        <div className="score-number text-3xl leading-tight text-amber-600 dark:text-amber-400">
          {totalPoints}{' '}
          <span className="text-xs font-medium text-neutral-400">
            {t.scoreboard.pts}
          </span>
        </div>
      </div>
    </div>
  );
};
