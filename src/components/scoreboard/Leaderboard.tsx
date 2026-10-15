import React from 'react';
import { Trophy, PlusCircle, RotateCcw, UserCheck, Swords } from 'lucide-react';
import { PlayerStats } from '../../utils/stats';
import { RoundEntry, Player, Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { PlayerCard } from './PlayerCard';
import { RoundHistoryTable } from './RoundHistoryTable';
import { StatsOverviewCards } from './StatsOverviewCards';
import { ActiveRuleCardBanner } from '../rulecards/ActiveRuleCardBanner';
import { soundEffects } from '../../utils/sound';

interface LeaderboardProps {
  playerStats: PlayerStats[];
  targetScore: number;
  rounds: RoundEntry[];
  players: Player[];
  activeRuleCardIds?: string[];
  isGameOver?: boolean;
  isContinued?: boolean;
  onOpenScoreModal: () => void;
  onUndoLastRound: () => void;
  onEditRound?: (roundNumber: number) => void;
  onDeleteRound?: (roundNumber: number, entryId?: string) => void;
  onClearActiveRuleCard?: () => void;
  onOpenRuleCardDrawer?: () => void;
  onStartNewGame?: () => void;
  onConcludeGame?: () => void;
  onApplyIdentityTheft?: () => void;
  canApplyIdentityTheft?: boolean;
  onOpenSeppuku?: () => void;
  onEditSeppuku?: (roundId: string) => void;
  language: Language;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  playerStats,
  targetScore,
  rounds,
  players,
  activeRuleCardIds = [],
  isGameOver = false,
  isContinued = false,
  onOpenScoreModal,
  onUndoLastRound,
  onEditRound,
  onDeleteRound,
  onClearActiveRuleCard,
  onOpenRuleCardDrawer,
  onStartNewGame,
  onConcludeGame,
  onApplyIdentityTheft,
  canApplyIdentityTheft = false,
  onOpenSeppuku,
  onEditSeppuku,
  language,
}) => {
  const t = TRANSLATIONS[language];

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
      <StatsOverviewCards
        playerStats={playerStats}
        targetScore={targetScore}
        language={language}
      />

      {/* Main Leaderboard Cards */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex min-w-0 items-center gap-1.5 text-base font-black text-neutral-900 sm:gap-2 sm:text-lg md:text-xl dark:text-white">
            <span className="truncate">{t.scoreboard.title}</span>
            <span className="hidden text-xs font-medium text-neutral-500 sm:inline">
              (Lowest score is leading)
            </span>
          </h2>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {onApplyIdentityTheft && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onApplyIdentityTheft();
                }}
                disabled={!canApplyIdentityTheft}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-bold text-indigo-700 shadow-sm transition-all hover:bg-indigo-500/20 active:scale-95 disabled:pointer-events-none disabled:opacity-40 sm:gap-2 sm:px-3 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                title={
                  canApplyIdentityTheft
                    ? t.events?.identityTheftDesc ||
                      'Identity Theft: Swap points between highest and lowest score players'
                    : t.events?.identicalScoresWarning ||
                      'Cannot swap: all scores are currently identical'
                }
              >
                <UserCheck className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
                <span className="whitespace-nowrap">
                  {t.events?.identityTheft || 'Identity Theft'}
                </span>
              </button>
            )}

            {onOpenSeppuku && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onOpenSeppuku();
                }}
                disabled={players.length === 0}
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-700 shadow-sm transition-all hover:bg-rose-500/20 active:scale-95 disabled:pointer-events-none disabled:opacity-40 sm:gap-2 sm:px-3 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50"
                title={
                  t.events?.seppukuDesc ||
                  'Seppuku T: Flip top card (-21 number / +42 non-number) or refuse (+21)'
                }
              >
                <Swords className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
                <span className="whitespace-nowrap">
                  {t.events?.seppuku || 'Seppuku T'}
                </span>
              </button>
            )}

            {onStartNewGame && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onStartNewGame();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-bold text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 sm:gap-2 sm:px-3 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                title={t.nav.newGame}
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
                <span className="whitespace-nowrap">{t.nav.newGame}</span>
              </button>
            )}

            {isContinued && onConcludeGame && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onConcludeGame();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/50 bg-amber-500/10 px-2.5 py-1.5 text-xs font-bold text-amber-600 shadow-sm transition-all hover:bg-amber-500/20 hover:text-amber-700 sm:gap-2 sm:px-3 dark:text-amber-400 dark:hover:text-amber-300"
                title={t.gameOver.concludeMatch}
              >
                <Trophy className="h-3.5 w-3.5 shrink-0 stroke-[2.2]" />
                <span className="whitespace-nowrap">
                  {t.gameOver.concludeMatch}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenScoreModal();
              }}
              className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-black text-neutral-950 shadow-md ring-1 shadow-amber-500/25 ring-amber-400/40 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-amber-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/40 hover:ring-amber-300 active:translate-y-0 active:scale-95 sm:gap-2 sm:px-3.5"
              title={
                isGameOver && !isContinued ? t.gameOver.title : t.tabs.logRound
              }
            >
              {isGameOver && !isContinued ? (
                <>
                  <Trophy className="h-4 w-4 shrink-0 stroke-[2.2]" />
                  <span className="whitespace-nowrap">{t.gameOver.title}</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 shrink-0 stroke-[2.5] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-90" />
                  <span className="whitespace-nowrap">{t.tabs.logRound}</span>
                </>
              )}
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
          onEditSeppuku={onEditSeppuku}
          language={language}
        />
      </div>
    </div>
  );
};
