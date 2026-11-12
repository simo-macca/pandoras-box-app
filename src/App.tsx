import { useState, lazy, Suspense } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useTheme } from '@/hooks/useTheme';
import { useUndoToast } from '@/hooks/useUndoToast';
import { useAppModals } from '@/hooks/useAppModals';
import { TRANSLATIONS } from '@/data/translations';
import { Navbar } from '@/components/layout/Navbar';
import { TabNavigation, ActiveTab } from '@/components/layout/TabNavigation';
import { Footer } from '@/components/layout/Footer';
import { Leaderboard } from '@/components/scoreboard/Leaderboard';
import { GameOverModal } from '@/components/scoreboard/GameOverModal';
import { HandCalculatorModal } from '@/components/scoring/HandCalculatorModal';
import { GameSetupModal } from '@/components/setup/GameSetupModal';
import { SettingsModal } from '@/components/layout/SettingsModal';
import { SeppukuModal } from '@/components/events/SeppukuModal';
import { AppToaster } from '@/components/layout/AppToaster';
import {
  GameConfig,
  GameState,
  HandScore,
  Player,
  SeppukuOutcome,
} from '@/types/game';
import { countPlayedRounds } from '@/utils/stats';
import { getSeppukuChoices } from '@/utils/events';

// Secondary tabs are loaded on demand to keep the initial bundle small.
// The service worker precaches these chunks, so they still work offline.
const RuleCardDrawer = lazy(() =>
  import('@/components/rule-cards/RuleCardDrawer').then((m) => ({
    default: m.RuleCardDrawer,
  }))
);
const CardDictionary = lazy(() =>
  import('@/components/card-dictionary/CardDictionary').then((m) => ({
    default: m.CardDictionary,
  }))
);

const TabFallback = () => (
  <div
    aria-busy="true"
    className="mx-auto h-64 w-full max-w-3xl animate-pulse rounded-3xl bg-neutral-200/60 dark:bg-neutral-800/60"
  />
);

export function App() {
  const {
    gameState,
    playerStats,
    winner,
    language,
    setLanguage,
    addRound,
    editRound,
    deleteRound,
    undoLastRound,
    applyIdentityTheft,
    canApplyIdentityTheft,
    applySeppuku,
    setActiveRuleCardIds,
    startNewGame,
    updateGameSetup,
    restoreGameState,
    resetCurrentGame,
    continueGame,
    concludeGame,
    resetAllData,
    exportGameState,
    importGameState,
  } = useGameState();

  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('scoreboard');

  const {
    isScoreModalOpen,
    editingRoundNumber,
    isSetupModalOpen,
    isSettingsModalOpen,
    isSeppukuModalOpen,
    editingSeppukuRoundId,
    settingsInitialTab,
    isGameOverModalDismissed,
    setIsGameOverModalDismissed,
    openScoreModal,
    openEditRound,
    closeScoreModal,
    openSettings,
    closeSettings,
    openSetup,
    closeSetup,
    openSeppukuModal,
    closeSeppukuModal,
  } = useAppModals();

  const { showUndoToast } = useUndoToast({
    language,
    onRestoreState: restoreGameState,
    onAfterUndo: (restoredState) => {
      if (restoredState.isGameOver && !restoredState.isContinued) {
        setIsGameOverModalDismissed(false);
      }
    },
  });

  const t = TRANSLATIONS[language];

  /** Runs a state change and offers to undo it from a toast. */
  const withUndo = (message: string, action: () => void) => {
    const snapshot: GameState = structuredClone(gameState);
    action();
    showUndoToast(message, snapshot);
  };

  const handleOpenScoreModal = () => {
    openScoreModal(gameState.isGameOver, !!gameState.isContinued);
  };

  const handleContinueGame = () => {
    continueGame();
    setIsGameOverModalDismissed(true);
  };

  const handleConcludeGame = () => {
    concludeGame();
    setIsGameOverModalDismissed(false);
  };

  const handleSubmitScores = (scores: Record<string, HandScore>) => {
    if (editingRoundNumber !== null) {
      withUndo(t.scoring.roundModifiedSuccess, () =>
        editRound(editingRoundNumber, scores)
      );
    } else {
      withUndo(t.scoring.roundAddedSuccess, () => addRound(scores));
    }
    closeScoreModal();
  };

  const handleDeleteRound = (roundNumber: number, entryId?: string) => {
    withUndo(t.scoring.roundDeletedSuccess, () =>
      deleteRound(roundNumber, entryId)
    );
  };

  const handleApplyIdentityTheft = () => {
    const snapshot: GameState = structuredClone(gameState);
    const pair = applyIdentityTheft();
    if (pair) {
      showUndoToast(
        t.events.identityTheftSuccess
          .replace('{lowPlayer}', pair.low.name)
          .replace('{highPlayer}', pair.high.name),
        snapshot
      );
    }
  };

  const handleApplySeppuku = (
    choices: Record<string, SeppukuOutcome>,
    existingRoundId?: string
  ) => {
    const snapshot: GameState = structuredClone(gameState);
    if (applySeppuku(choices, existingRoundId)) {
      showUndoToast(
        existingRoundId
          ? t.events.seppukuUpdatedSuccess
          : t.events.seppukuSuccess,
        snapshot
      );
    }
  };

  const handleUndoLastRound = () => {
    if (gameState.rounds.length === 0) return;
    withUndo(t.scoring.roundDeletedSuccess, undoLastRound);
  };

  const handleSaveSetup = (
    newPlayers: Player[],
    newConfig: GameConfig,
    isResetRounds: boolean
  ) => {
    if (isResetRounds) {
      withUndo(t.setup.confirmResetTitle, () => {
        startNewGame(newPlayers, newConfig);
        setIsGameOverModalDismissed(false);
      });
    } else {
      withUndo(t.setup.setupUpdatedSuccess, () =>
        updateGameSetup(newPlayers, newConfig)
      );
    }
  };

  const handleResetData = () => {
    withUndo(t.settings.resetDataSuccess, () => {
      resetAllData();
      closeScoreModal();
      setIsGameOverModalDismissed(false);
    });
  };

  const playedRoundsCount = countPlayedRounds(gameState.rounds);

  const editingRound =
    editingRoundNumber !== null
      ? gameState.rounds.find(
          (r) => !r.isEvent && r.roundNumber === editingRoundNumber
        )
      : undefined;

  const editingSeppukuChoices = getSeppukuChoices(
    editingSeppukuRoundId
      ? gameState.rounds.find((r) => r.id === editingSeppukuRoundId)
      : undefined
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-neutral-100 font-sans text-neutral-900 transition-colors selection:bg-amber-500 selection:text-black dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Navigation */}
      <Navbar
        language={language}
        theme={theme}
        onThemeChange={setTheme}
        roundsCount={playedRoundsCount}
        targetScore={gameState.config.targetScore}
        roundLimit={gameState.config.roundLimit}
        onOpenSetup={openSetup}
        onOpenSettings={() => openSettings('settings')}
      />

      {/* Main Tab Bar */}
      <TabNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Main View Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 pb-24 sm:px-6 sm:py-6 md:pb-6">
        {activeTab === 'scoreboard' && (
          <Leaderboard
            playerStats={playerStats}
            targetScore={gameState.config.targetScore}
            rounds={gameState.rounds}
            players={gameState.players}
            activeRuleCardIds={gameState.activeRuleCardIds}
            isGameOver={gameState.isGameOver}
            isContinued={gameState.isContinued}
            onOpenScoreModal={handleOpenScoreModal}
            onUndoLastRound={handleUndoLastRound}
            onEditRound={openEditRound}
            onDeleteRound={handleDeleteRound}
            onClearActiveRuleCard={() => setActiveRuleCardIds([])}
            onOpenRuleCardDrawer={() => setActiveTab('rulecards')}
            onStartNewGame={openSetup}
            onConcludeGame={handleConcludeGame}
            onApplyIdentityTheft={handleApplyIdentityTheft}
            canApplyIdentityTheft={canApplyIdentityTheft}
            onOpenSeppuku={() => openSeppukuModal()}
            onEditSeppuku={(roundId) => openSeppukuModal(roundId)}
            language={language}
          />
        )}

        <Suspense fallback={<TabFallback />}>
          {activeTab === 'rulecards' && (
            <RuleCardDrawer
              activeRuleCardIds={gameState.activeRuleCardIds || []}
              onChangeActiveRuleCards={setActiveRuleCardIds}
              language={language}
            />
          )}

          {activeTab === 'rules' && <CardDictionary language={language} />}
        </Suspense>
      </main>

      {/* Subtle Bottom Footer */}
      <Footer
        language={language}
        onOpenDisclaimer={() => openSettings('legal')}
      />

      {/* End-of-Round Card Hand Scoring Modal */}
      <HandCalculatorModal
        isOpen={isScoreModalOpen}
        onClose={closeScoreModal}
        players={gameState.players}
        playerStats={playerStats}
        onSubmitRound={handleSubmitScores}
        language={language}
        roundNumber={editingRoundNumber ?? playedRoundsCount + 1}
        initialScores={editingRound?.scores}
        isEditing={editingRoundNumber !== null}
        activeRuleCardIds={
          editingRound
            ? (editingRound.activeRuleCardIds ?? [])
            : (gameState.activeRuleCardIds ?? [])
        }
      />

      {/* Match Setup Modal */}
      <GameSetupModal
        isOpen={isSetupModalOpen}
        onClose={closeSetup}
        currentPlayers={gameState.players}
        currentConfig={gameState.config}
        isMatchInProgress={playedRoundsCount > 0}
        onSaveAndStart={handleSaveSetup}
        language={language}
      />

      {/* Seppuku Event Modal */}
      <SeppukuModal
        isOpen={isSeppukuModalOpen}
        onClose={closeSeppukuModal}
        players={gameState.players}
        onApplySeppuku={handleApplySeppuku}
        language={language}
        editingRoundId={editingSeppukuRoundId}
        initialChoices={editingSeppukuChoices}
      />

      {/* Settings & Legal Disclaimer Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettings}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
        onExport={exportGameState}
        onImport={importGameState}
        onResetData={handleResetData}
        initialTab={settingsInitialTab}
      />

      {/* Game Over Celebration Modal */}
      <GameOverModal
        isOpen={gameState.isGameOver && !isGameOverModalDismissed}
        onClose={() => setIsGameOverModalDismissed(true)}
        winner={winner}
        standings={playerStats}
        targetScore={gameState.config.targetScore}
        roundsCount={playedRoundsCount}
        onPlayAgain={() => {
          resetCurrentGame();
          setIsGameOverModalDismissed(false);
        }}
        onContinue={handleContinueGame}
        language={language}
      />

      <AppToaster />
    </div>
  );
}

export default App;
