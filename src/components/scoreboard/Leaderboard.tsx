import React from 'react';
import {
  Trophy,
  PlusCircle,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { PlayerStats } from '../../hooks/useGameState';
import { RoundEntry, Player, Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { PlayerCard } from './PlayerCard';
import { RoundHistoryTable } from './RoundHistoryTable';
import { ActiveRuleCardBanner } from '../rulecards/ActiveRuleCardBanner';
import { HelpTooltip } from '../common/HelpTooltip';
import { soundEffects } from '../../utils/sound';

interface LeaderboardProps {
  playerStats: PlayerStats[];
  targetScore: number;
  rounds: RoundEntry[];
  players: Player[];
  activeRuleCardIds?: string[];
  onOpenScoreModal: () => void;
  onUndoLastRound: () => void;
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number) => void;
  onClearActiveRuleCard?: () => void;
  onOpenRuleCardDrawer?: () => void;
  onStartNewGame?: () => void;
  language: Language;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  playerStats,
  targetScore,
  rounds,
  players,
  activeRuleCardIds = [],
  onOpenScoreModal,
  onUndoLastRound,
  onEditRound,
  onDeleteRound,
  onClearActiveRuleCard,
  onOpenRuleCardDrawer,
  onStartNewGame,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const leader = playerStats[0];
  const playersInDanger = playerStats.filter(
    (p) => p.isInDanger || p.isEliminated
  );

  return (
    <div className="space-y-4 pb-20 sm:space-y-6 md:pb-6">
      {/* Active Rule Card Banner */}
      {onOpenRuleCardDrawer && (
        <ActiveRuleCardBanner
          activeRuleCardIds={activeRuleCardIds}
          onClearActive={onClearActiveRuleCard || (() => {})}
          onOpenDrawer={onOpenRuleCardDrawer}
          language={language}
        />
      )}

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
          <div className="min-w-0 space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {t.scoreboard.currentLeader}
            </span>
            <div className="flex items-center gap-1.5 truncate text-base font-black text-neutral-900 dark:text-white sm:text-lg">
              <span className="truncate">{leader?.name || '—'}</span>
              <span className="whitespace-nowrap font-mono text-xs font-bold tabular-nums text-amber-500">
                ({leader?.totalScore} pts)
              </span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-500 sm:h-10 sm:w-10">
            <Trophy className="h-5 w-5 shrink-0 stroke-[2.2]" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.scoreboard.eliminationLimit}
              </span>
              <HelpTooltip
                title={t.scoreboard.limitHelpTitle}
                content={t.scoreboard.limitHelpDesc}
                align="left"
              />
            </div>
            <div className="whitespace-nowrap font-mono text-base font-black tabular-nums text-rose-500 sm:text-lg">
              {targetScore} {t.scoreboard.pts}
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-500 sm:h-10 sm:w-10">
            <AlertTriangle className="h-5 w-5 shrink-0 stroke-[2.2]" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                {t.scoreboard.dangerZone}
              </span>
              <HelpTooltip
                title={t.scoreboard.dangerHelpTitle}
                content={t.scoreboard.dangerHelpDesc}
                align="right"
              />
            </div>
            <div className="text-base font-black text-neutral-800 dark:text-neutral-200 sm:text-lg">
              {playersInDanger.length > 0 ? (
                <span className="whitespace-nowrap font-bold tabular-nums text-rose-500">
                  {playersInDanger.length} in Danger Zone
                </span>
              ) : (
                <span className="font-bold text-emerald-500">All Safe</span>
              )}
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 sm:h-10 sm:w-10">
            {playersInDanger.length > 0 ? (
              <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
            ) : (
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
            )}
          </div>
        </div>
      </div>

      {/* Main Leaderboard Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex min-w-0 items-center gap-1.5 text-base font-black text-neutral-900 dark:text-white sm:gap-2 sm:text-lg md:text-xl">
            <span className="truncate">{t.scoreboard.title}</span>
            <span className="hidden text-xs font-medium text-neutral-500 sm:inline">
              (Lowest score is leading)
            </span>
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            {onStartNewGame && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onStartNewGame();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 sm:gap-2 sm:px-3"
                title={t.nav.newGame}
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
                <span className="whitespace-nowrap">{t.nav.newGame}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenScoreModal();
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-black text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 active:scale-95 sm:gap-2 sm:px-3.5"
            >
              <PlusCircle className="h-4 w-4 shrink-0 stroke-[2.5]" />
              <span className="whitespace-nowrap">{t.tabs.logRound}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2">
          {playerStats.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              targetScore={targetScore}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* Round History */}
      <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <RoundHistoryTable
          rounds={rounds}
          players={players}
          onUndoLastRound={onUndoLastRound}
          onEditRound={onEditRound}
          onDeleteRound={onDeleteRound}
          language={language}
        />
      </div>
    </div>
  );
};
