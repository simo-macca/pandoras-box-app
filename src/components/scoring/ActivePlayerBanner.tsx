import React from 'react';
import { RefreshCw } from 'lucide-react';
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
    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-3 sm:p-3.5 dark:border-neutral-700/80 dark:bg-neutral-800/60">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-sm sm:h-10 sm:w-10 sm:text-base"
          style={{ backgroundColor: colorTheme.hex }}
        >
          {player.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 truncate text-sm font-black text-neutral-900 sm:text-base dark:text-white">
          {player.name}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 rounded-lg p-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-white"
          title={t.scoring.quickZero}
        >
          <RefreshCw className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">{t.scoring.quickZero}</span>
        </button>

        <div className="text-right">
          <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
            {t.scoring.playerTotal}
          </div>
          <div className="text-xl font-black whitespace-nowrap text-amber-500 tabular-nums sm:text-2xl">
            {totalPoints}{' '}
            <span className="text-xs font-semibold text-neutral-400">pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
