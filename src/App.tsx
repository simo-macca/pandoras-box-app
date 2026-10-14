import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useGameState } from './hooks/useGameState';
import { useTheme } from './hooks/useTheme';
import { useUndoToast } from './hooks/useUndoToast';
import { useAppModals } from './hooks/useAppModals';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/layout/Navbar';
import { TabNavigation, ActiveTab } from './components/layout/TabNavigation';
import { Footer } from './components/layout/Footer';
import { Leaderboard } from './components/scoreboard/Leaderboard';
import { GameOverModal } from './components/scoreboard/GameOverModal';
import { HandCalculatorModal } from './components/scoring/HandCalculatorModal';
import { RuleCardDrawer } from './components/rulecards/RuleCardDrawer';
import { CardDictionary } from './components/rules/CardDictionary';
import { GameSetupModal } from './components/setup/GameSetupModal';
import { SettingsModal } from './components/layout/SettingsModal';
import { HandScore, GameState } from './types/game';
import { calculatePlayerStats } from './utils/stats';

export function App() {
  const {
    gameState,
    playerStats,
    language,
    setLanguage,
    addRound,
    editRound,
    deleteRound,
    undoLastRound,
    applyIdentityTheft,
    canApplyIdentityTheft,
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

  const winner = playerStats[0] || null;

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
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    if (editingRoundNumber !== null) {
      editRound(editingRoundNumber, scores);
      showUndoToast(
        TRANSLATIONS[language].scoring.roundModifiedSuccess,
        previousSnapshot
      );
    } else {
      addRound(scores);
      showUndoToast(
        TRANSLATIONS[language].scoring.roundAddedSuccess,
        previousSnapshot
      );
    }
    closeScoreModal();
  };

  const handleDeleteRound = (roundNumber: number, entryId?: string) => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    deleteRound(roundNumber, entryId);
    showUndoToast(
      TRANSLATIONS[language].scoring.roundDeletedSuccess,
      previousSnapshot
    );
  };

  const handleApplyIdentityTheft = () => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    const currentStats = calculatePlayerStats(
      gameState.players,
      gameState.rounds,
      gameState.config.targetScore
    );
    const scores = currentStats.map((s) => s.totalScore);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const lowP = gameState.players.find(
      (p) => currentStats.find((s) => s.id === p.id)?.totalScore === minScore
    );
    const highP = gameState.players.find(
      (p) => currentStats.find((s) => s.id === p.id)?.totalScore === maxScore
    );

    const success = applyIdentityTheft();
    if (success) {
      const msg =
        lowP && highP
          ? TRANSLATIONS[language].events.identityTheftSuccess
              .replace('{lowPlayer}', lowP.name)
              .replace('{highPlayer}', highP.name)
          : TRANSLATIONS[language].events.identityTheft;
      showUndoToast(msg, previousSnapshot);
    }
  };

  const handleUndoLastRound = () => {
    if (gameState.rounds.length > 0) {
      const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
      undoLastRound();
      showUndoToast(
        TRANSLATIONS[language].scoring.roundDeletedSuccess,
        previousSnapshot
      );
    }
  };

  const handleSaveSetup = (
    newPlayers: typeof gameState.players,
    newConfig: typeof gameState.config,
    isResetRounds: boolean
  ) => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    if (isResetRounds) {
      startNewGame(newPlayers, newConfig);
      setIsGameOverModalDismissed(false);
      showUndoToast(
        TRANSLATIONS[language].setup.confirmResetTitle || 'Match Reset',
        previousSnapshot
      );
    } else {
      updateGameSetup(newPlayers, newConfig);
      showUndoToast(
        TRANSLATIONS[language].setup.setupUpdatedSuccess,
        previousSnapshot
      );
    }
  };

  const handleResetData = () => {
    const previousSnapshot: GameState = JSON.parse(JSON.stringify(gameState));
    resetAllData();
    closeScoreModal();
    setIsGameOverModalDismissed(false);
    showUndoToast(
      TRANSLATIONS[language].settings.resetDataSuccess,
      previousSnapshot
    );
  };

  const actualRoundsCount = gameState.rounds.filter((r) => !r.isEvent).length;

  const editingRound = editingRoundNumber
    ? gameState.rounds.find((r) => r.roundNumber === editingRoundNumber)
    : null;

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-neutral-100 font-sans text-neutral-900 transition-colors selection:bg-amber-500 selection:text-black dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Navigation */}
      <Navbar
        language={language}
        theme={theme}
        onThemeChange={setTheme}
        roundsCount={actualRoundsCount}
        targetScore={gameState.config.targetScore}
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
            language={language}
          />
        )}

        {activeTab === 'rulecards' && (
          <RuleCardDrawer
            activeRuleCardIds={gameState.activeRuleCardIds || []}
            onSelectActiveRuleCard={(cardId) => {
              setActiveRuleCardIds(cardId ? [cardId] : []);
            }}
            language={language}
          />
        )}

        {activeTab === 'rules' && <CardDictionary language={language} />}
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
        roundNumber={editingRoundNumber ?? actualRoundsCount + 1}
        initialScores={editingRound?.scores}
        isEditing={editingRoundNumber !== null}
      />

      {/* Match Setup Modal */}
      <GameSetupModal
        isOpen={isSetupModalOpen}
        onClose={closeSetup}
        currentPlayers={gameState.players}
        currentConfig={gameState.config}
        onSaveAndStart={handleSaveSetup}
        language={language}
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
        roundsCount={actualRoundsCount}
        onPlayAgain={() => {
          resetCurrentGame();
          setIsGameOverModalDismissed(false);
        }}
        onContinue={handleContinueGame}
        language={language}
      />

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 16,
          right: 16,
          zIndex: 99999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '14px',
            background: '#1f2937',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#ffffff',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
