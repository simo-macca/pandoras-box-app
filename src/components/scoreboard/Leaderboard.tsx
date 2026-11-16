import React from 'react';
import {
  Trophy,
  Plus,
  RotateCcw,
  ArrowLeftRight,
  Swords,
  Flag,
} from 'lucide-react';
import { PlayerStats } from '@/utils/stats';
import { RoundEntry, Player, Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { PlayerCard } from './PlayerCard';
import { RoundHistoryTable } from './RoundHistoryTable';
import { StatsOverviewCards } from './StatsOverviewCards';
import { ActiveRuleCardBanner } from '@/components/rule-cards/ActiveRuleCardBanner';
import { soundEffects } from '@/utils/sound';

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

  const showGameOver = isGameOver && !isContinued;

  return (
    <div className="space-y-6 sm:space-y-8">
      {onOpenRuleCardDrawer && (
        <ActiveRuleCardBanner
          activeRuleCardIds={activeRuleCardIds}
          onClearActive={onClearActiveRuleCard || (() => {})}
          onOpenDrawer={onOpenRuleCardDrawer}
          language={language}
        />
      )}

      <StatsOverviewCards
        playerStats={playerStats}
        targetScore={targetScore}
        language={language}
      />

      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h2 className="section-title">{t.scoreboard.title}</h2>
            <p className="section-subtitle">{t.scoreboard.lowestScoreLeads}</p>
          </div>

          {/* Primary action first (full width on phones), then match events. */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center lg:flex-nowrap">
            <button
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onOpenScoreModal();
              }}
              className="btn btn-primary col-span-2 h-11 sm:order-last"
              title={showGameOver ? t.gameOver.title : t.tabs.logRound}
            >
              {showGameOver ? (
                <Trophy className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4 stroke-[2.5]" />
              )}
              <span>{showGameOver ? t.gameOver.title : t.tabs.logRound}</span>
            </button>

            {onApplyIdentityTheft && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onApplyIdentityTheft();
                }}
                disabled={!canApplyIdentityTheft}
                className="btn btn-indigo-soft min-w-0 shrink"
                title={
                  canApplyIdentityTheft
                    ? t.events.identityTheftDesc
                    : t.events.identicalScoresWarning
                }
              >
                <ArrowLeftRight className="h-4 w-4" />
                <span className="truncate">{t.events.identityTheft}</span>
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
                className="btn btn-danger-soft min-w-0 shrink"
                title={t.events.seppukuDesc}
              >
                <Swords className="h-4 w-4" />
                <span className="truncate">{t.events.seppuku}</span>
              </button>
            )}

            {isContinued && onConcludeGame && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onConcludeGame();
                }}
                className="btn btn-amber-soft min-w-0 shrink"
                title={t.gameOver.concludeMatch}
              >
                <Flag className="h-4 w-4" />
                <span className="truncate">{t.gameOver.concludeMatch}</span>
              </button>
            )}

            {onStartNewGame && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onStartNewGame();
                }}
                className={`btn btn-secondary min-w-0 shrink ${
                  isContinued && onConcludeGame ? '' : 'col-span-2'
                }`}
                title={t.nav.newGame}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="truncate">{t.nav.newGame}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {playerStats.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              targetScore={targetScore}
              language={language}
            />
          ))}
        </div>
      </section>

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
  );
};
