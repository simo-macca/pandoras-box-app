import React from 'react';
import { Trophy, PlusCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
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
  language,
}) => {
  const t = TRANSLATIONS[language];
  const leader = playerStats[0];
  const playersInDanger = playerStats.filter(p => p.isInDanger || p.isEliminated);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-sm">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {t.scoreboard.currentLeader}
            </span>
            <div className="text-base sm:text-lg font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>{leader?.name || '—'}</span>
              <span className="text-amber-500 text-xs font-mono">({leader?.totalScore} pts)</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Trophy className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-sm">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {t.scoreboard.eliminationLimit}
              </span>
              <HelpTooltip
                title={t.scoreboard.limitHelpTitle}
                content={t.scoreboard.limitHelpDesc}
                align="left"
              />
            </div>
            <div className="text-base sm:text-lg font-black text-rose-500 font-mono">
              {targetScore} {t.scoreboard.pts}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-sm">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {t.scoreboard.dangerZone}
              </span>
              <HelpTooltip
                title={t.scoreboard.dangerHelpTitle}
                content={t.scoreboard.dangerHelpDesc}
                align="right"
              />
            </div>
            <div className="text-base sm:text-lg font-black text-neutral-800 dark:text-neutral-200">
              {playersInDanger.length > 0 ? (
                <span className="text-rose-500 font-bold">{playersInDanger.length} in Danger Zone</span>
              ) : (
                <span className="text-emerald-500 font-bold">All Safe</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
            {playersInDanger.length > 0 ? (
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            )}
          </div>
        </div>
      </div>

      {/* Main Leaderboard Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-neutral-900 dark:text-white flex items-center gap-2">
            <span>{t.scoreboard.title}</span>
            <span className="text-xs text-neutral-500 font-medium">
              (Lowest score is leading)
            </span>
          </h2>

          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onOpenScoreModal();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-neutral-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{t.tabs.logRound}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {playerStats.map(player => (
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
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
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
